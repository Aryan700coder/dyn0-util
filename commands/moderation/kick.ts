import { Command } from "../../client/command";

export default new Command({
    name: "kick",
    description: "kick a user",
    aliases: ["k"],
    cooldown: 1000 * 4,
    usage: "!kick <user> <reason>",
    run: async({client, message, args}) => {
        if(message?.author.id !== message?.guild?.ownerId || !message?.member?.permissions.has("KICK_MEMBERS")) return message?.channel.send("You can't do that");
        const target = message?.mentions?.members?.first();
        if(!target) return message?.channel.send("Who do yo want to kick?");
        const reason = args?.slice(1).join(" ") || "No reason provided";

        console.log(reason);
        if(!target.kickable) return message?.channel.send("I can't kick that user");

        target.kick(reason).then(function(user) {
            message.channel.send(`Kicked ${user.user.tag}`);
        })
    }
})