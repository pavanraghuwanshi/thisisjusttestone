import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// We check if the key exists to prevent crashing, but in a real scenario, we'd handle this more gracefully.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getGiftSuggestions = async (interests: string): Promise<string> => {
  if (!apiKey) {
    return "Please configure the API_KEY to get AI suggestions.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Suggest 3 unique, romantic, and thoughtful Valentine's Day gift ideas 
      for someone who loves: ${interests}. 
      Keep the suggestions concise (bullet points) and creative.
      Format the output as a simple list without markdown bolding if possible, or keep it very clean.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "I couldn't think of anything right now, but chocolate is always good!";
  } catch (error) {
    console.error("Error generating gift suggestions:", error);
    return "Sorry, I'm having trouble connecting to Cupid's server right now.";
  }
};
