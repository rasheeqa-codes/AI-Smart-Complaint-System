from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import uuid
from datetime import datetime
from supabase import create_client
from ai_service import analyze_complaint

router = APIRouter()

supabase = create_client(
    "https://ddkmudrgqoqkefalpmpq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRka211ZHJncW9xa2VmYWxwbXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MDI1MTksImV4cCI6MjA5OTA3ODUxOX0.LSfQBkkBvG0S2gsswf7DQ0XkpsoBeIqPSN-sHuKyklk"
)

class ComplaintRequest(BaseModel):
    description: str
    is_anonymous: bool = False
    student_id: Optional[str] = None
    student_name: Optional[str] = None
    voice_input_used: bool = False

def generate_complaint_id():
    year = datetime.now().year
    unique = str(uuid.uuid4())[:4].upper()
    return f"CMP-{year}-{unique}"

@router.post("/submit")
def submit_complaint(complaint: ComplaintRequest):
    try:
        complaint_id = generate_complaint_id()
        ai_result = analyze_complaint(complaint.description)

        data = {
            "complaint_id": complaint_id,
            "title": complaint.description[:50],
            "description": complaint.description,
            "is_anonymous": complaint.is_anonymous,
            "student_id": None if complaint.is_anonymous else complaint.student_id,
            "student_name": None if complaint.is_anonymous else complaint.student_name,
            "voice_input_used": complaint.voice_input_used,
            "status": "Routed",
            "category": ai_result["category"],
            "priority": ai_result["priority"],
            "ai_summary": ai_result["summary"],
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }

        print(f"Inserting data: {data}")
        response = supabase.table("complaints").insert(data).execute()
        print(f"Insert response: {response}")

        return {
            "message": "Complaint submitted successfully",
            "complaint_id": complaint_id,
            "ai_analysis": ai_result
        }

    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/track/{complaint_id}")
def track_complaint(complaint_id: str):
    try:
        response = supabase.table("complaints")\
            .select("complaint_id, title, category, priority, status, created_at, ai_summary, description")\
            .eq("complaint_id", complaint_id)\
            .execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Complaint not found")
        return response.data[0]
    except Exception as e:
        print(f"Track error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/all")
def get_all_complaints():
    try:
        response = supabase.table("complaints")\
            .select("*")\
            .order("created_at", desc=True)\
            .execute()
        return response.data
    except Exception as e:
        print(f"Get all error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/update-status/{complaint_id}")
def update_status(complaint_id: str, status: str):
    try:
        response = supabase.table("complaints")\
            .update({
                "status": status,
                "updated_at": datetime.now().isoformat()
            })\
            .eq("complaint_id", complaint_id)\
            .execute()
        return {"message": "Status updated", "data": response.data}
    except Exception as e:
        print(f"Update error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/delete/{complaint_id}")
def delete_complaint(complaint_id: str):
    try:
        response = supabase.table("complaints")\
            .delete()\
            .eq("complaint_id", complaint_id)\
            .execute()
        return {"message": "Complaint deleted successfully"}
    except Exception as e:
        print(f"Delete error: {e}")
        raise HTTPException(status_code=400, detail=str(e))