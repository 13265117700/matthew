// components/screening/sidebar/sidebar.js
Component({
    properties: {
        porID: Number
    },
    lifetimes: {
        ready: function () {
            this.siderList()
        }
    },
    data: {
        activeKey: 0,
        siderList: []
    },
    methods: {
        siderList() {
            let id = this.properties.porID;
            if (id == 9999999) {
                let siderList = [{
                    title: '空船港',
                    state: 1,
                    show: true
                }, {
                    title: '装货吨数',
                    state: 2,
                    show: true
                }, {
                    title: '船舶类型',
                    state: 3,
                    show: true,
                }, {
                    title: '空船期',
                    state: 4,
                    show: true
                }]

                this.triggerEvent('onsidebar', {
                    state:4
                })
                this.setData({
                    siderList,
                })

            } else if (id == 9999998) {
                let siderList = [{
                    title: '货源类型',
                    state: 5,
                    show: true
                }, {
                    title: '装货地',
                    state: 6,
                    show: true
                }, {
                    title: '收货地',
                    state: 7,
                    show: true
                }, {
                    title: '装货吨数',
                    state: 8,
                    show: true
                }]
                this.triggerEvent('onsidebar', {
                    state:5
                })
                this.setData({
                    siderList
                })
            }

        },
        onChange(e) {
            let index = e.currentTarget.dataset.index;
            let state = e.currentTarget.dataset.state;
            this.setData({
                activeKey: e.detail
            })

            this.triggerEvent('onsidebar', {
                state,index
            })
        }
    }
})