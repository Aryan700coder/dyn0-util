"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tag_model_1 = __importDefault(require("../models/tag.model"));
const discord_js_1 = require("discord.js");
module.exports = async (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild || !message.content.startsWith("!tag"))
            return;
        const args = message.content.slice("!tag".length).trim().split(" ");
        if (message.channel.id !== "933723036790697984")
            return;
        const data = await tag_model_1.default.findOne({ tagCommand: args[0] });
        if (!data)
            return;
        if (data)
            message.channel.send({
                embeds: [new discord_js_1.MessageEmbed().setTitle(`Tag ${data.tagCommand}`)
                        .setDescription(`>>> ${data.tagMessage}`).setColor("DARK_GREEN")]
            });
    });
};
