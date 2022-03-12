"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const event_1 = require("../client/event");
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const discord_js_1 = require("discord.js");
exports.default = new event_1.Event("messageCreate", async (message) => {
    if (message.author.bot || !message.guild || !message.content.startsWith("!"))
        return;
    const args = message.content.slice("!".length).trim().split(' ');
    const commandName = args.shift()?.toLowerCase();
    const command = __1.default.commands.get(commandName) || __1.default.commands.find((cmd) => cmd.aliases?.includes(commandName));
    if (!command)
        return;
    if (command) {
        if (command.cooldown) {
            if (__1.default.cooldown.has(`${command.name}${message.author.id}`))
                return message.channel.send({
                    embeds: [new discord_js_1.MessageEmbed().setTitle(`You need to wait ${(0, pretty_ms_1.default)(__1.default.cooldown.get(`${command.name}${message.author.id}`) - Date.now())}`).setColor("RED")]
                });
            command.run({ client: __1.default, message, args });
            __1.default.cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown);
            setTimeout(() => __1.default.cooldown.delete(`${command.name}${message.author.id}`), command.cooldown);
        }
    }
});
