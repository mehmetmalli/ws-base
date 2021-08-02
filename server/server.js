const app = require("express")();
require('express-ws')(app);

const [PORT, ENDPOINT] = [3000, "/websocket"];

app.ws(ENDPOINT, (ws, req) => {
    ws.on('message', (msg) => {
        const now = new Date();
        const { datetime: then, client } = JSON.parse(msg);
        if (!ws.client) { ws.client = client; }
        const diff = now - new Date(then);
        console.log(`From ${client}: ${diff}ms`);
        ws.send(JSON.stringify(diff));
    })
    
    ws.on('close', () => {
        console.log(`Connection from ${ws.client} closed.`);
    })
})

app.listen(PORT, () => {
    console.log(`Listening for connections on ws://localhost:${PORT}${ENDPOINT}`);
});