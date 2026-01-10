import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
    return (
        <div className="container">
            <div className="header">
                <h1>Mini Ecommerce</h1>
                <div className="subtitle">React + FastAPI + SQLite</div>
            </div>

            <div className="grid">
                <div className="panel">
                    <ProductList />
                </div>

                <div className="panel">
                    <Cart />
                </div>
            </div>
        </div>
    );
}
