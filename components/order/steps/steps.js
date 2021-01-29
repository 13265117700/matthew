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
        stepsummary: {
            title: '',
            describe: ''
        },
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
            let Authorization = wx.getStorageSync('Authorization');
            User.userInfo({
                Authorization
            }).then(res => {
                let userInfo = res.data.data;
                this.setData({
                    userInfo
                })
            })
        },
        getOrderInfo() {
            console.log(123)
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
            let index = 0;

            switch (rows.transportStatus) {
                case 0:
                    stepsummary.title = '正在去往装货港';
                    stepsummary.describe = '正在去往装货港';
                    index = 0;
                    stepsbtn.forEach(data => {
                        if (data.state === 1) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })
                    
                    break;
                case 1:
                    stepsummary.title = '船到装货港';
                    stepsummary.describe = '待船东上传船到港图片';
                    index = 0;
                    stepsbtn.forEach(data => {
                        if (data.state === 2) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    break;
                case 2:
                    stepsummary.title = '装好货';
                    stepsummary.describe = '待船东上传装好货图片';
                    index = 1;
                    stepsbtn.forEach(data => {
                        if (data.state === 3) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    break;
                case 3:
                    stepsummary.title = '运输中';
                    stepsummary.describe = '请等待船东确认到达目的地';
                    index = 2;
                    stepsbtn.forEach(data => {
                        if (data.state === 4) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    break;
                case 4:
                    stepsummary.title = '到达目的港';
                    stepsummary.describe = '待船东上传到港图片';
                    index = 3;
                    stepsbtn.forEach(data => {
                        if (data.state === 5) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    break;
                case 5:
                    stepsummary.title = '卸货完成';
                    stepsummary.describe = '卸货完成';
                    index = 4;
                    stepsbtn.forEach(data => {
                        if (data.state === 6) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

            }

            this.setData({
                stepsummary,
                stepsbtn,
                index
            })

        },

        //船东订单状态按钮
        handleStepsBtn(e) {
            let state = e.currentTarget.dataset.state;
            console.log(state)
            let id = this.properties.orderID;
            let Authorization = wx.getStorageSync('Authorization');
            if (state < 3 || state == 4) {
                wx.navigateTo({
                    url: '/views/OrderShipment/OrderShipment?id=' + id,
                })
            } else if (state == 6) {
                wx.navigateTo({
                    url: '/views/OrderTracking/OrderTracking?id=' + id,
                })
            } else {
                User.UserShipUploadProcess({
                    Authorization,
                    id
                }).then(res => {
                    if (res.data.state === 200) {
                        this.getOrderInfo()
                    }
                })
            }
        },

        //货主查看订单轨迹
        handCargoStepsBtu() {
            let id = this.properties.orderID;
            wx.navigateTo({
                url: '/views/OrderTracking/OrderTracking?id=' + id,
            })
        },
    }
})