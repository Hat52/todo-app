import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './todo.slice';

export default configureStore({
	reducer: {
		todo: todoSlice
	}
});
