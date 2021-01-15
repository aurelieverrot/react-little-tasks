import React, { Component } from 'react'
import axios from 'axios'

class TasksContainer extends Component {
    state = {
        tasks: []
    }

    getTasks() {
        axios.get('/tasks')
            .then(response => {
                this.setState({
                    tasks: response.data
                })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getTasks()
    }

    render() {
        return (
            <div>
                <div className="inputContainer">
                    <input type="text" className="taskInput" placeholder="Add a new task" maxLength="50"/>
                    <button>I need a button here</button>
                </div>
                <div className="tasksWrapper">
                    <ul className="taskList">
                        {this.state.tasks.map( task => {
                            return(
                                <li className="task" todo={task} key={task.id}>
                                    <input className="taskCheckbox" type="checkbox" />
                                    <label className="taskLabel">{task.title}</label>
                                    <button className="doneTaskBtn">x</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default TasksContainer