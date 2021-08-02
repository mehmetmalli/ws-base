const client = Math.floor(Math.random() * 200) + 1;
const info = document.getElementById("info");
const ping = document.getElementById("ping");
const ws = new WebSocket('ws://localhost:3000/websocket');
let interval;
ws.onopen = () => {
    interval = setInterval(() => {
        const data = JSON.stringify({
            client,
            datetime: new Date()
        });
        ws.send(data);
        info.textContent = `Last Sent: ${data}`;
    }, 1000)
}

ws.onmessage = (e) => {
    ping.textContent = `Last Ping: ${e.data} ms`;
}


ws.onerror = () => {
    info.textContent = 'ERROR';
    clearInterval(interval);
    ws.close();
}