from fastapi import APIRouter, HTTPException
from supabase import create_client

router = APIRouter()

supabase = create_client(
    "https://ddkmudrgqoqkefalpmpq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRka211ZHJncW9xa2VmYWxwbXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MDI1MTksImV4cCI6MjA5OTA3ODUxOX0.LSfQBkkBvG0S2gsswf7DQ0XkpsoBeIqPSN-sHuKyklk"
)

@router.get("/student/{student_id}")
def student_dashboard(student_id: str):
    try:
        response = supabase.table("complaints")\
            .select("*")\
            .eq("student_id", student_id)\
            .order("created_at", desc=True)\
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/staff/{department_id}")
def staff_dashboard(department_id: str):
    try:
        response = supabase.table("complaints")\
            .select("*")\
            .eq("department_id", department_id)\
            .order("created_at", desc=True)\
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/hod/{department_id}")
def hod_dashboard(department_id: str):
    try:
        response = supabase.table("complaints")\
            .select("*")\
            .in_("status", ["Escalated to HOD", "In Progress", "Routed"])\
            .order("created_at", desc=True)\
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/principal")
def principal_dashboard():
    try:
        response = supabase.table("complaints")\
            .select("*")\
            .in_("status", ["Escalated to Principal", "Escalated to HOD"])\
            .order("created_at", desc=True)\
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/analytics")
def analytics():
    try:
        total = supabase.table("complaints").select("id").execute()
        resolved = supabase.table("complaints")\
            .select("id").eq("status", "Resolved").execute()
        high_priority = supabase.table("complaints")\
            .select("id").eq("priority", "High").execute()
        return {
            "total_complaints": len(total.data),
            "resolved": len(resolved.data),
            "high_priority": len(high_priority.data)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))