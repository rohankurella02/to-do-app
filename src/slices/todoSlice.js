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
            toast.error('Error Occurred');
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
            toast.error('Error Occurred');
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
            toast.error('Error Occurred');
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
            toast.error('Error Occurred');
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
    isGetLoading: false,
    isGetSuccess: false,
    isUpdateLoading: false,
    isUpdateSuccess: false,
    isInsertLoading: false,
    isInsertSuccess: false,
    isDeleteLoading: false,
    isDeleteSuccess: false,
    todoList: [],
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
            // state.isLoading = false;
            state.isGetLoading = false;
            state.isGetSuccess = true;
        },
        [getTasks.pending]: (state, action) => {
            state.isGetLoading = true;
            state.isGetSuccess = false;
        },
        [getTasks.rejected]: (state, action) => {
            state.isGetLoading = false;
            state.isGetSuccess = false;
        },
        [insertTask.fulfilled]: (state, action) => {
            state.todoList.push(action.payload);
            state.isInsertLoading = false;
            state.isInsertSuccess = true;
        },
        [insertTask.pending]: (state, action) => {
            state.isInsertLoading = true;
            state.isInsertSuccess = false;
        },
        [insertTask.rejected]: (state, action) => {
            state.isInsertLoading = false;
            state.isInsertSuccess = false;
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.todoList = state.todoList.filter(todo => todo.id !== action.payload);
            state.isDeleteLoading = false;
            state.isDeleteSuccess = true;
        },
        [deleteTask.pending]: (state, action) => {
            state.isDeleteLoading = true;
            state.isDeleteSuccess = false;
        },
        [deleteTask.rejected]: (state, action) => {
            state.isDeleteLoading = false;
            state.isDeleteSuccess = false;
        },
        [updateTask.fulfilled]: (state, action) => {
            state.todoList = state.todoList.map(todo => todo.id === action.payload.id ? action.payload : todo);
            state.isUpdateLoading = false;
            state.isUpdateSuccess = true;
        },
        [updateTask.pending]: (state, action) => {
            state.isUpdateLoading = true;
            state.isUpdateSuccess = false;
        },
        [updateTask.rejected]: (state, action) => {
            state.isUpdateLoading = false;
            state.isUpdateSuccess = false;
        }
    }
})

export const { addTodo, deleteTodo, editTodo, updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;