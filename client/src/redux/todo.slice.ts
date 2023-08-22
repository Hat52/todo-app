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
		},
		deleteTodo: (state, { payload }) => {
			state.todos = state.todos.filter((todo) => todo.id !== payload);
		},
		updateTodo: (state, { payload }) => {
			state.todos = state.todos.map((todo) => {
				if (todo.id === payload.id) {
					todo.title = payload.title;
				}
				return todo;
			});
		},
		changeStatus: (state, { payload }) => {
			state.todos = state.todos.map((todo) => {
				if (todo.id === payload) {
					todo.status = !todo.status;
				}
				return todo;
			});
		}
	}
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, updateTodo, changeStatus } = counterSlice.actions;

export default counterSlice.reducer;
