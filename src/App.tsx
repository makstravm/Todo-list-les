import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { TodoList } from './Todolist';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}

type TasksStatetype = {
    [key: string]: Array<TaskType>
}

export type filterValuesType = 'all' | 'active' | 'completed';

function App() {

    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const todoListID_3 = v1()
    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        { id: todoListID_1, title: 'What to learn', filter: 'all' },
        { id: todoListID_2, title: 'What to buy', filter: 'all' },
        { id: todoListID_3, title: 'What to drink', filter: 'all' }
    ])

    const [tasks, setTasks] = useState<TasksStatetype>({
        [todoListID_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'Redux', isDone: false }
        ],
        [todoListID_2]: [
            { id: v1(), title: 'Bear', isDone: true },
            { id: v1(), title: 'Chips', isDone: false },
            { id: v1(), title: 'Snacks', isDone: true },
            { id: v1(), title: 'Wine', isDone: false }
        ],
        [todoListID_3]: [
            { id: v1(), title: 'Vodka', isDone: true },
            { id: v1(), title: 'Whiskey', isDone: false },
            { id: v1(), title: 'Gin', isDone: true },
            { id: v1(), title: 'Rum', isDone: false }
        ]
    })

    function removeTask(taskId: string, todoListId: string) {
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskId)
        setTasks(copyTasks);
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = [newTask, ...copyTasks[todoListId]]
        setTasks(copyTasks)
    }

    function changeFilterTodoList(filter: filterValuesType, todoListId: string) {
        setTodoList(todoList.map(tl => tl.id === todoListId ? { ...tl, filter } : tl
        ));
    }
    function changeTitleTodoList(title: string, todoListId: string) {
    setTodoList(todoList.map(tl => tl.id === todoListId ? { ...tl, title } : tl
        ));
    }
    function addTodoList(title: string) {
        const newTodoListId = v1();
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title,
            filter: 'all'
        }
        setTodoList([...todoList, newTodoList])
        setTasks({ ...tasks, [newTodoListId]: [] })
    }
    function removeTodoList(todoListID: string) {
        setTodoList(todoList.filter(tl => tl.id !== todoListID))
        const copyTasks = { ...tasks }
        delete copyTasks[todoListID]
        setTasks(copyTasks);
    }



    function getFilterTasks(tl: TodoListType) {
        switch (tl.filter) {
            case 'active':
                return tasks[tl.id].filter(t => t.isDone === false)
            case 'completed':
                return tasks[tl.id].filter(t => t.isDone === true)
            default:
                return tasks[tl.id]
        }
    }
    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = tasks[todoListId].map(t => t.id === taskId ? { ...t, isDone } : t)
        setTasks(copyTasks)
    }
    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = tasks[todoListId].map(t => t.id === taskId ? { ...t, title } : t)
        setTasks(copyTasks)
    }

    const todoListComponents = todoList.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{ padding: '20px ' }}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getFilterTasks(tl)}
                        removeTask={removeTask}
                        changeFilterTodoList={changeFilterTodoList}
                        addTask={addTask}
                        filter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTitleTodoList={changeTitleTodoList}
                    />
                </Paper >
            </Grid>
        )
    })
    //UI:

    return (
        <div className="App">
            <AppBar position={"static"} >
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton color={"inherit"}>
                        <Menu />
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button
                        color={'inherit'}
                        variant={'outlined'}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Grid container direction={"row"} style={{ paddingTop: '30px ', marginBottom: '30px ' }}
                    justify={"center"}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3} justify={"space-around"}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div >
    );
}

export default App;
