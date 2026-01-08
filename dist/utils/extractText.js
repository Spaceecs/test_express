"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractText = extractText;
const fs_1 = __importDefault(require("fs"));
function extractText(filePath) {
    return fs_1.default.readFileSync(filePath, 'utf-8');
}
