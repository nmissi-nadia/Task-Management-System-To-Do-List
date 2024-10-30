// // Show and hide modal
// function showModal() {
//     document.getElementById('crud-modal').classList.remove('hidden');
// }

// function hideModal() {
//     document.getElementById('crud-modal').classList.add('hidden');
// }

// function addTask(title, description, status, dueDate, priority) {
//     const taskContainer = document.createElement('div');
//     taskContainer.classList.add('p-4', 'rounded-lg', 'shadow', 'bg-white', 'border-l-4');

//     if (priority === 'P1') {
//         taskContainer.classList.add('border-red-500');
//     } else if (priority === 'P2') {
//         taskContainer.classList.add('border-orange-500');
//     } else if (priority === 'P3') {
//         taskContainer.classList.add('border-green-500');
//     }

//     taskContainer.innerHTML = `
//          <div class="border-l-4 border-${priority === 'P1' ? 'red' : priority === 'P2' ? 'orange' : 'green'}-500-500 bg-white p-4 rounded-lg shadow" style>
//             <p class="font-medium">${title}</p>
//             <p class="text-sm text-gray-600">${description}</p>
//             <p class="text-sm text-gray-500">Due: ${dueDate}</p>
//                 <div class="mt-2 flex space-x-2">
//                     <button class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//                     <button class="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
//                 </div>
//          </div>
//     `;

//     document.getElementById(`${status}-column`).appendChild(taskContainer);
// }


// document.getElementById('taskForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const title = document.getElementById('name').value;
//     const description = document.getElementById('description').value;
//     const dueDate = document.getElementById('dueDate').value;
//     const status = document.getElementById('status').value;
//     const priority = document.getElementById('priority').value;

//     addTask(title, description, status, dueDate, priority);
//     document.getElementById('taskForm').reset();
//     hideModal();
// });
// Show and hide modal
function showModal() {
    document.getElementById('crud-modal').classList.remove('hidden');
}

function hideModal() {
    document.getElementById('crud-modal').classList.add('hidden');
}


function addTask(title, description, status, dueDate, priority) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('p-4', 'rounded-lg', 'shadow', 'bg-white', 'border-l-4');

    
    if (priority === 'P1') {
        taskContainer.classList.add('border-red-500');
    } else if (priority === 'P2') {
        taskContainer.classList.add('border-orange-500');
    } else if (priority === 'P3') {
        taskContainer.classList.add('border-green-500');
    }

    taskContainer.innerHTML = `
        <div>
            <p class="font-medium">${title}</p>
            <p class="text-sm text-gray-600">${description}</p>
            <p class="text-sm text-gray-500">Due: ${dueDate}</p>
            <div class="mt-2 flex space-x-2">
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTask(this)">Delete</button>
                <button class="bg-yellow-400 text-white px-2 py-1 rounded" onclick="editTask(this)">Edit</button>
            </div>
        </div>
    `;

    
    document.getElementById(`${status}-column`).appendChild(taskContainer);
}


function deleteTask(button) {
    button.closest('.p-4').remove();
}


function editTask(button) {
    alert('Edit feature to be implemented');
}


document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('end-date').value; // Ensure the ID matches your HTML
    const status = document.getElementById('statut').value;
    const priority = document.getElementById('priorite').value;

    addTask(title, description, status, dueDate, priority);
    document.getElementById('taskForm').reset();
    hideModal();
});
