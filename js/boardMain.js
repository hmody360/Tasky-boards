const boardContainer = document.getElementById("board-container");
const addBoard = document.getElementById("add-board-Btn");
const modalContainer = document.getElementById("add-board-modal-container");
const modal = document.getElementById("add-board-modal");
const closeModalBtn = document.getElementById("close-modal");
const boardName = document.getElementById("board-name");
const modalBackgroundImg = document.getElementById("modal-bg-img");
const generateBGBtn = document.getElementById("generate-bg-btn");
const createBtn = document.getElementById("create-btn");
const noNameError = document.getElementById("no-name-error");

initializeStorage();
PullObjFromStorage();
setDefaultBackground();
touchAddBtn();
openModal();
closeModal();
generateBGBtn.addEventListener('click', (event) => {
    event.preventDefault();
    generateBG();
});
createBoard();
console.log(localStorage);
