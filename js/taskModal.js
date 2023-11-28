const openTaskModal = (btns) => {
    btns.forEach((btn) => {
        btn.onclick = () => {
            addTaskModalContainer.style.display = "flex";
            currentList = btn.parentNode.parentNode.parentNode;
        };
    });
};

const closeTaskModal = () => {
    closeTaskModalBtn.onclick = () => {
        addTaskModalContainer.style.display = "none";
    };

    addTaskModalContainer.addEventListener('click', (event) => {
        if (event.currentTarget == event.target) {
            addTaskModalContainer.style.display = "none";
        }
    });
};

const addNewTask = () => {
    createTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (modalTaskName.value.trim() == "") {
            noNameError.style.display = "block";
            modalTaskName.value = "";
        } else {
            noNameError.style.display = "none";
            const newTask = document.createElement("div");
            newTask.classList.add("task");
            newTask.setAttribute("draggable", true);

            if (modalTaskTag.value.trim() == "") {
                newTask.innerHTML = `<p class="task-name">${modalTaskName.value}</p>
                <p class="task-desc">${modalTaskDesc.value}</p><button class="delete-task-btn"><i class="fa-solid fa-trash"></i></button>`;
                currentList.appendChild(newTask);
                modalTaskName.value = "";
                modalTaskDesc.value = "";
            } else {
                let color = "black";
                tagColors.forEach((btn) => {
                    if (btn.checked) {
                        color = btn.value;
                    }
                });
                if (color == "random") {
                    color = `rgb(${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)})`;
                }
                newTask.innerHTML = `<p class="task-name">${modalTaskName.value}</p><p class="task-tag" style="background: ${color};">${modalTaskTag.value}</p><p class="task-desc">${modalTaskDesc.value}</p><button class="delete-task-btn"><i class="fa-solid fa-trash"></i></button>`;
                currentList.appendChild(newTask);
                modalTaskName.value = "";
                modalTaskDesc.value = "";
                modalTaskTag.value = "";
            }
            const draggables = document.querySelectorAll(".task");
            const droppables = document.querySelectorAll(".list");
            dragAndDrop(draggables, droppables);
            const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");
            deleteTask(deleteTaskBtn);
        }
    });
};
