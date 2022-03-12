import { Command } from "../../client/command"

export default new Command({
    name: "welcome",
    description: "welcome test",
    aliases: [],
    cooldown: 1000 * 10,
    usage: "!welcome",
    run: async({ client, message }) => {
        if(message?.author.id !== "709311040806060102") return;
        client?.emit("guildMemberAdd", message?.member as any);
    }
})