const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const questionInput = document.getElementById("question");

function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${sender}`;
  bubble.innerText = text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addTyping() {
  const typing = document.createElement("div");
  typing.className = "bubble ai typing";
  typing.innerText = "AI sedang mengetik...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typing;
}

async function sendToAI(userText) {
  const typingBubble = addTyping();

  try {
    const res = await fetch(
      "https://dpib-ai-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      }
    );

    const data = await res.json();
    typingBubble.remove();
    addMessage(data.reply, "ai");
  } catch (error) {
    typingBubble.remove();
    addMessage("Gagal menghubungi AI backend.", "ai");
  }
}

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userText = questionInput.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  questionInput.value = "";

  sendToAI(userText);
});
