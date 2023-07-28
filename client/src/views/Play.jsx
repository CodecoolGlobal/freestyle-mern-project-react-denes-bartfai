import React, { useState, useEffect } from 'react';
import Question from "../components/Question";
import { decode } from 'html-entities';
import { useNavigate } from 'react-router-dom';

function Play(props) {
  const user = props.user;

  
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
  const [points, setPoints] = useState(0);
  const [finishedGame, setFinish] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/api/findUser/${user.username}`)
      .then((res) => res.json())
      .then((response) => {
        if (response[0]) {
          setUserData(response[1]);
        }
      });
  }, []);

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
 

  const handleAnswer = function (answer) {
    let increment = 0;

    if (difficulty === 'medium') {
      increment = 3;
    } else if (difficulty === 'hard') {
      increment = 5;
    } else {
      increment = 1;
    }

    if (currentQuestion === 9) {
      setFinish(true);
      if (answer) {
        setPlayerScore(playerScore + 1)
        setPoints(points + increment)
      }
    } else if (answer) {
      setPlayerScore(playerScore + 1);
      setCurrentQuestion(currentQuestion + 1);
      setPoints(points + increment)
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };



  let navigate = useNavigate();

  const submitScore = async () => {
    try{
      const response = await fetch(`http://127.0.0.1:3001/api/playerScore/${userData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            playerScore:[
              {score: points},
            ]
          }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate('/');
    } catch(e) {
      console.log(e);
    }
  }
  

  return (
    <div>
      {finishedGame ? (
        <div className="score">
          <h2>You got {playerScore} out of 10 right</h2>
          <h2>Your score is: {points}</h2>
          <button onClick={submitScore}>Submit</button>
          </div>
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
