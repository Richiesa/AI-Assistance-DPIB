function askAI() {
  const question = document.getElementById("question").value;
  const answerBox = document.getElementById("answer");

  if (!question) {
    answerBox.innerText = "Silakan masukkan pertanyaan.";
    return;
  }

  answerBox.innerText = "Sedang memproses pertanyaan...";

  fetch(
    "https://dpib-ai-backend.vercel.app/api/chat?message=" +
    encodeURIComponent(question)
  )
    .then(response => {
      if (!response.ok) {
        throw new Error("Response error");
      }
      return response.json();
    })
    .then(data => {
      console.log("Respon AI:", data); // DEBUG
      answerBox.innerText = data.reply || "AI tidak memberikan jawaban.";
    })
    .catch(error => {
      console.error(error);
      answerBox.innerText = "Gagal menghubungi AI backend.";
    });
}
