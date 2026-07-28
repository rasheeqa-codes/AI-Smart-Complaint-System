from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, complaints, dashboard
from escalation import check_and_escalate
import threading
import time

app = FastAPI(
    title="AI Smart Complaint System",
    description="AI-Powered Complaint and Escalation System API",
    version="1.0.0"
)

# Allow React frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include all routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(complaints.router, prefix="/api/complaints", tags=["Complaints"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])

# Background escalation checker runs every 15 minutes
def escalation_loop():
    while True:
        print("Running escalation check...")
        check_and_escalate()
        time.sleep(900)  # 900 seconds = 15 minutes

@app.on_event("startup")
def start_escalation():
    thread = threading.Thread(target=escalation_loop, daemon=True)
    thread.start()
    print("Escalation engine started!")

@app.get("/")
def root():
    return {"message": "AI Smart Complaint System is running!"}

@app.get("/api/escalate-now")
def escalate_now():
    check_and_escalate()
    return {"message": "Escalation check completed!"}