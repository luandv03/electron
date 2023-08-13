const getVideoNoWM = require("../helpers/getVideoNoWM.js");
const downloadSingleVideo = require("../helpers/downloadSingleVideo.js");
const getAllUrlVideoByUsername = require("../helpers/getAllUrlVideoByUsername.js");
const downloadMediaFromList = require("../helpers/downloadMediaFromList.js");

class TiktokService {
    async getDataVideoByUrl(url) {
        return getVideoNoWM(url)
            .then(async (data) => {
                return {
                    statusCode: 200,
                    message: "Get data video successfull",
                    data: data,
                };
            })
            .catch((err) => {
                return {
                    statusCode: 400,
                    message:
                        "Download video failre . Can't fetch data from url",
                    error: err,
                };
            });
    }

    async downloadVideoByUrl(data, folder) {
        return downloadSingleVideo(data, folder)
            .then(() => {
                return {
                    statusCode: 200,
                    message: "Download video successfull",
                };
            })
            .catch((err) => {
                return {
                    statusCode: 400,
                    message: "Download video failure",
                    error: err,
                };
            });
    }

    async getListDataVideoByUserName(username) {
        const listUrlVideo = await getAllUrlVideoByUsername(username);

        const listVideo = [];

        for (let i = 0; i < listUrlVideo.length; i++) {
            console.log(
                `[*] Fetching video ${i + 1} of ${listUrlVideo.length}`
            );
            console.log(`[*] URL: ${listUrlVideo[i]}`);
            listVideo.push(getVideoNoWM(listUrlVideo[i]));
        }

        return Promise.allSettled(listVideo)
            .then(async (result) => {
                const goodData = result
                    .filter((item) => item.status === "fulfilled")
                    .map((data) => data.value);

                const badData = result
                    .filter((item) => item.status === "rejected")
                    .map((data) => data.reason);

                return {
                    statusCode: 200,
                    message: "Download successfull",
                    totalGoodData: goodData.length,
                    totalBadData: badData.length,
                    goodData,
                };
            })
            .catch((err) => {
                return {
                    statusCode: 400,
                    message: "Get data video failure",
                    err,
                };
            });
    }

    async downloadVideoFromList(dataList, folder) {
        const limitVideoConcurrentlyDownloaded = 10;

        return downloadMediaFromList(
            dataList,
            limitVideoConcurrentlyDownloaded,
            folder
        );
    }
}

const tiktokService = new TiktokService();
module.exports = tiktokService;
