const submitBtn = document.getElementById('submitBtn');
const todoInput = document.getElementById('todo');

submitBtn.addEventListener('click', () => {
	const todoValue = todoInput.value
	console.log(todoValue);
})