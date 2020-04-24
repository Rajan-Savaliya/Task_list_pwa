//do that is -- deifind a all thing name
//then if i input and submit--li-a-i see the input
//remove item


// define ui vars
const form = document.querySelector('.task-form');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');


// load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearALL);
    filter.addEventListener('keyup', filterr);
}
//get task for ls--fucntion
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);

        //  console.log(li);

        taskList.appendChild(li);
    });
};

//add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('add task');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    //  console.log(li);

    taskList.appendChild(li);

    //stor - ls
    // localStorageset(taskInput.value);

    taskInput.value = '';





    e.preventDefault();
}
          //ls--some problum------------------------------------
function localStorageset(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    // e.preventDefault();
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('are you fucking sure??')) {
            e.target.parentElement.parentElement.remove();
            //remove for ls
            removeTaskFromLocalStorage
                (e.target.parentElement.parentElement);
        }
    }

    e.preventDefault();
}

//remove form ls
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearALL(e) {
    //1- way===slow
    // taskList.innerHTML = '';

    //2 -way to do it
    while (taskList.firstChild) {

        taskList.removeChild(taskList.firstChild);

    }
    clearTasksFromLocalStorage();
    e.preventDefault();
}

//----------
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterr(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const taskk = task.firstChild.textContent;
        if (taskk.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}