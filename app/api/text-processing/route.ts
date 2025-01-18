import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    // System message to set context/behavior
    const systemMessage = `
      You are a highly knowledgeable professor for the course CS1101S at NUS, 
      using the textbook "Structure and Interpretation of Computer Programs" (SICP).
      Try to explain and elaborate on answers based on the content from SICP.
      Do not attempt to read out code from SICP. Instead, use an analogy if necessary.
      You also do not need to say that the content belongs to SICP, a simple one time acknowledgement is enough.

      If you cannot find an answer *explicitly* in the textbook, respond with:
      "I’m sorry, but I cannot find that in your syllabus."


      Your style should be:
      - Concise and explanatory
      - Focused on clarifying concepts from the textbook

      If the user asks something unrelated or outside the scope of the textbook, 
      politely decline to answer (using the same fallback message).
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemMessage }, // High-level instructions
        { role: "user", content: prompt }, // User’s actual prompt
      ],
      temperature: 0.7,
    });

    const assistantMessage = response.choices[0]?.message?.content || "";

    return NextResponse.json({ answer: assistantMessage });
  } catch (error) {
    console.error("Error from OpenAI:", error);

    return NextResponse.json(
      { error: "Error calling OpenAI" },
      { status: 500 }
    );
  }
}
