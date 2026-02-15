import { GoogleGenAI, Type } from "@google/genai";

export class GeminiClient {
  private ai: GoogleGenAI;
  private modelId: string = "gemini-3-flash-preview"; // Updated to valid model ID

  constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY not found in environment variables");
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || "" });
  }

  async analyzePlant(base64Data: string, mimeType: string = "image/jpeg") {
    // Strip data URL prefix if present to get raw base64
    const cleanBase64 = base64Data.replace(/^data:(image\/\w+|application\/pdf);base64,/, "");

    const analysisSchema = {
      type: Type.OBJECT,
      properties: {
        scientificName: { type: Type.STRING },
        persianName: { type: Type.STRING },
        properties: { type: Type.ARRAY, items: { type: Type.STRING } },
        molecularProfile: { type: Type.ARRAY, items: { type: Type.STRING } },
        clinicalSafety: {
          type: Type.OBJECT,
          properties: {
            toxicity: { type: Type.STRING },
            drugInteractions: { type: Type.ARRAY, items: { type: Type.STRING } },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        },
        isPlantData: { type: Type.BOOLEAN, description: "True if the input contains information about a medicinal plant (image or text)" },
        message: { type: Type.STRING, description: "Message to user if content is irrelevant" }
      }
    };

    try {
      const response = await this.ai.models.generateContent({
        model: this.modelId,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: cleanBase64
              }
            },
            {
              text: "Analyze this content (Image of a plant OR a document/textbook page about a plant). Extract the structured data specifically for POYA - MEDPLANTAi knowledge base. Identify the plant name, medicinal properties, phytochemicals, and safety data. If it's a text document, extract the info mentioned. Output in Persian (except Scientific Name)."
            }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: analysisSchema,
          systemInstruction: "You are an expert data extractor for medicinal plants. Your job is to convert unstructured data (images or docs) into a structured JSON database format."
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response from AI");
      
      const result = JSON.parse(text);
      
      if (!result.isPlantData) {
        throw new Error(result.message || "اطلاعات گیاه دارویی مشخصی در این فایل یافت نشد.");
      }

      return {
        ...result,
        source: "استخراج هوشمند از سند/تصویر آپلود شده"
      };
    } catch (error) {
      console.error("Analysis Error:", error);
      throw error;
    }
  }

  async chat(message: string, history: { role: string; parts: { text: string }[] }[] = []) {
    try {
      const chat = this.ai.chats.create({
        model: this.modelId,
        config: {
          systemInstruction: "You are POYA - MEDPLANTAi, a helpful and knowledgeable assistant for medicinal plants. You speak fluent Persian. Answer questions about plants, traditional medicine, and drug interactions scientifically.",
        },
        history: history
      });

      const result = await chat.sendMessage({ message });
      return result.text;
    } catch (error) {
      console.error("Chat Error:", error);
      throw error;
    }
  }
}

export const geminiClient = new GeminiClient();