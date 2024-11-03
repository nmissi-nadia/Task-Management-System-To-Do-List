let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => displayTask(task));
console.log(tasks);

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
    let id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const task = getTaskFromForm(id);
    if(isValid === true){
        saveTaskToLocalStorage(task); 
        displayTask(task);
        hideModal();
    }else{
        Afficher_form();
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
    taskContainer.classList.add("border-l-4", "bg-white", "p-4", "rounded-lg", "shadow","transform", "transition","duration-500" ,"hover:scale-125","hover:bg-cyan-600");
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
            <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="supprimerTask(${task.id})">Delete</button>
            <button class="bg-yellow-400 text-white px-2 py-1 rounded" onclick="editTask(${task.id})">Edit</button>
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

// Fonction pour éditer une tâche
function editTask(id) {
    const taskToEditIndex = tasks.findIndex(task => task.id === id); 

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

            const updatedTask = getTaskFromForm(id);

            tasks[taskToEditIndex] = updatedTask; 
            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTask(updatedTask);
            hideModal(); 
        };
    }
}

// Fonction pour supprimer une tâche
function supprimerTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    const taskCard = document.getElementById(id);
    if (taskCard) taskCard.remove();
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
    const selectedPriority = document.getElementById("priorityFilter").value;

    document.querySelectorAll(".task-card").forEach(task => {
        const taskTitle = task.querySelector(".task-title").textContent.toLowerCase();
        const taskPriority = task.getAttribute("data-priority"); // Supposant que chaque tâche a un attribut data-priority

        // Condition d'affichage : correspond au texte recherché et à la priorité sélectionnée
        if ((searchText === "" || taskTitle.includes(searchText)) &&
            (selectedPriority === "all" || taskPriority === selectedPriority)) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
}

// function for recherche
function searchTaskByTitle() {
    const searchTitle = document.getElementById("searchInput").value.toLowerCase().trim();
    const Tachecorres = tasks.filter(task => task.title.toLowerCase() === searchTitle);

    // Vider toutes les colonnes avant d'afficher le résultat de recherche
    document.querySelectorAll(".task-column").forEach(column => column.innerHTML = "");

    if (Tachecorres.length > 0) {
        Tachecorres.forEach(task => {
            // Affiche chaque tâche dans sa colonne associée selon son statut
            const taskColumnId = `${task.status}-tasks`;
            const taskColumn = document.getElementById(taskColumnId);

            if (taskColumn) {
                displayTask(task);
                taskColumn.appendChild(document.getElementById(task.id)); // Associe la tâche affichée à sa colonne
            }
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


// le mise a jour du nombre des taches pour chaque column
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

function sortTasks() {
    const sortType = document.getElementById("sortType").value;

    // Tri les tâches en fonction du type et de l'ordre
    tasks.sort((a, b) => {
        switch (sortType) {
            case "dueDateAsc":
                return new Date(a.endDate) - new Date(b.endDate); // Tri par date croissante
            case "dueDateDesc":
                return new Date(b.endDate) - new Date(a.endDate); // Tri par date décroissante
            case "priorityAsc":
                return a.priority.localeCompare(b.priority); // Tri par priorité croissante (P1, P2, P3)
            case "priorityDesc":
                return b.priority.localeCompare(a.priority); // Tri par priorité décroissante (P3, P2, P1)
            default:
                return 0;
        }
    });

    // Efface les tâches affichées dans chaque colonne
    document.querySelectorAll(".task-column").forEach(column => column.innerHTML = "");

    // Réaffiche les tâches triées
    tasks.forEach(task => displayTask(task));
}





window.onload = () => tasks.forEach(task => displayTask(task));



