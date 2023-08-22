import { useRef, useState } from 'react';
import store from './redux/store';
import { Provider, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTodo } from './redux/todo.slice';

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
	// const [todo, setTodo] = useState<todoType[]>([]);
	const dispatch = useDispatch();
	const todo: todoType[] = useSelector((store: any) => store.todo.todos);

	const inputRef = useRef<HTMLInputElement>();

	const insertTodo = () => {
		if (!inputRef || !inputRef.current) {
			return;
		}
		const value = inputRef.current.value;
		dispatch(
			addTodo({
				id: todo.length,
				title: value || '',
				status: false
			})
		);
		inputRef.current.value = '';
	};

	return (
		<div className="h-screen w-screen flex gap-5 flex-col items-center">
			<h1 className="text-xl font-bold">Todo</h1>
			<div className="flex items-end gap-5  w-[40%]">
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="todo-input">Enter New Todo</label>
					<input
						id="todo-input"
						ref={inputRef}
						type="text"
						className="outline-none px-2  focus:shadow border h-[40px] rounded-[8px] "
						placeholder="Enter todo"
					/>
				</div>
				<button
					onClick={insertTodo}
					className="h-[40px] bg-blue-500 rounded-[8px] px-5 uppercase font-medium text-white">
					Add
				</button>
			</div>
			<hr className="w-[40%]" />
			<div className="flex flex-col items-center gap-5 w-[80%] max-h-[70%] hide-scrollbar">
				<ul className="w-[50%] flex flex-col gap-2 overflow-scroll">
					{todo.map((todo: todoType) => (
						<li className="flex-col gap-5 items-center">
							<div className="min-h-[60px] relative bg-[#9376E0] rounded-[8px]">
								<p className="todo px-5 py-2 text-[#F6FFA6]">{todo.title}</p>
								<div className="flex gap-2 justify-center p-2">
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="white"
											className="bi bi-pencil cursor-pointer hover:scale-125"
											viewBox="0 0 20 20">
											<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
										</svg>
									</div>
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="white"
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
											fill="#ffffff"
											className="bi bi-x hover:scale-125 cursor-pointer hover:bg-red"
											viewBox="0 0 16 16">
											<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
										</svg>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
