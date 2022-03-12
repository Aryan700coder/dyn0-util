"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../../client/command");
const discord_js_1 = require("discord.js");
exports.default = new command_1.Command({
    name: "userinfo",
    description: "see info about a user",
    aliases: ["whois"],
    cooldown: 1000 * 3,
    usage: "!userinfo [user]",
    run: async ({ client, message }) => {
        const target = message?.mentions?.members?.first() || message?.member;
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor({
            iconURL: target?.displayAvatarURL({ dynamic: true, }),
            name: target?.user.username
        })
            .setDescription(`${target?.user} info\n>>> <:calender:947878100388151316> **Joined at:** \`${target?.joinedAt}\`\n<:calender:947878100388151316> **Created at:** \`${target?.user.createdAt}\`\n<:ID:947869017048231956> **Id:** \`${target?.id}\`\n**Roles [${target?.roles.cache.size}]**\n ${target?.roles.cache.map(i => i).join(" ")}\n**User Status:** \`${target?.presence?.status || "unkown"}\`\n**Presence:** **\`${target?.presence?.activities[0]?.state || "Nothing"}\`**`)
            .setTimestamp()
            .setColor("BLURPLE");
        message?.reply({
            embeds: [embed]
        });
    }
});
