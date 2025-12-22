
import { GoogleGenAI, Type } from "@google/genai";

/**
 * GuriHub AI Core Service
 * Handles all AI interactions including chat, legal vetting, and maintenance analysis.
 */
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const aiService = {
  /**
   * General Professional Chat
   * Used for GuriBot Assistant.
   */
  chat: async (prompt: string, context: string = ""): Promise<string> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: `You are GuriBot, the premium AI assistant for GuriHub PMS Somaliland.
          Role: Professional Real Estate Advisor.
          Context: ${context}.
          Constraint: Answer in Somali, use professional business terminology.`,
          temperature: 0.7,
        }
      });
      return response.text || "Waan ka xumahay, hadda ma heli karo jawaab.";
    } catch (error) {
      console.error("AI Chat Error:", error);
      return "Cillad farsamo ayaa dhacday.";
    }
  },

  /**
   * Contract & Document Analysis
   * Performs deep analysis on legal property documents.
   */
  analyzeContract: async (text: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze this Somali rental contract: "${text}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              risks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Legal risks in Somali" },
              summary: { type: Type.STRING, description: "Professional summary in Somali" },
              complianceScore: { type: Type.NUMBER, description: "Score 0-100" }
            },
            required: ["risks", "summary", "complianceScore"]
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch {
      return { risks: ["Cillad ka timid AI"], summary: "Lama falanqayn karo", complianceScore: 0 };
    }
  },

  /**
   * Maintenance Triage
   * Categorizes maintenance requests by urgency.
   */
  analyzeMaintenance: async (description: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Categorize urgency for: "${description}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              priority: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
              reasoning: { type: Type.STRING, description: "Somali explanation" }
            },
            required: ["priority", "reasoning"]
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch {
      return { priority: "Medium", reasoning: "Analysis failed." };
    }
  }
};
