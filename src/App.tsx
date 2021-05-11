import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TodoList } from './Todolist';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type filterValuesType = 'all' | 'active' | 'completed';

function App() {

  //BLL:
  const [task, setTask] = useState<Array<TaskType>>(
    [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false }
    ]
  );

  const [filter, setFilter] = useState<filterValuesType>('all');

  function removeTask(taskId: string) {
    const filteredTasks = task.filter(t => t.id !== taskId)
    setTask(filteredTasks);
  }

  function addTask(title: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    const newTaskAdd = [newTask, ...task];
    setTask(newTaskAdd)
  }

  function changeFilterTodoList(value: filterValuesType) {
    setFilter(value);
  }

  function getFilterTasks() {
    switch (filter) {
      case 'active':
        return task.filter(t => t.isDone === false)
      case 'completed':
        return task.filter(t => t.isDone === true)
      default:
        return task
    }
  }

  //UI:

  return (
    <div className="App">
      <TodoList
        title='What to learn'
        tasks={getFilterTasks()}
        removeTask={removeTask}
        changeFilterTodoList={changeFilterTodoList}
        addTask = {addTask}
      />
    </div>
  );
}

export default App;
