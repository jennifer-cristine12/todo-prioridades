//selecao de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");
let oldInputValue;
//Funcoes
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"</i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"</i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoInput.value = " ";
    todoInput.focus();
};
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");
        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
};
//Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.clear();
    const formValue = new FormData(todoForm);
    const inputData = formValue.get("input");
    if (inputData) {
        saveTodo(inputData);
    }
});
document.addEventListener("click", (e) => {
    let todoTitle;
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }
    if (targetEl.classList.contains("edit-todo")) {
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
        toggleForms();
    }
});
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleForms();
    const editInputValue = editInput.value;
    if (editInputValue) {
        updateTodo(editInputValue);
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});
