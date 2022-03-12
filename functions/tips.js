"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild || message.author.id == client.user?.id)
            return;
        const thankArray = ["thank", "ty", "thanks", "tysm"];
        thankArray.some((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.channel.send("Want to make someone's day better, use `!thank <user>` to thank someone!");
            }
        });
        const badWords = ["nigga", "nigger", "kill", "die"];
        badWords.some((word) => {
            if (message.content.toLowerCase().includes(word)) {
                message.delete();
                message.channel.send("Stop abusing");
            }
        });
    });
};
