import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// System instructions for human-like content
const SYSTEM_CONTEXT = `You are an expert human content writer, NOT an AI assistant. 
CRITICAL RULES:
1. NEVER use AI-sounding phrases like "In today's world", "Let's dive in", "In conclusion", "It's important to note", "Furthermore", "Moreover", "Leveraging", "Revolutionizing", "Cutting-edge", "Game-changer".
2. Write like a real person having a conversation - use contractions (don't, can't, won't), casual language, and natural flow.
3. Be CONCISE. If the user asks for short content, keep it SHORT. No fluff. No filler sentences.
4. Avoid bullet points unless absolutely necessary. Prefer flowing paragraphs.
5. Use simple vocabulary. Avoid jargon unless the audience expects it.
6. Include personal opinions, slight imperfections, and conversational tone.
7. NEVER start with "As a..." or "I'm here to help" or similar AI openings.`;

export const ideate = async (req, res) => {
    try {
        const { niche, audience, goal, platform } = req.body;
        const prompt = `${SYSTEM_CONTEXT}

TASK: Generate exactly 4 content topic ideas for a ${niche} creator.
Target audience: ${audience}
Goal: ${goal}
Platform: ${platform}

Requirements:
- Each topic should be catchy, specific, and scroll-stopping
- Make titles feel authentic and human (not clickbait or AI-generated)
- Keep titles SHORT (5-10 words max)
- Use curiosity, controversy, or relatability hooks
- No generic topics - be specific and unique

Return ONLY a JSON array of 4 strings. No explanations. No markdown blocks.
Example format: ["Title 1", "Title 2", "Title 3", "Title 4"]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
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

        // Define strict length limits
        const lengthGuide = {
            Short: "100-150 words MAX. Be extremely concise. Get straight to the point.",
            Medium: "250-350 words. Cover the topic well but don't ramble.",
            Long: "500-700 words. Detailed but still focused. No filler."
        };

        const prompt = `${SYSTEM_CONTEXT}

TASK: Write a ${length.toLowerCase()} content piece about "${topic}"
Tone: ${tone}
Style: ${style}
Length requirement: ${lengthGuide[length] || lengthGuide.Medium}

STRICT RULES:
- Respect the length limit. ${length === "Short" ? "SHORT means SHORT. Under 150 words." : ""}
- Write like a human blogger/creator, not a corporate press release
- Start with a hook that grabs attention immediately
- Use personal pronouns (I, you, we)
- Include one specific example, story, or anecdote if possible
- End with a thought-provoking statement or call-to-action
- NO AI clichés or filler phrases

Return JSON with "title" and "content" fields only.
The content should use Markdown for formatting where helpful.
No code blocks around the JSON.`;

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

        const instructions = {
            grammar: `Fix any grammar, spelling, or punctuation errors. 
                      Improve sentence flow where awkward.
                      Keep the original voice and style intact.
                      Don't add content - just clean up what's there.`,
            tone: `Adjust the tone to be more professional yet approachable.
                   Remove any overly casual slang if inappropriate.
                   Make it sound confident and credible.
                   Keep the same length - don't add fluff.`,
            simplify: `Simplify complex sentences into shorter, clearer ones.
                       Replace jargon with everyday words.
                       Aim for 8th grade reading level.
                       Keep the core message - just make it easier to read.`
        };

        const instruction = instructions[option] || "Improve this content while keeping its essence.";

        const prompt = `${SYSTEM_CONTEXT}

TASK: Refine the following content.
Action: ${instruction}

STRICT RULES:
- Return ONLY the refined content, nothing else
- Don't add length - refine what exists
- Maintain the author's voice
- Don't make it sound more AI-like

CONTENT TO REFINE:
${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const refinedText = response.text();
        res.json(refinedText.trim());
    } catch (error) {
        console.error("Refine Error:", error);
        res.status(500).json({ error: "Failed to refine content" });
    }
};

export const repurpose = async (req, res) => {
    try {
        const { content, formats } = req.body;

        const platformGuides = {
            linkedin: "Professional but personable. Start with a hook. Use line breaks for readability. End with a question or CTA. 150-200 words max.",
            twitter: "Punchy and direct. One key insight. Use 1-2 relevant hashtags max. Under 280 characters if single tweet, or format as a thread with numbered tweets.",
            instagram: "Conversational and relatable. Start with a scroll-stopping first line. Include 3-5 relevant hashtags at the end. Emoji use is okay but don't overdo it."
        };

        const formatInstructions = formats
            .map(f => `${f}: ${platformGuides[f.toLowerCase()] || "Adapt appropriately for this platform."}`)
            .join("\n");

        const prompt = `${SYSTEM_CONTEXT}

TASK: Repurpose this content for: ${formats.join(", ")}

Platform-specific requirements:
${formatInstructions}

STRICT RULES:
- Each version should feel native to that platform
- Don't just copy-paste - actually adapt the message and format
- Keep the core insight but change the delivery
- Sound human on every platform

ORIGINAL CONTENT:
${content}

Return a JSON object with platform names as keys (lowercase) and adapted content as values.
No markdown code blocks.`;

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
