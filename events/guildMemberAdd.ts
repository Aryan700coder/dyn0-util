import { MessageAttachment, MessageEmbed, Role } from "discord.js";
import client from "..";
import { Event } from "../client/event";
import Canvas from "canvas";

export default new Event("guildMemberAdd", async(member) => {
    const channel = client.channels.cache.get("951819402997801021");

    const whatRole = member.guild.roles.cache.find(e => e.name == "Stoopid Members")! as Role;
    
    member.roles.add(whatRole);
    if(!channel?.isText()) return;
    const embed = new MessageEmbed()
    .setTitle(`<a:user_join:947052093297004554> **Welcome \`${member.user.tag}\` in \`${member.guild.name}\`\nNow we are at ${member.guild.memberCount} members!**`)
    .setColor("GREEN")
    channel.send({
        embeds:[embed]
    });
})