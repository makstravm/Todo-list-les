import { v1 } from "uuid"
import { TodoListType, filterValuesType } from "../App"

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type changeFilterTodoListActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: filterValuesType
    todoListID: string
}
export type changeTitleTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | changeFilterTodoListActionType | changeTitleTodoListActionType

export const todoListReducer = (todolists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodoList]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.todoListID ? { ...tl, filter: action.filter } : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.todoListID ? { ...tl, title: action.title } : tl
            )
        default:
            return todolists
    }
}
export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID
    }
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
    }
}

export const ChangeFilterTodoListAC = (todoListID: string, filter: filterValuesType): changeFilterTodoListActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todoListID
    }
}
export const ChangeTitleTodoListAC = (title: string, todoListID: string): changeTitleTodoListActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todoListID
    }
}