def get_feedback_prompt(answer, correct):
    if correct:
        return (
            f"You are a humorous motivational tutor. "
            f"The user answered: '{answer}', which is correct. "
            f"Give them a short, fun, motivational one-liner. Max 12 words. Make them feel like a boss!"
        )
    else:
        return (
            f"You are a savage AI tutor. "
            f"The user answered: '{answer}', which is wrong. "
            f"Roast them with a brutal, sarcastic one-liner. Max 12 words. Make it sting (and hilarious)."
        )
