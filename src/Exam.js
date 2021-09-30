import React, { useEffect, useState } from "react";

// import {Data} from './Data';
export default function Exam() {
  const questions = [
    {
      id: 1,
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      id: 2,
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      id: 3,
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      id: 4,
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const nextButton = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert("are you want to submit");
      setShowScore(true)
    }
  };
  const preButton = () => {
    const preQuestion = currentQuestion - 1;
    if (preQuestion !== -1) {
      setCurrentQuestion(preQuestion);
    } else {
      alert("this is first question");
    }
  };

  const navButton = (key) => {
    setCurrentQuestion(key - 1);
  };
 
  const answerButton=(mark)=>{
   if(mark)
   {
     setTotalScore(totalScore+1);
   }
  }
  console.log(totalScore);
 
  return (
    <>{showScore? (<div>You scored {totalScore} out of {questions.length}</div>):
        (
        <><div className="q-body">
            {questions.map((item) => {
              return (
                <button
                  className="button"
                  key={item.id}
                  onClick={() => navButton(item.id)}
                >
                  {item.id}
                </button>
              );
            })}
          </div>
          <div className="exam-container">
          <div className="row">
          <div className="questions-wraper">
            <h1 className="q-heading">{currentQuestion + 1}</h1>
            <h5 className="question">
              {questions[currentQuestion].questionText}
            </h5>
            <ol className="options">
              {questions[currentQuestion].answerOptions.map((item,index) => {
                return (
                  <>
                    <button className="options-li" key={index} onClick={()=>answerButton(item.isCorrect)}>{item.answerText}</button>
                  </>
                );
              })}
            </ol>
          </div>
        </div>

        <button className="button btn-1" onClick={preButton}>
          Pre Q
        </button>

        <button className="button btn-2" onClick={nextButton}>
          NextQuestion
        </button>
      </div></>
        )}
    </>
  );
}
