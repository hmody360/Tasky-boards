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
};

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
