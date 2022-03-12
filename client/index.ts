import { Client, ClientEvents, Collection } from "discord.js";
import { CommandType } from "../typings/Command";
import { Event } from "./event";
import { config } from "dotenv";
import glob from "glob";
import { promisify } from "util";
import mongoose from "mongoose";
import fs from "fs";
config();
const globPromise = promisify(glob);
export default class ExtendedClient extends Client {
    public commands: Collection<string | undefined,CommandType> = new Collection();
    public cooldown: Collection<any, any> = new Collection();
    public async build() {
        this.login(process.env.token);
        this.handler();
    }

    public async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    public async handler() {
        const commandFiles = await globPromise(
            `${__dirname}/../commands/*/*{.ts,.js}`
        );
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            console.log(command.name);

            this.commands.set(command.name, command);
        });

        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        );
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);
        });

        this.on("ready", () => {
            fs.readdirSync(`./functions`).forEach(file => {
                if(!file || !file.endsWith(".ts")) return;

                require(`../functions/${file}`)(this);
            })
            mongoose.connect("mongodb://127.0.0.1:27017/dyn0").then(() => console.log("Connected to db")).catch(e => console.log(String(e)));
        })
    }
}