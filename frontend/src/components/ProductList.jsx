import { useEffect, useState } from "react";
import { fetchProducts } from "../api/client";
import { useCart } from "../context/CartContext";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts().then(setProducts).catch((e) => setError(e.message));
    }, []);

    if (error) return <p style={{ color: "crimson" }}>{error}</p>;

    return (
        <div>
            <h2>Productos</h2>

            {error && <p className="badge-err">{error}</p>}

            <ul  className="list">
                {products.map((p) => (
                    <li key={p.id} className="card">
                        <div className="row">
                            <div className="name">{p.name}</div>
                            <div className="price">
                                ${Number(p.price).toLocaleString("es-CO")}
                            </div>
                        </div>

                        <div className="actions">
                            <button className="btn btn-primary" onClick={() => addToCart(p)}>
                                Agregar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
