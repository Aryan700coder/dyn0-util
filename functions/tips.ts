import { MessageEmbed } from "discord.js";
import Client from "..";

module.exports = async (client: typeof Client) => {
    client.on("messageCreate", async(message) => {
        if(message.author.bot || !message.guild || message.author.id == client.user?.id) return;
        const thankArray: String[] = ["thank", "ty", "thanks", "tysm"];

        thankArray.some((word:any)=> {
            if(message.content.toLowerCase().includes(word)) {
                message.channel.send("Want to make someone's day better, use `!thank <user>` to thank someone!")
            }
        });

        const badWords = ["nigga", "nigger", "kill", "die"];

        badWords.some((word:any) => {
            if(message.content.toLowerCase().includes(word)) {
                message.delete();

                message.channel.send("Stop abusing");
            }
        });

        
    })
}