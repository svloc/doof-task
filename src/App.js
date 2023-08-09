import React from "react";
import "./style.css";
import Login from "./Auth/Login";

import McqExam from "./Pages/McqExam";
import { Switch,Route,BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/mcq-exam" component={McqExam} />
      {/* <Route path="/result" component={McqExam} /> */}
    </Switch>
    </BrowserRouter>
  );
}
