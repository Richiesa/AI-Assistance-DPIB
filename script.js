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

function askAI() {
  const input = document.getElementById("question");
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  const typingBubble = addTyping();

  fetch(
    "https://dpib-ai-backend.vercel.app/api/chat?message=" +
    encodeURIComponent(question)
  )
    .then(res => res.json())
    .then(data => {
      typingBubble.remove();
      addMessage(data.reply, "ai");
    })
    .catch(() => {
      typingBubble.remove();
      addMessage("Gagal menghubungi AI backend.", "ai");
    });
}
document
  .getElementById("question")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      askAI();
    }
  });
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




