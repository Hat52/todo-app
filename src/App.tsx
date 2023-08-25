import { useEffect, useState } from 'react';
import store from './redux/store';
import { Provider, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, changeStatus } from './redux/todo.slice';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Progressbar } from './components';

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
				<ul className="w-[50%] p-2 flex flex-col gap-2 overflow-scroll">
					{todos.map((currentTodo: todoType) => (
						<li className="flex shadow-md ring-1 ring-gray-300 rounded-[8px] items-center justify-between">
							<p
								className={`${
									currentTodo.status ? 'line-through' : ''
								} px-5 py-2 text-black`}>
								{currentTodo.title}
							</p>
							{currentTodo.status ? null : (
								<div className="flex gap-2 justify-center p-2">
									<div>
										<svg
											onClick={() => {
												setTodo(currentTodo.title);
												setId(currentTodo.id);
											}}
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="green"
											className="bi bi-pencil cursor-pointer hover:scale-125"
											viewBox="0 0 20 20">
											<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
										</svg>
									</div>
									<div>
										<svg
											onClick={() => dispatch(deleteTodo(currentTodo.id))}
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="red"
											className="bi bi-trash cursor-pointer hover:scale-125"
											viewBox="0 0 20 20">
											<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
											<path
												fill-rule="evenodd"
												d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
											/>
										</svg>
									</div>

									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="green"
											viewBox="0 0 24 24"
											onClick={() => dispatch(changeStatus(currentTodo.id))}
											className="hover:scale-125 cursor-pointer hover:fill-[green]">
											<path d="M20.29 5.29l-10 10a1 1 0 0 1-1.42 0l-4-4a1 1 0 1 1 1.42-1.42L10 13.59l9.29-9.3a1 1 0 0 1 1.42 1.42z" />
										</svg>
									</div>
								</div>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
