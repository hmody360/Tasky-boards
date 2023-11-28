const saveContentToStorage = () => {
    const taskArr = JSON.parse(localStorage.getItem("tasklist"));
    const currBoard = JSON.parse(localStorage.getItem("activeBoard"));
    const taskObj = taskArr.find(obj => Number(obj.id) == currBoard);
    if (taskObj == undefined) {
        const obj = {
            id: currBoard,
            content: listContainer.innerHTML
        };
        taskArr.push(obj);
        localStorage.setItem("tasklist", JSON.stringify(taskArr));
        return null;
    }
    taskObj.content = listContainer.innerHTML;
    localStorage.setItem("tasklist", JSON.stringify(taskArr));
    return null;
};

const loadContentFromStorage = () => {
    const taskArr = JSON.parse(localStorage.getItem("tasklist"));
    const currBoard = JSON.parse(localStorage.getItem("activeBoard"));
    const obj = taskArr.find(obj => Number(obj.id) == currBoard);
    if (obj == undefined) {
        return;
    }
    listContainer.innerHTML = obj.content;

    const addTaskBtns = document.querySelectorAll(".add-task-btn");
    const addList = document.getElementById("add-list");
    const addListInput = document.getElementById("add-list-input");
    const addListBtn = document.getElementById("add-list-btn");
    addNewList(addList, addListInput, addListBtn);
    openTaskModal(addTaskBtns);

    const draggables = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".list");
    dragAndDrop(draggables, droppables);

    const deleteListBtn = document.querySelectorAll(".delete-list-btn");
    const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");
    deleteList(deleteListBtn);
    deleteTask(deleteTaskBtn);
};
