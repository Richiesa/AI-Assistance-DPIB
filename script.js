const chatBox = document.getElementById("chat-box");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function askAI() {
  const input = document.getElementById("question");
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  addMessage("Mengetik...", "ai");

  fetch(
    "https://dpib-ai-backend.vercel.app/api/chat?message=" +
    encodeURIComponent(question)
  )
    .then(res => res.json())
    .then(data => {
      chatBox.lastChild.remove();
      addMessage(data.reply, "ai");
    })
    .catch(() => {
      chatBox.lastChild.remove();
      addMessage("Gagal menghubungi AI backend.", "ai");
    });
}
