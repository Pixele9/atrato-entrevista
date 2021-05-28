import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Collections from "./screens/Collections";
import Todo from "./screens/Todo";
import Home from "./screens/Home";

export default function App() {
  return (
    <Router>
      <div className="">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/collections" component={Collections} />
          <Route exact path="/:name/:id" component={Todo} />
        </Switch>
      </div>
    </Router>
  );
}
