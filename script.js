// --- QUIZ DATA ---
// Add or edit your questions, options, and responses here!
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
// Guarantees audio starts automatically on her very first tap/click anywhere
const music = document.getElementById("bg-music");

function startAudio() {
    if (music) {
        music.play().then(() => {
            // Once music starts playing, remove the click listener
            document.removeEventListener("click", startAudio);
        }).catch(error => {
            console.log("Waiting for interaction to play audio...");
        });
    }
}

// Listen for the first touch or click on the screen to start music
document.addEventListener("click", startAudio);


// --- QUIZ LOGIC ---
function loadQuestion() {
    const currentQuiz = quizData[currentIndex];

    // Update badge and question text
    document.getElementById("question-count").innerText = `Question ${currentIndex + 1} of ${quizData.length}`;
    document.getElementById("question-text").innerText = currentQuiz.question;

    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");

    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none"; // Hide 'Next' button until an option is picked
    selectedOption = null;

    // Create option buttons dynamically
    currentQuiz.options.forEach(optionText => {
        const btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.innerText = optionText;

        btn.onclick = () => {
            // Remove 'selected' class from all other option buttons
            document.querySelectorAll(".opt-btn").forEach(b => b.classList.remove("selected"));

            // Highlight the clicked option
            btn.classList.add("selected");
            selectedOption = optionText;

            // Show the Next button
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
    // Hide question count badge
    document.getElementById("question-count").style.display = "none";

    // Set big final title
    document.getElementById("question-text").innerHTML = "🎉 YAY! 🎉";

    // Set sweet ending message
    document.getElementById("options-container").innerHTML = `
        <p style="font-size: 1.1rem; color: #555; line-height: 1.6;">
            You completed the quiz! You are super awesome and hope this brought a huge smile to your face today! ✨💖
        </p>
    `;

    // Change 'Next' button to a 'Restart' button
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