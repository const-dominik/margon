const WebSocketClient = require("websocket").client;

const client = new WebSocketClient();
 
client.on('connect', connection => {
    console.log('WebSocket Client Connected');
    connection.on('error', error => {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', () => {
        console.log('Connection Closed');
    });
    connection.on('message', message => {
        if (message.type === 'utf8') {
            const response = JSON.parse(message.utf8Data);
            if (response.type === "ids") {
                const allIds = JSON.parse(response.file);
                if (allIds) {
                    console.log("File received! :)")
                    console.log(allIds.length);
                }
            }
        }
    });
    
    if (connection.connected) {
        const request = {
            type: "world",
            data: "Fobos"
        }
        connection.sendUTF(JSON.stringify(request));
        console.log(`Asked for ids from ${request.data}`);
    }
});
 
client.connect('ws://localhost:8080/');