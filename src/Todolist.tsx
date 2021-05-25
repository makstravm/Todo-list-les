import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { filterValuesType, TaskType } from './App';

type PropsTodoList = {
  title: string
  tasks: Array<TaskType>
  todoListID: string
  removeTask: (taskId: string, todoListId: string) => void
  changeFilterTodoList: (value: filterValuesType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  filter: filterValuesType
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  removeTodoList: (todoListID: string) => void
}
export function TodoList(props: PropsTodoList) {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const tasksJSX = props.tasks.map(t => {
    const taskClass = 'listSpan' + ' ' + (t.isDone ? 'is-done' : '')
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    }
    return (
      <li key={t.id} className='listItem'>
        <label>
          <input
            className='checkboxInput'
            type="checkbox" checked={t.isDone}
            onChange={changeCheckBox}
          />
          <span className='checkboxCheck'></span>
        </label>
        <span className={taskClass}>{t.title}</span>
        <button onClick={removeTask}
          className='btnInput'>x</button>
      </li>
    )
  })
  const onClickAddTask = () => {
    const validetedTitle = title.trim()
    if (validetedTitle) {
      props.addTask(validetedTitle, props.todoListID)
    } else {
      setError(true)
    }
    setTitle('')
  }
  const errorStatus = error ? 'error' : ''
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTask()
    }
  }
  const removeTaskOnClick = () => props.removeTodoList(props.todoListID)

  const changeFilterAllTodoList = () => props.changeFilterTodoList('all', props.todoListID)
  const changeFilterActiveTodoList = () => props.changeFilterTodoList('active', props.todoListID)
  const changeFilterCompletedTodoList = () => props.changeFilterTodoList('completed', props.todoListID)

  const activeFilterBtnAll = 'btn' + ' ' + (props.filter === 'all' ? 'active-filter' : '')
  const activeFilterBtnActive = 'btn' + ' ' + (props.filter === 'active' ? 'active-filter' : '')
  const activeFilterBtnCompleted = 'btn' + ' ' + (props.filter === 'completed' ? 'active-filter' : '')

  return (
    <div>
      <h3 >{props.title}<button onClick={removeTaskOnClick}>x</button></h3>
      <div>
        <input
          value={title}
          onChange={onChangeTitle}
          onKeyPress={onKeyPressAddTask}
          className={'input' + ' ' + (errorStatus)}
        />

        <button
          className='btnInput'
          onClick={onClickAddTask}>+</button>
        {error && <div className='errorText'>Text isn't corrected!!!</div>}
      </div>
      <ul className='list'>
        {tasksJSX}
      </ul>
      <div>
        <button className={activeFilterBtnAll} onClick={changeFilterAllTodoList}>All</button>
        <button className={activeFilterBtnActive} onClick={changeFilterActiveTodoList}>Active</button>
        <button className={activeFilterBtnCompleted} onClick={changeFilterCompletedTodoList}>Completed</button>
      </div>
    </div >
  )
}