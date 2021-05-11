import React from 'react';
import { filterValuesType, TaskType } from './App';

type PropsTodoList = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilterTodoList: (value: filterValuesType) => void
}
export function TodoList(props: PropsTodoList) {

  const tasksJSX = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id)
    return (
      <li >
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={removeTask}>X</button>
      </li>
    )
  })


  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        <li>{tasksJSX}</li>
      </ul>
      <div>
        <button onClick={() => props.changeFilterTodoList('all')}>All</button>
        <button onClick={() => props.changeFilterTodoList('active') }>Active</button>
        <button onClick={() => props.changeFilterTodoList('completed') }>Completed</button>
      </div>
    </div >
  )
}