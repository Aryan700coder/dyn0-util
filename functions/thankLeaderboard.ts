import { MessageEmbed } from "discord.js";
import Client from "..";
import thankModel from "../models/thank.model";

module.exports = async (client: typeof Client) => {
    interface userDateType {
        userId: String,
        thanks: Number,
    }
    const data = await thankModel.find({}).sort({
        thanks: -1
    }).limit(10);
    const userData: userDateType[] = [];
    for (const results of data) {
        const { userId, thanks } = results;

        let usersData: userDateType = {
            userId,
            thanks,
        };

        userData.push(usersData);
    }
    let num = 0;
    let text = ""
    for (const result of userData) {
        if(!result) text = "No results";
        num++
        text += `**#${num}** ${client?.users?.cache?.get(`${result?.userId}`)?.tag} with ${result.thanks} thanks\n`
        
    }

    // now lets make a update function


    const channel = client.channels.cache.get("951708121884131348");

    if (!channel?.isText()) return;

    const message = await channel.messages.fetch("951712241370157076");

    setInterval(() => message.edit({
        embeds:[new MessageEmbed().setTitle("Thank Leaderboard").setColor("BLURPLE").setDescription(text).setFooter({
            text: "LeaderBoard updates every 1 minute"
        })]
    }), 1000 * 20)
}