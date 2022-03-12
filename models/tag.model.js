"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    tagCommand: String,
    tagMessage: String,
    user: String,
});
const tagModel = mongoose_1.default.model("tags", schema);
exports.default = tagModel;
