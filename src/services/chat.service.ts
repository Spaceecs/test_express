import { prisma } from '../prisma';

export async function createSession(documentId?: number) {
  return prisma.chatSession.create({
    data: { documentId },
  });
}

export async function addMessage(
  sessionId: number,
  role: 'user' | 'assistant',
  content: string
) {
  return prisma.chatMessage.create({
    data: {
      sessionId,
      role,
      content,
    },
  });
}

export async function getSessionContext(sessionId: number) {
  return prisma.chatSession.findUnique({
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
