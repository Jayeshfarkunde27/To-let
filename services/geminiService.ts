import { GoogleGenAI, Type } from "@google/genai";
import { Property } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function searchPropertiesAI(userPrompt: string, availableProperties: Property[]): Promise<{
  text: string;
  propertyIds: string[];
}> {
  try {
    // Simplify context to critical fields
    const propertiesContext = availableProperties.map(p => ({
      id: p.id,
      title: p.title,
      type: p.type,
      bhk: p.bhk,
      furnishing: p.furnishing,
      price: p.price,
      location: p.location,
      amenities: p.amenities
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User search: "${userPrompt}"
      Available Listings: ${JSON.stringify(propertiesContext)}
      
      You are a helpful Indian Real Estate Assistant.
      Terms: BHK (Bedroom Hall Kitchen), PG (Paying Guest).
      Currency: INR (₹).
      
      Return JSON with:
      1. 'text': Friendly response recommending best matches, using Indian context (e.g. "Here are some great 2BHK options in Bangalore").
      2. 'propertyIds': Array of matching IDs.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            propertyIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return {
      text: "I'm having trouble connecting right now. Please browse the listings manually.",
      propertyIds: []
    };
  }
}

export async function generatePropertyDescription(details: Partial<Property>): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a catchy, professional, and inviting description (max 150 words) for a rental property in India with these details:
      Type: ${details.type}
      Configuration: ${details.bhk} BHK
      Furnishing: ${details.furnishing}
      Location: ${details.location}
      Amenities: ${details.amenities?.join(', ')}
      Rent: ₹${details.price}
      
      Highlight the lifestyle, connectivity to IT parks/Metro, and convenience.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Description Error:", error);
    return "A wonderful property located in a prime area.";
  }
}
