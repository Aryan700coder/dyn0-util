"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_1 = require("../../client/command");
exports.default = new command_1.Command({
    name: "warn",
    description: "warn a user",
    aliases: ["w"],
    cooldown: 1000 * 4,
    usage: "!warn <user> <reason>",
    run: async ({ client, message, args }) => {
        if (message?.author.id !== message?.guild?.ownerId || !message?.member?.permissions.has("BAN_MEMBERS"))
            return message?.channel.send("You can't do that");
        const target = message?.mentions?.members?.first();
        if (!target)
            return message?.channel.send("Who do yo want to warn?");
        const reason = args?.slice(1).join(" ") || "No reason provided";
        message.channel.send({
            embeds: [new discord_js_1.MessageEmbed().setTitle(`Warned ${target.user.tag}!`).setColor("YELLOW")]
        });
        try {
            target.send({
                embeds: [new discord_js_1.MessageEmbed().setTitle("You have been waned").setDescription(`**Reason:** \`${reason}\`\n**Time:** \`${message.createdAt}\`\n**Moderator:** ${message.author}`)
                        .setColor("RED")]
            });
        }
        catch (error) {
        }
    }
});
