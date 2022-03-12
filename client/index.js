"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const glob_1 = __importDefault(require("glob"));
const util_1 = require("util");
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
(0, dotenv_1.config)();
const globPromise = (0, util_1.promisify)(glob_1.default);
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    cooldown = new discord_js_1.Collection();
    async build() {
        this.login(process.env.token);
        this.handler();
    }
    async importFile(filePath) {
        return (await Promise.resolve().then(() => __importStar(require(filePath))))?.default;
    }
    async handler() {
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);
        commandFiles.forEach(async (filePath) => {
            const command = await this.importFile(filePath);
            if (!command.name)
                return;
            console.log(command.name);
            this.commands.set(command.name, command);
        });
        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        eventFiles.forEach(async (filePath) => {
            const event = await this.importFile(filePath);
            this.on(event.event, event.run);
        });
        this.on("ready", () => {
            fs_1.default.readdirSync(`./functions`).forEach(file => {
                if (!file || !file.endsWith(".ts"))
                    return;
                require(`../functions/${file}`)(this);
            });
            mongoose_1.default.connect(`${process.env.mongoUrl}`).then(() => console.log("Connected to db")).catch(e => console.log(String(e)));
        });
    }
}
exports.default = ExtendedClient;
