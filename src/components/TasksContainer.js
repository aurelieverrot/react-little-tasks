import React, { Component } from 'react'

class TasksContainer extends Component {
    render() {
        return (
            <div>
                <div className="inputContainer">
                    <input type="text" className="taskInput" placeholder="Add a new task" maxLength="50"/>
                </div>
                <div className="tasksWrapper">
                    <ul className="taskList">

                    </ul>
                </div>
            </div>
        )
    }
}

export default TasksContainer