"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const thank_model_1 = __importDefault(require("../models/thank.model"));
module.exports = async (client) => {
    const data = await thank_model_1.default.find({}).sort({
        thanks: -1
    }).limit(10);
    const userData = [];
    for (const results of data) {
        const { userId, thanks } = results;
        let usersData = {
            userId,
            thanks,
        };
        userData.push(usersData);
    }
    let num = 0;
    let text = "";
    for (const result of userData) {
        if (!result)
            text = "No results";
        num++;
        text += `**#${num}** ${client?.users?.cache?.get(`${result?.userId}`)?.tag} with ${result.thanks} thanks\n`;
    }
    // now lets make a update function
    const channel = client.channels.cache.get("951708121884131348");
    if (!channel?.isText())
        return;
    const message = await channel.messages.fetch("951712241370157076");
    setInterval(() => message.edit({
        embeds: [new discord_js_1.MessageEmbed().setTitle("Thank Leaderboard").setColor("BLURPLE").setDescription(text).setFooter({
                text: "LeaderBoard updates every 1 minute"
            })]
    }), 1000 * 20);
};
