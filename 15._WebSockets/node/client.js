import WebSocket from "ws";

const webSocketClient = new WebSocket("ws://localhost:8080");

webSocketClient.on("open", () => {
  console.log("Connected to server");
  webSocketClient.send("Hello from client");
});
