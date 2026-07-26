from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client

router = APIRouter()

supabase = create_client(
    "https://ddkmudrgqoqkefalpmpq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRka211ZHJncW9xa2VmYWxwbXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MDI1MTksImV4cCI6MjA5OTA3ODUxOX0.LSfQBkkBvG0S2gsswf7DQ0XkpsoBeIqPSN-sHuKyklk"
)

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(request: LoginRequest):
    try:
        response = supabase.table("users")\
            .select("*")\
            .eq("email", request.email)\
            .eq("password_hash", request.password)\
            .execute()

        if not response.data:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        user = response.data[0]
        return {
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "role": user["role"],
                "student_roll_number": user.get("student_roll_number")
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))