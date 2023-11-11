import React, { useState } from "react";

export default function Dashboard() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const choices = ["rock", "paper", "scissors"];

  const handleChoice = (choice) => {
    // Generate a random choice for the computer
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];

    // Set choices in state
    setUserChoice(choice);
    setComputerChoice(computerChoice);

    // Determine the winner
    determineWinner(choice, computerChoice);
  };

  const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      setResult("It's a tie!");
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      setResult("You win!");
    } else {
      setResult("Computer wins!");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>"Feeling bored? <br /></h1>
      <p>Let's turn that boredom into excitement</p>
      <h2>Rock, Paper, Scissors</h2>

      <div className="btn-group">
        
        {choices.map((choice, idx) => (
          <button
            key={idx}
            className="btn btn-primary"
            onClick={() => handleChoice(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {userChoice && computerChoice && (
        <div className="mt-4">
          <p>Your choice: {userChoice}</p>
          <p>Computer's choice: {computerChoice}</p>
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
}
