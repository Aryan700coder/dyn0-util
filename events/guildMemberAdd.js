"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require(".."));
const event_1 = require("../client/event");
exports.default = new event_1.Event("guildMemberAdd", async (member) => {
    const channel = __1.default.channels.cache.get("951819402997801021");
    const whatRole = member.guild.roles.cache.find(e => e.name == "Stoopid Members");
    member.roles.add(whatRole);
    if (!channel?.isText())
        return;
    const embed = new discord_js_1.MessageEmbed()
        .setTitle(`<a:user_join:947052093297004554> **Welcome \`${member.user.tag}\` in \`${member.guild.name}\`\nNow we are at ${member.guild.memberCount} members!**`)
        .setColor("GREEN");
    channel.send({
        embeds: [embed]
    });
});
