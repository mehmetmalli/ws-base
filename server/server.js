const app = require("express")();
require('express-ws')(app);

const [PORT, ENDPOINT] = [3000, "/websocket"];

app.ws(ENDPOINT, (ws, req) => {
    ws.on('message', (msg) => {
        const now = new Date();
        if (!ws.client) { ws.client = client; }
        const { datetime: then, client } = JSON.parse(msg);

        console.log(`From ${client}: ${now - new Date(then)}ms`);
    })
    
    ws.on('close', () => {
        console.log(`Connection from ${ws.client} closed.`);
    })
})

app.listen(PORT, () => {
    console.log(`Listening for connections on ws://localhost:${PORT}${ENDPOINT}`);
});