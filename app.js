//Selectors ---------------------------------------------------------------------------------

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const empty = document.querySelector('.empty');
const addEventButton = document.querySelector('#addEventButton');
const eventModal = document.querySelector('#eventModal');
const closeEventModal = document.querySelector('#closeEventButton');
const createEventButton = document.querySelector('#createEventButton');


//Event Listeners ---------------------------------------------------------------------------

$(document).ready(getLocalTodos); 
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDelete);
$("#darkModeToggle").on('click', switchMode);
selectedCategory = $("#categories option:selected" ).text();
addEventButton.addEventListener('click', openModal);

//Functions ---------------------------------------------------------------------------------

function addTodo (event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    empty.remove();
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    // Acá usé jquery para agregar un elemento pero no me reconoce el ${selectedCategory}
    $(todoDiv).append(`<div class="todo-category"><p> ${selectedCategory} </p></div>`);
    
    //ADD TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
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
    }
    //DELETE TODO
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        deleteLocalTodos (todo);
        todo.remove();
    }
}

//Function saveLocalTodos -> guarda las tareas en el localStorage cuando hacemos click en el boton todoButton
let todos = [];
function saveLocalTodos(todo) {
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Function getTodos -> recupera las tareas guardadas en localStorage y crea los elementos para que aparezcan en la lista
function getLocalTodos () {
    if(localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add('todo');
        empty.remove();
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
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
    });
}

//Function getTodos -> borra del localStorage las tareas que borramos de la lista 
function deleteLocalTodos (todo) {
    if(localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex,1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// A partir de ahora empiezo a usar JQuery
function switchMode () {
$("body").toggleClass("light-mode");
}

// Ajax call
$("#eventsButton").click (function(){ 
    $("#eventsList").remove();
    $("#eventsContainer").append(`
        <ul class="events-list" id="eventsList"></ul>
    `);
    $.get("events.json", function (data, status) {
        if(status === "success"){
            let events = data;
            for (const event of events) {
                $("#eventsList").append(`
                    <div class="event">
                        <li class="event-item">
                            ${event.event}
                        </li>
                        <div class="event-date">
                            ${event.date}  ${event.month}
                        </div>
                    </div>
                `);
            };
        };
    });
});

// Animation
$(document).ready( function() {
    $('.todo-button').hover(
        function() {
            $(this).animate({ 'zoom': 1.2 }, 400);
        },
        function() {
            $(this).animate({ 'zoom': 1 }, 400);
        }
    );
});

$(document).ready( function() {
    $('.events-button').hover(
        function() {
            $(this).animate({ 'zoom': 1.2 }, 400);
        },
        function() {
            $(this).animate({ 'zoom': 1 }, 400);
        }
    );
});

function openModal (e) {
    eventModal.classList.add("show");
    $(closeEventModal).click (function(){
        eventModal.classList.remove('show');
    });
}