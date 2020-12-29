import User from '../../models/user/user';
Page({
    data: {
        userInfo:null,
        activeIndex:0,
        //货主订单
        Btn:[{
            id:0,
            title:"发起申诉"
        },{
            id:1,
            title:"查看合同"
        },{
            id:2,
            title:"发起聊天"
        },{
            id:0,
            title:"订单轨迹"
        }],

        // 货主订单状态渲染数据 开始
        tabs:[{
                id:1,
                label:'运输中',
                name:'name1'
            },{
                id:2,
                label:'确认订单金额',
                name:'name2'
            },{
                id:3,
                label:'打款中',
                name:'name3'
            },{
                id:4,
                label:'订单完成',
                name:'name4'
            },{
                id:5,
                label:'售后中',
                name:'name5'
            },{
                id:6,
                label:'已取消',
                name:'name6'
            }],
        value2: 'name1',
        // 货主订单状态渲染数据 结束
     
    },

    onShow: function () {
        if(typeof this.getTabBar === "function" && this.getTabBar()){
            this.getTabBar().setData({
                activeIndex:3
            })
        }
        this.getUserInfo()
        
    },

    //获取用户
    getUserInfo(){
        let Authorization = wx.getStorageSync('Authorization');
        let uId ='';
        let params = {
            Authorization,
            uId
        }
        User.userInfo(params).then(res => {
            let userInfo = res.data.data;
            if(userInfo.mtCargoOwner.idNumber != null && userInfo.mtCargoOwner.idNumber != ' '){
                //货
                userInfo.idenID = userInfo.mtCargoOwner.id;
                this.setData({
                  userInfo
                })
            }else if(userInfo.mtOwner.idNumber != null && userInfo.mtOwner.idNumber != ' '){
                //车
                userInfo.idenID = userInfo.mtOwner.id;
                this.setData({
                    userInfo
                  })
            }else if(userInfo.mtShipowner.idNumber != null && userInfo.mtShipowner.idNumber != ' '){
                 //船
                 userInfo.idenID = userInfo.mtShipowner.id;
                this.setData({
                    userInfo
                })
            }else{
                this.setData({
                    userInfo
                })
            }
            this.getOrderList()
        })

    },
    //获取订单列表
    getOrderList(){
        let userInfo = this.data.userInfo;
        if(userInfo.idenID === 151){
            console.log('货主')
        }else if(userInfo.idenID === 152){
            console.log('车主')
        }else{
            console.log('船东')
        }
    },

    change(e) {
        console.log(e)
        this.setData({
          value2: e.detail.name
        })
    },
})