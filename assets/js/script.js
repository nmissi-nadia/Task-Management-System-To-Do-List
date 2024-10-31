// Fonction pour afficher le formulaire de création de tâche
function Afficher_form() {
    document.getElementById("crud-modal").classList.remove("hidden");
}

// Fonction pour cacher le formulaire et le réinitialiser
function hideModal() {
    document.getElementById("crud-modal").classList.add("hidden");
    document.getElementById("taskForm").reset();
}

// Fonction pour ajouter une tâche
function addTask(event) {
    event.preventDefault();

    const title = document.getElementById("name").value;
    const startDate = document.getElementById("startdate").value;
    const endDate = document.getElementById("duedate").value;
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;
    const description = document.getElementById("description").value;

    const task = {
        title,
        startDate,
        endDate,
        status,
        priority,
        description,
    };

    saveTaskToLocalStorage(task); // Sauvegarde la tâche dans localStorage
    displayTask(task);
    hideModal();
}

// Fonction pour sauvegarder une tâche dans localStorage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fonction pour afficher une tâche sur la page
function displayTask(task) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("border-l-4", "bg-white", "p-4", "rounded-lg", "shadow");
    taskContainer.draggable = true;
    taskContainer.ondragstart = drag;
    taskContainer.id = task.title;

    if (task.priority === "P1") taskContainer.classList.add("border-red-500");
    else if (task.priority === "P2") taskContainer.classList.add("border-orange-500");
    else if (task.priority === "P3") taskContainer.classList.add("border-green-500");

    taskContainer.innerHTML = `
        <p class="font-medium">${task.title}</p>
        <p class="text-gray-500 text-sm">${task.startDate} - ${task.endDate}</p>
        <div class="mt-2 flex space-x-2">
            <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTask('${task.title}')">Delete</button>
            <button class="bg-yellow-400 text-white px-2 py-1 rounded" onclick="editTask('${task.title}')">Edit</button>
        </div>
    `;

    const column = document.getElementById(`${task.status}-tasks`);
    column.appendChild(taskContainer);
}

function getTaskFromForm() {
    return {
        title: document.getElementById("name").value,
        startDate: document.getElementById("startdate").value,
        endDate: document.getElementById("duedate").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value,
        description: document.getElementById("description").value,
    };
}


function editTask(title) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEditIndex = tasks.findIndex(task => task.title === title); // Get index instead of object

    if (taskToEditIndex !== -1) {
        const taskToEdit = tasks[taskToEditIndex]; 

       
        document.getElementById("name").value = taskToEdit.title;
        document.getElementById("startdate").value = taskToEdit.startDate;
        document.getElementById("duedate").value = taskToEdit.endDate;
        document.getElementById("status").value = taskToEdit.status;
        document.getElementById("priority").value = taskToEdit.priority;
        document.getElementById("description").value = taskToEdit.description;

        Afficher_form(); 

        
        document.getElementById("taskForm").onsubmit = function(event) {
            event.preventDefault();

            const updatedTask = getTaskFromForm(); 

            
            tasks[taskToEditIndex] = updatedTask; 

            
            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTask(updatedTask);
            hideModal(); 
        };
    }
}


// Fonction pour supprimer une tâche de la page et de localStorage
function deleteTask(title) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task.title !== title);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    const taskCard = document.getElementById(title);
    taskCard.remove();
}

// Fonction pour charger les tâches depuis localStorage au chargement de la page
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => displayTask(task));
}

// Fonction de gestion du drag-and-drop
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const task = document.getElementById(data);
    event.target.appendChild(task);
}

// Filtrage des tâches
function filter_Taches() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    document.querySelectorAll(".task-card").forEach(task => {
        task.style.display = task.textContent.toLowerCase().includes(searchText) ? "" : "none";
    });
}

// Charger les tâches quand la page est prête
window.onload = loadTasks;
