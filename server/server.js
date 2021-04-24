const WebSocket = require('ws');
const { networkInterfaces } = require('os');
const SERVER_IP = getIpAddress();
const PORT = 8080;
const webSocketServer = new WebSocket.Server({ port: PORT });

console.log("Connect to "+SERVER_IP+":"+PORT);
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



function getIpAddress(){
  const nets = networkInterfaces();
  const results = {}; // Or just '{}', an empty object
  
  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
          if (net.family === 'IPv4' && !net.internal) {
              if (!results[name]) {
                  results[name] = [];
              }
              results[name].push(net.address);
          }
      }
  }
  return results['en0'][0];

}