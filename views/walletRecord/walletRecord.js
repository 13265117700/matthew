// views/walletRecord/walletRecord.js
Page({
    data: {
        active: 0,
        tabs: [{
            title: '全部',
            index: 0,
            show: true
        }, {
            title: '待审核',
            index: 1,
            show: true
        }, {
            title: '已提现',
            index: 2,
            show: true
        }, {
            title: '未通过',
            index: 3,
            show: true
        }, {
            title: '充值成功',
            index: 4,
            show: true
        }, {
            title: '充值失败',
            index: 5,
            show: true
        }]
    },
    onLoad: function (options) {
        this.tabsList(parseInt(options.index))
    },
    onShow: function () {

    },
    tabsList(index) {
        let tabs = this.data.tabs;
        if (index == 0) {
            wx.setNavigationBarTitle({
                title: '充值记录',
            })
            tabs.forEach(data => {
                if (data.index < 4) {
                    data.show = true
                } else {
                    data.show = false
                }
            })
        } else {
            wx.setNavigationBarTitle({
                title: '提现记录',
            })
            tabs.forEach(data => {
                if (data.index == 0 || data.index > 3) {
                    data.show = true
                } else {
                    data.show = false
                }
            })
        }

        this.setData({
            tabs
        })
    },
    onDetail(e) {
        wx.navigateTo({
            url: '/views/walletTrendDetail/walletTrendDetail',
        })
    }
})