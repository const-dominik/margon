const spam = async () => {
    await fetch("https://discordapp.com/api/webhooks/676126427149631496/y3loE5MJG5PzuEGK51Igbx-caxqS5UBsO8j8ZKz5h_5PwFEu3NgHC94BLTrLLrpVInp5", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: "dupa"
        }),
    });
    return spam();
}
spam();