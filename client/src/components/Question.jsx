function Question(props) {
  const question = props.question;
  const score = props.score;
  const answerHandler = props.handler;

  const correctAnswer = question.correct_answer;

  const handler = function (answer) {
    if(answer === correctAnswer){
      answerHandler(true);
    }
    else{
      answerHandler(false);
    }
    console.log(answer);
    console.log(correctAnswer);
  }
 

  let allAnswers = [...question.incorrect_answers, question.correct_answer];


  function shuffledAnswers(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  shuffledAnswers(allAnswers);

  return (
    <div className="questions">
      <h2>Correct answers: {score}</h2>
      <h1>{question.question}</h1>
      {allAnswers.map((item) => (
        <button className="answers" onClick={(event) => {handler(event.target.innerHTML)}}>{item}</button>
      ))}
    </div>
  );
}

export default Question;
