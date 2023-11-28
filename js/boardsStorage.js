// storage.js
const initializeStorage = () => {
    if (localStorage.length == 0) {
        const arr = [];
        const JSONEDArr = JSON.stringify(arr);
        localStorage.setItem("boards", JSONEDArr);
        localStorage.setItem("boardID", JSONEDArr);
        localStorage.setItem("tasklist", JSONEDArr);
    }
};

const setActiveBoard = (board) => {
    board.forEach((obj) => {
        obj.onclick = () => {
            localStorage.setItem("activeBoard", obj.id);
        };
    });
};

const removeBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
        let removeableElement = board[i].parentNode;
        board[i].onclick = () => {
            removeableElement.href = "#"
            const boardArr = JSON.parse(localStorage.getItem("boards"));
            const taskArr = JSON.parse(localStorage.getItem("tasklist"));
            const removeableObj = boardArr.findIndex(obj => obj.id == removeableElement.id);
            const removableContent = taskArr.findIndex(obj => obj.id == removeableElement.id);
            boardArr.splice(Number(removeableObj), 1);
            taskArr.splice(Number(removableContent), 1);
            const boardIDArr = JSON.parse(localStorage.getItem("boardID"));
            const falseObject = boardIDArr.find(obj => obj.id == removeableElement.id);
            falseObject.status = false;
            localStorage.setItem("boards", JSON.stringify(boardArr));
            localStorage.setItem("boardID", JSON.stringify(boardIDArr));
            localStorage.setItem("tasklist", JSON.stringify(taskArr));
            removeableElement.parentNode.removeChild(removeableElement);
        };
    }
};

const allocateID = () => {
    const idArr = JSON.parse(localStorage.getItem("boardID"));
    if (idArr.length > 0) {
        let obj = idArr.find(obj => obj.status == false);
        if (obj != undefined) {
            obj.status = true;
            localStorage.setItem("boardID", JSON.stringify(idArr));
            return obj.id;
        }
    }
    const boardIDObj = {
        id: idArr.length + 1,
        status: true
    };
    idArr.push(boardIDObj);
    localStorage.setItem("boardID", JSON.stringify(idArr));
    return Number(boardIDObj.id);
};

const PushObjToStorage = (name, bg, id) => {
    const BoardObject = {
        id: id,
        name: name,
        bg: bg
    };
    const arr = JSON.parse(localStorage.getItem("boards"));
    arr.push(BoardObject);
    localStorage.setItem("boards", JSON.stringify(arr));
};

const PullObjFromStorage = () => {
    window.onload = () => {
        const boardArr = JSON.parse(localStorage.getItem("boards"));
        if (boardArr.length > 0) {
            boardArr.forEach(Obj => {
                const board = document.createElement("a");
                board.className = "board-tab";
                board.id = Obj.id;
                board.href = "/html/boardPage.html";
                board.style.backgroundImage = Obj.bg;
                board.innerHTML = `<label>${Obj.name}</label><i class="fa-solid fa-trash" id="delete-board"></i>`;
                boardContainer.appendChild(board);
            });
        }
        const boardList = document.querySelectorAll(".board-tab");
        const deleteBoard = document.querySelectorAll("#delete-board");
        setActiveBoard(boardList);
        removeBoard(deleteBoard);
    };
};
