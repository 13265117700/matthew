import User from '../../models/user/user'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:null,
        navbarTitle:'船舶管理',
        addButtonText:'添加船舶',
        active: 1,
        tabList:[{
            title:'审核中'
        },{
            title:'已通过'
        },{
            title:'未通过'
        }],
        status:null,
        emptyState:true,
        seeList:[{
            title:'运输舰'
        },{
            title:'驱逐舰'
        },{
            title:'巡航舰'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.navbarTitle(options)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.DiscriminatingController()
    },
    
    
    //修改导航栏标题
    navbarTitle:function(options){
        this.setData({
            status:options.status
        })
        let id = options.id;
        if(id === '115'){
            this.setData({
                id,
                navbarTitle:'船舶管理',
                addButtonText:'添加船舶'
            })
            return
        }else{
            this.setData({
                id,
                navbarTitle:'车辆管理',
                addButtonText:'添加车辆'
            })
        }
    },
    //区分船、货、车控制器
    DiscriminatingController(){
        console.log(this.data.id)
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

    //获取船列表
    myFriendsRequestFriends(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {Authorization,page,rows}
        User.myFriendsRequestFriends(params).then(res => {
            let datas = res.data.data;
            console.log(datas)
            if(datas.total === 0){
                this.setData({
                    emptyState:false
                })
                console.log(this.data.emptyState)
            }else{
                console.log(datas)
                this.setData({
                    seeList:datas.rows
                })
            }
        })
    },
    //获取车辆列表
    vehicleAdminList(){

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
        let id = this.data.id;
        console.log(id)
        wx.navigateTo({
          url: '/views/ResourceAdd/ResourceAdd?id=' + id,
        })
    }
})