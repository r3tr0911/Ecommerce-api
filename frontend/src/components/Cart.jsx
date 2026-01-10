import {useEffect , useState } from "react";
import { useCart } from "../context/CartContext";
import { saveCart } from "../api/client";

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, total } = useCart();
    const [status, setStatus] = useState("");
    useEffect(() => {
        if (cartItems.length > 0) setStatus("");
    }, [cartItems.length]);

    const handleSave = async () => {
        setStatus("");
        try {
            const items = cartItems.map((it) => ({
                product_id: it.id,
                quantity: it.quantity,
            }));
            const res = await saveCart(items);
            setStatus(`✅ Carrito guardado. Total: $${Number(res.total).toLocaleString("es-CO")}`);
            clearCart(); 
        } catch (e) {
            setStatus(`❌ ${e.message}`);
        }
    };

    return (
        <div>
            <h2>Carrito</h2>

            {cartItems.length === 0 ? (
                <p className="subtitle">Carrito vacío</p>
            ) : (
                <>
                    <ul  className="list">
                        {cartItems.map((it) => (
                            <li key={it.id} className="card">
                                <div className="row">
                                    <div className="name">{it.name}</div>
                                    <button className="btn btn-danger" onClick={() => removeFromCart(it.id)}>
                                        Eliminar
                                    </button>
                                </div>

                                <div className="row" style={{ marginTop: 10 }}>
                                    <div className="price">
                                        ${Number(it.price).toLocaleString("es-CO")}
                                    </div>

                                    <label className="subtitle">
                                        Cant:
                                        <input
                                        className="input"
                                        type="number"
                                        min="1"
                                        value={it.quantity}
                                        onChange={(e) => updateQuantity(it.id, e.target.value)}
                                        style={{ marginLeft: 8 }}
                                        />
                                    </label>
                                </div>

                                <div className="subtitle">
                                    Subtotal: ${Number(it.price * it.quantity).toLocaleString("es-CO")}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="hr" />

                    <div className="total">
                        <span>Total</span>
                        <span>${Number(total).toLocaleString("es-CO")}</span>
                    </div>

                    <div className="actions">
                        <button className="btn btn-primary" onClick={handleSave} disabled={cartItems.length === 0}>
                            Guardar carrito
                        </button>
                        <button className="btn" onClick={clearCart}>
                            Vaciar
                        </button>
                    </div>
                </>
            )}

            {status && <p style={{ marginTop: 10 }}>{status}</p>}
        </div>
    );
}
