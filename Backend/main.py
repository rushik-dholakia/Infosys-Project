from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3


# =====================================
# CREATE FASTAPI APP
# =====================================

app = FastAPI()


# =====================================
# CORS
# Allows frontend to communicate
# with the backend
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================
# DATABASE CONNECTION
# =====================================

def get_db_connection():

    conn = sqlite3.connect("database.db")

    conn.row_factory = sqlite3.Row

    return conn


# =====================================
# CREATE LEARNERS TABLE
# =====================================

def create_learners_table():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS learners (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            full_name TEXT NOT NULL,

            email TEXT NOT NULL UNIQUE,

            password TEXT NOT NULL,

            age INTEGER NOT NULL,

            preferred_language TEXT NOT NULL,

            reading_level TEXT DEFAULT 'Beginner',

            writing_level TEXT DEFAULT 'Beginner',

            vocabulary_level TEXT DEFAULT 'Beginner',

            comprehension_level TEXT DEFAULT 'Beginner',

            overall_level TEXT DEFAULT 'Beginner'
        )
    """)

    conn.commit()

    conn.close()


# Create table when backend starts
create_learners_table()


# =====================================
# PYDANTIC MODELS
# =====================================

class LearnerRegister(BaseModel):

    full_name: str
    email: str
    password: str
    age: int
    preferred_language: str


class LearnerLogin(BaseModel):

    email: str
    password: str


# =====================================
# HOME API
# =====================================

@app.get("/")
def home():

    return {
        "message": "AI Literacy Platform Backend is Running!"
    }


# =====================================
# TEST DATABASE API
# =====================================

@app.get("/test-db")
def test_database():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute(
        "SELECT name FROM sqlite_master WHERE type='table'"
    )

    tables = cursor.fetchall()

    conn.close()

    return {
        "message": "Database connected successfully",
        "tables": [table["name"] for table in tables]
    }


# =====================================
# REGISTER API
# =====================================

@app.post("/register")
def register_learner(learner: LearnerRegister):

    conn = get_db_connection()

    cursor = conn.cursor()


    # Check if email already exists

    cursor.execute(
        "SELECT id FROM learners WHERE email = ?",
        (learner.email,)
    )

    existing_user = cursor.fetchone()


    if existing_user:

        conn.close()

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )


    # Insert learner into database

    cursor.execute(
        """
        INSERT INTO learners
        (
            full_name,
            email,
            password,
            age,
            preferred_language
        )
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            learner.full_name,
            learner.email,
            learner.password,
            learner.age,
            learner.preferred_language
        )
    )


    conn.commit()

    learner_id = cursor.lastrowid

    conn.close()


    return {
        "message": "Registration successful",
        "learner_id": learner_id
    }


# =====================================
# LOGIN API
# =====================================

@app.post("/login")
def login_learner(learner: LearnerLogin):

    conn = get_db_connection()

    cursor = conn.cursor()


    # Find learner using email

    cursor.execute(
        "SELECT * FROM learners WHERE email = ?",
        (learner.email,)
    )

    user = cursor.fetchone()

    conn.close()


    # Check if email exists

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="Email not found"
        )


    # Check password

    if user["password"] != learner.password:

        raise HTTPException(
            status_code=401,
            detail="Incorrect password"
        )


    # Login successful

    return {
        "message": "Login successful",

        "learner": {
            "id": user["id"],
            "full_name": user["full_name"],
            "email": user["email"]
        }
    }