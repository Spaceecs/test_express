import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat";
import uploadRoutes from "./routes/upload";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
