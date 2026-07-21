// --- QUIZ DATA ---
const quizData = [
    {
        question: "How are you feeling right now on a scale of 1 to 10?",
        options: ["10/10 Ready to conquer 💪", "Need coffee ASAP ☕", "Just chillin 😎"]
    },
    {
        question: "Pick the ultimate snack for today:",
        options: ["Warm Cookies 🍪", "Ice Cream 🍦", "Chips & Dip 🥨"]
    },
    {
        question: "What is the official plan if you get tired today?",
        options: ["Take a cozy 20-min nap 😴", "Listen to good music 🎧", "Power through like a champ 💥"]
    },
    {
        question: "If we could teleport anywhere right now, where are we going?",
        options: ["The beach 🏖️", "A cute cozy café ☕", "An amusement park 🎢"]
    },
    {
        question: "Quick! What's the vibe for tonight?",
        options: ["Movie Marathon 🍿", "Late night snack run 🍫", "Early bedtime 🛌"]
    }
];

let currentIndex = 0;
let selectedOption = null;

// --- AUDIO LOGIC ---
function toggleAudio() {
    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");

    if (music.paused) {
        music.play();
        btn.innerText = "⏸️ Pause Music";
    } else {
        music.pause();
        btn.innerText = "🎵 Play Music";
    }
}

// Automatically start audio on first interaction if possible
function startAudioOnFirstClick() {
    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");

    if (music.paused) {
        music.play().then(() => {
            btn.innerText = "⏸️ Pause Music";
            document.removeEventListener("click", startAudioOnFirstClick);
        }).catch(() => {
            // Browser blocked autoplay; user can still use the button
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
    currentIndex++;

    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalScreen();
    }
}

function showFinalScreen() {
    document.getElementById("question-count").style.display = "none";
    document.getElementById("question-text").innerHTML = "🎉 YAY! 🎉";

    document.getElementById("options-container").innerHTML = `
        <p style="font-size: 1.05rem; color: #4b5563; line-height: 1.6; margin: 10px 0;">
            You completed the quiz! You are super awesome and hope this brought a huge smile to your face today! ✨💖
        </p>
    `;

    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerText = "Restart 🔄";
    nextBtn.onclick = () => {
        currentIndex = 0;
        document.getElementById("question-count").style.display = "inline-block";
        nextBtn.innerText = "Next ➡️";
        nextBtn.onclick = handleNext;
        loadQuestion();
    };
}

// Start quiz on load
loadQuestion();