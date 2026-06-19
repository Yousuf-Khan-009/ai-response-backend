require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");
const groq = new Groq();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


async function AiResponse(prompt) {
    const completion = await groq.chat.completions.create({
        model: "groq/compound",
        messages: [
            {
                role: "system",
                content: "Explain why fast inference is critical for reasoning models",
            },
            {
                role: "user",
                content: prompt,

            },
        ],
    });
    return completion.choices[0]?.message?.content;
}


app.post("/ai-res", async (req, res) => {

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "prompt is required" });
    }

    const response = await AiResponse(prompt);

    return res.json({
        success: true,
        response,
    });

});

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
})