import ExtendedClient from "./client";

const client = new ExtendedClient({
    intents: 32767,
    ws: {
        properties: {
            $browser: "Discord iOS",
        },
    },
});

export default client;
client.build();