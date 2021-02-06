import User from "../../models/user/user";
import {
    formatTime
} from "../../utils/date";


Page({
    data: {
        buttonStyle: 'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        inputList: [{
            id: 2000001,
            type: 'default',
            title: '选择船舶',
            placeholder: '请选择船舶',
            border: true,
            arrow: false
        }, {
            id: 2000002,
            type: 'default',
            title: '空船港',
            placeholder: '请选择空船港',
            border: true,
            arrow: true
        }, {
            id: 2000003,
            type: 'picker',
            mode: 'date',
            title: '空船期',
            pickerDate: null,
            placeholder: '如2020-08-12 ±1天',
            border: false,
            arrow: true
        }],
        popupShow: false,
        addressShow: false,
        popupStyle: {},
        shipNameList: [], //船名字列表
        shipList: [], //船列表
        terminalList: [],
        id: null,
        detailedAddress: null,
        shipDateId: null, //船期ID

        shipId: null, //船ID
        wharfId: null, //港口id
        emptyDate: null, //船期时间戳
        note: null, //备注
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            shipDateId: options.id
        })
    },

    onShow: function () {
        this.onShipDateInfo()
    },

    onShipDateInfo() {
        let Authorization = wx.getStorageSync('Authorization');
        let id = this.data.shipDateId;
        console.log(id)
        User.UserShipDateInfoQuery({
            Authorization,
            id
        }).then(res => {
            let rows = res.data.data;
            let inputList = this.data.inputList;
            rows.emptyDate = formatTime(new Date(rows.emptyDate))
            inputList[0].placeholder = rows.mtShip.nameVessel;
            inputList[1].placeholder = rows.mtWharf.name;
            inputList[2].placeholder = rows.emptyDate;
            this.setData({
                inputList
            })
        })
    },

    //港口选择
    onMyEvent(e) {
        console.log(e)
        let detailedAddress = e.detail.detailedAddress;
        let wharfId = e.detail.wharfID;
        console.log(wharfId)
        if (detailedAddress != null) {
            this.setData({
                ['inputList[1].placeholder']: detailedAddress,
                detailedAddress,
                wharfId,
                addressShow: false
            })

        }
    },
    onCloseAddress() {
        this.setData({
            addressShow: false,
        })
        this.triggerEvent('myevent', '发布货源');
    },


    handleOpenPopup(e) {
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        console.log(index)
        if (index == 0) {
            return
        }
        this.setData({
            id,
            addressShow: true
        })
        this.triggerEvent('myevent', '选择空船港');
    },

    onClose() {
        this.setData({
            popupShow: false
        })
    },

    // 时间弹框确认按钮
    handleconfirm(e) {
        let index = e.currentTarget.dataset.index;
        console.log(index)
        if (index === 2) {
            let value = e.detail.value;
            console.log(value)
            let emptyDate = new Date(value).getTime();
            this.setData({
                [`inputList[${index}].pickerDate`]: value + '±1天',
                emptyDate
            })
        }

    },
    //备注
    handleNote(e) {
        console.log(e)
        this.setData({
            note: e.detail.value
        })
    },
    handleRelease() {
        let Authorization = wx.getStorageSync('Authorization');
        let id = this.data.shipDateId;
        let wharfId = this.data.wharfId;
        let emptyDate = this.data.emptyDate;
        let note = this.data.note;
        let params = {
            Authorization,
            id,
            wharfId,
            emptyDate,
            note
        }
        console.log(params)

        User.UserShipDateEdit(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '修改成功',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateBack({
                        delta: 2,
                    })
                }, 1000)
            } else {
                wx.showToast({
                  title: res.data.message,
                  icon:'none'
                })
            }

        })

    }
})