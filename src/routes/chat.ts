import { Router } from "express";
import {
  createSession,
  addMessage,
  getSessionContext,
} from "../services/chat.service";
import { openai } from "../lib/openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const router = Router();

router.post("/session", async (req, res) => {
  const { documentId } = req.body;
  const session = await createSession(documentId);
  res.json({ sessionId: session.id });
});

const MAX_CHUNKS = 20;

router.post("/ask", async (req, res) => {
  const { sessionId, question } = req.body;
  if (!sessionId) return res.status(400).json({ error: "SessionId required" });
  if (!question) return res.status(400).json({ error: "Question required" });

  await addMessage(sessionId, "user", question);

  const context = await getSessionContext(sessionId);

  const documentText =
    context?.document?.chunks
      .slice(0, MAX_CHUNKS)
      .map((c) => c.content)
      .filter(Boolean)
      .join("\n---\n") || "";

  const chatHistory = context?.messages || [];

  const messagesForAI: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "Ти допомагаєш користувачу, використовуючи текст документа та історію чату.",
    },
    ...chatHistory.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: `${documentText}\n\nЗапитання: ${question}` },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messagesForAI,
  });

  const answer =
    completion.choices[0].message?.content || "Вибач, не можу відповісти";

  await addMessage(sessionId, "assistant", answer);

  res.json({ answer });
});

export default router;
