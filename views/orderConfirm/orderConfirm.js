import User from "../../models/user/user"
Page({
    data: {
        navbarTitle:'我的订单',
        userInfo: null,
        identity: 1,
        // tabs: [{
        //     label: '货主任务',
        //     state: 2
        // }, {
        //     label: '船东任务',
        //     state: 1
        // }, {
        //     label: '车主任务',
        //     state: 3
        // }],
        shipOrderList: [],//船东订单列表
        shipOrderID:null,//船东订单ID
        cargoOrderList:[],//货主订单列表
        cargoOrderID:null,//货主订单ID
       
        // 货主按钮
        cargoButton:[{
            title:'发起聊天',
            cargoShow:true
        },{
            title:'发起合同',
            cargoShow:false
        }],
        shipShow: false, //船东确认弹框
        cargoShow:false,//货主确认弹框
    },
    onLoad: function (options) {

    },

    onShow: function () {
        this.getUserInfo()
    },

    //获取用户
    getUserInfo() {
        let Authorization = wx.getStorageSync('Authorization');
        let uId = '';
        User.userInfo({
            Authorization,
            uId
        }).then(res => {
            let user = res.data.data;
            if (user.mtCargoOwner.idNumber != null) {
                user.cargo = true;
                user.status = user.mtCargoOwner.status;
                this.setData({
                    trialList: user.mtCargoOwner
                })
            } else if (user.mtOwner.idNumber != null) {
                user.car = true;
                user.status = user.mtOwner.status;
                this.setData({
                    trialList: user.mtOwner
                })
            } else if (user.mtShipowner.idNumber != null) {
                user.ship = true
                user.status = user.mtShipowner.status;
                this.setData({
                    trialList: user.mtShipowner
                })
            }
            this.setData({
                userInfo: user,
                navbarTitle:'任务订单确认'
            })
            console.log(this.data.userInfo)
            this.getUserOrderList()
        })
    },
    //获取订单列表
    getUserOrderList() {
        let userInfo = this.data.userInfo;
        let Authorization = wx.getStorageSync('Authorization');
        if (userInfo.ship === true) {
            let params = {
                Authorization,
                identity: 1,
                page: 1,
                rows: 10,
            };
            User.UserOrderQueryList(params).then(res => {
                let shipOrderList = res.data.data.rows;
                console.log(shipOrderList)
                shipOrderList.forEach(data => {
                    if (data.status === 1) {
                        this.setData({
                            ['button[1].shipShow']: false,
                            // ['button[2].shipShow']:true,
                        })
                    } else if (data.status === 2) {
                        this.setData({
                            ['button[2].shipShow']: true,
                        })
                    }
                })

                this.setData({
                    shipOrderList
                })

            })
        } else if (userInfo.cargo === true) {
            console.log('货')
            let params = {
                Authorization,
                identity: 2,
                page: 1,
                rows: 10,
            };
            User.UserOrderQueryList(params).then(res => {
                console.log(res)
                let cargoOrderList = res.data.data.rows;
                cargoOrderList.map(data => {
                    let loadingDate = new Date(data.mtCargo.loadingDate).toLocaleDateString();
                    data.mtCargo.loadingDate = loadingDate.replace(/\//g,"-")
                    return data
                })
                console.log(cargoOrderList)
                this.setData({
                    cargoOrderList
                })
            })
        }
    },


    //船东进入订单详情
    getOrderDetails(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        let userInfo = this.data.userInfo;
        wx.navigateTo({
            url: '/views/OrderDetails/OrderDetails?id=' + id+'&ship='+userInfo.ship,
        })
    },
    //船东聊天按钮
    handleChatButton(e){
        console.log(e)
        let receiverid = e.currentTarget.dataset.receiverid;
        let senderid = e.currentTarget.dataset.senderid;
        wx.navigateTo({
          url: '/views/chat/chat?receiverid='+receiverid+'&senderid='+senderid,
        })
    },
    //船东同意按钮
    handleShipConfirmOrderButton(e){
        console.log(e)
        let id = e.currentTarget.dataset.id;
        this.setData({
            shipShow: true,
            shipOrderID:id
        })
    },
    //船东确认订单
    handleConfirm() {
        let Authorization = wx.getStorageSync('Authorization');
        let id = this.data.shipOrderID;
        let params = {
            Authorization,
            id,
            status: 1
        }
        console.log(id)
        console.log(params)
        User.UserShipOrderAgreeOrRefused(params).then(res => {
            console.log(res)
            if(res.data.state === 200){
                this.onShow()
            }else{
                wx.showToast({
                  title: res.data.message,
                })
            }
        })
    },
    //船东确认合同按钮
    handleShipConfirmContractButton(e){
        console.log(e)
    },

    //货主发起聊天
    handleCargoChatButton(e){
        console.log(e)
        let receiverid = e.currentTarget.dataset.receiverid;
        let senderid = e.currentTarget.dataset.senderid;
        wx.navigateTo({
          url: '/views/chat/chat?receiverid='+receiverid+'&senderid='+senderid,
        })
    },
    //货主发起合同
    handleCargoConfirmContractButton(e){
        console.log(e)
        let id = e.currentTarget.dataset.id;
        let userInfo = this.data.userInfo;
        let contract = true
        wx.navigateTo({
          url: '/views/OrderDetails/OrderDetails?cargo='+userInfo.cargo+'&id='+id+'&contract='+contract,
        })
    },
})