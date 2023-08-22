import { createSlice } from '@reduxjs/toolkit';

interface Todo {
	id: number;
	title: string;
	status: boolean;
}

interface TodoState {
	todos: Todo[];
}

const initialState: TodoState = {
	todos: []
};

export const counterSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo: (state, { payload }) => {
			state.todos = [...state.todos, payload];
		}
	}
});

// Action creators are generated for each case reducer function
export const { addTodo } = counterSlice.actions;

export default counterSlice.reducer;
