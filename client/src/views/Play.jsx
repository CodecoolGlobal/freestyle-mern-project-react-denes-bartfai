import React, { useState } from "react";
import Question from "../components/Question"

function Play() {
  const [difficulty, setDifficulty] = useState("easy");
  const [pickedDiff, setPick] = useState(false);

  const difficultyPicked = async function (diff) {
    setDifficulty(diff);
    setPick(true);
  };

  return (
    <div>
      {pickedDiff ? (
        <Question />
      ) : (
        <div>
          <h1>Pick a difficulty</h1>
          <button
            value="easy"
            onClick={(e) => {
              difficultyPicked("easy");
            }}
          >
            Easy
          </button>
          <button
            value="medium"
            onClick={(e) => {
              difficultyPicked("medium");
            }}
          >
            Medium
          </button>
          <button
            value="hard"
            onClick={(e) => {
              difficultyPicked("hard");
            }}
          >
            Hard
          </button>
        </div>
      )}
    </div>
  );
}

export default Play;
