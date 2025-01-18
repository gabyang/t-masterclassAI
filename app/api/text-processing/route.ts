import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { prompt } = body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
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
