// Define UI vars
const form = document.querySelector(`#task-form`);
const taskList = document.querySelector(`.collection`);
const clearBtn = document.querySelector(`.clear-tasks`);
const filter = document.querySelector(`#filter`);
const taskInput = document.querySelector(`#task`);

getTask();

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // Add task event
    form.addEventListener(`submit`, function (e) {
        if (taskInput.value === '') {
                alert(`Add a task`);
        }

        else {// Create li element
            const li = document.createElement('li');
            const span = document.createElement('span');
            // add class
            li.className = 'collection-item';
            // create textNode and append to li
            span.appendChild(document.createTextNode(taskInput.value));
            li.appendChild(span);
            // create new link createElement
            const link = document.createElement(`a`);
            // add class
            link.className = `delete-item secondary-content`;
            // add icon html
            link.innerHTML = `<i class='fa fa-remove'></i>`
            // append the link to li
            li.appendChild(link);

            // append li to ul
            taskList.appendChild(li);

            // Store in LS
            storeTask(taskInput.value);

            taskInput.value = ``;
        }
        
        e.preventDefault();        
    });

    //remove task
    taskList.addEventListener(`click`, function (e) {
        if (e.target.parentElement.classList.contains(`delete-item`)) {
            if (confirm(`Are you sure?`))
                e.target.parentElement.parentElement.remove();
        }

        removeTask(e.target.parentElement.parentElement);
    });

    //clear tasks
    clearBtn.addEventListener(`click`, function (e) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        clearTask();
    });

    //filter tasks
    filter.addEventListener(`input`, function (e) {
        const text = e.target.value.toLowerCase();
        
        document.querySelectorAll(`.collection-item`).forEach(function (task) {
            const item = task.firstChild.textContent;

            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = `block`;
                let pattern = new RegExp(text, "gi");
                task.firstElementChild.innerHTML = task.firstElementChild.textContent.replace(pattern, "<mark>$&</mark>");
            } else {
                task.style.display = `none`;
            }
        });
    });
}


//LS
function storeTask(task) {
    var tasks;
    if (localStorage.getItem(`tasks`) === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem(`tasks`));
    }

    tasks.push(task);
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

function getTask() {
    var tasks;
    if (localStorage.getItem(`tasks`) === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem(`tasks`));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        // add class
        li.className = 'collection-item';
        // create textNode and append to li
        span.appendChild(document.createTextNode(task));
        li.appendChild(span);
        // create new link createElement
        const link = document.createElement(`a`);
        // add class
        link.className = `delete-item secondary-content`;
        // add icon html
        link.innerHTML = `<i class='fa fa-remove'></i>`
        // append the link to li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);        
    });
}

function removeTask(taskItem) {
    var tasks;
    if (localStorage.getItem(`tasks`) === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem(`tasks`));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

function clearTask() {
    localStorage.clear();
}
