//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const empty = document.querySelector('.empty');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDelete);

//Functions
function addTodo (event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    empty.remove();
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //check mark button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("complete-btn");
    todoDiv.appendChild(checkButton);
    //trash mark button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT VALUE
    todoInput.value = "";
}

function checkDelete (e) {
    const item = e.target;
    //CHECK TODO
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        //item.innerHTML = '<i class="fas fa-redo-alt"></i>';
    }

    //DELETE TODO
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.remove();
    }
}