import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { filterValuesType, TaskType } from './App';

type PropsTodoList = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilterTodoList: (value: filterValuesType) => void
  addTask: (title: string) => void
}
export function TodoList(props: PropsTodoList) {
  const [title, setTitle] = useState<string>('')
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
  const onClickAddTask = () => {
    props.addTask(title)
    setTitle('')
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTask()
    }
  }
  const changeFilterAllTodoList = () => props.changeFilterTodoList('all')
  const changeFilterActiveTodoList = () => props.changeFilterTodoList('active')
  const changeFilterCompletedTodoList = () => props.changeFilterTodoList('completed')

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeTitle}
          onKeyPress={onKeyPressAddTask}
        />
        <button onClick={onClickAddTask}>+</button>
      </div>
      <ul>
        <li>{tasksJSX}</li>
      </ul>
      <div>
        <button onClick={changeFilterAllTodoList}>All</button>
        <button onClick={changeFilterActiveTodoList}>Active</button>
        <button onClick={changeFilterCompletedTodoList}>Completed</button>
      </div>
    </div >
  )
}