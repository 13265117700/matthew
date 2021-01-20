import User from "../models/user/user"
Component({
    data: {
        activeIndex: 0,
        tabBar: [{
                pagePath: '/pages/index/index',
                name: '首页',
                tips: '',
                large: false,
                icon: {
                    normal: '/images/index/index1-3.png',
                    active: '/images/index/index2-3.png'
                }
            },
            {
                pagePath: '/pages/myFollow/myFollow',
                name: '我的关注',
                tips: '',
                large: false,
                icon: {
                    normal: '/images/myFollow/myFollow1-3.png',
                    active: '/images/myFollow/myFollow2-3.png'
                }
            },
            {
                pagePath: `/pages/deliver/deliver`,
                name: '发布',
                tips: '',
                large: true,
                icon: {
                    normal: '/images/deliver/deliver.png',
                    active: '/images/deliver/deliver.png'
                }
            },
            {
                pagePath: '/pages/order/order',
                name: '订单',
                tips: '',
                large: false,
                icon: {
                    normal: '/images/order/order1-3.png',
                    active: '/images/order/order2-3.png'
                }
            },
            {
                pagePath: '/pages/my/my',
                name: '我的',
                tips: '',
                large: false,
                icon: {
                    normal: '/images/my/my1-3.png',
                    active: '/images/my/my2-3.png'
                }
            }
        ],
    },
    lifetimes: {
        
    },
    methods: {
        onChange(e) {
            let index = e.detail.current;
            let Authorization = wx.getStorageSync('Authorization');
            console.log(index)
            if (index != 0 && index != 4) {
                if (!Authorization) {
                    wx.navigateTo({
                        url: '/pages/logs/logs',
                    })
                    return
                }
            }
            if (index === 2) {
                this.getUserInfo()
            } else {
                wx.switchTab({
                    url: this.data.tabBar[index].pagePath,
                })
            }
        },
        getUserInfo() {
            let Authorization = wx.getStorageSync('Authorization');
            let uid = ''
            let params = {
                Authorization,
                uid
            }
            User.userInfo(params).then(res => {
                let user = res.data.data;
                console.log(user)
                if (user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' ') {
                    console.log('货主')
                    wx.navigateTo({
                        url: '/views/ResourceAdd/ResourceAdd?id=' + '855',
                    })
                } else if (user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' ') {
                    console.log('车主')
                    wx.navigateTo({
                        url: '/views/ResourceAdd/ResourceAdd?id=' + '609',
                    })
                } else if (user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' ') {
                    console.log('船东')
                    wx.navigateTo({
                        url: '/views/ResourceAdd/ResourceAdd?id=' + '567',
                    })
                }
            })


        },

    }
})