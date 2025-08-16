import { solveMathProblemWithGemini } from '../utils/solveMathProblem.js';

async function getSolution(req, res) {
  try {
    const { type, problem, base64Data, mimeType } = req?.body;

    if (!type) {
      res.status(400).json({ error: 'Type is required' });
      return;
    }

    if (type === 'text') {
      const solution = await solveMathProblemWithGemini(problem);
      res.json({
        status: true,
        data: {
          role: 'model',
          content: solution,
        },
      });
      return;
    }

    if (type === 'image') {
      const solution = await solveMathProblemWithGemini(
        problem || 'Solve the math problem in the image.',
        { imageData: base64Data, mimeType }
      );

      res.json({
        status: true,
        data: {
          role: 'model',
          content: solution,
        },
      });
      return;
    }
  } catch (error) {
    console.error('Error in getSolution:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while solving the problem.' });
  }
}

export { getSolution };
