import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Todo from "./screens/Todo";
import Home from "./screens/Home";

export default function App() {
  return (
    <Router>
      <div className="">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/todos" component={Todo} />
        </Switch>
      </div>
    </Router>
  );
}
