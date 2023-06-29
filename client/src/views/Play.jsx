import React, { useState } from "react";
import Question from "../components/Question";
import { decode } from 'html-entities';

function Play() {
  const [difficulty, setDifficulty] = useState("easy");
  const [pickedDiff, setPick] = useState(false);
  let [questions, setQuestions] = useState([
    {
      question: "sample",
      correct_answer: "sample",
      incorrect_answers: ["test", "test", "test"],
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [finishedGame, setFinish] = useState(false);

  const difficultyPicked = async function (diff) {
    setDifficulty(diff);
    setPick(true);
    fetch(
      `https://opentdb.com/api.php?amount=10&difficulty=${diff}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data["results"]);
      }
    )
  };

  questions = questions.map((question) => {
    const decodedQuestion = {
        ...question,
        question: decode(question.question),
        correct_answer: decode(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map((answer) =>
          decode(answer)
        ),
    };
        return decodedQuestion;
  });    
 //console.log(questions);

  const handleAnswer = function (answer) {
    if (currentQuestion === 9) {
      setFinish(true);
      if (answer) {
        setPlayerScore(playerScore + 1);
      }
    } else if (answer) {
      setPlayerScore(playerScore + 1);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div>
      {finishedGame ? (
        <div className="score">You got {playerScore} out of 10 right</div>
      ) : pickedDiff ? (
        <Question
          question={questions[currentQuestion]}
          handler={handleAnswer}
          score={playerScore}
        />
      ) : (
        <div className="difficulty">
          <h1>Choose your difficulty level</h1>
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
