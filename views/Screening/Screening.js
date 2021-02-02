// views/screening/screening.js
Page({
    data: {
        id: null,
        index: 0,
        state: 1,
        buttonStyle: 'border: none;',
        type:null,//类型
        portDepartureId:null,//起运港
        portArrivalId:null,//到达港
        numberSmall:null,//最小值
        numberLarge:null,//最大值
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
        switch (state) {
            case 1:
                console.log(address, state)
                break
            case 6:
                console.log(address, state)
                this.setData({
                    portDepartureId:address
                })
                break
            case 7:
                console.log(address, state)
                this.setData({
                    portArrivalId:address
                })
                break
        }
    },
    //装货最小值
    minValue: function (e) {
        console.log(e)
        this.setData({
            numberSmall:e.detail.minValue
        })
    },
    //装货最大值
    maxValue: function (e) {
        console.log(e)
        this.setData({
            numberLarge:e.detail.maxValue
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
    },
    //空船结束时间
    endDate: function (e) {
        console.log(e)
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
                break
        }
    },
    cargo() {
        console.log(123123)
        console.log(this.data.type)
    }
})