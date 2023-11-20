import React , { useState } from 'react';
import { fetchQuizQuestion  } from './API';

//Components
import QuestionCard from './components/QuestionCard';

//Types
import { QuestionState,Difficulty } from './API';

export type AnswerObject = {
  question : string;
  answer : string;
  correct : boolean;
  correctAnswer : string;
}

const TOTAL_QUESTIONS = 10;

// console.log(fetchQuizQuestion(TOTAL_QUESTIONS,Difficulty.HARD))
const App = () => {
  const [loading , setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(questions);
  // console.log(loading);
  // console.log(userAnswers.length)
 

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestion(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  // console.log(questions)


  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => { 
    if(!gameOver) {
      //Users answer
      const answer = e.currentTarget.value;

      //Check answer against correct answer
      const correct = questions[number].correct_answer === answer;

      //Add score if answer is correct
      if(correct) setScore(prev => prev + 1);

      //save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer, //answer : answer 
        correct,  //correct : correct
        correctAnswer : questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  // console.log(userAnswers)

  // console.log(userAnswers);

  const nextQuestion = () => {
    //Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
      // console.log(nextQuestion);
      // console.log(number)
    }

  }

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startTrivia}>
        Start
        </button>
      ) : null}
      {!gameOver ?  <p className='score'>Score: {score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && ( 
        <QuestionCard  
          questionNr={number + 1} 
          totalQuestion={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>Next Question</button>
      ) : null}
      
    </div>
  );
}

export default App;
