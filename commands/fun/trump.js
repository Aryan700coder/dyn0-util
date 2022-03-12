"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_1 = require("../../client/command");
exports.default = new command_1.Command({
    name: "trump",
    description: "Donald Trump cmd",
    aliases: [],
    cooldown: 1000 * 4,
    usage: "!ping",
    run: async ({ client, message, args }) => {
        if (message?.channel.id !== "933723036790697984")
            return;
        const sentence = args[0];
        if (!sentence)
            return message.channel.send("Provide something.");
        const words = ["AFGHANISTAN", "SYRIA", "DEMOCRATS", "IMMIGRANTS", "REAL", "PUTIN", "RIGGED", "FAKE MEDIA", "MODI", "XI JINPING", "INDIA", "CHINA", "RUSSIA", "PAKISTAN", "ISRAEL"];
        message.channel.send({
            embeds: [new discord_js_1.MessageEmbed().setAuthor({
                    name: "Donald Trump",
                })
                    .setDescription(`${args.join(" ")}?\n${words[Math.floor(words.length * Math.random()) + 1]}!!!`)
                    .setColor("RANDOM")
                    .setThumbnail("https://images-ext-1.discordapp.net/external/Ojtb7zTT7dsvcXUD341seSBH9Zht-ny2hJgLYk3bGCw/%3Fv%3D1594229405599/https/cdn.glitch.com/f82434ab-06db-4ca4-a88d-26f3afded60e%252Fb2972edc-f367-4c34-a9b2-590fe88f49ff.image.png?width=428&height=417")
                    .setTimestamp()]
        });
    }
});
