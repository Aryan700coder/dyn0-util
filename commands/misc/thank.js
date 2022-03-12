"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_1 = require("../../client/command");
const thank_model_1 = __importDefault(require("../../models/thank.model"));
exports.default = new command_1.Command({
    name: "thank",
    description: "thank someone if he/she/they helped you",
    aliases: ["ty", "thanks"],
    cooldown: 1,
    usage: "!thank <user>",
    run: async ({ client, message }) => {
        if (message?.channel.id !== "951716763278639114")
            return message?.channel.send("You can help in dev channel only..");
        const target = message?.mentions.users.first();
        if (!target)
            return message?.channel.send("You need to mention someone to thank");
        if (target.bot)
            return message?.channel.send("You can't thank bots fool");
        if (target.id == message?.author.id)
            return message?.channel.send("You can't thank yourself fool");
        const config = await thank_model_1.default.findOne({ userId: target.id });
        if (!config) {
            await thank_model_1.default.create({ thanks: 1, userId: target.id });
        }
        else {
            config.thanks++;
            config.save();
        }
        message?.channel.send({
            embeds: [new discord_js_1.MessageEmbed().setTitle(`You thanked ${target.tag} now he/she/they have ${config?.thanks || 1} thanks!`).setColor("DARK_GREEN")]
        }).then(() => {
            if (message.author.id == "709311040806060102")
                return;
            client?.cooldown.set(`thank${message.author.id}`, Date.now() + 1000 * 60 * 60 * 2);
        });
    }
});
