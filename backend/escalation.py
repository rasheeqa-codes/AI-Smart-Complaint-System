from supabase import create_client
from datetime import datetime, timezone

supabase = create_client(
    "https://ddkmudrgqoqkefalpmpq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRka211ZHJncW9xa2VmYWxwbXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MDI1MTksImV4cCI6MjA5OTA3ODUxOX0.LSfQBkkBvG0S2gsswf7DQ0XkpsoBeIqPSN-sHuKyklk"
)

def check_and_escalate():
    try:
        response = supabase.table("complaints")\
            .select("*")\
            .not_.in_("status", ["Resolved", "Closed"])\
            .execute()

        complaints = response.data
        now = datetime.now(timezone.utc)

        for complaint in complaints:
            raw_time = complaint["created_at"]
            raw_time = raw_time.replace("Z", "+00:00")
            created_at = datetime.fromisoformat(raw_time)
            if created_at.tzinfo is None:
                created_at = created_at.replace(tzinfo=timezone.utc)

            hours_passed = (now - created_at).total_seconds() / 3600
            complaint_id = complaint["id"]
            current_status = complaint["status"]
            new_status = None
            reason = None

            if hours_passed >= 24 and current_status not in [
                "Escalated to HOD",
                "Escalated to Principal",
                "Resolved",
                "Closed"
            ]:
                new_status = "Escalated to HOD"
                reason = "Unresolved after 24 hours"

            elif hours_passed >= 48 and current_status == "Escalated to HOD":
                new_status = "Escalated to Principal"
                reason = "Unresolved after 48 hours"

            elif hours_passed >= 72 and current_status == "Escalated to Principal":
                new_status = "Escalated to Principal"
                reason = "CRITICAL - Unresolved after 72 hours"

            if new_status and new_status != current_status:
                supabase.table("complaints")\
                    .update({
                        "status": new_status,
                        "updated_at": now.isoformat()
                    })\
                    .eq("id", complaint_id)\
                    .execute()

                supabase.table("escalation_log").insert({
                    "complaint_id": complaint_id,
                    "escalated_from": current_status,
                    "escalated_to": new_status,
                    "reason": reason,
                    "escalated_at": now.isoformat()
                }).execute()

                print(f"Escalated {complaint['complaint_id']} to {new_status}")

        print(f"Check complete. {len(complaints)} complaints checked.")

    except Exception as e:
        print(f"Escalation error: {e}")