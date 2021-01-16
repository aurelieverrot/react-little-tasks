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
                    <input type="text" className="taskInput border" placeholder="Add a new task" maxLength="50"/>
                    <button className="addTaskBtn float-right border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Add</button>
                </div>
                <div className="tasksWrapper">
                    <ul className="taskList">
                        {this.state.tasks.map( task => {
                            return(
                                <li className="task bg-white px-6 py-4 my-3 w-3/4 mx-auto shadow rounded-md flex items-center" todo={task} key={task.id}>
                                    <label className="taskLabel">{task.title}</label>
                                    <button className="doneTaskBtn float-right border border-green-500 text-green-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline">Done</button>
                                    <button className="deleteTaskBtn float-right border border-red-500 text-red-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline">Delete</button>
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