"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../../client/command");
exports.default = new command_1.Command({
    name: "welcome",
    description: "welcome test",
    aliases: [],
    cooldown: 1000 * 10,
    usage: "!welcome",
    run: async ({ client, message }) => {
        if (message?.author.id !== "709311040806060102")
            return;
        client?.emit("guildMemberAdd", message?.member);
    }
});
