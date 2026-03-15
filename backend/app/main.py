from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="Quantum Entanglement QA System",
    version="1.0"
)

app.include_router(router)

@app.get("/")
def root():
    return {"message":"Quantum QA API running"}