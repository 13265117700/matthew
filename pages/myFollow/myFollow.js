// pages/myFollow/myFollow.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeIndex:0,
        tabsList:[
            {
                pagePath:'/components/myFollow/vehicle/vehicle',
                title:'关注车辆'
            },
            {
                pagePath:'/components/myFollow/ship/ship',
                title:'关注船源'
            },
            {
                pagePath:'/components/myFollow/resources/resources',
                title:'关注货源'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if(typeof this.getTabBar === "function" && this.getTabBar()){
            this.getTabBar().setData({
                activeIndex:1
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    onChange(e){
        let index = e.detail.index;
        this.setData({
            activeIndex:index
        })
    }
})