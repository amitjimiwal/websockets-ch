import WebSocket, { WebSocketServer } from "ws";
import http from 'http';
import express from "express";
const app = express();
const port = 3000;
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
// const users: { [key: string]: number } = {};
let usersconnected = 0;
wss.on('connection', function (ws, req) {
     usersconnected++;
     console.log(`${usersconnected} connected`);
     ws.send(`${usersconnected} active users`)
     ws.on('message', (message) => {
          console.log(`Recieved from user ${message}`);
          wss.clients.forEach((client) => {
               if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
               }
          })
     })
     ws.on('close', () => {
          console.log(`${usersconnected} disconnected`);
          if (usersconnected > 0) usersconnected--;
          ws.send(`${usersconnected} active users`)
     })
})
app.get("/health", (req, res) => {
     res.json({ msg: "I am healthy" })
})
server.listen(port, () => {
     console.log(`Server is listening to port ${port}`)
});

