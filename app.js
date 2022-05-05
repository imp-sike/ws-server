const { Server } = require('ws');
const express = require('express')


const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


  const wss = new Server({ server });


console.log("Started WebSocket server")
wss.on('connection', function connection(ws) {
  ws.onmessage = (message) => {
    updateClients(message.data);
  };
});

const updateClients = (message) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
};
