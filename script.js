// Initial setup for dice values and game state
let dice = [0, 0, 0, 0, 0];  // Array to store dice values
let heldDice = [false, false, false, false, false];  // Tracks held dice
let score = 0;  // Total score for the game

// Function to roll dice
function rollDice() {
    for (let i = 0; i < dice.length; i++) {
        if (!heldDice[i]) {  // Only roll dice that aren't held
            dice[i] = Math.floor(Math.random() * 6) + 1;
            document.getElementById(`die${i + 1}`).textContent = dice[i];
        }
    }
    console.log("Rolled Dice:", dice);  // Debugging line to confirm dice values

    // Call updateScore right after rolling to check scores
    updateScore();
}

// Function to toggle holding dice
function toggleHold(index) {
    heldDice[index] = !heldDice[index];
    document.getElementById(`die${index + 1}`).classList.toggle("held");
}

// Event listener for "Roll Dice" button
document.getElementById("roll-button").addEventListener("click", rollDice);

// Add click events to each die for holding/unholding
for (let i = 0; i < dice.length; i++) {
    document.getElementById(`die${i + 1}`).addEventListener("click", () => toggleHold(i));
}

// Function to calculate occurrences of each dice value
function calculateCounts() {
    let counts = {};
    dice.forEach((value) => {
        counts[value] = (counts[value] || 0) + 1;
    });
    console.log("Dice Counts:", counts);  // Debugging line to check counts
    return counts;
}

// Update all scores for each category
function updateScore() {
    console.log("Updating scores...");  // Debugging line
    const counts = calculateCounts();
    resetScores();
    
    // Calculate and display each score category
    calculateThreeOfAKind(counts);
    calculateFourOfAKind(counts);
    calculateFullHouse(counts);
    calculateSmallStraight();
    calculateLargeStraight();
    calculateYatzy(counts);
    calculateChance();

    // Update total score
    calculateTotalScore();
}

// Function to reset score for each category to zero before each turn
function resetScores() {
    console.log("Resetting scores...");  // Debugging line
    document.getElementById("three-kind-score").textContent = 0;
    document.getElementById("four-kind-score").textContent = 0;
    document.getElementById("full-house-score").textContent = 0;
    document.getElementById("small-straight-score").textContent = 0;
    document.getElementById("large-straight-score").textContent = 0;
    document.getElementById("yatzy-score").textContent = 0;
    document.getElementById("chance-score").textContent = 0;
    document.getElementById("total-score").textContent = 0;
}

// Calculate and display Three of a Kind score
function calculateThreeOfAKind(counts) {
    for (let value in counts) {
        if (counts[value] >= 3) {
            const threeKindScore = dice.reduce((acc, val) => acc + val, 0);
            console.log("Three of a Kind Score:", threeKindScore);
            document.getElementById("three-kind-score").textContent = threeKindScore;
            return;  // Exit after setting the score
        }
    }
}

// Calculate and display Four of a Kind score
function calculateFourOfAKind(counts) {
    for (let value in counts) {
        if (counts[value] >= 4) {
            const fourKindScore = dice.reduce((acc, val) => acc + val, 0);
            console.log("Four of a Kind Score:", fourKindScore);
            document.getElementById("four-kind-score").textContent = fourKindScore;
            return;  // Exit after setting the score
        }
    }
}

// Calculate and display Full House score
function calculateFullHouse(counts) {
    const values = Object.values(counts);
    if (values.includes(3) && values.includes(2)) {
        console.log("Full House Score: 25");
        document.getElementById("full-house-score").textContent = 25;
    }
}

// Calculate and display Small Straight score
function calculateSmallStraight() {
    const uniqueSortedDice = Array.from(new Set(dice)).sort();
    const smallStraightPattern = [1, 2, 3, 4, 5];

    if (smallStraightPattern.every(num => uniqueSortedDice.includes(num))) {
        console.log("Small Straight Score: 30");
        document.getElementById("small-straight-score").textContent = 30;
    }
}

// Calculate and display Large Straight score
function calculateLargeStraight() {
    const uniqueSortedDice = Array.from(new Set(dice)).sort();
    const largeStraightPattern = [2, 3, 4, 5, 6];

    if (largeStraightPattern.every(num => uniqueSortedDice.includes(num))) {
        console.log("Large Straight Score: 40");
        document.getElementById("large-straight-score").textContent = 40;
    }
}

// Calculate and display Yatzy score
function calculateYatzy(counts) {
    for (let value in counts) {
        if (counts[value] === 5) {
            console.log("Yatzy Score: 50");
            document.getElementById("yatzy-score").textContent = 50;
            return;  // Exit after setting the score
        }
    }
}

// Calculate and display Chance score
function calculateChance() {
    const chanceScore = dice.reduce((acc, val) => acc + val, 0);
    console.log("Chance Score:", chanceScore);
    document.getElementById("chance-score").textContent = chanceScore;
}

// Calculate and display the total score based on all category scores
function calculateTotalScore() {
    const categories = [
        "three-kind-score",
        "four-kind-score",
        "full-house-score",
        "small-straight-score",
        "large-straight-score",
        "yatzy-score",
        "chance-score"
    ];

    score = categories.reduce((total, category) => {
        return total + parseInt(document.getElementById(category).textContent);
    }, 0);

    console.log("Total Score:", score);
    document.getElementById("total-score").textContent = score;
}

// Event listener for "End Turn" button
document.getElementById("end-turn-button").addEventListener("click", updateScore);
