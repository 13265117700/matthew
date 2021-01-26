// views/BankCard/BankCard.js
Page({
    data: {
        cardList:[{
            title:'中国农业银行储蓄卡',
            number:'**************6078'
        },{
            title:'中国工商银行',
            number:'**************1071'
        },{
            title:'中国招商银行',
            number:'**************1451'
        },{
            title:'中国农商银行',
            number:'**************1451'
        },{
            title:'广发银行',
            number:'**************1451'
        }],
        show: false,
    },
    onShow: function () {
        
    },
    handleDel(e) {
        console.log(e)
        this.setData({
            show: true
        })
    },
    onConfirmDel(e) {
        console.log(e)
    },
    noAddBtn() {
        wx.navigateTo({
            url: '/views/BankCardAdd/BankCardAdd',
        })
    }
})