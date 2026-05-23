from ai.gemini import ask_gemini


def resume_agent(resume):

    prompt = f"""
    Review this resume professionally.

    Resume:
    {resume}
    """

    return ask_gemini(prompt)