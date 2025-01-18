import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

import { query } from "@/app/lib/db"; // Import your database query function

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    console.log(file)

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text from the PDF
    const data = await pdfParse(buffer);
    const { text } = data;

    // Split PDF text into pages (if text includes markers, otherwise handle differently)
    const pages = text.split("\f"); // Using form-feed as a marker for new pages
    const pdfId = file.name;

    for (let i = 0; i < pages.length; i++) {
      const pageText = pages[i].trim();

      if (pageText) {
        // Generate embedding for the page using OpenAI v4
        const response = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: pageText,
        });

        const embedding = response.data[0].embedding;

        // Insert into PostgreSQL
        await query(
          `
          INSERT INTO cs1101s_pdf (pdf_id, page_number, content, embedding)
          VALUES ($1, $2, $3, $4)
        `,
          [pdfId, i + 1, pageText, embedding],
        );
      }
    }

    return NextResponse.json({ message: "PDF processed and indexed." });
  } catch (error: any) {
    console.error("Error processing PDF:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
