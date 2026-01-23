function askAI() {
  const q = document.getElementById("question").value;

  fetch(
    "https://dpib-ai-backend.vercel.app/api/chat?message=" +
    encodeURIComponent(q)
  )
    .then(res => res.json())
    .then(data => {
      document.getElementById("answer").innerText = data.reply;
    });
}
