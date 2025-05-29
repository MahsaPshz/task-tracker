document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    const todoContainer = document.querySelector(".todos-container"); 

    // get saved tasks 
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // save tasks to browser
    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // change size of box 
    const toggleEmptyState = () => {
        if (taskList.children.length > 0) {
            todoContainer.style.width = "100%"; 
        } else {
            todoContainer.style.width = "50%"; 
        }
    };

    // show tasks on the page
    const renderTasks = () => {
        taskList.innerHTML = ""; // clean list

        tasks.forEach((task, index) => {
            // make new task item
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

            // get checkbox and delete button
            const checkbox = li.querySelector(".checkbox");
            const deleteBtn = li.querySelector(".delete-btn");

            // when checkbox is clicked
            checkbox.addEventListener("change", () => {
                tasks[index].completed = checkbox.checked; 
                saveTasks(); 
            });

            // when delete button is clicked
            deleteBtn.addEventListener("click", () => {
                tasks.splice(index, 1); 
                saveTasks(); 
                renderTasks();
            });

            // put task in the list
            taskList.appendChild(li);
        });

       
        toggleEmptyState();
    };

    // add new task
    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim(); 
        if (!taskText) return;

        tasks.push({ text: taskText, completed: false }); // add to list
        saveTasks(); 
        renderTasks(); 
        taskInput.value = ""; 
    };

    // when button is clicked, add task
    addTaskBtn.addEventListener("click", addTask);

    // when Enter key is pressed, add task
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask(e);
        }
    });


    renderTasks(); 
});
