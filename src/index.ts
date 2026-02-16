import { Env } from "./types";

const MODEL_ID = "@cf/openai/gpt-oss-120b";

const SYSTEM_PROMPT =
  "You are a helpful, friendly assistant. Provide concise and accurate responses.";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);

    // only /api/chat allowed
    if (url.pathname !== "/api/chat") {
      return new Response("Not Found", { status: 404 });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const body = await request.json();
      const userMessage = body?.message;

      if (!userMessage) {
        return Response.json({ error: "Message is required" }, { status: 400 });
      }

      const aiResponse = await env.AI.run(MODEL_ID, {
        instructions: 'You are a concise assistant.',
      input: userMessage,
      });

      return Response.json({
        reply: aiResponse,
      });

    } catch (err) {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }
  },
};
