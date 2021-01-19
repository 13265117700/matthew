// views/screening/screening.js
Page({
    data: {
        id: null,
        index: 0,
        state: 1,
        buttonStyle: 'border: none;',
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
                break
            case 7:
                console.log(address, state)
                break
        }
    },
    //装货最小值
    minValue: function (e) {
        console.log(e)
    },
    //装货最大值
    maxValue: function (e) {
        console.log(e)
    },
    //类型
    onType: function (e) {
        console.log(e)
    },
    //空船开始时间
    startDate: function (e) {
        console.log(e)
    },
    //空船结束时间
    endDate: function (e) {
        console.log(e)
    },
    handleremove(e){
        console.log(e)
        this.selectComponent("#address").onRemove();
        this.selectComponent("#ontype").onRemove();
        this.selectComponent("#mount").onRemove();
        this.selectComponent("#ondate").onRemove();
    }
})