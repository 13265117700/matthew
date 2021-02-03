import User from '../../models/user/user';
import mtWharf from '../../models/frontEnd/mtWharf';
const {
    formatTime
} = require('../../utils/date')

Page({
    data: {
        id: null,
        pageState: null,
        idenID: null,
        shipList: [],
        cargoList: [],
        // focusStatus:false
        typeShip: null, //船类型
        mtWharfId: null, //空船港ID
        tonnageLarge: null, //船最小值
        tonnageSmall: null, //船最大值
        emptyDateLarge: null, //空船期最小值
        emptyDateSmall: null, //空船期最大值


        cargoName: null, //货物名
        numberLarge: null, //货物最小值
        numberSmall: null, //货物最大值
        portArrivalId: null, //到达港
        portDepartureId: null, //起运港
        state: null,
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id: options.id,
            pageState: options.data,
            idenID: options.idenID
        })
    },
    onShow: function () {
        this.navbarTitle();
        this.getShipList();
        this.getCargoList();
    },

    navbarTitle() {
        let id = this.data.id;
        let pageState = this.data.pageState;
        if (pageState) {
            switch (id) {
                case '9999999':
                    wx.setNavigationBarTitle({
                        title: '船期船源信息',
                    })

                    break
                case '9999998':
                    wx.setNavigationBarTitle({
                        title: '货源货期信息',
                    })

                    break
                case '9999997':
                    wx.setNavigationBarTitle({
                        title: '车源车期信息',
                    })

                    break
                case '9999996':
                    wx.setNavigationBarTitle({
                        title: '车辆信息',
                    })

                    break
            }
        } else {
            wx.setNavigationBarTitle({
                title: '船期信息',
            })

        }
    },

    //获取船期列表
    getShipList(nameVessel) {
        let id = this.data.id;
        if (id == '9999999') {
            let Authorization = wx.getStorageSync('Authorization');
            let page = 1;
            let rows = 10;
            let state = this.data.state;
            let typeShip = this.data.typeShip;
            let mtWharfId = this.data.mtWharfId;
            let tonnageLarge = this.data.tonnageLarge;
            let tonnageSmall = this.data.tonnageSmall;
            let emptyDateLarge = this.data.emptyDateLarge;
            let emptyDateSmall = this.data.emptyDateSmall;

            let params = {
                page,
                rows
            };
            if (nameVessel) params = {
                nameVessel,
                page,
                rows
            };


            if (state) {
                if (typeShip) {
                    mtWharfId = null;
                    tonnageLarge = null;
                    tonnageSmall = null;
                    emptyDateLarge = null;
                    emptyDateSmall = null;
                    params = {
                        typeShip: typeShip.name,
                        page,
                        rows
                    }
                } else if (mtWharfId) {
                    typeShip = null;
                    tonnageLarge = null;
                    tonnageSmall = null;
                    emptyDateLarge = null;
                    emptyDateSmall = null;
                    params = {
                        mtWharfId,
                        page,
                        rows
                    }
                } else if (tonnageLarge || tonnageSmall) {
                    typeShip = null;
                    mtWharfId = null;
                    emptyDateLarge = null;
                    emptyDateSmall = null;
                    params = {
                        tonnageLarge,
                        tonnageSmall,
                        page,
                        rows
                    }
                } else if (emptyDateLarge || emptyDateSmall) {
                    typeShip = null;
                    mtWharfId = null;
                    tonnageLarge = null;
                    tonnageSmall = null;
                    params = {
                        emptyDateLarge,
                        emptyDateSmall,
                        page,
                        rows
                    }
                } else {
                    params = {
                        typeShip: typeShip.name,
                        mtWharfId,
                        tonnageLarge,
                        tonnageSmall,
                        emptyDateLarge,
                        emptyDateSmall,
                        page,
                        rows
                    }
                }
            }

            console.log(params)

            mtWharf.frontDeskShipPeriodList(params).then(res => {
                let rows = res.data.data.rows;
                console.log(rows)
                let shipList = []
                rows.forEach(data => {
                    data.emptyDate = formatTime(new Date(data.emptyDate));
                    let collegeId = data.mtShip.id; //船的ID
                    User.UserShipWhetherFocusOn({
                        Authorization,
                        collegeId
                    }).then(focus => {

                        Promise.all([focus]).then(result => {
                            let focusStatus = result[0].data.data;
                            data.focusStatus = focusStatus;
                            shipList.push(data)
                            this.setData({
                                shipList
                            })
                        })


                    })

                })


            })
        }


    },
    //获取货源列表
    getCargoList(nameVessel) {
        let id = this.data.id;

        if (id == '9999998') {
            let Authorization = wx.getStorageSync('Authorization');
            let page = 1;
            let rows = 10;
            let state = this.data.state;
            let cargoName = this.data.cargoName;
            let numberLarge = this.data.numberLarge;
            let numberSmall = this.data.numberSmall;
            let portArrivalId = this.data.portArrivalId;
            let portDepartureId = this.data.portDepartureId;

            let params = {
                page,
                rows
            }

            if (nameVessel) params = {
                name: nameVessel,
                page,
                rows
            };

            if (state) {
                if (cargoName) {
                    numberLarge = null;
                    numberSmall = null;
                    portArrivalId = null;
                    portDepartureId = null;
                    params = {
                        name: cargoName.name,
                        page,
                        rows
                    }
                } else if (numberLarge || numberSmall) {
                    cargoName = null;
                    portArrivalId = null;
                    portDepartureId = null;
                    params = {
                        numberLarge,
                        numberSmall,
                        page,
                        rows
                    }
                } else if (portArrivalId || portDepartureId) {
                    cargoName = null;
                    numberLarge = null;
                    numberSmall = null;
                    params = {
                        portArrivalId,
                        portDepartureId,
                        page,
                        rows
                    }
                } else {
                    params = {
                        name: cargoName.name,
                        numberLarge,
                        numberSmall,
                        portArrivalId,
                        portDepartureId,
                        page,
                        rows
                    }
                }
            }

            mtWharf.frontDeskCargoFocusOn(params).then(res => {
                let rows = res.data.data.rows;
                let cargoList = [];
                if (rows.length != 0) {
                    rows.forEach(data => {
                        let collegeId = data.id;
                        User.UserCargoFocusOn({
                            Authorization,
                            collegeId
                        }).then(focus => {
                            console.log(focus)
                            Promise.all([focus]).then(result => {
                                let focusStatus = result[0].data.data;
                                data.focusStatus = focusStatus;
                                cargoList.push(data)
                                this.setData({
                                    cargoList
                                })
                                console.log(cargoList)
                            })
                        })
                    })
                } else {
                    this.setData({
                        cargoList: rows
                    })
                }

            })
        }


    },

    //船期关注
    handleShipFocus(e) {
        console.log(e)
        // let shipList = this.data.shipList;
        let Authorization = wx.getStorageSync('Authorization');
        let shipId = e.currentTarget.dataset.id;
        let id = shipId;
        let status = e.currentTarget.dataset.status;
        let index = e.currentTarget.dataset.index;
        let params = {
            Authorization,
            shipId
        }
        console.log(params)
        if (status != true) {
            User.UserShipFocus(params).then(res => {
                console.log(res)
                if (res.data.state === 200) {
                    this.setData({
                        [`shipList[${index}].focusStatus`]: true
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
                id
            }).then(res => {
                if (res.data.state === 200) {
                    this.setData({
                        [`shipList[${index}].focusStatus`]: false
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
    //货关注
    handleCargoFocus(e) {
        let Authorization = wx.getStorageSync('Authorization');
        let status = e.currentTarget.dataset.status;
        let index = e.currentTarget.dataset.index;
        let shipId = e.currentTarget.dataset.id;
        let params = {
            Authorization,
            shipId
        }
        if (status != true) {
            User.UserCargoFocus(params).then(res => {
                console.log(res)
                if (res.data.state == 200) {
                    this.setData({
                        [`cargoList[${index}].focusStatus`]: true
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
            User.UserCargoCancelFocus({
                Authorization,
                id: shipId
            }).then(res => {
                console.log(res)
                if (res.data.state == 200) {
                    this.setData({
                        [`cargoList[${index}].focusStatus`]: false
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

    handleCheckDetails(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/views/shipDateDetails/shipDateDetails?id=' + id,
        })
    },
    //进入货详情
    goCargoDetail(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/views/cargoDateDetails/cargoDateDetails?id=' + id,
        })
    },

    //输入搜索
    handleSearch(e) {
        let nameVessel = e.detail;
        let id = this.data.id;
        this.setData({
            state: null
        })
        switch (id) {
            case '9999999':
                this.getShipList(nameVessel)
                break;
            case '9999998':
                this.getCargoList(nameVessel)
                break;
        }

    },

    handleSidebar() {
        let id = this.data.id;
        wx.navigateTo({
            url: '/views/Screening/Screening?id=' + id,
        })
    },

})