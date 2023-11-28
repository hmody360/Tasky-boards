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

window.onload = () => {
    loadContentFromStorage();
};

window.onbeforeunload = () => {
    saveContentToStorage();
};

getBoardInfo();
addNewList(addList, addListInput, addListBtn);
addNewTask();
openTaskModal(addTaskBtn);
closeTaskModal();
deleteList(deleteListBtn);
deleteTask(deleteTaskBtn);