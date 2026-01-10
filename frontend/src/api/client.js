const API_URL = "http://127.0.0.1:8000";

export async function fetchProducts() {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Error al cargar productos");
    return res.json();
}


export async function saveCart(items) {
    const res = await fetch (`${API_URL}/cart`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({items}),
    });

    if(!res.ok){
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Error al guardar el carrito")
    }
    return res.json();
}

