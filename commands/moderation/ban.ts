import { Command } from "../../client/command";

export default new Command({
    name: "ban",
    description: "ban a user",
    aliases: ["b"],
    cooldown: 1000 * 4,
    usage: "!ban <user> <reason>",
    run: async({client, message, args}) => {
        if(message?.author.id !== message?.guild?.ownerId || !message?.member?.permissions.has("BAN_MEMBERS")) return message?.channel.send("You can't do that");
        const target = message?.mentions?.members?.first();
        if(!target) return message?.channel.send("Who do yo want to ban?");
        const reason = args?.slice(1).join(" ") || "No reason provided";

        console.log(reason);
        if(!target.bannable) return message?.channel.send("I can't ban that user");

        target.ban({
            reason,
        }).then(function(user) {
            message.channel.send(`baned ${user.user.tag}`);
        })
    }
})