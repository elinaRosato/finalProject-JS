//Selectors ---------------------------------------------------------------------------------

const createListBtn = document.querySelector('.create-list-btn');
const listsContainer = document.querySelector('.lists-container');
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const empty = document.querySelector('.empty');
const emptyList = document.querySelector('.empty-list');
const alertMessage = document.querySelector('.alert-background');
const closeAlertBtn = document.querySelector('.alert-message-btn');


//Event Listeners ---------------------------------------------------------------------------

//$(document).ready(getLocalTodos); 
createListBtn.addEventListener('click', createList);
closeAlertBtn.addEventListener('click', closeAlert);
//todoButton.addEventListener('click', addTodo);
//todoList.addEventListener('click', checkDelete);
$("#darkModeToggle").on('click', switchMode);

//Functions ---------------------------------------------------------------------------------

//saveLocalLits -> saves lists in localStorage
let lists = [];
function saveLocalList(list) {
    lists.push(list);
    localStorage.setItem('lists', JSON.stringify(lists));
}

function createList () {
    //Prevent form from submitting
    //e.preventDefault();
    if (lists.length <= 2) {
        //List Panel
        empty.remove();
        const listPanel = document.createElement("div");
        listPanel.classList.add('list-panel');
        listsContainer.appendChild(listPanel);
            //List Container
            const listContainer = document.createElement("div");
            listContainer.classList.add('list');
            listPanel.appendChild(listContainer);
                // List title Container
                const listTitleContainer = document.createElement("div");
                listTitleContainer.classList.add('list-title-container');
                listContainer.appendChild(listTitleContainer);
                    // List icon
                    const listIcon = document.createElement("i");
                    listIcon.classList.add('list-icon', 'fa-solid', 'fa-list-ul');
                    listTitleContainer.appendChild(listIcon);
                    // List title
                    const listTitle = document.createElement("h3");
                    listTitle.classList.add('list-title');
                    listTitle.contentEditable='false';
                    listTitle.innerText = "Todo List"
                    listTitleContainer.appendChild(listTitle);
                    // List Bar
                    const listBar = document.createElement("div");
                    listBar.classList.add('list-bar');
                    listTitleContainer.appendChild(listBar);
                        // Edit title
                        const editTitleBtn = document.createElement("button");
                        editTitleBtn.innerHTML = '<i class="fas fa-edit"></i>';
                        editTitleBtn.classList.add('edit-title-btn', 'btn');
                        editTitleBtn.addEventListener('click', editList);
                        listBar.appendChild(editTitleBtn);
                        // Delete List Btn
                        const deleteListBtn = document.createElement("button");
                        deleteListBtn.innerHTML = '<i class="fas fa-trash"></i>';
                        deleteListBtn.classList.add('delete-list-btn', 'delete-btn', 'btn');
                        deleteListBtn.addEventListener('click', deleteList);
                        listBar.appendChild(deleteListBtn);
                // Tasks Container
                const tasksContainer = document.createElement("div");
                tasksContainer.classList.add('tasks-container');
                listContainer.appendChild(tasksContainer);
                    // Empty List Div
                    const emptyList = document.createElement("div");
                    emptyList.classList.add('empty-list');
                    tasksContainer.appendChild(emptyList);
                        // Empty text
                        const emptyText = document.createElement("p");
                        emptyText.innerText = 'Your list is empty'
                        emptyText.classList.add('empty-text');
                        emptyList.appendChild(emptyText);
                // List Footer
                const listFooter = document.createElement("div");
                listFooter.classList.add('list-footer');
                listContainer.appendChild(listFooter);
                    // Task count
                    const taskCount = document.createElement("div");
                    taskCount.classList.add('task-count');
                    listFooter.appendChild(taskCount);
                        //Count number
                        const taskCountNumber = document.createElement("p");
                        taskCountNumber.classList.add('task-count-number');
                        taskCountNumber.innerText = '0';
                        taskCount.appendChild(taskCountNumber);
                        // Task count Text
                        const taskCountText = document.createElement("p");
                        taskCountText.classList.add('task-count-text');
                        taskCountText.innerText = 'tasks';
                        taskCount.appendChild(taskCountText);
                    // Clear all
                    const clearBtn = document.createElement("button");
                    clearBtn.innerText = 'Clear all'
                    clearBtn.classList.add('clear-btn');
                    listFooter.appendChild(clearBtn);
                    clearBtn.addEventListener('click', clearAll = (e) => {
                        while (tasksContainer.firstChild) {
                            tasksContainer.firstChild.remove();
                        }
                        //Reset Task count
                        taskCountNumber.innerText = '0';
                        taskCountText.innerText = 'tasks';
                        //Reset Empty list
                        if (!(tasksContainer.firstChild)) {
                            tasksContainer.appendChild(emptyList);
                        }
                    })
            // Task Creator
            const taskCreator = document.createElement("div");
            taskCreator.classList.add('task-creator');
            listPanel.appendChild(taskCreator);
                //Task Creator Form
                const taskCreatorForm = document.createElement("form");
                taskCreator.appendChild(taskCreatorForm);
                    //Task input
                    const taskInput = document.createElement("input");
                    taskInput.classList.add('task-input');
                    taskInput.placeholder='New task';
                    taskInput.type='text';
                    taskCreatorForm.appendChild(taskInput);
                    // Add Task Btn
                    const addTaskBtn = document.createElement("button");
                    addTaskBtn.innerHTML = '<i class="fas fa-plus"></i>';
                    addTaskBtn.classList.add('add-task-btn', 'btn');
                    taskCreatorForm.appendChild(addTaskBtn);
                    addTaskBtn.addEventListener('click',addTask = (e) => {
                        emptyList.remove();
                        //Prevent form from submitting
                        e.preventDefault();
                        //Increase task count
                        let prevTaskCount = e.target.parentElement.parentElement.previousElementSibling.lastChild.firstChild.firstChild;
                        newTaskCount = parseInt(prevTaskCount.innerText) + 1;
                        taskCountNumber.innerText = newTaskCount;
                        if (newTaskCount === 1) {
                            taskCountText.innerText = 'task';
                        } else {
                            taskCountText.innerText = 'tasks';
                        }
                        //Task list item
                        const taskItem = document.createElement("li");
                        taskItem.classList.add('task-item');
                        tasksContainer.appendChild(taskItem);
                            //Task check icon
                            const taskCheck = document.createElement("i");
                            taskCheck.classList.add('task-check', 'fa-regular', 'fa-circle');
                            taskItem.appendChild(taskCheck);
                            taskCheck.addEventListener('click', toggleCheck = (e) => {
                                e.target.nextElementSibling.classList.toggle('checked');
                            });
                            //Task text
                            const taskText = document.createElement("p");
                            taskText.classList.add('task-text');
                            taskText.innerText = taskInput.value;
                            taskText.contentEditable = 'true';
                            taskItem.appendChild(taskText);
                            //Task menu
                            const taskMenu = document.createElement("div");
                            taskMenu.classList.add('task-menu');
                            taskItem.appendChild(taskMenu);
                                //Remove
                                const taskRemove = document.createElement("i");
                                taskRemove.classList.add('task-remove', 'fas', 'fa-trash');
                                taskMenu.appendChild(taskRemove);
                                taskRemove.addEventListener('click', removeTask = (e) => {
                                    const task = e.target.parentElement.parentElement;
                                    if (!(task.nextElementSibling || task.previousElementSibling)) {
                                        tasksContainer.appendChild(emptyList);
                                    }
                                    //Decrease task count
                                    let prevTaskCount = e.target.parentElement.parentElement.parentElement.nextElementSibling.firstChild.firstChild;
                                    newTaskCount = parseInt(prevTaskCount.innerText) - 1;
                                    console.log(newTaskCount);
                                    taskCountNumber.innerText = newTaskCount;
                                    if (newTaskCount === 1) {
                                        taskCountText.innerText = 'task';
                                    } else {
                                        taskCountText.innerText = 'tasks';
                                    }
                                    //Delete Task
                                    task.remove();
                                });
                        //Reset taskInput
                        taskInput.value = "";
                    });

        // Save list in Local Storage
        saveLocalList({title: listTitle.innerText, list: []})
    } else {
        alertMessage.classList.remove('hide');
    }
}

