const getBoardInfo = () => {
    const idToFind = localStorage.getItem("activeBoard");
    const boardArr = JSON.parse(localStorage.getItem("boards"));
    const boardObj = boardArr.find(Obj => Number(Obj.id) == idToFind);
    pageContainer.style.backgroundImage = boardObj.bg;
    boardNameHeader.innerText = boardObj.name;
    title.innerText = boardObj.name;
};
