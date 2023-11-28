const pageContainer = document.getElementById("page-container")
const boardNameHeader = document.getElementById("board-name-header")
const title = document.getElementById("title")
const listContainer = document.getElementById("list-container")
const addList = document.getElementById("add-list")
const addListInput = document.getElementById("add-list-input")
const addListBtn = document.getElementById("add-list-btn")
const addTaskBtn = document.querySelectorAll(".add-task-btn")
const addTaskModalContainer = document.getElementById("add-task-modal-container")
const closeTaskModalBtn = document.getElementById("close-modal")
const modalTaskName = document.getElementById("modal-task-name")
const noNameError = document.getElementById("no-name-error")
const modalTaskDesc = document.getElementById("modal-task-desc")
const modalTaskTag = document.getElementById("modal-task-tag")
const deleteListBtn = document.querySelectorAll(".delete-list-btn")
const deleteTaskBtn = document.querySelectorAll(".delete-task-btn")
const tagColors = document.getElementsByName("tag-color")
const createTaskBtn = document.getElementById("create-task-btn")
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".list");


let currentList = 0
window.onload = () => {
    loadContentFromStorage()
}
window.onbeforeunload = () => {
    saveContentToStorage()
}
const getBoardInfo = () => {
    const idToFind = localStorage.getItem("activeBoard")
    const boardArr = JSON.parse(localStorage.getItem("boards"))
    const boardObj = boardArr.find(Obj => Number(Obj.id) == idToFind)
    pageContainer.style.backgroundImage = boardObj.bg
    boardNameHeader.innerText = boardObj.name
    title.innerText = boardObj.name
}

const saveContentToStorage = () => {
    const taskArr = JSON.parse(localStorage.getItem("tasklist"))
    const currBoard = JSON.parse(localStorage.getItem("activeBoard"))
    const taskObj = taskArr.find(obj => Number(obj.id) == currBoard)
    if (taskObj == undefined) {
        const obj = {
            id: currBoard,
            content: listContainer.innerHTML
        }
        taskArr.push(obj)
        localStorage.setItem("tasklist", JSON.stringify(taskArr))
        return null;
    }
    taskObj.content = listContainer.innerHTML
    localStorage.setItem("tasklist", JSON.stringify(taskArr))
    return null;
}
const loadContentFromStorage = () => {
    const taskArr = JSON.parse(localStorage.getItem("tasklist"))
    const currBoard = JSON.parse(localStorage.getItem("activeBoard"))
    const obj = taskArr.find(obj => Number(obj.id) == currBoard)
    if (obj == undefined) {
        return;
    }
    listContainer.innerHTML = obj.content

    const addTaskBtns = document.querySelectorAll(".add-task-btn");
    const addList = document.getElementById("add-list")
    const addListInput = document.getElementById("add-list-input")
    const addListBtn = document.getElementById("add-list-btn")
    addNewList(addList, addListInput, addListBtn)
    openTaskModal(addTaskBtns);
    console.log(localStorage);

    const draggables = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".list");
    dragAndDrop(draggables, droppables)
    // ddDragula(droppables)

    const deleteListBtn = document.querySelectorAll(".delete-list-btn")
    const deleteTaskBtn = document.querySelectorAll(".delete-task-btn")
    deleteList(deleteListBtn)
    deleteTask(deleteTaskBtn)
}
// const ddDragula = (containers) => {
//     let arr = []
//     containers.forEach((element) => {
//         arr.push(element)
//     })
//     dragula({
//         containers: arr,
//         moves: function (el) {
//             // Make list info non-draggable
//             return !el.classList.contains("list-info");
//         },
//         accepts: function (el, target, source, sibling) {
//             return !source.classList.contains("list-info");
//         }
//     });
// }
const dragAndDrop = (drags, drops) => {
    drags.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", () => {
            task.classList.remove("is-dragging");
        });
    });

    drops.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();

            const bottomTask = insertAboveTask(zone, e.clientY);
            const curTask = document.querySelector(".is-dragging");

            if (!bottomTask) {
                zone.appendChild(curTask);
            } else {
                zone.insertBefore(curTask, bottomTask);
            }
        });
    });
}
const insertAboveTask = (zone, mouseY) => {
    const elems = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    elems.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};

