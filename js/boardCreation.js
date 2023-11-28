const touchAddBtn = () => {
    addBoard.onmouseover = () => {
        addBoard.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    };

    addBoard.onmouseleave = () => {
        addBoard.innerHTML = `<i class="fa-solid fa-plus fa-fade"></i>`;
    };
};

const createBoard = () => {
    createBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (boardName.value == "") {
            noNameError.style.display = "block";
        } else {
            noNameError.style.display = "none";
            const board = document.createElement("a");
            board.className = "board-tab";
            board.id = allocateID();
            board.href = "/html/boardPage.html";
            board.style.backgroundImage = modalBackgroundImg.style.backgroundImage;
            board.innerHTML = `<label>${boardName.value}</label><i class="fa-solid fa-trash" id="delete-board"></i>`;
            boardContainer.appendChild(board);
            PushObjToStorage(boardName.value, board.style.backgroundImage, board.id);
            boardName.value = "";
            modalContainer.style.display = "none";
            setDefaultBackground();
            const boardList = document.querySelectorAll(".board-tab");
            setActiveBoard(boardList);
        }
    });
};
