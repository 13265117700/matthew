Page({
    data: {
        id: null,
    },

    onLoad: function (options) {
        this.setData({
            id: options.id
        })
    },
    onShow: function () {
        this.tabBarTitle()
        //   this.onMyEvent()
    },

    tabBarTitle() {
        let id = this.data.id;
        switch (id) {
            case '115':
                wx.setNavigationBarTitle({
                    title: '添加船舶信息',
                })
                break
            case '192':
                wx.setNavigationBarTitle({
                    title: '添加车辆',
                })
                break
            case '567':
                wx.setNavigationBarTitle({
                    title: '发布船源',
                })
                break
            case '855':
                wx.setNavigationBarTitle({
                    title: '发布货源',
                })
                break
            case '609':
                wx.setNavigationBarTitle({
                    title: '发布车源',
                })
                break
        }
    },

    onMyEvent: function (e) {
        this.setData({
            navbarTitle: e.detail
        })
    }
})