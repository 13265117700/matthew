// pages/my/userAdmin/user-admin-info/user-admin-info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:null,
        navbarTitle:null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.tabBarTitle(options)
        this.setData({
            id:options.id
        })
    },

    tabBarTitle(options){
        switch(options.id){
            case '115':
                this.setData({
                    navbarTitle:'添加船舶信息'
                })
                break
            case '192':
                this.setData({
                    navbarTitle:'添加车辆'
                })
                break
            case '567':
                this.setData({
                    navbarTitle:'发布货源'
                })
                break
            case '855':
                this.setData({
                    navbarTitle:'发布货源'
                })
                break
        }
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
        this.onMyEvent()
    },

    onMyEvent:function(e) {
        console.log(e)
        this.setData({
            navbarTitle:e.detail
        })
    }
})