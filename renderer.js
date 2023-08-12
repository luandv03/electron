const selectFolderBtn = document.querySelector(".btn__folder--select");
const filePathElement = document.getElementById("folder__input");

selectFolderBtn.addEventListener("click", async () => {
    const filePath = await window.test.openFile();
    filePathElement.value = filePath;
});
