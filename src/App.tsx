import React, { useState } from 'react';
import './App.css';
import { TodoList } from './Todolist';


export type TaskType = {
  id: number
  title: string
  isDone: boolean
}
export type filterValuesType = 'all' | 'active' | 'completed';

function App() {

  //BLL:
  const [task, setTask] = useState<Array<TaskType>>(
    [
      { id: 1, title: 'HTML&CSS', isDone: true },
      { id: 2, title: 'JS', isDone: true },
      { id: 3, title: 'React', isDone: false },
      { id: 4, title: 'Redux', isDone: false }
    ]
  )

  function removeTask(taskId: number) {
    const filteredTasks = task.filter(t => t.id !== taskId)
    setTask(filteredTasks);
  }
  const [filter, setFilter] = useState<filterValuesType>('all');

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
        changeFilterTodoList ={changeFilterTodoList }
      />
    </div>
  );
}

export default App;
