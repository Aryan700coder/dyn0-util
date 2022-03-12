"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const event_1 = require("../client/event");
exports.default = new event_1.Event("ready", () => {
    console.log(`${__1.default.user?.tag} is online!`);
});
