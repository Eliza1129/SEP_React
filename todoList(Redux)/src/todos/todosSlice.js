import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {APIs} from '../api';

//Async thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async() => {
    const response = await APIs.getTodos();
    return response;
});

export const addTodo = createAsyncThunk('todos/createTodo', async(newTodo) => {
    // reload after add
    const created = await APIs.createTodo(newTodo);
    return created;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async(id) => {
    await APIs.deleteTodo(id);
    return id;
})

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async({ id, completed }) => {
    const updated = await APIs.updateTodo(id, { completed: !completed});
    return updated;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async({id, title}) => {
    const updated = await APIs.updateTodo(id, {title});
    return updated;
});


const todoSlice = createSlice({
    name:'todos',
    initialState: {
        input:'',
        list:[],
        status:'idle',
        error: null,
    },
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
              state.status = 'loading';  
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const id = action.payload;
                state.list = state.list.filter(todo => todo.id !== id);
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.list.findIndex(todo => todo.id === updated.id);
                if (index !== -1) state.list[index] = updated;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.list.findIndex(todo => todo.id === updated.id);
                if (index !== -1) state.list[index] = updated;
            });
    },
});

export default todoSlice.reducer;
export const { setInput } = todoSlice.actions;