import { Command } from "../../client/command";

export default new Command({
    name: "ping",
    description: "Replies with latency",
    aliases:["p", "latency"],
    cooldown: 1000 * 4,
    usage: "!ping",
    run: async({ client, message }) => {
        if(message?.channel.id !== "933723036790697984") return;
        message?.reply(`${client?.ws.ping}ms!`)
    }
})