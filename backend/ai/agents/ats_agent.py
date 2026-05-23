from ai.gemini import ask_gemini


def ats_agent(resume):

    prompt = f"""
    Analyze ATS compatibility.

    Resume:
    {resume}
    """

    return ask_gemini(prompt)