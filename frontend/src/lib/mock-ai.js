const API_URL = "http://localhost:5001/api/ai";

export const MockAI = {
    ideate: async ({ niche, audience, goal, platform }, token) => {
        try {
            const response = await fetch(`${API_URL}/ideate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({ niche, audience, goal, platform }),
            });
            if (!response.ok) throw new Error("Failed to fetch ideas");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    draft: async ({ topic, tone, length, style }, token) => {
        try {
            const response = await fetch(`${API_URL}/draft`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({ topic, tone, length, style }),
            });
            if (!response.ok) throw new Error("Failed to fetch draft");
            return await response.json();
        } catch (error) {
            console.error(error);
            return { title: topic, content: "Error generating draft." };
        }
    },

    refine: async ({ content, option }, token) => {
        try {
            const response = await fetch(`${API_URL}/refine`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({ content, option }),
            });
            if (!response.ok) throw new Error("Failed to refine content");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return content;
        }
    },

    repurpose: async ({ content, formats }, token) => {
        try {
            const response = await fetch(`${API_URL}/repurpose`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                },
                body: JSON.stringify({ content, formats }),
            });
            if (!response.ok) throw new Error("Failed to repurpose content");
            return await response.json();
        } catch (error) {
            console.error(error);
            return {};
        }
    }
};
