from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",
    "https://quantumqaanalysis.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# register routes
app.include_router(router)

@app.get("/")
def root():
    return {"message": "Quantum QA Backend Running"}