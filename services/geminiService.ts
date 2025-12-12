import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates text content using the Gemini 2.5 Flash model.
 * @param prompt The user's input prompt.
 * @returns The generated text response.
 */
export const generateContent = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Extract text directly from the response object
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};
