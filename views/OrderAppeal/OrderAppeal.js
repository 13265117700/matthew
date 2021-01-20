import upload from "../../models/upload/upload";
import Activist from '../../models/activist/activist';

Page({
    data: {
        btnStyle: 'width: 225px;height: 50px;background: #CD1F38;border-radius: 10px;font-family: PingFang SC;font-weight: 500;color: #FFFFFF;font-size: 17px;',
        imgList: [],
        shippingOrderId: null,
        describe: null
    },

    onLoad: function (options) {
        console.log(options)
        this.setData({
            shippingOrderId: options.shippingOrderId
        })
    },
    onShow: function () {

    },
    handImgUpload(e) {
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
        let index = e.detail.index;
        let imgList = this.data.imgList;
        imgList.splice(index, 1)
        this.setData({
            imgList
        })
    },
    handledescribe(event) {
        let describe = event.detail.value;
        this.setData({
            describe
        })
    },
    handleconfirm() {
        let Authorization = wx.getStorageSync('Authorization');
        let shippingOrderId = this.data.shippingOrderId;
        let imgList = [...(this.data.imgList.map(data => data.url))].toString();
        let describe = this.data.describe;
        let rightsProtectionReason = {
            imgList,
            describe
        };
        let params = {
            Authorization,
            shippingOrderId,
            rightsProtectionReason
        }

        Activist.UserActivistComplaint(params).then(res => {
            console.log(res)
            if(res.data.state == 200){
                wx.showLoading({
                  title: '申诉成功，请等待',
                })
                setTimeout(function(){
                    wx.hideLoading()
                    wx.navigateBack({
                      delta: 1,
                    })
                },1000)
            }else{
                wx.showToast({
                  title: res.data.message,
                })
            }
        })
    }
})