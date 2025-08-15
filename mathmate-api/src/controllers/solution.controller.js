import OpenAI from 'openai';

async function getSolution(req, res) {
  const { type, question: problem } = req?.body;
  console.log(type);
  if (!type) {
    res.status(400).json({ error: 'Type is required' });
    return;
  }
  // const model = 'kimi-k1.5-preview';

  if (type === 'text') {
    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.KIMI_API_KEY,
      // baseURL: 'https://api.moonshot.ai/v1',
    });

    // const problem = 'Solve the following equation: x^2 + 2x + 1 = 0';

    // const problem = 'are you sure';

    // const message = [
    //   {
    //     role: 'system',
    //     content:
    //       'You are a math tutor. Solve step-by-step and explain every step.',
    //   },
    //   { role: 'user', content: problem },
    // ];

    const message = [
      {
        role: 'system',
        content: `You are an expert mathematician helping students solve problems. Follow these guidelines:
        
        1. PROBLEM TYPE: First identify if the input is a math problem. If not, respond ONLY with "This is not a math problem."
        
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
           - Maximum 500 words`,
      },
      { role: 'user', content: problem },
    ];

    const completion = await openai.chat.completions.create({
      model: 'moonshotai/kimi-k2:free',
      messages: message,
      temperature: 0.3,
      max_tokens: 2048,
    });

    // console.log(completion.choices[0].message);

    res.json({
      status: true,
      data: completion.choices[0].message,
      message: "Solution for 'text' type",
    });
  }

  if (type === 'image') {
    res.json({ status: true, message: "Solution for 'image' type" });
  }
}

export { getSolution };
