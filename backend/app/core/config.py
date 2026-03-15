from dotenv import load_dotenv
import os

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")
MODEL_NAME = os.getenv("MODEL_NAME")