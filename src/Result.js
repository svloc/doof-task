import React from "react";
import { Link } from "react-router-dom";
export default function Result(props) {
  return (
    <>
      <div className="result-container">
        <h1>
          You scored <span>{props.totalScore}</span> out of {props.questions.length}
        </h1>
        <Link to="/"><button className="button btn-3">Back to Home</button></Link>
      </div>
    </>
  );
}
