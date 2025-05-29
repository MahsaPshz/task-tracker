document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const todoContainer = document.querySelector(".todos-container"); 

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const toggleEmptyState = () => {
        if (taskList.children.length > 0) {
            todoContainer.style.width = "100%";
        } else {
            todoContainer.style.width = "50%";
        }
    };

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;

            const checkbox = li.querySelector(".checkbox");
            const deleteBtn = li.querySelector(".delete-btn");

            checkbox.addEventListener("change", () => {
                tasks[index].completed = checkbox.checked;
                saveTasks();
            });

            deleteBtn.addEventListener("click", () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            taskList.appendChild(li);
        });

        toggleEmptyState();
    };

    const addTask = (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (!taskText) return;

        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();

        taskInput.value = "";
    };

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask(e);
        }
    });

    renderTasks(); 
});
