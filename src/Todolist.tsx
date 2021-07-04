import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { filterValuesType, TaskType } from './App';
import { EditableSpan } from './EditableSpan';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

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
        <Checkbox
          icon={<DoneOutlineIcon color={'secondary'}/>}
          checkedIcon={<DoneOutlineIcon color={'primary'}/>}
          checked={t.isDone}
          className='checkboxInput'
          onChange={changeCheckBox} />
        <span className={taskClass}>
          <EditableSpan
            changeTitle={changeTaskTitle}
            title={t.title} /></span>
        <IconButton onClick={removeTask} color="secondary">
          <Delete />
        </IconButton>
      </li >
    )
  })
  const removeTaskOnClick = () => props.removeTodoList(props.todoListID)

  const addTaks = (title: string) => props.addTask(title, props.todoListID)

  const changeTodoListTitle = (title: string) => props.changeTitleTodoList(title, props.todoListID)

  const changeFilterAllTodoList = () => props.changeFilterTodoList('all', props.todoListID)
  const changeFilterActiveTodoList = () => props.changeFilterTodoList('active', props.todoListID)
  const changeFilterCompletedTodoList = () => props.changeFilterTodoList('completed', props.todoListID)

  return (
    <div>
      <h3 >
        <EditableSpan changeTitle={changeTodoListTitle} title={props.title} />
        <IconButton onClick={removeTaskOnClick} color="secondary">
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaks}
      />
      <ul className='list'>
        {tasksJSX}
      </ul>
      <div>
        <Button variant={props.filter === 'all' ? "contained" : "text"} color={'primary'} size={"small"} style={{ marginRight: "10px" }} onClick={changeFilterAllTodoList}>All</Button>
        <Button variant={props.filter === 'active' ? "contained" : "text"} color={'primary'} size={"small"} style={{ marginRight: "10px" }} onClick={changeFilterActiveTodoList}>Active</Button>
        <Button variant={props.filter === 'completed' ? "contained" : "text"} color={'primary'} size={"small"} style={{ marginRight: "10px" }} onClick={changeFilterCompletedTodoList}>Completed</Button>
      </div >
    </div >
  )
}