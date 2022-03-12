import { Message, MessageEmbed, User } from "discord.js";
import { Command } from "../../client/command";
import thankModel from "../../models/thank.model";

export default new Command({
    name: "thank",
    description: "thank someone if he/she/they helped you",
    aliases: ["ty", "thanks"],
    cooldown: 1,
    usage: "!thank <user>",
    run: async({ client, message }) => {
        if(message?.channel.id !== "951716763278639114") return message?.channel.send("You can help in dev channel only..")
        const target: User | undefined = message?.mentions.users.first();
        if(!target) return message?.channel.send("You need to mention someone to thank");

        if(target.bot) return message?.channel.send("You can't thank bots fool");
        if(target.id == message?.author.id) return message?.channel.send("You can't thank yourself fool");

        const config = await thankModel.findOne({ userId: target.id });
        if(!config) {
            await thankModel.create({ thanks: 1, userId: target.id });
        } else {
            (config.thanks as number)++

            config.save();
        }

        message?.channel.send({
            embeds:[new MessageEmbed().setTitle(`You thanked ${target.tag} now he/she/they have ${config?.thanks || 1} thanks!`).setColor("DARK_GREEN")]
        }).then(() => {
            if(message.author.id == "709311040806060102") return;
            client?.cooldown.set(`thank${message.author.id}`, Date.now() + 1000 * 60 * 60 * 2);
        });
    }
})