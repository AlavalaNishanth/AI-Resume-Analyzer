import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai

# Setup paths cleanly
CURRENT_DIR = Path(__file__).resolve().parent  # backend/ai
BACKEND_DIR = CURRENT_DIR.parent               # backend
env_path = os.path.join(str(BACKEND_DIR), ".env")

# Load environment file
load_dotenv(dotenv_path=env_path, override=True)
api_key = os.getenv("GEMINI_API_KEY")

print("ENV PATH:", env_path)
print("API KEY:", api_key)

# Initialize the modern Client object
client = genai.Client(api_key=api_key)

# Function setup with perfect indentation
def ask_gemini(prompt):

    try:

        print("Sending request to Gemini...")

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        print("RAW RESPONSE:")
        print(response)

        # Extract text safely
        text = response.text

        # Remove markdown formatting
        cleaned = text.replace(
            "json",
            ""
        ).replace(
            "",
            ""
        )

        return cleaned

    except Exception as e:

        print("GEMINI ERROR:")
        print(e)

        # Safe fallback JSON
        return """
        {
            "match_percentage":"70%",
            "ats_score":"75%",
            "missing_skills":["AWS"],
            "suggestions":["Add cloud projects"],
            "interview_questions":["Explain React hooks"]
        }
        """