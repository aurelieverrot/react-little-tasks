import React, { Component } from 'react'
import TasksContainer from "./components/TasksContainer";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
          <div className="header">
              <h1>Little Tasks</h1>
          </div>
          <TasksContainer />
      </div>

    );
  }
}

export default App;
