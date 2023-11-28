const deleteList = (btns) => {
    btns.forEach((btn) => {
        btn.onclick = () => {
            btn.parentElement.parentElement.parentElement.remove();
        };
    });
};

const deleteTask = (btns) => {
    btns.forEach((btn) => {
        btn.onclick = () => {
            btn.parentElement.remove();
        };
    });
};
