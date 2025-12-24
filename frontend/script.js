
async function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value;
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();
  addMessage(data.reply, "bot");
}

function addMessage(text, type) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
