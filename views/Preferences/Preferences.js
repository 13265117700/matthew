import mtRoute from "../../models/frontEnd/mtRoute";
import mtWharf from "../../models/frontEnd/mtWharf";
import User from "../../models/user/user";


Page({
    data: {
        confirmButtom: 'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        inputList: [{
            id: 6050001,
            type: 'default',
            title: '航线设置',
            placeholder: '请选择航线',
            border: false,
            arrow: true
        }, {
            id: 6050002,
            type: 'input',
            title: '最小(吨数）',
            placeholder: '请输入最小数量吨数',
            border: false,
            arrow: false
        }, {
            id: 6050003,
            type: 'input',
            title: '最大(吨数）',
            placeholder: '请输入最大数量吨数',
            border: false,
            arrow: false
        }, {
            id: 6050004,
            type: 'default',
            title: '货物设置',
            placeholder: '请选择货物',
            border: false,
            arrow: true
        }],
        show: false,
        id: Number,
        routeList: [], //航线列表
        cargoList: [], //货物列表
        columns: [], //选择列表

        minValue: null, //最小吨数
        maxValue: null, //最大吨数
        routeID: null, //航线ID
        cargoID: null, //货物ID
    },

    onLoad: function (options) {

    },
    onShow: function () {
        this.getUserPreferences()
    },
    getUserPreferences() {
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {
            Authorization,
            page,
            rows
        }
        User.userInfo(params).then(res => {
            let mtUserPreferences = res.data.data.mtUserPreferences;
            if (mtUserPreferences) {
                this.setData({
                    ['inputList[0].placeholder']: mtUserPreferences.mtRoute.name,
                    ['inputList[1].placeholder']: mtUserPreferences.minimumTon,
                    ['inputList[2].placeholder']: mtUserPreferences.maximumTon,
                    ['inputList[3].placeholder']: mtUserPreferences.mtNameGoods.name,
                })
            }
        })
    },

    //输入框事件
    handleconfirm(e) {
        let id = e.currentTarget.dataset.id;
        let value = e.detail.value;
        if (id == 6050002) {
            this.onMinTons(value)
        } else if (id == 6050003) {
            this.onMaxTons(value)
        }
    },

    //最小值
    onMinTons(minValue) {
        this.setData({
            minValue
        })
    },
    //最大值
    onMaxTons(maxValue) {
        this.setData({
            maxValue
        })
    },

    //打开弹出层
    handleOpenPopup(e) {
        let id = e.currentTarget.dataset.id;
        if (id == 6050001) {
            this.onChooseRoute()
        } else if (id == 6050004) {
            this.onChooseCargo()
        }
        this.setData({
            id
        })
    },
    //选择路线
    onChooseRoute() {
        console.log('路线')
        let page = 1;
        let rows = 10;
        let params = {
            page,
            rows
        };

        mtRoute.frontDeskRouteList(params).then(res => {
            let rows = res.data.data.rows;
            let name = rows.map(data => data.name);
            this.setData({
                routeList: rows,
                columns: name,
                show: true
            })
        })
    },
    //选择货物
    onChooseCargo() {
        console.log('货物')
        let page = 1;
        let rows = 10;
        let params = {
            page,
            rows
        };
        mtWharf.frontDeskCargoList(params).then(res => {
            console.log(res)
            let rows = res.data.data.rows;
            let name = rows.map(data => data.name);
            this.setData({
                cargoList: rows,
                columns: name,
                show: true
            })
        })
    },
    //取消弹框
    onCancel() {
        this.setData({
            show: false
        })
    },
    //确认选择
    onConfirm(e) {
        let index = e.detail.index;
        let id = this.data.id;
        if (id == 6050001) {
            let routeList = this.data.routeList;
            this.setData({
                routeID: routeList[index].id,
                ['inputList[0].placeholder']: routeList[index].name,
                show: false
            })
        } else if (id == 6050004) {
            let cargoList = this.data.cargoList;
            this.setData({
                cargoID: cargoList[index].id,
                ['inputList[3].placeholder']: cargoList[index].name,
                show: false
            })
        }

    },


    //确认按钮
    handleConfirmBtn() {
        let Authorization = wx.getStorageSync('Authorization');
        let minimumTon = this.data.minValue;
        let maximumTon = this.data.maxValue;
        let nameGoodsId = this.data.cargoID;
        let routeId = this.data.routeID;

        if (!minimumTon || !maximumTon || !nameGoodsId || !routeId) {
            wx.showToast({
                title: '还有未填项',
                icon: 'none'
            })
            return
        }

        let params = {
            Authorization,
            minimumTon,
            maximumTon,
            nameGoodsId,
            routeId
        };
        console.log(params)

        User.userPreference(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showToast({
                    title: '设置成功',
                    icon: 'success'
                })

                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 1500)
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'loading'
                })
            }
        })
    }
})