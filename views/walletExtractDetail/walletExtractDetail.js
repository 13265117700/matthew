import ExtractMoney from "../../models/user/extractMoney";


Page({
    data: {
        id: null,
        extractDetail: {},
    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
    },

    onShow: function () {
        this.handleExtractMoney()
    },

    //提现记录详情
    handleExtractMoney() {
        let id = this.data.id;
        let Authorization = wx.getStorageSync('Authorization');
        console.log(id)
        ExtractMoney.UserExtractMoneyItem({
            Authorization,
            id
        }).then(res => {
            let extractDetail = res.data.data;
            let bankAccount = extractDetail.mtUser.mtUserCollection.bankAccount;
            let reg = /^(\d{4})\d+(\d{4})$/;
            bankAccount = bankAccount.replace(reg, "$1 **** **** $2");
            extractDetail.mtUser.mtUserCollection.bankAccount = bankAccount

            switch (extractDetail.status) {
                case 0:
                    wx.setNavigationBarTitle({
                        title: '提现中',
                    })
                    extractDetail.icon = 'https://img.gdmatt.com/images/2021/02/03/16123490930788194.png';
                    extractDetail.color = 'current'
                    extractDetail.text = '审核中'
                    break;
                case 1:
                    wx.setNavigationBarTitle({
                        title: '打款中',
                    })
                    extractDetail.icon = 'https://img.gdmatt.com/images/2021/02/03/16123483867365663.png';
                    extractDetail.color = 'hover';
                    extractDetail.text = '打款中'
                    break;
                case 2:
                    wx.setNavigationBarTitle({
                        title: '提现失败',
                    })
                    extractDetail.icon = 'https://img.gdmatt.com/images/2021/02/03/1612348644484579.png';
                    extractDetail.color = 'fail';
                    extractDetail.text = '审核失败'
                    break;
                case 3:
                    wx.setNavigationBarTitle({
                        title: '提现成功',
                    })
                    extractDetail.icon = 'https://img.gdmatt.com/images/2021/01/25/16115584651559959.png';
                    extractDetail.color = 'success';
                    extractDetail.text = '提现完成'
                    break;
            }

            console.log(extractDetail)
            this.setData({
                extractDetail
            })
        })
    }
})