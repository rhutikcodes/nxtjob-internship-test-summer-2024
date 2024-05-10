"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentInput = exports.createPostInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createPostInput = zod_1.default.object({
    content: zod_1.default.string(),
    like: zod_1.default.number().default(0),
    authorId: zod_1.default.number(),
    roomId: zod_1.default.number(),
    tags: zod_1.default.array(zod_1.default.string()).default([]),
});
exports.addCommentInput = zod_1.default.object({
    text: zod_1.default.string(),
    userId: zod_1.default.number(),
    postId: zod_1.default.number(),
});
