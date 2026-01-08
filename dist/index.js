"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("./routes/upload"));
const chat_1 = __importDefault(require("./routes/chat"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/upload', upload_1.default);
app.use('/chat', chat_1.default);
app.listen(4000, () => {
    console.log('Server started on :4000');
});
