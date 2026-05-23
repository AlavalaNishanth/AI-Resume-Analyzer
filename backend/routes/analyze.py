from flask import Blueprint
from flask import request

from ai.rag import (
    store_resume_chunks,
    retrieve_relevant_chunks
)

from ai.gemini import ask_gemini

import json


analyze_bp = Blueprint(
    "analyze",
    __name__
)


@analyze_bp.route(
    "/analyze",
    methods=["POST"]
)

def analyze_resume():

    data = request.json

    resume_text = data["resume"]

    job_description = data["job_description"]

    store_resume_chunks(
        resume_text
    )

    relevant_chunks = retrieve_relevant_chunks(
        job_description
    )

    context = "\n".join(
        relevant_chunks
    )

    prompt = f"""
    You are an ATS Resume Analyzer.

    Return ONLY valid JSON.

    Format:

    {{
        "match_percentage": "",
        "ats_score": "",
        "missing_skills": [],
        "suggestions": [],
        "interview_questions": []
    }}

    Resume:
    {context}

    Job Description:
    {job_description}
    """

    response = ask_gemini(prompt)

    cleaned_response = (
        response
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:

        parsed_json = json.loads(
            cleaned_response
        )

        return parsed_json

    except Exception as e:

        return {
            "error": str(e),
            "raw_response": cleaned_response
        }, 500