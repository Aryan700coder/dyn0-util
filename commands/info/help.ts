import { Command } from "../../client/command";
import { readdirSync } from "fs"
import { CommandType } from "../../typings/Command";
import { EmbedFieldData, MessageEmbed } from "discord.js";
export default new Command({
    name: "help",
    description: "Help command",
    aliases: ["?", "commands"],
    cooldown: 1000 * 4,
    usage: "!help",
    run: async ({ client, message, args }) => {
        if(message?.channel.id !== "933723036790697984") return;
        const e:any = args[0] as any;
        try {
            if(!e) {
                let categories: EmbedFieldData[] = [];
                readdirSync(`./commands`).forEach((dir) => {
                    const cmds = readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".ts"));
                    let data: EmbedFieldData;
    
                    data = {
                        name: dir.toLocaleUpperCase(),
                        value: cmds.length === 0 ? 'No commands' : `**\`${cmds.join('` | `').replaceAll(".ts", "")}\`**`,
                    };
    
                    categories.push(data);
                });
    
                const embed = new MessageEmbed()
                    .setTitle(`**All commands!**`)
                    .setDescription("use `!help <command name|aliases>` for more info!")
                    .setFields(categories)
                    .setColor("DARK_BLUE");
    
                message?.reply({
                    embeds: [embed],
                })
            } 

            if(e) {
                const cmd = client?.commands.get(e) || client?.commands.find((cmd:any) => cmd.aliases?.includes(e));

                if(!cmd) return message.channel.send(`Cannot find \`${e}\``);

                message.reply({
                    embeds:[new MessageEmbed().setTitle(`${cmd.name}`).setDescription(`**Description:** ${cmd.description}\n**Aliases:** \`${cmd?.aliases?.length == 0 ? "No aliases" : cmd?.aliases?.map(i => i).join(", ")}\`\n**Usage:** \`${cmd.usage}\``).setColor("RANDOM")]
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
})