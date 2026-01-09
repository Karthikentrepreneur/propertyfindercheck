
import { GoogleGenAI, Type } from "@google/genai";
import { PropertyDetails } from "../types";

export const analyzePropertyLink = async (url: string): Promise<PropertyDetails> => {
  const apiKey = (process.env.API_KEY as string) || '';
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Analyze the following property listing URL: ${url}
    
    Using Google Search, find and extract all available specific property details for this listing from Property Finder or similar real estate portals. 
    Pay special attention to regulatory details like the DLD Permit Number (often listed as 'Permit Number' or 'DLD Permit').
    
    Expected JSON Structure:
    {
      "propertyId": "The unique reference number or property ID from the listing",
      "dldPermitNumber": "The official DLD (Dubai Land Department) Permit Number or RERA permit number",
      "title": "Full property title",
      "price": "Price in AED (e.g., AED 45,000,000)",
      "location": "Detailed location/address",
      "bedrooms": "Number of bedrooms",
      "bathrooms": "Number of bathrooms",
      "area": "Total area in sq ft",
      "propertyType": "e.g., Villa, Apartment",
      "description": "Short 2-3 sentence professional summary of the listing",
      "amenities": ["List of top 5 amenities"],
      "investmentAnalysis": {
        "roiEstimate": "Estimated annual rental yield or capital appreciation for this specific area (Palm Jumeirah)",
        "marketComparison": "Is it priced above or below market average for this unit type?",
        "score": 85
      }
    }

    Include only the JSON in your response. Ensure the investment analysis is professional and based on typical market data for the region if specific listing data is missing.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            propertyId: { type: Type.STRING },
            dldPermitNumber: { type: Type.STRING },
            title: { type: Type.STRING },
            price: { type: Type.STRING },
            location: { type: Type.STRING },
            bedrooms: { type: Type.STRING },
            bathrooms: { type: Type.STRING },
            area: { type: Type.STRING },
            propertyType: { type: Type.STRING },
            description: { type: Type.STRING },
            amenities: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            investmentAnalysis: {
              type: Type.OBJECT,
              properties: {
                roiEstimate: { type: Type.STRING },
                marketComparison: { type: Type.STRING },
                score: { type: Type.NUMBER }
              },
              required: ["roiEstimate", "marketComparison", "score"]
            }
          },
          required: ["propertyId", "dldPermitNumber", "title", "price", "location", "bedrooms", "bathrooms", "area", "propertyType", "description", "amenities", "investmentAnalysis"]
        }
      }
    });

    const responseText = response.text || "{}";
    const result = JSON.parse(responseText);
    
    // Extract sources from grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || "Source",
        uri: chunk.web.uri
      }));

    return {
      ...result,
      sources: sources.length > 0 ? sources : [{ title: "Property Finder", uri: url }]
    };
  } catch (error) {
    console.error("Error analyzing property:", error);
    throw new Error("Failed to extract property details. Please ensure the link is valid and public.");
  }
};
