//Link
const API = "http://localhost:8091"
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

//carregar
async function carregarLista() {
    try {
        const resposta = await fetch(API + "/itens/listar")
        if (!resposta.ok) throw new Error("Erro: não é possivel carregar a lista")
        const lista = await resposta.json()
        exibirLista(lista)

    } catch (error) {

    }
}

function exibirLista(lista) {
    lista.map(tarefa => {
        const todo = document.createElement("div");
        todo.classList.add("todo");
        switch (tarefa.prioridade) {
            case "Alta":
                todo.classList.add("high");
                break;
            case "Media":
                todo.classList.add("medium");
                break;
            case "Baixa":
                todo.classList.add("low");
                break;

        }
        if(tarefa.estaConcluida){
            todo.classList.add("done")
        }else{
            todo.classList.remove("done")
        }
        todo.innerHTML = `
            <h3>${tarefa.nome}</h3>
            <p>${tarefa.descricao}</p>
            
            <button class="finish-todo">
                <i class="fa-solid fa-check"></i>
            </button><button class="edit-todo">
            <i class="fa-solid fa-pen"></i></button>
            <button class="remove-todo">
                <i class="fa-solid fa-xmark"></i>
            </button>
            `
        todoList.append(todo)

    })


}

const saveTodo = (text) => {


    /*
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
    */

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
document.addEventListener("DOMContentLoaded", carregarLista);
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
