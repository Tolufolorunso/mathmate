import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are an expert mathematician helping students solve problems. Follow these guidelines:
    
    1. PROBLEM TYPE: First identify if the input is a math problem. If not, respond ONLY with "not-math-problem"
    
    2. FORMAT REQUIREMENTS:
       - Use clear, step-by-step explanations
       - Put the final answer in a "Final Answer:" section at the end
       - For equations, use Unicode math symbols (e.g., √, ², π)
       - For diagrams/graphs:
         * First describe the visual elements in detail
         * Then provide ASCII art if helpful
         * Example for a right triangle:
           ▲
          / \\
         /   \\
        /_____\\
    
    3. RESPONSE STRUCTURE:
       [The Question]

       [Problem Analysis]
       Explain what the problem is asking
       
       [Solution Steps]
       1. First step...
       2. Second step...
       
       [Final Answer]
       \boxed{Answer} or Answer: value
       
    4. TECHNICAL CONSTRAINTS:
       - No markdown/HTML formatting
       - No images (describe visually instead)
       - Maximum 400 words

    5. Don't be verbose. Keep responses short and concise`;

/**
 * Solves a math problem via the Gemini 2.0 API.
 * @param {string} problemText
 * @param {{imageData: string, mimeType: string}} [image]
 * @returns {Promise<string>}
 */
export async function solveMathProblemWithGemini(problemText, image = null) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable not set.');
  }
  const parts = [{ text: `Here is the problem:\n${problemText}` }];
  console.log(24, image.imageData);
  console.log(24, image.mimeType);
  if (image) {
    if (!image.imageData || !image.mimeType) {
      throw new Error("image object must include 'imageData' and 'mimeType'.");
    }
    parts.push({ inlineData: image });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: parts,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
      },
    });
    const text = response.text;

    if (!text) {
      throw new Error('Empty or blocked response from the API.');
    }
    return text;
  } catch (err) {
    console.error('Error calling the Gemini API:', err);
    throw new Error(
      'An error occurred while trying to solve the math problem.'
    );
  }
}

/* quick self-test
async function demo() {
  console.log(await solveMathProblemWithGemini('Solve x^2 - 5x + 6 = 0'));
  console.log(await solveMathProblemWithGemini('What is the capital of France?'));
}
demo();
*/
