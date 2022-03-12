import client from "..";
import { Event } from "../client/event";

export default new Event("ready", () => {
    console.log(`${client.user?.tag} is online!`); 
})