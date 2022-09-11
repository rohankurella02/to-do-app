import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axios from 'axios';

export const getTasks = createAsyncThunk(
    'todo/getTasks',
    async () => {
        try {
            const response = await axios.get('http://localhost:3001/getTasks');
            return response.data;
        }
        catch (err) {
            return err.message;
        }
    }
)

export const insertTask = createAsyncThunk(
    'todo/insertTask',
    async (task) => {
        try {
            const response = await axios.post('http://localhost:3001/insertTask', task);
            return response.data;
        }
        catch (err) {
            return err.message;
        }
    }
)

export const deleteTask = createAsyncThunk(
    'todo/deleteTask',
    async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/deleteTask/${id}`);
            return response.data;
        }
        catch (err) {
            return err.message;
        }
    }
)

export const updateTask = createAsyncThunk(
    'todo/updateTask',
    async (task) => {
        try {
            const response = await axios.put(`http://localhost:3001/updateTask/${task.id}`, task);
            return response.data;
        }
        catch (err) {
            return err.message;
        }
    }
)


const getInitialTodo = () => {
    const localTodoList = window.localStorage.getItem("todoList");
    if(localTodoList) {
        return JSON.parse(localTodoList);
    }
    window.localStorage.setItem("todoList", JSON.stringify([]));
    return [];
    
}


const initialValue = {
    filterStatus: 'all',
    isLoading: false,
    todoList: getInitialTodo(),
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        addTodo: (state, action) => {


            state.todoList.push(action.payload)
            const todoList = window.localStorage.getItem("todoList");
            if(todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({
                    ...action.payload
                })
                window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
            }
            else {
                window.localStorage.setItem("todoList", JSON.stringify([{ ...action.payload}]));
            }
        },
        deleteTodo: (state, action) => {
            const todoList = window.localStorage.getItem("todoList");
            if(todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo, index) => {
                    if(todo.id === action.payload) {
                        todoListArr.splice(index, 1);
                    }
                })
                window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
            
        },
        editTodo: (state, action) => {
            const todoList = window.localStorage.getItem("todoList");
            if(todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo, index) => {
                    if(todo.id === action.payload.id) {
                        todo.status = action.payload.status;
                        todo.title = action.payload.title;
                    }
                })
                window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        }
    },
    extraReducers: {
        [getTasks.fulfilled]: (state, action) => {
            state.todoList = action.payload;
            state.isLoading = false;
        },
        [getTasks.pending]: (state, action) => {
            state.isLoading = true;
        },
        [insertTask.fulfilled]: (state, action) => {
            state.todoList.push(action.payload);
            state.isLoading = false;
        },
        [insertTask.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.todoList = state.todoList.filter(todo => todo.id !== action.payload);
            state.isLoading = false;
        },
        [deleteTask.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateTask.fulfilled]: (state, action) => {
            state.todoList = state.todoList.map(todo => todo.id === action.payload.id ? action.payload : todo);
            state.isLoading = false;
        },
        [updateTask.pending]: (state, action) => {
            state.isLoading = true;
        }
    }
})

export const { addTodo, deleteTodo, editTodo, updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;