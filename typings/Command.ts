import { Message } from "discord.js";
import client from "..";
export interface runOptions {
    client?: typeof client;
    message?: Message;
    args?: String[] | any;
}

type runFunction = (options: runOptions) => any;
export type CommandType = {
    name: string;
    description: string;
    aliases?: String[];
    usage: string;
    cooldown: number;
    run: runFunction;
}