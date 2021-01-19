import mtWharf from '../../../models/frontEnd/mtWharf'


Component({
    properties: {
        porID: Number
    },
    lifetimes: {
        ready: function () {
            this.getshiptype()
        },
    },
    data: {
        list: []
    },
    methods: {
        getshiptype() {
            let id = this.properties.porID;
            console.log(id)
            if (id == 9999999) {
                let params = {
                    page: 1,
                    rows: 10
                };

                mtWharf.frontDeskShipTypeList(params).then(res => {
                    let rows = res.data.data.rows;
                    rows.forEach(data => {
                        data.active = false
                    })
                    console.log(rows)

                    this.setData({
                        list: rows
                    })
                })

            } else if (id == 9999998) {
                let params = {
                    page: 1,
                    rows: 10
                };

                mtWharf.frontDeskCargoList(params).then(res => {
                    console.log(res)
                    let rows = res.data.data.rows;
                    rows.forEach(data => {
                        data.active = false
                    })

                    this.setData({
                        list: rows
                    })

                })

            }

        },
        handletype(e) {
            let index = e.currentTarget.dataset.index;
            let list = this.data.list;
            list.forEach(a => a.active = false);
            list[index].active = !list[index].active;
            console.log(list)
            this.triggerEvent('ontype', {
                type: list[index]
            })
            this.setData({
                list
            })

        },
        onRemove(){
            this.getshiptype()
        }
    }
})