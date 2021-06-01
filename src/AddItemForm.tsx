import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

type AddItemFormPorpsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPorpsType) {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const onClickAddItem = () => {
    const validetedTitle = title.trim()
    if (validetedTitle) {
      props.addItem(validetedTitle)
    } else {
      setError(true)
    }
    setTitle('')
  }
  const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddItem()
    }
  }
  const errorStatus = error ? 'error' : ''
  return (
    <div>
      <input
        value={title}
        onChange={onChangeTitle}
        onKeyPress={onKeyPressAddItem}
        className={'input' + ' ' + (errorStatus)}
      />
      <button
        className='btnInput'
        onClick={onClickAddItem}>+</button>
      {error && <div className='errorText'>Text isn't corrected!!!</div>}
    </div>
  )
}