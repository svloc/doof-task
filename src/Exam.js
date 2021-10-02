import React, { useEffect, useState ,useRef} from "react";
import { Link } from "react-router-dom";
import Result from "./Result";
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
  const [name, setName] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [submitButton, setSubmitButton] = useState(false);
  const inputRef = useRef();
  const nextButton = () => {
    
    const nextQuestion = currentQuestion + 1;
    if (questions.length - 1 == nextQuestion) {
      setSubmitButton(true);
    }
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert("are you want to submit");
      setShowScore(true);
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

  const answerButton = (mark) => {
    if (mark) {
      setTotalScore(totalScore + 1);
    }
  };
  console.log(totalScore);
console.log("inputRef",inputRef)
  return (
    <>
      {showScore ? (
        <Result totalScore={totalScore} questions={questions} />
      ) : (
        <>
          <div className="q-body">
            {questions.map((item) => {
              return (
                <button
                  className={
                    item.id === currentQuestion + 1
                      ? " button active"
                      : "button"
                  }
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
                <h1 className="q-heading"> Question : {currentQuestion + 1}</h1>
                <h5 className="question">
                  {questions[currentQuestion].questionText}
                </h5>
                <ol className="options">
                  {questions[currentQuestion].answerOptions.map(
                    (item, index) => {
                      return (
                        <div className="radio-label">
                          <input
                            type="radio"
                            name="ans"
                            id="ans"
                           className="options-radio"
                           ref={inputRef} 
                            key={index}
                            onChange={() => answerButton(item.isCorrect)}
                          />
                          <label className="options-label" htmlFor="ans">
                            {item.answerText}
                          </label>
                        </div>
                      );
                    }
                  )}
                </ol>
              </div>
            </div>

            <button className="button btn-1" onClick={preButton}>
              Previous Question
            </button>
            {submitButton ? (
              <button className="button btn-2 btn-3" onClick={nextButton}>
                Submit Exam
              </button>
            ) : (
              <button className="button btn-2" onClick={nextButton}>
                Next Question
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
