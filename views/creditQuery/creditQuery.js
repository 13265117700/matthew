// views/creditQuery/creditQuery.js
Page({
    data: {

    },
    onLoad: function (options) {

    },
    onShow: function () {

    },
    onCreditDetail(e){
        console.log(e)
        wx.navigateTo({
          url: '/views/creditDetail/creditDetail',
        })
    }
})