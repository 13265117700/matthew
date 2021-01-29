// views/walletAmountExtract/walletAmountExtract.js
Page({
    data: {
        show:false,
        input:'',
        
    },
    onLoad: function (options) {

    },
    onShow: function () {

    },
    
    //打开弹框
    noShowPopup(){
        this.setData({
            show:true
        })
    },
    //关闭弹框
    onClose(){
        this.setData({
            show:false
        })
    },
    //输入框
    noInput(e){
        this.setData({
            input:e.detail.value
        })
    },
    onSubmit(){
        console.log(12321)
        wx.navigateTo({
          url: '/views/walletExtractDetail/walletExtractDetail',
        })
    }
})