from pydantic import BaseModel, Field
from typing import List

class CartItemIn(BaseModel):
    product_id: int
    quantity: int = Field(ge=1)

class CartIn(BaseModel):
    items: List[CartItemIn]
    
#output detallado
class CartItemOut(BaseModel):
    product_id: int
    name: str
    price: float
    quantity: int
    subtotal: float

class CartOut(BaseModel):
    cart_id: int
    items: List[CartItemOut]
    total: float