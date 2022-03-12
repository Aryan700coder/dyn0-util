"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../../client/command");
const fs_1 = require("fs");
const discord_js_1 = require("discord.js");
exports.default = new command_1.Command({
    name: "help",
    description: "Help command",
    aliases: ["?", "commands"],
    cooldown: 1000 * 4,
    usage: "!help",
    run: async ({ client, message, args }) => {
        if (message?.channel.id !== "933723036790697984")
            return;
        const e = args[0];
        try {
            if (!e) {
                let categories = [];
                (0, fs_1.readdirSync)(`./commands`).forEach((dir) => {
                    const cmds = (0, fs_1.readdirSync)(`./commands/${dir}`).filter(file => file.endsWith(".ts"));
                    let data;
                    data = {
                        name: dir.toLocaleUpperCase(),
                        value: cmds.length === 0 ? 'No commands' : `**\`${cmds.join('` | `').replaceAll(".ts", "")}\`**`,
                    };
                    categories.push(data);
                });
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(`**All commands!**`)
                    .setDescription("use `!help <command name|aliases>` for more info!")
                    .setFields(categories)
                    .setColor("DARK_BLUE");
                message?.reply({
                    embeds: [embed],
                });
            }
            if (e) {
                const cmd = client?.commands.get(e) || client?.commands.find((cmd) => cmd.aliases?.includes(e));
                if (!cmd)
                    return message.channel.send(`Cannot find \`${e}\``);
                message.reply({
                    embeds: [new discord_js_1.MessageEmbed().setTitle(`${cmd.name}`).setDescription(`**Description:** ${cmd.description}\n**Aliases:** \`${cmd?.aliases?.length == 0 ? "No aliases" : cmd?.aliases?.map(i => i).join(", ")}\`\n**Usage:** \`${cmd.usage}\``).setColor("RANDOM")]
                });
            }
        }
        catch (e) {
            console.log(e);
        }
    }
});
