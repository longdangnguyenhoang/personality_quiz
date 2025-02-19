const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const nextButton = document.getElementById('next');

let currentQuestionIndex = 0;
let totalScore = 0;
let selectedAnswer = null;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const answers = currentQuestion.answers.map((answer, index) => `
    <div class="answer" data-score="${answer.score}">${answer.text}</div>
  `).join('');

  quizContainer.innerHTML = `
    <div class="question">${currentQuestion.question}</div>
    <div class="answers">${answers}</div>
  `;

  // Disable nút "Câu Tiếp Theo" cho đến khi người dùng chọn đáp án
  nextButton.disabled = true;

  // Thêm sự kiện click cho các đáp án
  const answerElements = quizContainer.querySelectorAll('.answer');
  answerElements.forEach(answer => {
    answer.addEventListener('click', () => {
      // Xóa lớp selected từ tất cả các đáp án
      answerElements.forEach(a => a.classList.remove('selected'));
      // Thêm lớp selected cho đáp án được chọn
      answer.classList.add('selected');
      // Lưu đáp án được chọn
      selectedAnswer = answer;
      // Kích hoạt nút "Câu Tiếp Theo"
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
  // Lấy điểm từ đáp án được chọn
  if (selectedAnswer) {
    totalScore += parseInt(selectedAnswer.dataset.score);
  }

  // Chuyển sang câu hỏi tiếp theo
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    selectedAnswer = null; // Đặt lại đáp án được chọn
  } else {
    // Nếu đã hết câu hỏi, hiển thị kết quả
    quizContainer.innerHTML = '';
    nextButton.style.display = 'none';
    showResults();
  }
});

// Bắt đầu quiz
showQuestion();