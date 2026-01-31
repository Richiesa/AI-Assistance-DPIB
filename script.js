const chatBox = document.getElementById("chat-box");
const input = document.getElementById("question");

/* =========================
   TAMBAH PESAN CHAT
========================= */
function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = sender === "user" ? "chat user" : "chat ai";
  bubble.innerText = text;

  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* =========================
   BUBBLE TYPING AI
========================= */
function addTyping() {
  const bubble = document.createElement("div");
  bubble.className = "chat ai typing";
  bubble.innerText = "AI sedang mengetik...";

  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  return bubble;
}

/* =========================
   KIRIM PERTANYAAN KE AI
========================= */
function askAI() {
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  const typingBubble = addTyping();

  fetch("https://dpib-ai-backend.vercel.app/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  })
    .then(res => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then(data => {
      typingBubble.remove();
      addMessage(data.answer || "AI tidak memberi jawaban.", "ai");
    })
    .catch(() => {
      typingBubble.remove();
      addMessage("Gagal menghubungi AI backend.", "ai")
