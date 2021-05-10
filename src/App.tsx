import React from 'react';
import './App.css';
import { TodoList } from './Todolist';


export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {

  //BLL:

  const TasksToLearn: Array<TaskType> = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: false },
    { id: 3, title: 'React', isDone: false }
  ]
  const TasksToBuy: Array<TaskType> = [
    { id: 1, title: 'Bear', isDone: true },
    { id: 2, title: 'Snacks', isDone: true },
    { id: 3, title: 'Vodka', isDone: false }
  ]
  const TasksToRead: Array<TaskType> = [
    { id: 1, title: 'Type Script', isDone: false },
    { id: 2, title: 'Refactoring', isDone: false },
    { id: 3, title: 'JavaScript for Kids', isDone: true }
  ]

  //UI:

  return (
    <div className="App">
      <TodoList title='What to learn' tasks={TasksToLearn}/>

      <TodoList title='What to buy' tasks={TasksToBuy}/>

      <TodoList title='What to read' tasks={TasksToRead}/>

    </div>
  );
}

export default App;
