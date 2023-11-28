const addNewList = (addlist, addinput, addbtn) => {
    addbtn.onclick = () => {
        if (addinput.value.trim() == "") {
            return;
        }
        const newList = document.createElement("div");
        newList.classList.add("list");
        newList.id = "list";
        newList.innerHTML = `<div class="list-info"><h3 id="list-name">${addinput.value}</h3><div class="list-info-btns"><button class="delete-list-btn"><i class="fa-solid fa-trash"></i></button><button class="add-task-btn"><i class="fa-solid fa-plus"></i></button></div></div>`;
        listContainer.insertBefore(newList, addlist);
        addinput.value = "";
        const addTaskBtn = document.querySelectorAll(".add-task-btn");
        openTaskModal(addTaskBtn);
        const draggables = document.querySelectorAll(".task");
        const droppables = document.querySelectorAll(".list");
        dragAndDrop(draggables, droppables);
        const deleteListBtn = document.querySelectorAll(".delete-list-btn");
        deleteList(deleteListBtn);
    };
};
