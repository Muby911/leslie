// --- QUIZ DATA ---
const quizData = [
    {
        question: "Hey chicken🙃How are you feeling right now on a scale of 1 to 10?",
        options: ["10/10 Ready to conquer 💪", "Need coffee ASAP ☕", "Just chillin 😎"]
    },
    {
        question: "Do you like your present? 😁",
        options: ["yes your so cool! 🤩", "kinda", "No😑"]
    },
    {
        question: "Am i winning againts your depression? 😛",
        options: ["Yes! you are🎉", "kinda😑", "No 😔"]
    },
    {
        question: "Do you want me to be here for you forever? 🥰",
        options: ["yes i do☺️", "Maybe🙂", "Nah im good🙄"]
    },
    {
        question: "Did i make you smile 😛?",
        options: ["yes🥰", "no 😔"]
    }
];

let currentIndex = 0;
let selectedOption = null;
let userAnswers = []; // Store her chosen answers

// --- AUDIO LOGIC ---
function toggleAudio() {
    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");
    const text = document.getElementById("music-text");

    if (music.paused) {
        music.play();
        btn.classList.add("playing");
        text.innerText = "Pause Music";
    } else {
        music.pause();
        btn.classList.remove("playing");
        text.innerText = "Play Music";
    }
}

function startAudioOnFirstClick() {
    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");
    const text = document.getElementById("music-text");

    if (music.paused) {
        music.play().then(() => {
            btn.classList.add("playing");
            text.innerText = "Pause Music";
            document.removeEventListener("click", startAudioOnFirstClick);
        }).catch(() => {
            // Browser blocked autoplay; button is available
        });
    }
}

document.addEventListener("click", startAudioOnFirstClick);

// --- QUIZ LOGIC ---
function loadQuestion() {
    const currentQuiz = quizData[currentIndex];

    document.getElementById("question-count").innerText = `Question ${currentIndex + 1} of ${quizData.length}`;
    document.getElementById("question-text").innerText = currentQuiz.question;

    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");

    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";
    selectedOption = null;

    currentQuiz.options.forEach(optionText => {
        const btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.innerText = optionText;

        btn.onclick = () => {
            document.querySelectorAll(".opt-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedOption = optionText;
            nextBtn.style.display = "block";
        };

        optionsContainer.appendChild(btn);
    });
}

function handleNext() {
    // Save chosen answer
    if (selectedOption) {
        userAnswers.push({
            question: quizData[currentIndex].question,
            answer: selectedOption
        });
    }

    currentIndex++;

    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalScreen();
    }
}

function showFinalScreen() {
    document.getElementById("question-count").style.display = "none";
    document.getElementById("question-text").innerHTML = "🎉 Quiz Complete! 🎉";

    // Build the answers summary
    let summaryHTML = `
        <div style="text-align: left; background: #f7fafc; padding: 15px; border-radius: 16px; margin-bottom: 20px; max-height: 200px; overflow-y: auto; border: 1px solid #edf2f7;">
            <h3 style="font-size: 1rem; color: #2d3748; margin-bottom: 10px; text-align: center;">Your Answers 📝</h3>
    `;

    userAnswers.forEach((item, index) => {
        summaryHTML += `
            <div style="margin-bottom: 10px; font-size: 0.88rem;">
                <strong style="color: #6c5ce7;">Q${index + 1}:</strong> ${item.question}<br>
                <span style="color: #2d3748; font-weight: 600;">👉 ${item.answer}</span>
            </div>
        `;
    });

    summaryHTML += `</div>`;

    // Heartfelt love message & compliments
    summaryHTML += `
        <div style="margin-top: 15px;">
            <p style="font-size: 1.1rem; color: #d63384; font-weight: 700; line-height: 1.5; margin-bottom: 10px;">
                You are absolutely beautiful, stunning, and amazing in every single way! ✨💖
            </p>
            <p style="font-size: 1.05rem; color: #4a5568; font-weight: 600; line-height: 1.5;">
                I love you so much! Thank you for taking this quiz! 🥰👑
            </p>
        </div>
    `;

    document.getElementById("options-container").innerHTML = summaryHTML;

    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerText = "Play Again 🔄";
    nextBtn.onclick = () => {
        currentIndex = 0;
        userAnswers = [];
        document.getElementById("question-count").style.display = "inline-block";
        nextBtn.innerText = "Next ➡️";
        nextBtn.onclick = handleNext;
        loadQuestion();
    };
}

// Start quiz on load
loadQuestion();