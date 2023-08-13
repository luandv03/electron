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
const multiVideoElement = document.getElementById("box__content__multi-video");

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

listOptionItem.forEach((dropItem) => {
    dropItem.onclick = function () {
        if (this.classList.contains("select__single-video")) {
            singleVideoElement.classList.remove("is-hidden");
            multiVideoElement.classList.add("is-hidden");
        }
        if (this.classList.contains("select__multi-video")) {
            singleVideoElement.classList.add("is-hidden");
            multiVideoElement.classList.remove("is-hidden");
        }
    };
});

// handle enter input link and fetch infor video
const btnInfoSendLink = document.querySelector(".btn__info--send");

let dataSingleVideo;
btnInfoSendLink.onclick = async function () {
    const inputValue = singleVideoElement.querySelector("input").value;

    if (!inputValue) {
        console.log("Invalid value");
    } else {
        this.classList.add("is-loading");
        const res = await window.test.handleGetDataSingleLink(inputValue);
        dataSingleVideo = res.data;
        this.classList.remove("is-loading");

        if (res.statusCode === 200) {
            const videoInfoElement = `<div >
            <h3>
                Mô tả:
                <span>
                    ${res.data.desc}
                </span>
            </h3>

            <div>
                <ul class="is-flex">
                    <li>
                        <span>
                            <i class="fa-solid fa-user"></i>
                        </span>
                        John Doe
                    </li>
                    <li class="ml-2">
                        <span>
                            <i class="fa-solid fa-eye"></i>
                        </span>
                        ${res.data.view}
                    </li>
                    <li class="ml-2">
                        <span>
                            <i class="fa-solid fa-database"></i>
                        </span>
                        2.3MB
                    </li>
                </ul>
            </div>

            <div class="mt-2">
                <button class="button is-primary ml-2 btn--download">
                    <span class="icon">
                        <i class="fas fa-download"></i>
                    </span>
                    <span>Download</span>
                </button>

                <button
                    class="button is-primary is-hidden btn--success"
                >
                    <span class="icon-text">
                        <span class="icon">
                            <i class="fas fa-check-square"></i>
                        </span>
                        <span>Success</span>
                    </span>
                </button>
            </div>
        </div>`;

            singleVideoElement.querySelector(".single__video-info").innerHTML =
                videoInfoElement;

            // download video
            const btnDownloadSingleVideo = singleVideoElement.querySelector(
                ".single__video-info .btn--download"
            );

            btnDownloadSingleVideo.onclick = async function () {
                this.classList.add("is-loading");

                const res = await window.test.handleDownloadVideoByUrl({
                    data: dataSingleVideo,
                    folder: filePathElement.value,
                });

                if (res.statusCode === 200) {
                    this.classList.add("is-hidden");
                    this.classList.remove("is-loading");
                    singleVideoElement
                        .querySelector(".single__video-info .btn--success")
                        .classList.remove("is-hidden");
                } else {
                    this.classList.remove("is-loading");
                }
            };
        } else {
            singleVideoElement.querySelector(
                ".single__video-info"
            ).innerHTML = `<div>${res.message}</div>`;
        }
    }
};

// handle multi video
const btnUsernameSend = multiVideoElement.querySelector(".btn__username--send");

btnUsernameSend.onclick = async function () {
    const inputValue = multiVideoElement.querySelector("input").value;

    if (!inputValue) {
        console.log("Invalid input");
    } else {
        this.classList.add("is-loading");
        const res = await window.test.handleGetListDataByUsername(inputValue);
        this.classList.remove("is-loading");

        if (res.statusCode === 200) {
            const listItemElement =
                res.totalGoodData > 0 &&
                res.goodData
                    .map(
                        (item, index) => `<tr>
            <th>${index}</th>
            <td>
                <span>
                    ${item.desc}
                </span>
            </td>
            <td>
                <a
                    href="https://www.tiktok.com/@gdfactoryclips/video/7266481858370653458?is_from_webapp=1&sender_device=pc"
                >
                </a>
            </td>

            <td>${item.view}</td>
            <td>2.3MB</td>
            <td>
                <button class="button is-primary ml-2">
                    <span class="icon">
                        <i class="fas fa-download"></i>
                    </span>
                    <span>Download</span>
                </button>
            </td>
        </tr>`
                    )
                    .join("");

            const tableElement = `<table class="table">
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Description</th>
                        <th>Link</th>
                        <th>View</th>
                        <th>Size</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                        ${listItemElement}
                </tbody>
            </table>`;

            multiVideoElement.querySelector(".list__data").innerHTML =
                tableElement;

            multiVideoElement
                .querySelector(".btn--download__list")
                .removeAttribute("disabled");
        } else {
            const errorElement = `<p>${res.message}</p>`;
            multiVideoElement.appendChild(errorElement);
        }
    }
};
