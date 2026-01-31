const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addBubble(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = sender === "user" ? "bubble user" : "bubble ai";
  bubble.textContent = text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addTyping() {
  const typing = document.createElement("div");
  typing.className = "bubble ai";
  typing.id = "typing";
  typing.textContent = "AI sedang mengetik...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  // ⬇️ INI YANG SEBELUMNYA TIDAK ADA
  addBubble(message, "user");
  input.value = "";

  addTyping();

  try {
    const response = await fetch(
      "https://dpib-ai-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      }
    );

    const data = await response.json();
    removeTyping();

    addBubble(
      data.reply || "AI tidak dapat memberikan jawaban.",
      "ai"
    );
  } catch (error) {
    removeTyping();
    addBubble("Gagal menghubungi AI backend.", "ai");
  }
}
