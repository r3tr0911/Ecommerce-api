from sqlalchemy.orm import Session
from .models import Product

#Insertamos datos iniciales para que podamos usar el sistema desde el arranque.
def seed_products(db: Session):
    if db.query(Product).first():
        return 
    
    products = [
        Product(name="Cafe", price=12000),
        Product(name="Panela", price=7000),
        Product(name="Arroz", price=5500),
        Product(name="Aceite", price=18000),
    ]
    
    db.add_all(products)
    db.commit()