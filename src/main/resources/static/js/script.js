//Link
const API = "http://localhost:8091"
//selecao de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add")
const todoDescription = document.querySelector("#descricao")
const selector = document.querySelector("#seletor")
const formControl = document.querySelector(".form-control")
const todoList = document.querySelector("#todo-list");
const editTodo = document.querySelector(".edit-todo");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");
let oldInputValue;
let editarTarefa = false;
//eventos
document.addEventListener("DOMContentLoaded",carregarLista)
todoForm.addEventListener("submit", saveTodo)
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
    todoList.innerHTML =""
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
        if (tarefa.estaConcluida) {
            todo.classList.add("done")
        } else {
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

async function saveTodo(e) {
    e.preventDefault()
    alert(`tarefa salva`)
    const nome = todoInput.value
    const descricao = todoDescription.value
    const prioridade = selector.value
    const todos = {nome, descricao, prioridade}
    try {
        let response;
        if (!editarTarefa) {
            response = await fetch(API + "/itens/cadastrar", {
                method: 'POST',
                headers: {
                    "Content-type": "application/JSON"
                },
                body: JSON.stringify(todos)

            });

        }

        if (!response.ok) throw new Error("erro ao carregar tarefas")
        todoForm.reset()
        await carregarLista()


    } catch (error) {
        console.error("Erro", error)

    }

}
const toggleForms = () => {
    addBtn.classList.toggle("hide")
    formControl.classList.toggle("hide")
};
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");
        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
}
//Eventos
/*
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.clear();
    const formValue = new FormData(todoForm);
    const inputData = formValue.get("input");
    if (inputData) {
        saveTodo(inputData);
    }


});
*/

document.addEventListener("click", (e) => {
    let todoTitle;
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
        //atualiza para o estaconcluida=true
    }
    if (targetEl.classList.contains("remove-todo")) {
        //remove o eelemento
        parentEl.remove();
    }
    if (targetEl.classList.contains("edit-todo")) {
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
        toggleForms();
    }
});
/*

editTodo.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleForms();

    const editInputValue = editInput.value;
    if (editInputValue) {
        updateTodo(editInputValue);
    }


});
*/
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});
finishTodo.addEventListener("click", () => {

})

