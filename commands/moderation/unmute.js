"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../../client/command");
exports.default = new command_1.Command({
    name: "unmute",
    description: "unmute a user",
    aliases: ["um"],
    cooldown: 100 * 2,
    usage: '!unmute <user>',
    run: async ({ client, message }) => {
        if (message?.author.id !== message?.guild?.ownerId || !message?.member?.permissions.has("BAN_MEMBERS"))
            return message?.channel.send("You can't do that");
        const target = message?.mentions?.members?.first();
        if (!target)
            return message?.channel.send("Who do yo want to unmute?");
        if (target.id == message.author.id)
            return message.channel.send("You can't unmute yourself");
        const role = message?.guild?.roles.cache.find(i => i.name == "muted");
        if (!role)
            return;
        const userRole = target?.roles.cache.has(role.id);
        if (!userRole)
            return message?.channel.send("That user is not muted");
        target.roles.remove(role);
        message.channel.send(`Unmuted ${target.user}`);
    }
});
