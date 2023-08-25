import { useEffect, useState } from 'react';
import store from './redux/store';
import { Provider, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, changeStatus } from './redux/todo.slice';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ListView, Progressbar } from './components';

type todoType = {
	id: number;
	title: string;
	status: boolean;
};

function App() {
	return (
		<Provider store={store}>
			<Dummy />
		</Provider>
	);
}

const Dummy = () => {
	const dispatch = useDispatch();
	const todos: todoType[] = useSelector((store: any) => store.todo.todos);
	const [percentage, setPercentage] = useState<number>(0);

	const [todo, setTodo] = useState<string>('');
	const [id, setId] = useState<number | null>();

	const insertTodo = () => {
		if (!todo) {
			return;
		}
		dispatch(
			addTodo({
				id: Math.random().toString(16).slice(-4),
				title: todo || '',
				status: false
			})
		);
		setTodo('');
	};
	const editTodo = () => {
		if (!todo) {
			return;
		}
		dispatch(updateTodo({ id, title: todo }));
		setId(null);
		setTodo('');
	};

	useEffect(() => {
		const completedTodos = todos.filter((todo) => todo.status).length;
		if (completedTodos) {
			setPercentage(Math.floor((100 * completedTodos) / todos.length));
		}
	}, [todos, dispatch]);

	return (
		<div className="h-screen w-screen flex gap-5 py-5 flex-col items-center">
			{todos.length ? <Progressbar percentage={percentage} /> : null}
			<h1 className="text-[30px] text-[blue] font-bold ">Todo App</h1>
			<div className="flex items-end w-[40%]">
				<div className="flex flex-col gap-2 w-full">
					<input
						id="todo-input"
						type="text"
						value={todo}
						onChange={({ target: { value } }) => {
							setTodo(value);
						}}
						className="outline-none px-2 py-2 focus:shadow border h-[40px] rounded-tl-md rounded-bl-md"
						placeholder="Enter todo"
					/>
				</div>
				<div className="flex gap-2">
					<button
						onClick={id ? editTodo : insertTodo}
						className="h-[40px] bg-blue-500 rounded-tr-md rounded-br-md px-5 uppercase font-medium text-white">
						{id ? 'Edit' : 'Add'}
					</button>
					{id ? (
						<button onClick={id ? editTodo : insertTodo} className="">
							<svg
								onClick={() => {
									setTodo('');
									setId(null);
								}}
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								fill="red"
								className="bi bi-x hover:scale-125"
								viewBox="0 0 16 16">
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
							</svg>
						</button>
					) : null}
				</div>
			</div>
			<hr className="w-[40%]" />
			<div className="flex gap-5 justify-center w-[80%] max-h-[70%] hide-scrollbar">
				<ListView setTodo={setTodo} setId={setId} />
			</div>
		</div>
	);
};

export default App;
