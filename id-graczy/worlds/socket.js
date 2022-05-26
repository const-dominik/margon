const WebSocket = require('websocket');
const http = require('http');
const fs = require('fs');

const port = 8080;//process.env.PORT || 3000;

const Server = http.createServer((req, res) => {
    res.end("Hello");
});

Server.listen(port, () => console.log(`Server started at port ${port}`));

const wsServer = new WebSocket.server({
    httpServer: Server,
    autoAcceptConnections: false
});

wsServer.on("request", req => {
    const connection = req.accept(null, req.origin);
    connection.on('message', message => {
        if (message.type === "utf8") {
            const parsedReq = JSON.parse(message.utf8Data);
            if (parsedReq.type === "world") {
                console.log("Client asking for " + parsedReq.data);
                const path = `./NICKI/${parsedReq.data}.json`;
                if (!fs.existsSync(path)) {
                    return connection.send(JSON.stringify({ type: "error", data: "no such file"}));
                }
                const file = fs.readFileSync(path, "utf8");
                const response = {
                    type: "ids",
                    file
                };
                connection.send(JSON.stringify(response));
                console.log("File sent!")
            }
        }
    });
});