const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 8080 });
client_counter = 1;
webSocketServer.on('connection', webSocket => {
  console.log("Connected to client with Site Id - " + client_counter);
  webSocket.send(JSON.stringify(welcomeMessage()));
  webSocket.on('message', message => {
    console.log(message);
    broadcast(webSocket, message);
  });
});

function broadcast(webSocket, data) {
  webSocketServer.clients.forEach(client => {
    if (client !== webSocket & client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}


function welcomeMessage(){
  return {
    "siteId" : client_counter++,
    "command" : "Connected to server"
  }
}