import json

def analyze_complaint(complaint_text: str):
    result = rule_based_classify(complaint_text)
    print(f"Classification result: {result}")
    return result

def rule_based_classify(text):
    text_lower = text.lower()
    scores = {
        "Harassment": 0,
        "Infrastructure": 0,
        "Transport": 0,
        "Hostel": 0,
        "Academic": 0
    }

    for word in ["harass", "bully", "ragging", "abuse", "threat",
        "unsafe", "molest", "sexual", "violence"]:
        if word in text_lower:
            scores["Harassment"] += 3

    for word in ["projector", "whiteboard", "wifi", "lab", "classroom",
        "toilet", "electricity", "fan", "ac", "building", "washroom",
        "water", "canteen", "chair", "desk", "light", "computer",
        "board", "not working", "broken"]:
        if word in text_lower:
            scores["Infrastructure"] += 2

    for word in ["bus", "transport", "driver", "route", "vehicle",
        "pickup", "drop"]:
        if word in text_lower:
            scores["Transport"] += 2

    for word in ["hostel", "warden", "mess", "dormitory",
        "hostel food", "hostel room", "curfew"]:
        if word in text_lower:
            scores["Hostel"] += 2

    for word in ["exam", "marks", "professor", "faculty", "syllabus",
        "lecture", "assignment", "attendance", "result", "grade",
        "teacher", "subject", "timetable"]:
        if word in text_lower:
            scores["Academic"] += 2

    category = max(scores, key=scores.get)
    if scores[category] == 0:
        category = "Academic"

    priority = "Low"
    for word in ["urgent", "immediately", "danger", "emergency",
        "serious", "harassment", "threat", "abuse"]:
        if word in text_lower:
            priority = "High"
            break
    if priority == "Low":
        for word in ["problem", "issue", "not working", "broken",
            "damaged", "delayed", "late", "days", "week"]:
            if word in text_lower:
                priority = "Medium"
                break

    if category == "Harassment":
        priority = "High"

    summary = text[:100] + "..." if len(text) > 100 else text

    return {
        "category": category,
        "priority": priority,
        "summary": summary
    }