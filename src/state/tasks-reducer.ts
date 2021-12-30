import { v1 } from "uuid"
import { TodoListType, filterValuesType, TasksStatetype } from "../App"
import { AddTodoListActionType, RemoveTodoListActionType } from "./todoList-reducers"

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListID: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type changeStatusTaskType = {
    type: 'TASK-STATUS-CHANGE'
    isDone: boolean
    todolistId: string
    taskId: string
}

export type ChangeTitleTaskActionType = {
    type: 'TASK-TITLE-CHANGE'
    title: string
    taskId: string
    todolistId: string
}

export type ActionType = RemoveTaskActionType | AddTaskActionType | changeStatusTaskType | ChangeTitleTaskActionType | AddTodoListActionType | RemoveTodoListActionType

export const tasksReducer = (state: TasksStatetype, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [
                    {
                        id: v1(),
                        title: action.title,
                        isDone: false
                    }, ...state[action.todolistId]]
            }
        case 'TASK-STATUS-CHANGE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? { ...t, isDone: action.isDone } : { ...t })
            }
        case 'TASK-TITLE-CHANGE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? { ...t, title: action.title } : { ...t })
            }
        case 'ADD-TODOLIST':
            return { ...state, [action.todolistId]: [] }
        case 'REMOVE-TODOLIST':
            let newState = { ...state }
            delete newState[action.todoListID]
            return newState
        default:
            throw new Error("I don't undestand this type");
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todoListID,
        taskId
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeStatusTaskType => {
    return {
        type: 'TASK-STATUS-CHANGE',
        isDone,
        todolistId,
        taskId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleTaskActionType => {
    return {
        type: 'TASK-TITLE-CHANGE',
        title,
        todolistId,
        taskId
    }
}