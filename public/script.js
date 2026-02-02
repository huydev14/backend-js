(async () => {
	const res = await fetch("http://localhost:8000/blogs");
	const data = await res.json();

	console.log(data);

	const tbody = document.querySelector("table tbody");

	if (data && data.length) {
		data.forEach((data) => {
			tbody.innerHTML += `
			<tr>
				<td>${data.id}</td>
				<td>${data.title}</td>
				<td>${data.author}</td>
				<td>${data.content}</td>
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
})().then(() => {
	handleDeleteBtns();
});

const handleAddNewBlog = () => {
	const title = document.getElementById("title");
	const author = document.getElementById("author");
	const content = document.getElementById("content");

	const saveBtn = document.getElementById("saveBtn");

	saveBtn.addEventListener("click", async (event) => {

		event.preventDefault();

		// Call api to create a new blog
		const rawResponse = await fetch("http://localhost:8000/blogs", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				title: title.value,
				author: author.value,
				content: content.value,
			}),
		});

		const data = await rawResponse.json();

		addNewRowToEnd(data);

		console.log("API RESPONSE:", data);
	});
};

const addNewRowToEnd = (data) => {
	const tbody = document.querySelector("table tbody");

	newRow.innerHTML += `
			<tr>
				<td>${data.id}</td>
				<td>${data.title}</td>
				<td>${data.author}</td>
				<td>${data.content}</td>
				<td>
					<button 
						data-id=${data.id} 
						class="btn-delete">Delete
					</button>
				</td>
			</tr>
			`;

	tbody.appendChild(newRow);
};

const handleDeleteBtns = () => {
	const delBtns = document.querySelectorAll(".btn-delete");

	if (delBtns) {
		delBtns.forEach((btn) => {
			btn.addEventListener("click", async (event) => {
				
				event.preventDefault();

				const id = btn.getAttribute("data-id");

				// Call api to delete a blog
				const rawResponse = await fetch(`http://localhost:8000/blogs/${id}`, {
					method: "DELETE",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				});
				const data = await rawResponse.json();

				// Delete HTML row
				const row = btn.closest("tr");
				row.remove();
			});
		});
	}
};

handleAddNewBlog();
