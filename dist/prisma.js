"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const prisma_1 = require("./../generated/prisma");
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || 'file:./dev.db',
});
exports.prisma = new prisma_1.PrismaClient({ adapter });
