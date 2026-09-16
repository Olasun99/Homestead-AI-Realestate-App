import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { google } from "googleapis";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for generating a brochure
  app.post("/api/generate-brochure", async (req, res) => {
    try {
      const { property, accessToken } = req.body;
      if (!property || !accessToken) {
        return res.status(400).json({ error: "Missing property data or access token" });
      }

      // 1. Generate text content using Gemini
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        You are a real estate marketing expert. I have a property:
        Title: ${property.title}
        Type: ${property.type} for ${property.purpose}
        Price: ${property.currency} ${property.price}
        Address: ${property.address.street}, ${property.address.city}, ${property.address.state}
        Beds: ${property.features.beds}, Baths: ${property.features.baths}, SqFt: ${property.features.sqft}
        Description: ${property.description}
        Amenities: ${property.amenities.join(', ')}

        Generate 3 short bullet points for a presentation slide highlighting its best features.
        Only output the bullet points, one per line.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      const generatedText = response.text || "Highlights coming soon.";

      // 2. Create Google Slide presentation
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      const slides = google.slides({ version: 'v1', auth });

      // Create a new blank presentation
      const presentation = await slides.presentations.create({
        requestBody: {
          title: `Brochure: ${property.title}`,
        }
      });
      const presentationId = presentation.data.presentationId;
      
      if (!presentationId) throw new Error("Failed to create presentation");

      // We'll just put the generated text onto the first (title) slide for simplicity
      const slidesData = presentation.data.slides;
      if (slidesData && slidesData.length > 0) {
        const slide = slidesData[0];
        const pageElements = slide.pageElements;
        if (pageElements && pageElements.length >= 2) {
          const titleObjectId = pageElements[0].objectId;
          const subtitleObjectId = pageElements[1].objectId;
          
          await slides.presentations.batchUpdate({
            presentationId,
            requestBody: {
              requests: [
                {
                  insertText: {
                    objectId: titleObjectId,
                    text: property.title
                  }
                },
                {
                  insertText: {
                    objectId: subtitleObjectId,
                    text: `${property.currency} ${property.price} | ${property.features.beds} Beds | ${property.features.baths} Baths\n\n${generatedText}`
                  }
                }
              ]
            }
          });
        }
      }

      const presentationUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;
      const pdfDownloadUrl = `https://docs.google.com/presentation/d/${presentationId}/export/pdf`;
      res.json({ presentationUrl, pdfDownloadUrl });
    } catch (error: any) {
      console.error("Error generating brochure:", error);
      res.status(500).json({ error: "Failed to generate brochure" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
