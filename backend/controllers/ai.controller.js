import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const ideate = async (req, res) => {
    try {
        const { niche, audience, goal, platform } = req.body;
        const prompt = `Generate 4 engaging content topic titles for a ${niche} creator targeting ${audience}. The goal is ${goal} on ${platform}. Return ONLY a JSON array of strings. Do not include markdown code blocks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up potential markdown code blocks if the model ignores instruction
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const topics = JSON.parse(text);
        res.json(topics);
    } catch (error) {
        console.error("Ideation Error:", error);
        res.status(500).json({ error: "Failed to generate ideas" });
    }
};

export const draft = async (req, res) => {
    try {
        const { topic, tone, length, style } = req.body;
        const prompt = `Write a ${length} content piece about "${topic}". Tone: ${tone}. Style: ${style}. Return the response in JSON format with "title" and "content" fields. The "content" field should use Markdown formatting including headers, bullet points, and bold text. Do not include markdown code blocks for the JSON itself.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const draftContent = JSON.parse(text);
        res.json(draftContent);
    } catch (error) {
        console.error("Drafting Error:", error);
        res.status(500).json({ error: "Failed to generate draft" });
    }
};

export const refine = async (req, res) => {
    try {
        const { content, option } = req.body;
        let instruction = "";

        switch (option) {
            case "grammar":
                instruction = "Fix grammar and improve clarity.";
                break;
            case "tone":
                instruction = "Adjust the tone to be more professional and engaging.";
                break;
            case "simplify":
                instruction = "Simplify the language for better readability.";
                break;
            default:
                instruction = "Improve this content.";
        }

        const prompt = `${instruction} Return ONLY the refined content. Here is the content:\n\n${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const refinedText = response.text();

        const finalResponse = `[${option.toUpperCase()} APPLIED]\n\n${refinedText}\n\n(Original length: ${content.length} chars -> New length: ${refinedText.length} chars)`;

        res.json(finalResponse);
    } catch (error) {
        console.error("Refine Error:", error);
        res.status(500).json({ error: "Failed to refine content" });
    }
};

export const repurpose = async (req, res) => {
    try {
        const { content, formats } = req.body;
        const prompt = `Repurpose the following content for these platforms: ${formats.join(", ")}. 
    Return a JSON object where keys are the platform names (lowercase: ${formats.join(", ")}) and values are the adapted content.
    LinkedIn: professional, insightful.
    Twitter: thread format or punchy tweet.
    Instagram: engaging caption with hashtags.
    Do not include markdown code blocks for the JSON.
    
    Content: ${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const repurposedContent = JSON.parse(text);
        res.json(repurposedContent);
    } catch (error) {
        console.error("Repurpose Error:", error);
        res.status(500).json({ error: "Failed to repurpose content" });
    }
};
