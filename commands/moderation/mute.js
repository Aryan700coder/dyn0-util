"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../../client/command");
exports.default = new command_1.Command({
    name: "mute",
    description: "mute a user",
    aliases: ["m"],
    cooldown: 100 * 2,
    usage: '!mute <user>',
    run: async ({ client, message, args }) => {
        if (message?.author.id !== message?.guild?.ownerId || !message?.member?.permissions.has("BAN_MEMBERS"))
            return message?.channel.send("You can't do that");
        const target = message?.mentions?.members?.first();
        if (!target)
            return message?.channel.send("Who do yo want to mute?");
        if (target.id == message.author.id)
            return message.channel.send("You can't mute yourself");
        const reason = args?.slice(1).join(" ") || "No reason";
        const time = args.slice(3).join(" ");
        console.log(reason, time);
        const role = message?.guild?.roles.cache.find(i => i.name == "muted");
        const memberRole = message.guild?.roles.cache.find(i => i.name == "Stoopid Members");
        if (!role)
            return;
        const userRole = target?.roles.cache.has(role.id);
        if (userRole)
            return message?.channel.send("That user is muted");
        target.roles.add(role).then(e => {
            message.guild?.channels.cache.forEach(async (chan) => {
                const channel = chan;
                if (chan.isText()) {
                    channel.permissionOverwrites.create(role, {
                        SEND_MESSAGES: false,
                    });
                }
            });
        });
        message.channel.send(`muted ${target.user}`);
    }
});
