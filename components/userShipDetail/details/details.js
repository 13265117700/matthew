import User from '../../../models/user/user';
import mtWharf from "../../../models/frontEnd/mtWharf";


Component({
    properties: {
        porID: Number
    },
    lifetimes: {
        ready: function () {
            this.getUserInfo();
        }
    },
    data: {
        userInfo: {},
        detail: {},
        btn: [{
            id: 1,
            title: '下架船源',
            background: '#FF7038',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: false
        }, {
            id: 2,
            title: '修改船源信息',
            background: '#FF3C07',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: false
        }, {
            id: 3,
            icon: 'https://img.gdmatt.com/images/2021/01/14/16106173690245366.png',
            title: '投诉',
            background: '#FFFFFF',
            color: '#999999',
            family: 'PingFang-SC-Medium',
            weight: 'Medium',
            width: '89.5px',
            size: '12px',
            show: true
        }, {
            id: 4,
            title: '发起聊天',
            background: '#FF7038',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: true
        }, {
            id: 5,
            title: '选择船东承运',
            background: '#FF3C07',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: true
        }],
        image: [],
        itemShow: false
    },
    methods: {
        getUserInfo() {
            let Authorization = wx.getStorageSync('Authorization');
            let uId = '';
            let params = {
                Authorization,
                uId
            };

            User.userInfo(params).then(res => {
                let rows = res.data.data;
                this.getShipInfo(rows)
            })
        },
        //获取船信息
        getShipInfo(user) {
            let Authorization = wx.getStorageSync('Authorization');
            let id = this.properties.porID;
            // console.log(id)
            User.UserShipInfoQuery({
                id,
                Authorization
            }).then(res => {

                let rows = res.data.data;
                let params = {
                    Authorization,
                    collegeId: id
                };
                User.UserShipWhetherFocusOn(params).then(focus => {
                    Promise.all([focus]).then(result => {
                        //关注状态
                        let focusStatus = result[0].data.data;
                        rows.focusStatus = focusStatus;

                        //船图片
                        if (rows.shipChart) {
                            let shipChart = rows.shipChart.split(',');
                            let array = []
                            shipChart.forEach(data => {
                                let arr = {}
                                arr.url = data
                                array.push(arr)
                            })
                            this.setData({
                                image:shipChart
                            })
                            rows.shipChart = array
                        }



                        //船龄
                        let nowYears = new Date().getFullYear(); //当前年
                        let years = new Date(parseInt(rows.ageShip)).getFullYear(); //船创建的年份
                        let nowMonth = new Date().getMonth(); //当前月
                        let month = new Date(parseInt(rows.ageShip)).getMonth(); //船创建的月份
                        let nowDay = new Date().getDate(); //当前日
                        let day = new Date(parseInt(rows.ageShip)).getDate(); //船创建的日
                        let age = nowYears - years;
                        let ageMonth = nowMonth - month;
                        if (age <= 0) {
                            if (ageMonth <= 0) {
                                rows.ageShip = nowDay - day + '天'
                            } else {
                                rows.ageShip = ageMonth + '月'
                            }
                        } else {
                            rows.ageShip = age + '年'
                        }

                        //按钮
                        let btn = this.data.btn;
                        if (user.uid === rows.mtUser.uid) {
                            btn.forEach(data => {
                                data.show = false
                            })
                        } else {
                            btn.forEach(data => {
                                if (data.id > 3) {
                                    data.show = true
                                } else {
                                    data.show = false
                                }
                            })
                        }

                        this.setData({
                            userInfo: user,
                            detail: rows,
                            // image: shipChart,
                            btn
                        })

                    })
                })
            })
        },
        //关注
        handleShipFocus(e) {
            let Authorization = wx.getStorageSync('Authorization');
            let status = e.currentTarget.dataset.status;
            let shipId = e.currentTarget.dataset.id;
            let params = {
                Authorization,
                shipId
            }
            console.log(params, status)

            if (status != true) {
                User.UserShipFocus(params).then(res => {
                    console.log(res)
                    if (res.data.state == 200) {
                        this.setData({
                            [`detail.focusStatus`]: true
                        })
                        wx.showToast({
                            title: '关注成功',
                            icon: 'success'
                        })

                    } else {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'loading'
                        })
                    }
                })
            } else {
                User.UserShipCancelFocus({
                    Authorization,
                    id: shipId
                }).then(res => {
                    console.log(res)
                    if (res.data.state == 200) {
                        this.setData({
                            [`detail.focusStatus`]: false
                        })
                        wx.showToast({
                            title: '成功取消关注',
                            icon: 'success'
                        })
                    } else {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'loading'
                        })
                    }
                })
            }
        },
        //更多信息
        handleshow() {
            let itemShow = this.data.itemShow = !this.data.itemShow;
            console.log(itemShow)
            this.setData({
                itemShow
            })
        },
        //浏览船图片
        handleShipImage(e) {
            let url = e.currentTarget.dataset.url;
            let image = this.data.image;
            console.log(this.data.image)
            wx.previewImage({
                current: url,
                urls: image
            })
        },


        //按钮事件
        handleBtn(e) {
            let id = e.currentTarget.dataset.id;
            let shippingOrderId = this.properties.porID;
            switch (id) {
                case 1:
                    this.shelvesDelete()
                    break;
                case 2:
                    console.log(2)
                    break;
                case 3:
                    console.log('投诉')
                    wx.navigateTo({
                        url: '/views/OrderAppeal/OrderAppeal?shippingOrderId=' + shippingOrderId,
                    })
                    break;
                case 4:
                    this.joinChat()
                    break;
                case 5:
                    this.chooseShipowners()
                    break;
            }
        },
        //下架船源
        shelvesDelete() {
            console.log('下架')
            let Authorization = wx.getStorageSync('Authorization');
            let id = this.properties.porID;
            let status = 0;
            let params = {
                Authorization,
                id,
                status
            };
            User.UserShipPeriodOnUnderFrame(params).then(res => {
                console.log(res)
                if (res.data.state == 200) {
                    wx.showLoading({
                        title: '下架成功',
                    })
                    setTimeout(function () {
                        wx.hideLoading();
                        wx.navigateBack({
                            delta: 1,
                        })
                    }, 1000)
                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'loading'
                    })
                }
            })

        },

        //发起聊天
        joinChat() {
            let senderid = this.data.userInfo.uid;
            let receiverid = this.data.detail.mtUser.uid;
            wx.navigateTo({
                url: '/views/chat/chat?senderid=' + senderid + '&receiverid=' + receiverid,
            })
        },

        //选择船东
        chooseShipowners() {
            wx.navigateTo({
                url: '/views/UserSpecifiedShip/UserSpecifiedShip',
            })
        },
    }
})