"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.addMessage = addMessage;
exports.getSessionContext = getSessionContext;
const prisma_1 = require("../prisma");
async function createSession(documentId) {
    return prisma_1.prisma.chatSession.create({
        data: { documentId },
    });
}
async function addMessage(sessionId, role, content) {
    return prisma_1.prisma.chatMessage.create({
        data: {
            sessionId,
            role,
            content,
        },
    });
}
async function getSessionContext(sessionId) {
    return prisma_1.prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: {
            document: {
                include: { chunks: true },
            },
            messages: {
                orderBy: { createdAt: 'asc' },
            },
        },
    });
}
