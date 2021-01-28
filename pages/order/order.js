
Page({
    data: {
       
    },

    onShow: function () {
        this.showtabBar()
    },

    showtabBar: function () {
        if (typeof this.getTabBar === "function" && this.getTabBar()) {
            this.getTabBar().setData({
                activeIndex: 3
            })
        }
    },

})