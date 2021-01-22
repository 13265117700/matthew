import mtWharf from '../../models/frontEnd/mtWharf';

Component({
    properties: {
        porState: Number
    },
    lifetimes: {
        attached: function () {
            this.getAddress();
        }
    },
    data: {
        addressName: [], //面包屑
        address: [], //每次获取的列表
        cellValue: '请选择码头',
        popupShow: false, //弹框显示/隐藏
        popupInputValue: null, //弹框input输入框
        pickerList: [], //选择列表
        detailedAddress: null, //详细地址
        wharfID: null, //地址ID
    },
    methods: {
        //获取地区
        getAddress() {
            let pId = 0;
            let page = 1;
            let rows = 10;
            let sortInt = 1;
            let params = {
                pId,
                page,
                rows,
                sortInt
            };
            mtWharf.frontDeskWharfList(params).then(res => {
                let rows = res.data.data.rows;
                let address = [];
                rows.forEach(data => {
                    data.active = false;
                    address.push(data)
                });
                this.setData({
                    address
                })
            })
        },
        //点击获取下级地区
        getAddressChild(e) {
            let index = e.currentTarget.dataset.index;
            let address = this.data.address;
            let addressName = this.data.addressName;
            let pId = e.currentTarget.dataset.id;
            let page = 1;
            let rows = 10;
            let sortInt = 1;
            let params = {
                pId,
                page,
                rows,
                sortInt
            }

            if (addressName.length === 3) {
                addressName.splice(2, 1)
                
            }
            addressName.push(address[index]);
            console.log(addressName)
            this.triggerEvent('onaddress', {
                addressName
            })
          
            addressName.forEach(a => a.active = false);
            address.forEach(b => b.active = false)
            address[index].active = !address[index].active;
            mtWharf.frontDeskWharfList(params).then(res => {
                let rows = res.data.data.rows;
                let pro = []
                rows.forEach(data => {
                    data.active = false;
                    if (addressName.length < 3) {
                        pro.push(data)
                    }
                })
                if (addressName.length == 3) {
                    pro = address
                }
                this.setData({
                    address: pro,
                    addressName,
                })
            })
        },

        //点击面包屑
        clickCrumbs(e) {
            console.log(e)
            let addressName = this.data.addressName;
            let number = e.currentTarget.dataset.index;
            let index = number - 1;
            console.log(index)
            if (index < 0) {
                let pId = 0;
                let page = 1;
                let rows = 10;
                let sortInt = 1;
                let params = {
                    pId,
                    page,
                    rows,
                    sortInt
                };
                mtWharf.frontDeskWharfList(params).then(res => {
                    let rows = res.data.data.rows;
                    let address = [];
                    rows.forEach(data => {
                        if (data.id === addressName[number].id) {
                            data.active = true
                        } else {
                            data.active = false
                        }
                        address.push(data)
                    })

                    this.setData({
                        address,
                        addressName: [],
                    })
                })
            } else if (number === 1) {
                let mtWharfList = addressName[index].mtWharfList;
                console.log(mtWharfList)
                mtWharfList.forEach(data => {
                    if (data.id === addressName[number].id) {
                        data.active = true
                    } else {
                        data.active = false
                    }
                })
                addressName.splice(1, 1)
                addressName.splice(1, 1)
                this.setData({
                    address: mtWharfList,
                    addressName,
                })
            }
        },
    }
})