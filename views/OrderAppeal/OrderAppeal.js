import upload from "../../models/upload/upload";

Page({
    data: {
        imgList: []
    },

    onLoad: function (options) {

    },

    onShow: function () {

    },

    handImgUpload(e) {
        console.log(e)
        let filePath = e.detail.file.url;
        upload.upload.uploadFile(filePath).then(res => {
            let imgList = this.data.imgList;
            imgList.push({
                url: res
            })
            console.log(imgList)
            this.setData({
                imgList
            })
        })
    },
    shipImgDel(e) {
        console.log(e)
        let index = e.detail.index;
        let imgList = this.data.imgList;
        imgList.splice(index, 1)
        this.setData({
            imgList
        })
    }
})