import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
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
        debugger
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
            <TextField label="Standard" variant={"outlined"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                error={error}
                helperText={error && 'Text isnt corrected!!!'} />
            <IconButton onClick={onClickAddItem} color={"secondary"}>
                <AddBox />
            </IconButton>
        </div >
    )
}