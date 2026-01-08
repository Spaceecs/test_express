"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_service_1 = require("../services/chat.service");
const openai_1 = require("../lib/openai");
const router = (0, express_1.Router)();
router.post("/session", async (req, res) => {
    const { documentId } = req.body;
    const session = await (0, chat_service_1.createSession)(documentId);
    res.json({ sessionId: session.id });
});
const MAX_CHUNKS = 20;
router.post("/ask", async (req, res) => {
    const { sessionId, question } = req.body;
    if (!sessionId)
        return res.status(400).json({ error: "SessionId required" });
    if (!question)
        return res.status(400).json({ error: "Question required" });
    await (0, chat_service_1.addMessage)(sessionId, "user", question);
    const context = await (0, chat_service_1.getSessionContext)(sessionId);
    const documentText = context?.document?.chunks
        .slice(0, MAX_CHUNKS)
        .map((c) => c.content)
        .filter(Boolean)
        .join("\n---\n") || "";
    const chatHistory = context?.messages || [];
    const messagesForAI = [
        {
            role: "system",
            content: "Ти допомагаєш користувачу, використовуючи текст документа та історію чату.",
        },
        ...chatHistory.map((m) => ({
            role: m.role,
            content: m.content,
        })),
        { role: "user", content: `${documentText}\n\nЗапитання: ${question}` },
    ];
    const completion = await openai_1.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messagesForAI,
    });
    const answer = completion.choices[0].message?.content || "Вибач, не можу відповісти";
    await (0, chat_service_1.addMessage)(sessionId, "assistant", answer);
    res.json({ answer });
});
exports.default = router;
