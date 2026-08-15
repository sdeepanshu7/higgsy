import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import  fs from "fs";

 const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
});


export async function createImage(userPrompt:string, imageUrl : string, outputFilePath:string){
     
    // TEXT TO IMAGE TO IMAGE GENERATION

  const base64Image = await axios
    .get(imageUrl, {
      responseType: "arraybuffer",
    })
    .then((response) =>
      Buffer.from(response.data, "binary").toString("base64")
    );

  const prompt = [
    {
      text: userPrompt,
    },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });

  const parts = response.candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;

if (imageData) {
  const buffer = Buffer.from(imageData, "base64");

  fs.writeFileSync(
    outputFilePath,
    buffer
  );

  console.log("Image saved as gemini-native-image.png");
}
    }
  }
}