function closeAlert () {
    alertMessage.classList.add('hide');
}

function deleteList (e) {
    if (lists != []) {
    const list = e.target.parentElement.parentElement.parentElement.parentElement;
    console.log(list);
    list.remove();
    } else {
        listsContainer.appendChild(empty);
    }
}

function editList (e) {
    const editableTitle = e.target.parentElement.previousElementSibling;
    if (editableTitle.contentEditable == 'false') {
        editableTitle.contentEditable ='true';
        editableTitle.classList.add('editing');
        e.target.innerHTML='<i class="fa-solid fa-check"></i>';
    } else {
        editableTitle.contentEditable ='false';
        editableTitle.classList.remove('editing');
        e.target.innerHTML ='<i class="fas fa-edit"></i>';
    }
}

function addTask () {

}

function addTodo (event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    emptyList.remove();
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    //ADD TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    //check mark button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("complete-btn");
    todoDiv.appendChild(checkButton);
    //trash button
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


function switchMode () {
$("body").toggleClass("light-mode");
}

//The code below is under constuction, is not yet used.


/* 

//getLists -> gets lists saved in localStorage and recreates elements in DOM
function getLocalTodos () {
    if(localStorage.getItem('lists') !== null) {
        lists = JSON.parse(localStorage.getItem('lists'));
    }
    lists.forEach(function(todo) {
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

//deleteLocalList -> delete list from localStorage las tareas que borramos de la lista 
function deleteLocalList (list) {
    if(localStorage.getItem('lists') !== null) {
        lists = JSON.parse(localStorage.getItem('lists'));
    }
    //const listIndex = lists.indexOf({title: listTitle.innerText, list: [...]});
    //How do I get {title: listTitle.innerText, list: [...]} from list?
    lists.splice(listIndex,1);
    localStorage.setItem('lists', JSON.stringify(lists));
} */
