import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const LANG_MAP: Record<string, string> = {
  ko: "Korean", es: "Spanish", fr: "French", de: "German",
  pt: "Portuguese", ja: "Japanese", zh: "Chinese", ar: "Arabic",
};

export async function POST(req: NextRequest) {
  const { query, locale = "en" } = await req.json();

  if (!query || typeof query !== "string" || query.length > 500) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const language = LANG_MAP[locale] ?? "English";

  const systemPrompt = `Calculator assistant. Return JSON only in ${language}:
{"result":"formatted number","explanation":"1-2 sentences","formula":"if applicable","steps":["step1","step2"],"relatedCalculators":["name1"]}
No markdown, no fences.`;

  try {
    const stream = await client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: "user", content: query }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          let fullText = "";
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              fullText += event.delta.text;
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ partial: fullText })}\n\n`));
            }
          }
          // Extract and parse JSON from the final text
          const jsonMatch = fullText.match(/\{[\s\S]*\}/);
          if (!jsonMatch) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "No JSON in response" })}\n\n`));
          } else {
            const parsed = JSON.parse(jsonMatch[0]);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, ...parsed })}\n\n`));
          }
          controller.close();
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Calculation failed" })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI calculate error:", error);
    return NextResponse.json({ error: "Calculation failed" }, { status: 500 });
  }
}
