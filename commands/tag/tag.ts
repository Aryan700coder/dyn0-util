import { Message, MessageAttachment, MessageEmbed } from "discord.js";
import { Command } from "../../client/command";
import tagModel from "../../models/tag.model";
import fs from "fs/promises";
export default new Command({
    name: "tag",
    description: "a command to use tags",
    aliases: [],
    cooldown: 1000 * 2,
    usage: "!tag <add | remove | list>",
    run: async ({ client, message, args }) => {
        if(message?.author.bot) return;
        if (message?.channel.id !== "933723036790697984") return message?.channel.send("HAHAHA USE <#933723036790697984>");

        if (!args?.length) return message.channel.send({
            embeds: [new MessageEmbed().setTitle("Tag")
                .setDescription("Use tags to share your code!").setColor("GREYPLE").addField("Option add", "!tag create <tag name> <code>", true).addField("Option remove", "!tag remove <tag>", true).addField("Option list", "Displays all tags names in a text file", true)]
        });

        switch(args[0]) {
            case "add": {
                const tagCommand = args[1];
                const tagMessage = args.slice(2).join(" ");
                if(!tagCommand || !tagMessage) return message.channel.send("Provide some arguments");
                if(tagCommand == client?.commands?.get("tag")?.name) return message.channel.send("Provide some arguments");
                let regx = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
                if(regx.test(tagMessage) && message.author.id !== "709311040806060102") return message.channel.send("Nice try self promoter lmfao");
                const duplicateData = await tagModel.findOne({ tagCommand });
                if(duplicateData) return message.channel.send("That tag exists");

                message.channel.send({
                    embeds:[new MessageEmbed().setTitle(`Created \`${tagCommand}\` tag!`)
                .setDescription(`>>> ${tagMessage}`).setColor("DARK_GREEN")]
                });
                await tagModel.create({
                    user: message.author.id,
                    tagCommand,
                    tagMessage,
                });
                break;
            }
            case "list": {
                const data = await tagModel.find({});
                let text = ""
                for(const result of data) {
                    
                    text += `${result.tagCommand}\n`

                }
                message.channel.send({
                    embeds:[new MessageEmbed().setTitle("All tags").setDescription(`Use **\`!tag <tag name>\`**\n>>> \`\`\`yaml\n${text}\`\`\``).setColor("DARK_BLUE")]
                });

                break;
            }
            case "remove": {
                const whatToRemove = args[1];
                if(!whatToRemove) return;
                const data = await tagModel.findOne({ tagCommand: whatToRemove});
                if(!data) return;
                if(!message.member?.permissions.has("KICK_MEMBERS") || message.author.id !== data.user || message.author.id !== message.guild?.ownerId) return;
                await tagModel.findOneAndDelete({ tagCommand: whatToRemove });
                await message.channel.send(`Removed the tag \`${whatToRemove}\`!`);
                break;
            }
        } 
    }
})