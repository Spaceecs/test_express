"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestDocument = ingestDocument;
const prisma_1 = require("../prisma");
const extractText_1 = require("../utils/extractText");
const chunkText_1 = require("../utils/chunkText");
async function ingestDocument(filePath, fileName) {
    const text = (0, extractText_1.extractText)(filePath);
    const chunks = (0, chunkText_1.chunkText)(text);
    const document = await prisma_1.prisma.document.create({
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
