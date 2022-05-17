import React, { useEffect, useState ,useRef} from "react";
import { Link } from "react-router-dom";
import Result from "./Result";
// import {Data} from './Data';
export default function Exam() {
  const questions = [
    {
      id: 1,
      questionText: "What is the capital of France?",
      answerOptions: [{ answerText: "New York"},{ answerText: "London"}, { answerText: "Paris"},{ answerText: "Dublin"}],
      isCorrect:'Paris'
     
    },
    {
      id: 2,
      questionText: "Who is CEO of Tesla?",
      answerOptions: [ { answerText: "Jeff Bezos"}, { answerText: "Elon Musk"},{ answerText: "Bill Gates"}, { answerText: "Tony Stark"},],
      isCorrect:'Elon Musk'
   
    },
    {
      id: 3,
      questionText: "The iPhone was created by which company?",
      answerOptions:[{ answerText: "Apple"},{ answerText: "Intel"}, { answerText: "Amazon"},{ answerText: "Microsoft"}, ],
      isCorrect:'Apple'
    },
    {
      id: 4,
      questionText: "How many Harry Potter books are there?",
      answerOptions: [ { answerText: "1"},{ answerText: "4"}, { answerText: "6"}, { answerText: "7"}],
      isCorrect:'7'
    },
  ];

  const [ans, setAns] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [submitButton, setSubmitButton] = useState(false);
  const [isActive,setIsActive]=useState(false)
  var ansArr=[];
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

  const answerButton = (a) => {
    setAns(a.target.value);
    if(ans){
      setIsActive(true);
    }
    ansArr.push(a.target.value);
    console.log(ansArr);
    console.log(a.target.value)
   };

  const onAnswerSubmit=(e)=>{
    e.preventDefault()
   

    if(questions[currentQuestion].isCorrect==ans){
      setTotalScore(totalScore+1)
     }
      else{
        setTotalScore(totalScore)
     }
    console.log('total_score',totalScore)
    
  }


  return (
    <>
     <> <div className="q-body">
            {questions.map((item) => {
              return (
                <button className={ item.id === currentQuestion + 1 ? "btn btn-black active" : "btn btn-black"}
                  key={item.id} onClick={() => navButton(item.id)}>{item.id}</button>
              );
            })}
          </div>
          <div className="exam-container">
          <form onSubmit={onAnswerSubmit}>
            <div className="row">
              <div className="questions-wraper">
                <h5> Question : {currentQuestion + 1}</h5>
                <h3 >{questions[currentQuestion].questionText}</h3>
                <ol className="options">
                  {questions[currentQuestion].answerOptions.map(
                    (item, index) => {
                      return (
                        <div className="radio-label">
                       <input  className={isActive? 'active-btn':'options-radio btn'} key={index}
                          onClick={(a)=>answerButton(a)} 
                         value={item.answerText} />
                         </div>
                      );
                    }
                  )}
                </ol> 
              </div>
            </div>
            <div className="d-flex justify-content-between">
             <button className="btn btn-green" onClick={preButton}> Previous Question </button>
              {submitButton ?(<button className="btn btn-blue" type="submit" onClick={nextButton} onSubmit={onAnswerSubmit}>Submit Exam</button>)
              : (<button className="btn btn-black" onClick={nextButton}>Next Question </button>) }
           </div>
         </form>
        </div>
        
        </>
  
    </>
  );
}
