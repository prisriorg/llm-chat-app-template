import { Env } from "./types";

const MODEL_ID = "@cf/openai/gpt-oss-120b";

const SYSTEM_PROMPT =
  "You are a helpful, friendly assistant. Provide concise and accurate responses.";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {

    try {
      // read json body
      const body = await request.json();

      // expecting: { message: "hello" }
      const userMessage = body?.message;

      if (!userMessage) {
        return Response.json({ error: "Message is required" }, { status: 400 });
      }

      // call Workers AI
      const aiResponse = await env.AI.run(MODEL_ID, {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
      });

      return Response.json({
        reply: aiResponse.response,
      });

    } catch (err) {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }
  },
};
