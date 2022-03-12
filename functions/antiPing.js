"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = async (client) => {
    const antiMention = new discord_js_1.Collection();
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild)
            return;
        if (message.mentions.users?.first()) {
            if (message.mentions.users?.first()?.id == "709311040806060102") {
                const data = antiMention.get(`mention_${message.author.id}`) || 3;
                if (data == 1) {
                    message?.member?.kick("Kicked for mention owner").catch(() => { });
                    message.channel.send(`Kicked ${message.author} for mentioning owner`);
                }
                antiMention.set(`mention_${message.author.id}`, data - 1);
                if (!message?.member)
                    return;
                message.channel.send({
                    embeds: [new discord_js_1.MessageEmbed().setTitle(`Do not mention`)
                            .setDescription(`Mentioning owner will get you kicked after ${data - 1} times`).setColor("DARK_RED")]
                });
            }
        }
    });
};
