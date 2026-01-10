from sqlalchemy import create_engine;
from sqlalchemy.orm import sessionmaker, declarative_base

# centralizamos la configuración de la base de datos.
DATABASE_URL = "sqlite:///./ecommerce.db"

#conexión principal
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)
#creamos una fabrica de sesiones
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

#con esto podemos abrir y cerrar sesiones con request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()