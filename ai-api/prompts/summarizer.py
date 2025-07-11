def get_summary_prompt(content, version):
    if version == "normal":
        return f"Summarize this text normally:\n\n{content}"
    
    elif version == "genz":
        return (
            f"Take this content and summarize it in a Gen-Z TikToker voice. "
            f"Use slang, emojis, and keep it hype:\n\n{content}"
        )

    elif version == "meme":
        return (
            f"Summarize this content using internet meme language. "
            f"Include emojis, gifs (as words), and ironic tone:\n\n{content}"
        )

    elif version == "poetic":
        return (
            f"Turn this into a funny, simple rhyming poem. 2–4 lines max. "
            f"Make it quirky and playful:\n\n{content}"
        )
