let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Fonction pour afficher le formulaire de création de tâche
function Afficher_form() {
    document.getElementById("crud-modal").classList.remove("hidden");
}

// Fonction pour cacher le formulaire et le réinitialiser
function hideModal() {
    document.getElementById("crud-modal").classList.add("hidden");
    document.getElementById("taskForm ").reset();
}

// Fonction pour ajouter une tâche
function AddTask(event) {
    event.preventDefault();

    const title = document.getElementById("name").value.trim();
    const startDate = document.getElementById("startdate").value;
    const endDate = document.getElementById("duedate").value;
    const description = document.getElementById("description").value.trim();
    let isValid = true;

    if (title === "") {
        alert("Le titre est requis.");
        isValid = false;
    } else if (title.length > 16) {
        alert("Le titre ne doit pas dépasser 16 caractères.");
        isValid = false;
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        alert("La date de début doit être antérieure ou égale à la date de fin.");
        isValid = false;
    }
    if (description === "") {
        alert("La description est vide.");
        isValid = false;
    }

    if (isValid) {
        // const id = `${Date.now()}`;
        let id = Date.now();
        const task = getTaskFromForm(id);
        saveTaskToLocalStorage(task);
        displayTask(task);
        hideModal();
    }
}

// Fonction pour sauvegarder une tâche dans localStorage
function saveTaskToLocalStorage(task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fonction pour afficher une tâche sur la page
function displayTask(task) {
    const existingTask = document.getElementById(task.id);
    if (existingTask) existingTask.remove();

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("border-l-4", "bg-white", "p-4", "rounded-lg", "shadow", "transform", "transition", "duration-500", "hover:scale-125");
    taskContainer.draggable = true;
    taskContainer.ondragstart = drag;
    taskContainer.id = task.id;

    if (task.priority === "P1") taskContainer.classList.add("border-red-500");
    else if (task.priority === "P2") taskContainer.classList.add("border-orange-500");
    else if (task.priority === "P3") taskContainer.classList.add("border-green-400");

    taskContainer.innerHTML = `
    <p class="font-medium">${task.title}</p>
    <p class="font-small">${task.description}</p>
    <p class="text-gray-500 text-sm">From ${task.startDate} Until ${task.endDate}</p>
    <div class="mt-2 flex space-x-2">
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="supprimerTask('${task.id}')">Delete</button>
        <button class="bg-yellow-400 text-white px-2 py-1 rounded" onclick="editTask('${task.id}')">Edit</button>
    </div>
`;
    const column = document.getElementById(`${task.status}-tasks`);
    column.appendChild(taskContainer);
    Mise_a_jour_nbr_Tache();
}

// Récupère les informations de tâche depuis le formulaire
function getTaskFromForm(id) {
    return {
        id: id,
        title: document.getElementById("name").value,
        startDate: document.getElementById("startdate").value,
        endDate: document.getElementById("duedate").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value,
        description: document.getElementById("description").value,
    };
}
function compareIds(id1, id2) {
    return Number(id1) === Number(id2);
}

function editTask(id) {
    // console.log("Type of task.id:", typeof task.id); // Vérifiez le type de task.id
console.log("Type of id in editTask:", typeof id);
    console.log("Edit task called with ID:", id); 
    const taskToEditIndex = tasks.findIndex(task => compareIds(task.id, id));

    console.log("taskToEditIndex:", taskToEditIndex);
    if (taskToEditIndex !== -1) {
        const taskToEdit = tasks[taskToEditIndex];

        // Populate the form with the task details
        document.getElementById("name").value = taskToEdit.title;
        document.getElementById("startdate").value = taskToEdit.startDate;
        document.getElementById("duedate").value = taskToEdit.endDate;
        document.getElementById("status").value = taskToEdit.status;
        document.getElementById("priority").value = taskToEdit.priority;
        document.getElementById("description").value = taskToEdit.description;

        Afficher_form(); // Show the form

        document.getElementById("taskForm").onsubmit = function(event) {
            event.preventDefault();

            // Get the updated task from the form
            const updatedTask = getTaskFromForm(id);
            console.log("Updating task with ID:", id);

            // Update the task in the array
            tasks[taskToEditIndex] = updatedTask;

            // Update local storage
            localStorage.setItem("tasks", JSON.stringify(tasks));

            // Remove the old task element from the DOM
            const oldTaskElement = document.getElementById(id);
            if (oldTaskElement) {
                oldTaskElement.remove();
            }

            // Display the updated task
            displayTask(updatedTask);
            hideModal(); // Hide the modal after updating
        };
    }
}

// Function to delete a task
function supprimerTask(id) {
    console.log("Deleting task with ID:", id); // Debugging line
    console.log("Current tasks before deletion:", tasks);

    // Ensure id is a number for comparison
    tasks = tasks.filter(task => compareIds(task.id, id)==0); // Ensure id is of the same type

    console.log("Tasks after filtering:", tasks);

    const taskElement = document.getElementById(id);
    if (taskElement) {
        taskElement.remove();
    }

    // Update local storage with the new tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Updated tasks in local storage:", JSON.parse(localStorage.getItem("tasks")));

    Mise_a_jour_nbr_Tache(); // Update task count or refresh display
}

function Mise_a_jour_nbr_Tache() {
    const statusCounts = { "todo": 0, "doing": 0, "done": 0 };

    tasks.forEach(task => {
        if (statusCounts[task.status] !== undefined) {
            statusCounts[task.status]++;
        }
    });
    document.getElementById("todo-count").textContent = statusCounts["todo"];
    document.getElementById("doing-count").textContent = statusCounts["doing"];
    document.getElementById("done-count").textContent = statusCounts["done"];
}



// function for recherche
function searchTaskByTitle() {
    const searchTitle = document.getElementById("searchInput").value.toLowerCase().trim();
    
    document.querySelectorAll(".space-y-4").forEach(column => column.innerHTML = "");

    const matchingTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTitle));

    if (matchingTasks.length > 0) {
        matchingTasks.forEach(task => {
            displayTask(task); 
        });
    } else {
        alert("Il n'existe pas de tâche avec ce titre.");
    }
}

function filtrerByPriority() {
    const selectedPriority = document.getElementById("priorityFilter").value;
    document.querySelectorAll(".task-column").forEach(column => column.innerHTML = "");
    const filteredTasks = tasks.filter(task => selectedPriority === "all" || task.priority === selectedPriority);
    filteredTasks.forEach(task => displayTask(task));
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

    const nouveauStatut = event.target.getAttribute("data-status");
    if (nouveauStatut) {
        task.setAttribute("data-status", nouveauStatut);
    }

    const index = tasks.findIndex(t => t.id === data);
    if (index !== -1) {
        tasks[index].status = nouveauStatut;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    Mise_a_jour_nbr_Tache();
}

// Sorting tasks
function sortTasks() {
    const sortType = document.getElementById("sortType").value;

    tasks.sort((a, b) => {
        switch (sortType) {
            case "dueDateAsc":
                return new Date(a.endDate) - new Date(b.endDate);
            case "dueDateDesc":
                return new Date(b.endDate) - new Date(a.endDate);
            case "priorityAsc":
                return a.priority.localeCompare(b.priority);
            case "priorityDesc":
                return b.priority.localeCompare(a.priority);
            default:
                return 0;
        }
    });

    document.querySelectorAll(".task-column").forEach(column => column.innerHTML = "");

    tasks.forEach(task => displayTask(task));
}
window.onload = () => tasks.forEach(task => displayTask(task));