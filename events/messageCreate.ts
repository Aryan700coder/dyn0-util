import client from "..";
import { Event } from "../client/event";
import ms from "pretty-ms";
import { MessageEmbed } from "discord.js";
export default new Event("messageCreate", async(message) => {
    if(message.author.bot || !message.guild || !message.content.startsWith("!")) return;

    const args:String[] = message.content.slice("!".length).trim().split(' ');
    const commandName:any = args.shift()?.toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find((cmd:any) => cmd.aliases?.includes(commandName));

    if(!command) return;

    if(command) {
        if(command.cooldown) {
            if(client.cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({
                embeds:[new MessageEmbed().setTitle(`You need to wait ${ms(client.cooldown.get(`${command.name}${message.author.id}`) - Date.now())}`).setColor("RED")]
            });
            command.run({ client, message, args });

            client.cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown);
            setTimeout(() => client.cooldown.delete(`${command.name}${message.author.id}`),command.cooldown);
        }
    }
})