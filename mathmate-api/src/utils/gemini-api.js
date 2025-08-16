// The system prompt provides detailed instructions to the model.
const systemPrompt = `You are an expert mathematician helping students solve problems. Follow these guidelines:
    
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

async function solveMathProblemWithGemini(problem) {
  // Retrieve the API key from environment variables.
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const fullPrompt = `${systemPrompt}\n\nHere is the problem:\n${problem}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorBody}`
      );
    }

    const result = await response.json();
    const solutionText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!solutionText) {
      console.error(
        'Unexpected API response structure:',
        JSON.stringify(result, null, 2)
      );
      throw new Error('Could not extract solution text from the API response.');
    }

    return solutionText;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('An error occurred while trying to solve the problem.');
  }
}

async function solveImageProblemWithGemini(problem, imageData, mimeType) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  // A prompt specifically for analyzing images of math problems.
  const imagePrompt = `${systemPrompt}. ${problem}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: imagePrompt,
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: imageData,
            },
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorBody}`
      );
    }

    const result = await response.json();
    const solutionText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!solutionText) {
      console.error(
        'Unexpected API response structure:',
        JSON.stringify(result, null, 2)
      );
      throw new Error('Could not extract solution text from API response.');
    }

    return solutionText;
  } catch (error) {
    console.error('Error calling Gemini API for image:', error);
    throw new Error('An error occurred while solving the image problem.');
  }
}

export { solveMathProblemWithGemini, solveImageProblemWithGemini };
