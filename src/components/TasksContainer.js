import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class TasksContainer extends Component {
    state = {
        tasks: [],
        inputValue: ''
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

    createTask = (e) => {
        e.preventDefault()
        axios.post('/tasks', {task: {title: this.state.inputValue, detail: '', done: false}})
            .then(response => {
                const tasks = update(this.state.tasks, {
                    $splice: [[0, 0, response.data]]
                })
                this.setState({
                    tasks: tasks,
                    inputValue: ''
                })
            })
            .catch(error => console.log(error))
    }

    setTaskDone = (e, id) => {
        e.preventDefault()
        axios.put(`/tasks/${id}`, {task: {done: true}})
            .then(response => {
                const taskIndex = this.state.tasks.findIndex(task => task.id === response.data.id)
                const tasks = update(this.state.tasks, {
                    [taskIndex]: {$set: response.data}
                })
                console.log(tasks)
                this.setState({
                    tasks: tasks
                })
            })
            .catch(error => console.log(error))
    }

    deleteTask = (e, id) => {
        e.preventDefault()
        axios.delete(`/tasks/${id}`)
            .then(response => {
                const taskIndex = this.state.tasks.findIndex(task => task.id === response.data.id)
                const tasks = update(this.state.tasks, {
                    $splice: [[taskIndex, 1]]
                })
                this.setState({
                    tasks: tasks
                })
            })
            .catch(error => console.log(error))
    }

    handleChange = (e) => {
        this.setState({inputValue: e.target.value})
    }

    render() {
        console.log(this.state.tasks)
        return (
            <div>
                <form className="inputContainer m-4 flex" onSubmit={this.createTask}>
                    <input type="text" className="taskInput rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="Add a new task" value={this.state.inputValue} onChange={this.handleChange}/>
                    <button type="submit" className="addTaskBtn px-8 rounded-r-lg text-indigo-500 p-4 border-indigo-500 border transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline">Add</button>
                </form>
                <div className="tasksWrapper">
                    <ul className="taskList">
                        {this.state.tasks.map( task => {
                            return(
                                <li className="task bg-white px-6 py-4 my-3 w-3/4 mx-auto shadow rounded-md flex flex-row items-center" task={task} key={task.id}>
                                    <label className="taskLabel">{task.title}</label>
                                    <button className="doneTaskBtn items-end border border-green-500 text-green-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline" onClick={(e) => this.setTaskDone(e, task.id)}>Done</button>
                                    <button className="deleteTaskBtn border border-red-500 text-red-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline" onClick={(e) => this.deleteTask(e, task.id)}>Delete</button>
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