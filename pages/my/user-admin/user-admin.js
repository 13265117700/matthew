// pages/my/userAdmin/userAdmin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:null,
        navbarTitle:'船舶管理',
        active: 1,
        tabList:[{
            title:'审核中'
        },{
            title:'已通过'
        },{
            title:'未通过'
        }],
        status:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id;
        if(id === '115'){
            this.setData({
                id,
                navbarTitle:'船舶管理'
            })
            return
        }else{
            this.setData({
                id,
                navbarTitle:'车辆管理'
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    onChange(event) {
        // console.log(event.detail.index)
        this.setData({
            status:event.detail.index,
        })
        
        wx.showToast({
            title: `切换到标签 ${event.detail.name}`,
            icon: 'none',
        });
    },
    addButton(){
        wx.navigateTo({
          url: '/pages/my/user-admin/user-admin-info/user-admin-info',
        })
    }
})