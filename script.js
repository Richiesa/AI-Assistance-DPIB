const chatBox = document.getElementById("chat-box");
const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addTyping() {
  const typing = document.createElement("div");
  typing.className = "message ai typing";
  typing.innerHTML = `
    <span></span><span></span><span></span>
  `;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typing;
}

async function askAI() {
  const input = document.getElementById("question");
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  addMessage("Sedang mengetik...", "ai", true);

  try {
    const response = await fetch(
      "https://dpib-ai-backend.vercel.app/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      }
    );

    const data = await response.json();
    removeTyping();
    addMessage(data.answer, "ai");
  } catch (error) {
    removeTyping();
    addMessage("Gagal menghubungi AI backend.", "ai");
  }
}

const textarea = document.getElementById("question");

textarea.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    askAI();
  }
});
textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});
function sendSuggestion(text) {
  document.getElementById("question").value = text;
  askAI();
}
window.onload = function () {
  addMessage(
    "Halo, selamat datang.\nSaya adalah asisten AI jurusan DPIB.\nSilakan bertanya seputar struktur bangunan, RAB, gambar kerja, atau proses konstruksi.",
    "ai"
  );
};

