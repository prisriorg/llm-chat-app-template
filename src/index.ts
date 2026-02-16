/**
 * LLM Chat Application Template
 *
 * A simple chat application using Cloudflare Workers AI.
 * This template demonstrates how to implement an LLM-powered chat interface with
 * streaming responses using Server-Sent Events (SSE).
 *
 * @license MIT
 */
import { Env, ChatMessage } from "./types";

// Model ID for Workers AI model
// https://developers.cloudflare.com/workers-ai/models/
const MODEL_ID = "@cf/openai/gpt-oss-120b";

// Default system prompt
const SYSTEM_PROMPT =
	"You are a helpful, friendly assistant. Provide concise and accurate responses.";
export default {
  async fetch(request, env): Promise<Response> {
    const response = await env.AI.run('@cf/openai/gpt-oss-120b', {
      instructions: 'You are a concise assistant.',
      input: request.quary.id,
    });

    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
