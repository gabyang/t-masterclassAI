import { NextResponse } from "next/server";
import OpenAI from "openai";

import { query } from "@/app/lib/db"; // Import your database query function

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { question, pdfId } = await req.json();

    if (!question || !pdfId) {
      return NextResponse.json(
        { error: "Missing required fields: question or pdfId" },
        { status: 400 },
      );
    }

    // Generate embedding for the question using OpenAI v4
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: question,
    });

    const questionEmbedding = embeddingResponse.data[0].embedding;

    // Perform vector similarity search in PostgreSQL
    const searchResult = await query(
      `
      SELECT
        page_number,
        content,
        1 - (embedding <=> $1) AS similarity
      FROM
        pdf_pages
      WHERE
        pdf_id = $2
      ORDER BY
        similarity DESC
      LIMIT 1;
    `,
      [questionEmbedding, pdfId],
    );

    if (searchResult.rows.length === 0) {
      return NextResponse.json({ error: "No matches found." }, { status: 404 });
    }

    const bestMatch = searchResult.rows[0];

    return NextResponse.json({
      pageNumber: bestMatch.page_number,
      content: bestMatch.content,
      similarity: bestMatch.similarity,
    });
  } catch (error: any) {
    console.error("Error in search API:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
