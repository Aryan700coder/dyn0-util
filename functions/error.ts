import Client from "../"
import { Collection, MessageEmbed } from "discord.js";
module.exports = async (client: typeof Client) => {
    process.on('unhandledRejection', (reason, p) => {
        console.log(' [antiCrash] :: Unhandled Rejection/Catch');
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch');
        console.log(err, origin);
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [antiCrash] :: Multiple Resolves');
        console.log(type, promise, reason);
    });
}