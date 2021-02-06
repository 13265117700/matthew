import User from "../models/user/user"
Component({
    data: {
        user: {},
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
        attached: function () {

        }
    },
    methods: {
        onChange(e) {
            console.log(e)
            let index = e.detail.current;
            let Authorization = wx.getStorageSync('Authorization');

            User.userInfo({
                Authorization
            }).then(res => {
                let user = res.data.data;
                if (index != 0 && index != 4) {
                    if (!Authorization) {
                        wx.navigateTo({
                            url: '/pages/logs/logs',
                        })
                        return
                    }
                    if (user.identityDifference == 0 && index != 1) {
                        wx.showToast({
                            title: '请前往我的页面进行认证',
                            icon: 'none'
                        })
                        return
                    }
                }
                if (index === 2) {
                    this.onRelease(user)
                } else {
                    wx.switchTab({
                        url: this.data.tabBar[index].pagePath,
                    })
                }
            })

        },

        onRelease(user) {
            console.log(user)
            if (user.identityDifference == 2) {
                console.log('货主')
                wx.navigateTo({
                    url: '/views/ResourceAdd/ResourceAdd?id=' + '855',
                })
            } else if (user.identityDifference == 3) {
                console.log('车主')
                wx.navigateTo({
                    url: '/views/ResourceAdd/ResourceAdd?id=' + '609',
                })
            } else if (user.identityDifference == 1) {
                console.log('船东')
                wx.navigateTo({
                    url: '/views/ResourceAdd/ResourceAdd?id=' + '567',
                })
            } else {
                wx.showToast({
                    title: '请前往我的页面进行认证',
                    icon: 'none'
                })
            }
        }
    }
})