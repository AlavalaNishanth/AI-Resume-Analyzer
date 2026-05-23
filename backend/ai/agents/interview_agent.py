from ai.gemini import ask_gemini


def interview_agent(resume):

    prompt = f"""
    Generate interview questions from this resume.

    Resume:
    {resume}
    """

    return ask_gemini(prompt)