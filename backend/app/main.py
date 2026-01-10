from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .db import Base, engine, get_db
from .seed import seed_products
from .models import Product, Cart, CartItem
from .schemas import CartIn, CartOut, CartItemOut

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


#ejecutaremos seed al iniciar 
@app.on_event("startup")
def startup():
    db = next(get_db())
    seed_products(db)
    db.close()
    
    
    
    
@app.get("/")
def root():
    return {"status":"Ok"}


#obtenemos los productos
@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products



@app.post("/cart")
def save_cart(payload: CartIn, db: Session = Depends(get_db)):
    
    if not payload.items:
        raise HTTPException(status_code=400, detail="Cart items cannot be empty")
    
    product_ids = [it.product_id for it in payload.items]
    products = db.query(Product).filter(Product.id.in_(product_ids)).all()
    products_map = {p.id: p for p in products}
    
    missing = [pid for pid in product_ids if pid not in products_map]
    if missing:
        raise HTTPException(status_code=400, detail=f"Invalid product_id(s): {missing}")
    
    #creamos un carrito
    cart = Cart()
    db.add(cart)
    db.flush()
    
    #y guardamos los items
    
    for it in payload.items:
        db.add(CartItem(cart_id=cart.id, product_id=it.product_id, quantity=it.quantity))
        
    db.commit()
    
    items_out = []
    total = 0.0

    for it in payload.items:
        p = products_map[it.product_id]
        subtotal = float(p.price) * it.quantity
        total += subtotal

        items_out.append(
            CartItemOut(
                product_id=p.id,
                name=p.name,
                price=float(p.price),
                quantity=it.quantity,
                subtotal=subtotal,
            )
        )

    return CartOut(cart_id=cart.id, items=items_out, total=total)