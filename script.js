const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function addTask() {
    console.log(inputBox)
    const task = inputBox.value.trim();
    if (!task) {
        alert("Task Missing");
        return;
    }
    const li = document.createElement("li");
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toLocaleTimeString();
    li.innerHTML = `
        <label>
            <input type="checkbox"></input>
            <span>${task} ${currentDate} ${currentTime}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;
    listContainer.appendChild(li);
    inputBox.value = ""

    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn")
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function() {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    })

    editBtn.addEventListener("click", function() {
        const update = prompt("edit task:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            listContainer.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    })

    deleteBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete?")) {
            li.remove();
            updateCounters();
        }
    }) 

    updateCounters();
}

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

function deleteAll() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        listContainer.innerHTML = "";

        updateCounters();
    }
}