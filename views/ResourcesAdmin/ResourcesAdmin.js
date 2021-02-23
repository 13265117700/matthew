import User from '../../models/user/user'
Page({
    data: {
        id: null,
        navbarTitle: '船舶管理',
        addButtonText: '添加船舶',
        tabsStatus: 0,
        tabsList: [{
            status: 0,
            title: '审核中'
        }, {
            status: 2,
            title: '已通过'
        }, {
            status: 1,
            title: '未通过'
        }],
        resourcesList: [], //资源列表
        resourcesShow: false,
        show:false,
        returnInformation:null,//船审核失败备注
        total: 0,

    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        })

    },
    onShow: function () {
        this.navbarTitle()
        this.DiscriminatingController()
    },

    //修改导航栏标题
    navbarTitle: function () {
        let id = this.data.id;
        switch (id) {
            case '115':
                wx.setNavigationBarTitle({
                    title: '船舶管理',
                })
                this.setData({
                    addButtonText: '添加船舶'
                })
                break
            case '192':
                wx.setNavigationBarTitle({
                    title: '车辆管理',
                })
                this.setData({
                    addButtonText: '添加车辆'
                })
                break
        }
    },

    //区分船、货、车控制器
    DiscriminatingController() {
        let id = this.data.id;
        switch (id) {
            case '115':
                this.myFriendsRequestFriends();
                break
            case '192':
                this.vehicleAdminList();
                break
        }
    },
    //获取资源
    handleGetResources(e) {
        console.log(e)
        let tabsStatus = e.detail.name;
        this.myFriendsRequestFriends(tabsStatus)
    },
    //获取船列表
    myFriendsRequestFriends(status) {
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        if (!status) {
            status = 0
        }
        let params = {
            Authorization,
            page,
            rows,
            status
        }
        User.UserShipQuery(params).then(res => {
            console.log(res)
            let total = res.data.data.total;
            let resourcesList = res.data.data.rows;
            console.log(resourcesList)
            this.setData({
                resourcesList,
                total
            })
        })
    },
    //获取车辆列表
    vehicleAdminList() {
        let resourcesList = [{
            id: 6000001,
            status: 0,
            title: '粤B 888888'
        }, {
            id: 6000002,
            status: 1,
            title: '浙G 965413'
        }, {
            id: 6000003,
            status: 2,
            title: '粤B 369874'
        }, {
            id: 6000003,
            status: 2,
            title: '粤A 369874'
        }, {
            id: 6000003,
            status: 2,
            title: '粤C 369874'
        }, {
            id: 6000002,
            status: 1,
            title: '浙B 965413'
        }, {
            id: 6000002,
            status: 1,
            title: '浙M 965413'
        }]
        this.setData({
            resourcesList
        })
    },

    getResourcesItem(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;

        wx.navigateTo({
            url: '/views/userShipDetail/userShipDetail?id=' + id,
        })
    },
    onwhy(e){
        let Authorization = wx.getStorageSync('Authorization');
        let id = e.currentTarget.dataset.id;
        User.UserShipInfoQuery({
            Authorization,
            id
        }).then(res => {
            console.log(res)
            let rows = res.data.data;
            this.setData({
                returnInformation:rows.returnInformation,
                show:true,
            })
        })
        
    },
    onClosePopup() {
        this.setData({
            resourcesShow: false
        })
    },

    addButton() {
        let id = this.data.id;
        console.log(id)
        wx.navigateTo({
            url: '/views/ResourceAdd/ResourceAdd?id=' + id,
        })
    }
})