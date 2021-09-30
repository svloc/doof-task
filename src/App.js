import React from "react";
import "./style.css";
import Home from "./Home";
import Exam from "./Exam";
import { Switch,Route,BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/exam" component={Exam} />
    </Switch>
    </BrowserRouter>
  );
}
