import Client from "../"
import tagModel from "../models/tag.model";
import { MessageEmbed } from "discord.js";
module.exports = async (client: typeof Client) => {
    client.on("messageCreate", async(message) => {
        if(message.author.bot || !message.guild || !message.content.startsWith("!tag")) return;
        const args = message.content.slice("!tag".length).trim().split(" ");

        if(message.channel.id !== "933723036790697984") return;
        const data = await tagModel.findOne({ tagCommand: args[0] });
        if(!data) return;
        if(data) message.channel.send({
            embeds:[new MessageEmbed().setTitle(`Tag ${data.tagCommand}`)
        .setDescription(`>>> ${data.tagMessage}`).setColor("DARK_GREEN")]
        });
    })
}