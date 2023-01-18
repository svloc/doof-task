import React, { useState } from 'react';
import "./McqExam.css";
import questionsData from './Data';

export default function McqExam(){
    const [currentQuestion, setCurrentQuestion] = useState(0);
    let score=0;
    const [questions] = useState(questionsData);
    
    const [selectedOption, setSelectedOption] = useState(new Array(questions.length).fill(""));

    const handleOptionChange = (e) => {
        let options = [...selectedOption];
        options[currentQuestion] = e.target.value;
        setSelectedOption(options);
    }

    const handlePrevClick = () => {
        setCurrentQuestion(currentQuestion - 1);
    }

    const handleNextClick = () => {
        if(currentQuestion===questions.length-1)
        return;
        setCurrentQuestion(currentQuestion + 1);
    }

    const handleSubmit = () => {
        let cout=0;
        for(let i=0;i<questions.length;i++){
            if(questions[i].answer===selectedOption[i])
            cout++;
        }
        score=cout;
        alert("success");
        console.log(score);
    }
    const navButton = (key) => {
        setCurrentQuestion(key - 1);
    };
    return (
        <div className='main'>
            <div className="q-body">
            <div>
                {questions.map((item) => (
                 <button  className={`btn btn-black  mr-1 ${item.id === currentQuestion + 1 && " active"}`}
                  key={item.id} onClick={() => navButton(item.id)}>{item.id}</button>
                ))}
            </div>    
            <button className='btn btn-blue' onClick={handleSubmit}>Submit</button>
            </div>
            
            <div className="exam-container">
            <div className="row">
                <div className="questions-wraper">
                    <h5> Question : {currentQuestion + 1}</h5>
                    <h3>{questions[currentQuestion].question}</h3>
                    <ol className="options">
                    {questions[currentQuestion].options.map((option, index) => (
                     <div className="radio-label" key={index}>
                        <input type='radio' id={`custom-checkbox-${index}`} className='options-radio btn' value={option} checked={selectedOption[currentQuestion] === option} onChange={handleOptionChange}/>
                        <label className="cursor-pointer" htmlFor={`custom-checkbox-${index}`}>{option}</label>
                     </div>
                    ))}
                    </ol>
                </div>
            </div>

            <div className="d-flex justify-content-between">
            <button className="btn btn-green" onClick={handlePrevClick} disabled={currentQuestion === 0}>Previous</button>
            <button className="btn btn-black" onClick={handleNextClick} disabled={currentQuestion===questions.length-1}>Next</button>
            </div>

            </div>
        </div>
    );
};
