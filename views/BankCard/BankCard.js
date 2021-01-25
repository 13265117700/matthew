// views/BankCard/BankCard.js
Page({
    data: {
        show:false
    },
    onLoad: function (options) {

    },
    onShow: function () {

    },
    handleDel(e){
        console.log(e)
        this.setData({
            show:true
        })
    },
    onConfirmDel(e){
        console.log(e)
    }
})