const addNewList = (addlist, addinput, addbtn) => {
    addbtn.onclick = () => {
        if (addinput.value.trim() == "") {
            return;
        }
        const newList = document.createElement("div")
        newList.classList.add("list")
        newList.id = "list"
        newList.innerHTML = `<div class="list-info"><h3 id="list-name">${addinput.value}</h3><div class="list-info-btns"><button class="delete-list-btn"><i class="fa-solid fa-trash"></i></button><button class="add-task-btn"><i class="fa-solid fa-plus"></i></button></div></div>`
        listContainer.insertBefore(newList, addlist)
        addinput.value = ""
        const addTaskBtn = document.querySelectorAll(".add-task-btn") //I'm going to have so much fun explaining this one ;)
        openTaskModal(addTaskBtn)
        const draggables = document.querySelectorAll(".task");
        const droppables = document.querySelectorAll(".list");
        // ddDragula(droppables)
        dragAndDrop(draggables, droppables)
        const deleteListBtn = document.querySelectorAll(".delete-list-btn")
        deleteList(deleteListBtn)

    }

}
const openTaskModal = (btns) => {
    btns.forEach((btn) => {
        btn.onclick = () => {
            addTaskModalContainer.style.display = "flex"
            currentList = btn.parentNode.parentNode.parentNode
        }
    })
}
const closeTaskModal = () => {
    closeTaskModalBtn.onclick = () => {
        addTaskModalContainer.style.display = "none"
    }
    addTaskModalContainer.addEventListener('click', (event) => {
        if (event.currentTarget == event.target) {
            addTaskModalContainer.style.display = "none"
        }
    })
}
const addNewTask = () => {
    createTaskBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (modalTaskName.value.trim() == "") {
            noNameError.style.display = "block"
            modalTaskName.value = ""
        } else {
            noNameError.style.display = "none"
            const newTask = document.createElement("div")
            newTask.classList.add("task")
            newTask.setAttribute("draggable", true);

            if (modalTaskTag.value.trim() == "") {
                newTask.innerHTML = `<p class="task-name">${modalTaskName.value}</p>
                <p class="task-desc">${modalTaskDesc.value}</p><button class="delete-task-btn"><i class="fa-solid fa-trash"></i></button>`
                currentList.appendChild(newTask)
                modalTaskName.value = ""
                modalTaskDesc.value = ""
            } else {
                let color = "black"
                tagColors.forEach((btn) => {
                    if (btn.checked) {
                        color = btn.value
                    }
                })
                if (color == "random") {
                    color = `rgb(${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)})`
                }
                newTask.innerHTML = `<p class="task-name">${modalTaskName.value}</p><p class="task-tag" style="background: ${color};">${modalTaskTag.value}</p><p class="task-desc">${modalTaskDesc.value}</p><button class="delete-task-btn"><i class="fa-solid fa-trash"></i></button>`
                currentList.appendChild(newTask)
                modalTaskName.value = ""
                modalTaskDesc.value = ""
                modalTaskTag.value = ""
            }
            const draggables = document.querySelectorAll(".task");
            const droppables = document.querySelectorAll(".list");
            dragAndDrop(draggables, droppables)
            // ddDragula(droppables)
            const deleteTaskBtn = document.querySelectorAll(".delete-task-btn")
            deleteTask(deleteTaskBtn)
        }
    })


}
const deleteList = (btns) => {
    btns.forEach((btn) => {
        btn.onclick = () => {
            btn.parentElement.parentElement.remove()
        }
    })
}
const deleteTask = (btns) => {
    btns.forEach((btn) => {
        btn.onclick = () => {
            btn.parentElement.remove()
        }
    })
}

dragAndDrop(draggables, droppables)
// ddDragula(droppables)
getBoardInfo()
addNewList(addList, addListInput, addListBtn)
addNewTask()
openTaskModal(addTaskBtn)
closeTaskModal()
deleteList(deleteListBtn)
deleteTask(deleteTaskBtn)

