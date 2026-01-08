import { prisma } from '../prisma';
import { extractText } from '../utils/extractText';
import { chunkText } from '../utils/chunkText';

export async function ingestDocument(
  filePath: string,
  fileName: string
) {
  const text = extractText(filePath);
  const chunks = chunkText(text);

  const document = await prisma.document.create({
    data: {
      name: fileName,
      chunks: {
        create: chunks.map((content, index) => ({
          content,
          position: index,
        })),
      },
    },
  });

  return {
    documentId: document.id,
    chunksCount: chunks.length,
  };
}
