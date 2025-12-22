
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a legal document or contract for risks and compliance.
 */
export const analyzeContract = async (contractText: string): Promise<{ 
  risks: string[]; 
  summary: string; 
  complianceScore: number 
}> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Adiga oo ah khabiir dhinaca sharciga guryaha Somaliland ah, fadlan falanqee heshiiskan soo socda. Ka soo saar khataraha (risks), soo koobid (summary), iyo dhibcaha waafaqsanaanta sharciga (compliance score 0-100). 
      Contract: "${contractText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            risks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of identified legal risks in Somali."
            },
            summary: {
              type: Type.STRING,
              description: "A professional summary of the contract in Somali."
            },
            complianceScore: {
              type: Type.NUMBER,
              description: "Percentage score (0-100) of how well it aligns with standard laws."
            }
          },
          required: ["risks", "summary", "complianceScore"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI response was empty");
    return JSON.parse(text);
  } catch (error) {
    console.error("Legal AI Error:", error);
    return {
      risks: ["Cillad farsamo ayaa dhacday intii falanqayntu socotay."],
      summary: "Ma suurtogelin in la falanqeeyo dukumeentigan.",
      complianceScore: 0
    };
  }
};

/**
 * Generates a standard legal clause or response to a dispute.
 */
export const getLegalGuidance = async (issue: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bixi talo sharci oo kooban oo ku saabsan dhibaatadan la xiriirta guryaha: "${issue}". Adeegso sharciga Somaliland iyo hab-dhaqanka suuqa.`,
    });
    return response.text || "Talo laguma guulaysan xilligan.";
  } catch (error) {
    return "Cillad ayaa jirta xagga adeegga AI.";
  }
};
