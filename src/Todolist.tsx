import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { filterValuesType, TaskType } from './App';
import { EditableSpan } from './EditableSpan';

type PropsTodoList = {
  title: string
  tasks: Array<TaskType>
  todoListID: string
  removeTask: (taskId: string, todoListId: string) => void
  changeFilterTodoList: (value: filterValuesType, todoListId: string) => void
  changeTitleTodoList: (title: string, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  filter: filterValuesType
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
  removeTodoList: (todoListID: string) => void
}
export function TodoList(props: PropsTodoList) {
  const tasksJSX = props.tasks.map(t => {
    const taskClass = 'listSpan' + ' ' + (t.isDone ? 'is-done' : '')
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    }
    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
    return (
      <li key={t.id} className={'listItem'}>
        <label>
          <input
            className='checkboxInput'
            type="checkbox" checked={t.isDone}
            onChange={changeCheckBox}
          />
          <span className='checkboxCheck'></span>
        </label>
        <span className={taskClass}> <EditableSpan
          changeTitle={changeTaskTitle}
          title={t.title} /></span>

        <button onClick={removeTask}
          className='btnInput'>x</button>
      </li>
    )
  })
  const removeTaskOnClick = () => props.removeTodoList(props.todoListID)

  const addTaks = (title: string) => props.addTask(title, props.todoListID)

  const changeTodoListTitle = (title: string) => props.changeTitleTodoList(title, props.todoListID)

  const changeFilterAllTodoList = () => props.changeFilterTodoList('all', props.todoListID)
  const changeFilterActiveTodoList = () => props.changeFilterTodoList('active', props.todoListID)
  const changeFilterCompletedTodoList = () => props.changeFilterTodoList('completed', props.todoListID)

  const activeFilterBtnAll = 'btn' + ' ' + (props.filter === 'all' ? 'active-filter' : '')
  const activeFilterBtnActive = 'btn' + ' ' + (props.filter === 'active' ? 'active-filter' : '')
  const activeFilterBtnCompleted = 'btn' + ' ' + (props.filter === 'completed' ? 'active-filter' : '')

  return (
    <div>
      <h3 >
        <EditableSpan changeTitle={changeTodoListTitle} title={props.title} />
        <button onClick={removeTaskOnClick}>x</button>
      </h3>
      <AddItemForm addItem={addTaks}
      />
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