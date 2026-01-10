# 🛒 Mini Ecommerce — React + FastAPI

**Mini ecommerce full-stack** desarrollado como prueba técnica para **SOFTSEGUROS**.  
Permite **listar productos**, **gestionar un carrito** y **guardar el carrito** (con total) en base de datos.

---

## ✨ Características

- ✅ Listado de productos desde API
- ✅ Carrito con estado global (Context API)
- ✅ Persistencia del carrito (localStorage)
- ✅ Guardado del carrito en backend (`POST /cart`)
- ✅ UI responsive y limpia (CSS custom)

---

## 🧰 Tecnologías

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn

### Frontend
- React (Vite)
- Context API
- Fetch API
- CSS custom (sin frameworks)

---

## 📁 Estructura del proyecto

```txt
ECOMMERCE/
├── backend/
│   ├── app/
│   │   ├── main.py        # Entrypoint FastAPI
│   │   ├── db.py          # Configuración DB y sesión
│   │   ├── models.py      # Modelos SQLAlchemy
│   │   ├── seed.py        # Datos iniciales
│   └── ecommerce.db
│
├── frontend/
│   ├── src/
│   │   ├── api/           # Cliente HTTP
│   │   ├── components/    # Componentes UI
│   │   ├── context/       # CartContext
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json

```
---

## ⚙️ Instalacion y ejecución
## 1) Backend
- cd backend
- python -m venv .venv
- source .venv/bin/activate  # Windows: .venv\Scripts\activate
- pip install -r requirements.txt
- uvicorn app.main:app --reload
**API: http://127.0.0.1:8000** 

**Swagger: http://127.0.0.1:8000/docs**

## 2) Frontend
- cd frontend
- npm install
- npm run dev
- App: http://localhost:5173

---
## 🔌 Endpoints
| Método	| Endpoint | Descripción |
|-----------|----------|-------------|
| GET | /products | Lista productos |
| POST | /cart	| Guarda carrito + total |

---

### 🧠 Decisiones técnicas
- FastAPI: rápido, tipado y documentación automática con Swagger.

- SQLite: simple y portable para una prueba técnica.

- Context API: estado global sin dependencias adicionales.

- Capa api/ en frontend: separa las llamadas HTTP de los componentes.

- CSS puro: demuestra fundamentos de UI sin frameworks.

---

### 🧪 Validación / Pruebas
- Backend probado en Swagger UI.

- Frontend probado en navegador.

- Flujo validado:

        1.  Agregar productos

        2.  Ajustar cantidades

        3.  Guardar carrito

        4.  Persistencia confirmada (DB y localStorage)
----

### 👤 Autor
| Kevin | Desarrollador Full Stack Jr | React · FastAPI · SQL · JavaScript · Python | 