import { Router } from "express";
import multer from "multer";
import { ingestDocument } from "../services/document.service";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "File required" });

  const document = await ingestDocument(req.file.path, req.file.originalname);

  res.json({
    documentId: document.documentId,
    chunksCount: document.chunksCount,
  });
});

export default router;
