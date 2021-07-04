import { TextField } from '@material-ui/core';
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
  const [title, setTitle] = useState<string>(props.title)
  const [error, setError] = useState<boolean>(false)
  const [editeMode, setEditeMode] = useState<boolean>(false)
  // const onClickAddItem = () => {
  //   const validetedTitle = title.trim()
  //   if (validetedTitle) {
  //     props.changeTitle(title)
  //   } else {
  //     setError(true)
  //   }
  //   setTitle('')
  // }
  const onKeyPressNewTaskTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const validetedTitle = title.trim()
      if (validetedTitle) {
        props.changeTitle(title)
        setEditeMode(false)
      } else {
        setError(true)
      }
    }
  }
  const onEditMode = () => setEditeMode(true)
  const offEditMode = () => {
    props.changeTitle(title)
    setEditeMode(false)
    setError(false)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const errorStatus = error ? 'errorInput' : ''
  return (
    editeMode
      ? <TextField
        onBlur={offEditMode}
        value={title}
        onChange={onChangeTitle}
        className={errorStatus}
        onKeyPress={onKeyPressNewTaskTitle}
        autoFocus
        error={error}
        helperText={error && 'Text isnt corrected!!!'} />
      : <span onDoubleClick={onEditMode}> {props.title}</span >

  )
}