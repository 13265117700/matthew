// views/top-up/top-up.js
Page({
    data: {
        btnStyle: 'width: 110px;height: 40px;border-radius: 20px;line-height: 40px;background: linear-gradient(#F2531A,#E01923);color: #fff;font-size: 19px;',
        value: ''
    },
    onLoad: function (options) {

    },

    onShow: function () {

    },
    handleInput(e) {
        console.log(e)
        this.setData({
            value:e.detail.value
        })
    }
})