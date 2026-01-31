const chatBox = document.getElementById("chat-box");
const input = document.getElementById("question");
const form = document.getElementById("chat-form");

/* =========================
   TAMBAH PESAN
========================= */
function addMessage(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = sender === "user" ? "chat user" : "chat ai";
  bubble.innerText = text;

  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* =========================
   TYPING AI
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
   KIRIM KE AI
========================= */
function sendToAI(question) {
  const typingBubble = addTyping();

  fetch("https://dpib-ai-backend.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText }),
  })
    .then(res => res.json())
    .then(data => {
      typingBubble.remove();
      addMessage(data.answer || "AI tidak memberi jawaban.", "ai");
    })
    .catch(() => {
      typingBubble.remove();
      addMessage("Gagal menghubungi AI backend.", "ai");
    });
}

/* =========================
          FORM SUBMIT 
========================= */
form.addEventListener("submit", function (e) {
  e.preventDefault(); //

  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  sendToAI(question);
});

/* =========================
   SAPAAN AWAL
========================= */
window.onload = function () {
  addMessage(
    "Halo 👋 Saya AI Asisten DPIB. Silakan tanyakan seputar konstruksi, RAB, gambar kerja, dan rendering.",
    "ai"
  );
};

