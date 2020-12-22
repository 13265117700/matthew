import User from '../../models/user/user'
Page({
    data: {
        id:null,
        navbarTitle:'船舶管理',
        addButtonText:'添加船舶',
        tabsStatus:0,
        tabsList:[{
            status:0,
            title:'审核中'
        },{
            status:1,
            title:'已通过'
        },{
            status:2,
            title:'未通过'
        }],
        resourcesList:[],//资源列表
        resourcesShow:false,
    },
    onLoad: function (options) {
        this.setData({
            id:options.id
        })
        
    },
    onShow: function () {
        this.navbarTitle()
        this.DiscriminatingController()
    },
    
    //修改导航栏标题
    navbarTitle:function(){
        let id = this.data.id;
        switch(id){
            case '115':
                this.setData({
                    navbarTitle:'船舶管理',
                    addButtonText:'添加船舶'
                })
                break
            case '192':
                this.setData({
                    navbarTitle:'车辆管理',
                    addButtonText:'添加车辆'
                })
                break
        }
    },

    //区分船、货、车控制器
    DiscriminatingController(){
        let id = this.data.id;
        switch(id){
            case '115':
                this.myFriendsRequestFriends();
                break
            case '192':
                this.vehicleAdminList();
                break
        }
    },
    //获取资源
    handleGetResources(e){
        let tabsStatus = e.detail.name;
        this.setData({
            tabsStatus
        })
    },
    //获取船列表
    myFriendsRequestFriends(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {Authorization,page,rows}
        User.myFriendsRequestFriends(params).then(res => {
            let datas = res.data.data;
            let resourcesList = [{
                id:7000001,
                status:0,
                title:'运输舰'
            },{
                id:7000002,
                status:1,
                title:'驱逐舰'
            },{
                id:7000003,
                status:2,
                title:'巡航舰'
            },{
                id:7000003,
                status:2,
                title:'民船'
            },{
                id:7000003,
                status:2,
                title:'渔船'
            },{
                id:7000001,
                status:0,
                title:'快艇'
            },]
            this.setData({
                resourcesList
            })
            console.log(resourcesList)
            // if(datas.total === 0){
            //     this.setData({
            //         emptyState:false
            //     })
            //     console.log(this.data.emptyState)
            // }else{
            //     console.log(datas)
            //     this.setData({
            //         seeList:datas.rows
            //     })
            // }
        })
    },
    //获取车辆列表
    vehicleAdminList(){
        let resourcesList = [{
            id:6000001,
            status:0,
            title:'粤B 888888'
        },{
            id:6000002,
            status:1,
            title:'浙G 965413'
        },{
            id:6000003,
            status:2,
            title:'粤B 369874'
        },{
            id:6000003,
            status:2,
            title:'粤A 369874'
        },{
            id:6000003,
            status:2,
            title:'粤C 369874'
        },{
            id:6000002,
            status:1,
            title:'浙B 965413'
        },{
            id:6000002,
            status:1,
            title:'浙M 965413'
        }]
        this.setData({
            resourcesList
        })
    },

    getResourcesItem(e){
        console.log(e)
        this.setData({
            resourcesShow:true
        })
    },
    onClosePopup(){
        this.setData({
            resourcesShow:false
        })
    },

    addButton(){
        let id = this.data.id;
        console.log(id)
        wx.navigateTo({
          url: '/views/ResourceAdd/ResourceAdd?id=' + id,
        })
    }
})