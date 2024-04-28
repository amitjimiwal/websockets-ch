import WebSocket, { WebSocketServer } from "ws";
import http from 'http';
import express from "express";
const app = express();
const port = 3000;
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
// const users: { [key: string]: number } = {};
let usersconnected = 0;

//Everytime any client connects to the server, This action is performed and ws object is created for that client
wss.on('connection', function (ws) {
     usersconnected++;
     console.log(`${usersconnected} connected`);
     //send back the number of active users to the client who just connected
     ws.send(`Welcome to the chat server. ${usersconnected} active users`);
     //trigger this event whenever any client connected to the websocket sends a message
     ws.on('message', (message) => {
          console.log(`Recieved from user ${message}`);

          //send the message to all the clients connected to the websocket server
          wss.clients.forEach((client) => {
               if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
               }
          })
     })

     //trigger this event whenever any client connected to the websocket server disconnects
     ws.on('close', () => {
          console.log(`${usersconnected} disconnected`);
          if (usersconnected > 0) usersconnected--;
          ws.send(`Welcome to the chat server. ${usersconnected} active users`)
          //send the number of active users to all the clients connected to the websocket server
     })
})
app.get("/health", (req, res) => {
     res.json({ msg: "I am Good " })
})
server.listen(port, () => {
     console.log(`Server is listening to port ${port}`)
});

