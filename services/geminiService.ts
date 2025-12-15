
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (
  prompt: string, 
  context: string = ""
): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    const systemInstruction = `Adigu waxaad tahay "GuriBot", oo ah caawiye caqli badan (AI) oo loogu talagalay Nidaamka Maamulka Guryaha ee GuriHub PMS.
    
    Hawshaada:
    1. Waa inaad ku jawaabtaa AF-SOMALI oo kaliya, haddii aan lagu waydiisan luuqad kale.
    2. Caawi maamulayaasha guryaha hawlaha sida: Qorista heshiisyada kirada, falanqaynta dayactirka, xisaabinta dakhliga, iyo talo bixinta sharciga guryaha Somaliland.
    3. Adeegso eray bixin rasmi ah oo ganacsi (Professional Real Estate Tone).
    
    Macluumaadka Nidaamka (Context):
    ${context}
    
    Jawaabuhu ha noqdaan kuwo kooban, faa'iido leh, oo asluub leh. Haddii lagu waydiiyo dukumeenti (sida heshiis), samee template habaysan.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Waan ka xumahay, jawaab ma awoodo xilligan.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Cillad ayaa jirta xagga isku xirka server-ka. Fadlan hubi internetkaaga.";
  }
};

export const analyzeMaintenancePriority = async (
  description: string
): Promise<{ priority: string; reasoning: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Falanqee cabashadan dayactirka ah, una qoondee darajo (Low, Medium, High, Critical). Description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                priority: {
                    type: Type.STRING,
                    enum: ["Low", "Medium", "High", "Critical"],
                    description: "The priority level of the maintenance request."
                },
                reasoning: {
                    type: Type.STRING,
                    description: "A short explanation for the priority level in Somali."
                }
            },
            required: ["priority", "reasoning"]
        }
      }
    });
    
    const text = response.text;
    if (!text) return { priority: 'Medium', reasoning: 'Lama falanqayn karo.' };
    
    const data = JSON.parse(text);
    return {
      priority: data.priority || 'Medium',
      reasoning: data.reasoning || 'Sida caadiga ah.'
    };
  } catch (error) {
    console.error("Analysis Error:", error);
    return { priority: 'Medium', reasoning: 'Khalad farsamo ayaa dhacay.' };
  }
};
