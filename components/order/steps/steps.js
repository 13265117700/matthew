const App = getApp();
import User from '../../../models/user/user';


Component({
    properties: {
        orderID: Number
    },
    lifetimes: {
        ready: function () {
            this.getUserInfo();
            this.getOrderInfo();
        }
    },
    data: {
        userInfo: {},
        stepsummary: [{
            title: '船到装货港',
            describe: '待船东上传船到港图片',
            show: true,
            index: 0,
        }, {
            title: '装好货',
            describe: '待船东上传装好货图片',
            show: false,
            index: 1,
        }, {
            title: '运输中',
            describe: '请等待船东确认到达目的地',
            show: false,
            index: 2,
        }, {
            title: '到达目的港',
            describe: '待船东上传到港图片',
            show: false,
            index: 3,
        }, {
            title: '卸货完成',
            describe: '卸货完成',
            show: false,
            index: 4,
        }],
        steps: [{
            title: '船到装货港',
            status: 'success',
            color: '#099E43',
            name: 1
        }, {
            title: '装好货',
            status: 'success',
            color: '#099E43',
            name: 2
        }, {
            title: '运输中',
            status: 'success',
            color: '#099E43',
            name: 3
        }, {
            title: '到达目的港',
            status: 'success',
            color: '#099E43',
            name: 4
        }, {
            title: '卸货完成',
            status: 'success',
            color: '#099E43',
            name: 5
        }],
        stepsbtn: [{
            title: '上传货到港图片',
            show: true,
            state: 1
        }, {
            title: '上传装好货照片',
            show: false,
            state: 2
        }, {
            title: '开始运输',
            show: false,
            state: 3
        }, {
            title: '上传船到港图片',
            show: false,
            state: 4
        }, {
            title: '卸货完成',
            show: false,
            state: 5
        }, {
            title: '承运轨迹',
            show: false,
            state: 6
        }],
        index: 0,
        status: null,
    },
    methods: {
        getUserInfo() {
            let userInfo = App.globalData.userInfo
            this.setData({
                userInfo: userInfo
            })
        },
        getOrderInfo() {
            let id = this.properties.orderID;
            let Authorization = wx.getStorageSync('Authorization');
            let params = {
                Authorization,
                id
            };

            User.UserOrderQuery(params).then(res => {
                let rows = res.data.data;
                this.btnStatus(rows)
                this.setData({
                    status: rows.status
                })
            })
        },
        btnStatus(rows) {
            let stepsbtn = this.data.stepsbtn;
            let stepsummary = this.data.stepsummary;
            switch (rows.transportStatus) {
                case 0:
                    stepsummary.forEach(data => {
                        if (data.index == 0) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })
                    stepsbtn.forEach(data => {
                        if (data.state === 1) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })
                    this.setData({
                        stepsummary,
                        stepsbtn,
                        index: 0
                    })
                    break;
                case 1:
                    stepsummary.forEach(data => {
                        if (data.index == 1) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })
                    stepsbtn.forEach(data => {
                        if (data.state === 2) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtn,
                        index: 0
                    })
                    break;
                case 2:
                    stepsummary.forEach(data => {
                        if (data.index == 2) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })
                    stepsbtn.forEach(data => {
                        if (data.state === 3) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtn,
                        index: 1
                    })
                    break;
                case 3:
                    stepsummary.forEach(data => {
                        if (data.index == 3) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })
                    stepsbtn.forEach(data => {
                        if (data.state === 4) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtn,
                        index: 2
                    })
                    break;
                case 4:
                    stepsummary.forEach(data => {
                        if (data.index == 4) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })
                    stepsbtn.forEach(data => {
                        if (data.state === 5) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtn,
                        index: 3
                    })
                    break;
                case 5:
                    stepsummary.forEach(data => {
                        if (data.index == 4) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })
                    stepsbtn.forEach(data => {
                        if (data.state === 6) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtn,
                        index: 4
                    })
            }


        },

        //船东订单状态按钮
        handleStepsBtn(e) {
            let state = e.currentTarget.dataset.state;
            let id = this.properties.orderID;
            let Authorization = wx.getStorageSync('Authorization');
            switch (state) {
                case 1:
                    wx.navigateTo({
                        url: '/views/OrderShipment/OrderShipment?id=' + id,
                    })
                    break;
                case 2:
                    wx.navigateTo({
                        url: '/views/OrderShipment/OrderShipment?id=' + id,
                    })
                    break;
                case 3:
                    User.UserShipUploadProcess({
                        Authorization,
                        id
                    }).then(res => {
                        if (res.data.state === 200) {
                            this.getOrderDetails()
                        }
                    })
                    break;
                case 4:
                    wx.navigateTo({
                        url: '/views/OrderShipment/OrderShipment?id=' + id,
                    })
                    break;
                case 5:
                    User.UserShipUploadProcess({
                        Authorization,
                        id
                    }).then(res => {
                        if (res.data.state === 200) {
                            this.getOrderDetails()
                        }
                    })
                    break;
                case 6:
                    console.log(1)
                    break;

            }
        },

        //货主查看订单轨迹
        handCargoStepsBtu() {
            let id = this.properties.orderID;
            wx.navigateTo({
                url: '/views/OrderTracking/OrderTracking?id=' + id,
            })
        }
    }
})