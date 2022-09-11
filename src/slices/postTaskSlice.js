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

