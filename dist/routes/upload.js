"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const document_service_1 = require("../services/document.service");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/", upload.single("file"), async (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: "File required" });
    const document = await (0, document_service_1.ingestDocument)(req.file.path, req.file.originalname);
    res.json({
        documentId: document.documentId,
        chunksCount: document.chunksCount,
    });
});
exports.default = router;
