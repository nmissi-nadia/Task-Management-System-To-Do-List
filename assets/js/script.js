function Afficher_form() {
    document.getElementById("crud-modal").classList.remove("hidden");
}

function hideModal() {
    document.getElementById("crud-modal").classList.add("hidden");
    document.getElementById("taskForm").reset();
}

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

    displayTask(task);
    hideModal();
}

function displayTask(task) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("border-l-4", "bg-white", "p-4", "rounded-lg", "shadow");
    taskContainer.draggable = true;
    taskContainer.ondragstart = drag;
    taskContainer.id = task.title;

    // Setting priority color
    if (task.priority === "P1") taskContainer.classList.add("border-red-500");
    else if (task.priority === "P2") taskContainer.classList.add("border-orange-500");
    else if (task.priority === "P3") taskContainer.classList.add("border-green-500");

    taskContainer.innerHTML = `
        <p class="font-medium">${task.title}</p>
        <p class="text-gray-500 text-sm">${task.startDate} - ${task.endDate}</p>
         <div class="mt-2 flex space-x-2">
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTask(this)">Delete</button>
                <button class="bg-yellow-400 text-white px-2 py-1 rounded" onclick="editTask(this)">Edit</button>
            </div>
    `;

    const column = document.getElementById(`${task.status}-tasks`);
    column.appendChild(taskContainer);
}

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

function filter_Taches() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    document.querySelectorAll(".task-card").forEach(task => {
        task.style.display = task.textContent.toLowerCase().includes(searchText) ? "" : "none";
    });
}
