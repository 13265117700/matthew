// views/screening/screening.js
Page({
    data: {
        id: null,
        index: 0,
        state: 1,
        buttonStyle: 'border: none;',
        type: null, //类型

        mtWharfId: null, //空船港
        emptyDateLarge: null, //船期最小值
        emptyDateSmall: null, //船期最大值

        portDeparture: null, //起运港名
        portArrival: null, //到达港名
        portDepartureId: null, //起运港
        portArrivalId: null, //到达港
        numberSmall: null, //最小值
        numberLarge: null, //最大值
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id: options.id
        })
    },
    onShow: function () {

    },
    onSidebar: function (e) {
        console.log(e)
        let index = e.detail.index;
        let state = e.detail.state;
        this.setData({
            index,
            state
        })
    },
    //地址
    onAddress: function (e) {
        console.log(e)
        let state = e.detail.state;
        let address = e.detail.onMyEvent;
        console.log(address.id)
        switch (state) {
            case 4:
                console.log(address, state)
                this.setData({
                    mtWharfId:address.id
                })
                break
            case 6:
                console.log(address, state)
                this.setData({
                    portDepartureId: address.id,
                    portDeparture: address.name
                })
                break
            case 7:
                console.log(address, state)
                this.setData({
                    portArrivalId: address.id,
                    portArrival: address.name
                })
                break
        }
    },
    //装货最小值
    minValue: function (e) {
        console.log(e)
        this.setData({
            numberLarge: e.detail.minValue
        })
    },
    //装货最大值
    maxValue: function (e) {
        console.log(e)
        this.setData({
            numberSmall: e.detail.maxValue
        })
    },
    //类型
    onType: function (e) {
        console.log(e)
        let type = e.detail.type;
        this.setData({
            type
        })
    },
    //空船开始时间
    startDate: function (e) {
        console.log(e)
        let startDate = new Date(e.detail.startDate).getTime()
        console.log(startDate)
        this.setData({
            emptyDateLarge: startDate
        })
    },
    //空船结束时间
    endDate: function (e) {
        console.log(e)
        let endDate = new Date(e.detail.endDate).getTime()
        console.log(endDate)
        this.setData({
            emptyDateSmall: endDate
        })
    },
    //清空
    handleremove(e) {
        console.log(e)
        this.selectComponent("#address").onRemove();
        this.selectComponent("#ontype").onRemove();
        this.selectComponent("#mount").onRemove();
        this.selectComponent("#ondate").onRemove();
    },

    //确认
    handleconfirm() {
        let id = Number(this.data.id);
        console.log(id)
        switch (id) {
            case 9999998:
                this.cargo();
                break;
            case 9999999:
                this.ship();
                break;
        }
    },
    ship() {
        let type = this.data.type;
        let mtWharfId = this.data.mtWharfId;
        let emptyDateLarge = this.data.emptyDateLarge;
        let emptyDateSmall = this.data.emptyDateSmall;
        let tonnageLarge = this.data.numberSmall;
        let tonnageSmall = this.data.numberLarge;
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];

        prevPage.setData({
            typeShip: type,
            mtWharfId,
            emptyDateLarge,
            emptyDateSmall,
            tonnageLarge,
            tonnageSmall,
            state:1
        })

        wx.navigateBack({
            delta: 1,
            success: (res) => {
                prevPage.getShipList()
            }
        })

    },
    cargo() {
        let type = this.data.type;
        let portDepartureId = this.data.portDepartureId;
        let portArrivalId = this.data.portArrivalId;
        let numberSmall = this.data.numberSmall;
        let numberLarge = this.data.numberLarge;
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];

        prevPage.setData({
            cargoName: type,
            numberLarge,
            numberSmall,
            portArrivalId,
            portDepartureId,
            state: 1
        })

        wx.navigateBack({
            delta: 1,
            success: (res) => {
                prevPage.getCargoList()
            }
        })
    }
})