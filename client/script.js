const socket = new WebSocket("ws://localhost:3000");
const p = document.querySelector("p");
const msgs = document.getElementById("messages");

function sendmessage() {
  socket.send(document.getElementById("message").value);
}
socket.onopen = () => {
  document.querySelector('button').disabled=false;
  p.innerHTML = "Hurray!, You are connected to the world chat";
};
socket.onerror = (error) => {
  console.log("Error: " + error);
};
socket.onmessage = async function message(message) {
  //   alert(`You send ${message}`);
  const div = document.createElement("div");
  div.innerHTML = await message.data.text();
  msgs.appendChild(div);
//   console.log(awmessage.data.text());
};
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  sendmessage();
});
