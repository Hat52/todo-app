function App() {
	return (
		<div className="h-screen w-screen flex flex-col items-center">
			<h1 className="text-xl font-bold">Todo</h1>
			<div className="flex items-end gap-5">
				<div className="flex flex-col gap-2">
					<label htmlFor="todo-input">Enter New Todo</label>
					<input
						id="todo-input"
						type="text"
						className="outline-none px-2 focus:shadow border h-[40px] rounded-[8px] "
						placeholder="Enter todo"
					/>
				</div>
				<button className="h-[40px] bg-blue-500 rounded-[8px] px-5 uppercase font-medium text-white">
					Add
				</button>
			</div>
		</div>
	);
}

export default App;
