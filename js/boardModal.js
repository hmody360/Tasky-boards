// modal.js
const openModal = () => {
    addBoard.onclick = () => {
        modalContainer.style.display = "flex";
    };
};

const closeModal = () => {
    modalContainer.addEventListener('click', (event) => {
        if (event.currentTarget == event.target) {
            modalContainer.style.display = "none";
            setDefaultBackground();
        }
    });

    closeModalBtn.onclick = () => {
        modalContainer.style.display = "none";
        setDefaultBackground();
    };
};

const generateBG = async () => {
    const response = await fetch("https://api.unsplash.com/photos/random/?client_id=Chi6_ARHPNzdtsBgFDnm6gai89_AFqTZIbcdzn3Ij40&orientation=landscape");
    const data = await response.json();
    const result = await data.urls.full;
    modalBackgroundImg.style.backgroundImage = `url("${result}")`;
};

const setDefaultBackground = () => {
    modalBackgroundImg.style.backgroundImage = `url("/images/default-bg.avif")`;
};
