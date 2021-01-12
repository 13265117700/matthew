import User from '../../models/user/user'
Page({
    data: {
        activeIndex:0,
        tabsList:[{
            id:1011002,
            title:'关注船源',
        },{
            id:1011003,
            title:'关注货源',
        }],
        id:1011001,
        shipList:[]
    },

    onLoad: function (options) {

    },

    onShow: function () {
        this.showtabBar();
        this.getMyFollow()
    },

    showtabBar: function () {
        if (typeof this.getTabBar === "function" && this.getTabBar()) {
            this.getTabBar().setData({
                activeIndex: 1
            })
        }
    },

    //获取关注列表
    getMyFollow(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {
            Authorization,
            page,
            rows
        }

        User.UserFocusShips(params).then(res => {
            console.log(res)
            let rows = res.data.data.rows;
            this.setData({
                shipList:rows
            })
        })
    },

    //tabs标签导航
    onClickTabs(e){
        let name = e.detail.name;
        if(name == 0){
            this.getMyFollow()
        }else{
            this.setData({
                shipList:[]
            })
        }
    },

    cancelFollow(e){
        console.log(e)
        let Authorization = wx.getStorageSync('Authorization');
        let id = e.currentTarget.dataset.id;
        let params ={
            Authorization,
            id
        }
        User.UserShipCancelFocus(params).then(res => {
            console.log(res)
            if(res.data.state === 200){
                wx.showToast({
                  title: '成功取消关注',
                  icon:'success'
                })
                this.getMyFollow()
            }else{
                wx.showToast({
                  title: res.data.message,
                  icon:'loading'
                })
            }
        })
    }
})