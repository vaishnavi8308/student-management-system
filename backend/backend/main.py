from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase connection
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)


# -------------------------
# CREATE
# -------------------------

@app.post("/students")
def create_student(name: str, course: str, marks: int):

    student = {
        "name": name,
        "course": course,
        "marks": marks
    }

    response = (
        supabase
        .table("Students")
        .insert(student)
        .execute()
    )

    return {
        "message": "Student created successfully",
        "data": response.data
    }


# -------------------------
# READ ALL
# -------------------------

@app.get("/students")
def get_students():

    response = (
        supabase
        .table("Students")
        .select("*")
        .execute()
    )

    return {
        "message": "Students fetched successfully",
        "data": response.data
    }


# -------------------------
# READ ONE
# -------------------------

@app.get("/students/{student_id}")
def get_student(student_id: int):

    response = (
        supabase
        .table("Students")
        .select("*")
        .eq("id", student_id)
        .execute()
    )

    return {
        "message": "Student fetched successfully",
        "data": response.data
    }


# -------------------------
# UPDATE
# -------------------------

@app.put("/students/{student_id}")
def update_student(student_id: int, marks: int):

    updated_data = {
        "marks": marks
    }

    response = (
        supabase
        .table("Students")
        .update(updated_data)
        .eq("id", student_id)
        .execute()
    )

    return {
        "message": "Student updated successfully",
        "data": response.data
    }


# -------------------------
# DELETE
# -------------------------

@app.delete("/students/{student_id}")
def delete_student(student_id: int):

    response = (
        supabase
        .table("Students")
        .delete()
        .eq("id", student_id)
        .execute()
    )

    return {
        "message": "Student deleted successfully",
        "data": response.data
    }