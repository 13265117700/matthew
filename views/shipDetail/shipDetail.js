// views/shipDetail/shipDetail.js
Page({
    data: {
        id:null
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id:options.id
        })
    },
    onShow: function () {

    },
})