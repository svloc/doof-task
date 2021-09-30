import React from "react";
import {Link} from "react-router-dom"
export default function Home() {
  return (
    <>
      <h1 className="heading">Welcome to Exam </h1>
      <div className="input-container">
          <h1 className="heading">LOGIN</h1>
          <input type="text" value="sachin" name="Sachin"/>
          <input type="text" value="RBT123" name="RBT123"/>
         <Link to="/exam"> <button className="button">Start Exam</button></Link>
      </div>
    </>
  );
}
