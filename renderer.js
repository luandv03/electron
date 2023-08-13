// handle select folder
const selectFolderBtn = document.querySelector(".btn__folder--select");
const filePathElement = document.getElementById("folder__input");

selectFolderBtn.addEventListener("click", async () => {
    const filePath = await window.test.openFile();
    filePathElement.value = filePath;
});

const singleVideoElement = document.getElementById(
    "box__content__single-video"
);
const multiVideoElement = document.getElementById("box__content__multie-video");

// handle select dropdown menu
const dropdownElement = document.querySelector(".dropdown ");

dropdownElement.onmouseover = function () {
    if (!dropdownElement.classList.contains("is-active")) {
        dropdownElement.classList.add("is-active");
    }
};

dropdownElement.onmouseout = function () {
    if (dropdownElement.classList.contains("is-active")) {
        dropdownElement.classList.remove("is-active");
    }
};

const listOptionItem = document.querySelectorAll(
    ".option__dropdown-menu .dropdown-item"
);

const boxContentSingleVideoElement = document.getElementById(
    "box__content__single-video"
);

const boxContentMultiVideoElement = document.getElementById(
    "box__content__multi-video"
);

listOptionItem.forEach((dropItem) => {
    dropItem.onclick = function () {
        if (this.classList.contains("select__single-video")) {
            boxContentSingleVideoElement.classList.remove("is-hidden");
            boxContentMultiVideoElement.classList.add("is-hidden");
        }
        if (this.classList.contains("select__multi-video")) {
            boxContentSingleVideoElement.classList.add("is-hidden");
            boxContentMultiVideoElement.classList.remove("is-hidden");
        }
    };
});
