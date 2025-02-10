import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you set this in your environment variables
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      store: true,
      messages,
    });

    return Response.json(completion);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch completion" },
      { status: 500 }
    );
  }
}
