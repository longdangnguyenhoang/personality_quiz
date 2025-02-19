const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let totalScore = 0;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const answers = currentQuestion.answers.map((answer, index) => `
    <label class="answer">
      <input type="radio" name="question" value="${answer.score}">
      ${answer.text}
    </label>
  `).join('');

  quizContainer.innerHTML = `
    <div class="question">${currentQuestion.question}</div>
    <div class="answers">${answers}</div>
  `;

  // Disable nút "Câu Tiếp Theo" cho đến khi người dùng chọn đáp án
  nextButton.disabled = true;

  // Bật nút "Câu Tiếp Theo" khi người dùng chọn đáp án
  const answerInputs = quizContainer.querySelectorAll('input[name="question"]');
  answerInputs.forEach(input => {
    input.addEventListener('change', () => {
      nextButton.disabled = false;
    });
  });
}

function showResults() {
  let resultText = "";
  if (totalScore <= 4) {
    resultText = "Bạn là người hướng nội và thích sự yên tĩnh! 💕";
  } else if (totalScore <= 8) {
    resultText = "Bạn là người cân bằng giữa cảm xúc và lý trí! 🌸";
  } else {
    resultText = "Bạn là người hướng ngoại và thích phiêu lưu! 💖";
  }
  resultContainer.innerHTML = resultText;
}

nextButton.addEventListener('click', () => {
  // Lấy đáp án được chọn
  const selectedAnswer = quizContainer.querySelector('input[name="question"]:checked');
  if (selectedAnswer) {
    totalScore += parseInt(selectedAnswer.value);
  }

  // Chuyển sang câu hỏi tiếp theo
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    // Nếu đã hết câu hỏi, hiển thị kết quả
    quizContainer.innerHTML = '';
    nextButton.style.display = 'none';
    showResults();
  }
});

// Bắt đầu quiz
showQuestion();