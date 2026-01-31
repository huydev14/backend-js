const submitBtn = document.getElementById("submitBtn");
const todoInput = document.getElementById("todo");

// Local storage key
const TODO_KEY = "todo";

submitBtn.addEventListener("click", () => {
	const myTodo = {
		id: getRandomInt(1, 1000),
		name: todoInput.value,
	};

	const currentTodoStr = localStorage.getItem(TODO_KEY);

	if (currentTodoStr) {
		// Convert from string to object
		const currentTodo = JSON.parse(currentTodoStr);

		// Insert new todo
		currentTodo.push(myTodo);

		// Convert new todo object and push it to local storage
		localStorage.setItem(TODO_KEY, JSON.stringify(currentTodo));
	} else {
		localStorage.setItem(TODO_KEY, JSON.stringify([myTodo]));
	}

	window.location.reload();
});

const generateTodoData = () => {
	const tbody = document.querySelector("table tbody");

	const todoData = localStorage.getItem(TODO_KEY);
	if (todoData) {
		const dataObj = JSON.parse(todoData);

		console.log(dataObj);

		if (dataObj && dataObj.length) {
			dataObj.forEach((data) => {
				tbody.innerHTML += `
			<tr>
				<td>${data.id}</td>
				<td>${data.name}</td>
				<td>
					<button 
						data-id=${data.id} 
						class="btn-delete">Delete
					</button>
				</td>
			</tr>
			`;
			});
		}
	}
};

generateTodoData();

const deleteBtns = document.querySelectorAll(".btn-delete");

if (deleteBtns) {
	deleteBtns.forEach((btn) => {

		btn.addEventListener("click", () => {
			const id = btn.getAttribute("data-id");
			handleDeleteTodo(id);
		})
	});
}

const handleDeleteTodo = (id) => {
	const todoDataStr = localStorage.getItem(TODO_KEY);

	if(todoDataStr){
		const todoData = JSON.parse(todoDataStr);

		const newTodo = todoData.filter(todo => todo.id !== Number(id));

		localStorage.setItem(TODO_KEY, JSON.stringify(newTodo));
		window.location.reload();
	}
}

// Helper
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.ceil(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}
