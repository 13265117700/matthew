import mtWharf from '../../../models/frontEnd/mtWharf';

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
        crumbsLength: null, //面包屑长度
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

            if (addressName.length <= 3) {
                if (addressName.length === 2) {
                    addressName.push(address[index]);
                } else {
                    addressName.push(address[index]);
                }
                addressName.forEach(a => a.active = false);
                address.forEach(b => b.active = false)
                address[index].active = !address[index].active;
                mtWharf.frontDeskWharfList(params).then(res => {
                    let rows = res.data.data.rows;
                    let pro = []
                    rows.forEach(data => {
                        data.active = false;
                        pro.push(data)
                    })
                    this.setData({
                        address: pro,
                        addressName,
                        crumbsLength: addressName.length
                    })
                })
            }
        },

        // 获取码头列表
        getWharfList() {
            let address = this.data.address;
            let pickerList = address.map(data => data.name);
            this.setData({
                pickerList,
                popupShow: true
            })

        },
        onClose() {
            this.setData({
                popupShow: false
            })
        },
        handlePopupInput(e) {
            this.setData({
                popupInputValue: e.detail
            })
        },
        handleConfirmPicker(e) {
            let state = this.properties.porState;
            let address = this.data.address;
            let index = e.detail.index;
            let popupInputValue = this.data.popupInputValue;
            if (popupInputValue != null) {
                this.triggerEvent('onaddress', {
                    onMyEvent: popupInputValue,
                    state
                })
                this.setData({
                    cellValue: popupInputValue,
                    popupShow: false
                })
            } else {
                this.triggerEvent('onaddress', {
                    onMyEvent: address[index],
                    state
                })
                this.setData({
                    cellValue: address[index].name,
                    popupShow: false
                })
            }

        },

        //点击面包屑
        clickCrumbs(e) {
            let addressName = this.data.addressName;
            let number = e.currentTarget.dataset.index;
            let index = number - 1;
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
                        crumbsLength: 0
                    })
                })
            } else if (number === 1) {
                let mtWharfList = addressName[index].mtWharfList;
                console.log(1)
                mtWharfList.forEach(data => {
                    if (data.id === addressName[number].id) {
                        data.active = true
                    } else {
                        data.active = false
                    }
                })
                addressName.splice(2, 1)
                addressName.splice(2, 1)
                console.log(1231)
                this.setData({
                    address: mtWharfList,
                    addressName,
                    crumbsLength: addressName.length
                })
            } else if (number === 2) {
                let mtWharfList = addressName[index].mtWharfList;
                mtWharfList.forEach(data => {
                    if (data.id === addressName[number].id) {
                        data.active = true
                    } else {
                        data.active = false
                    }
                })
                addressName.splice(3, 1)
                this.setData({
                    address: mtWharfList,
                    addressName,
                    crumbsLength: addressName.length
                })
                console.log(mtWharfList)
            }
            this.setData({
                cellValue: '请选择码头',
            })
        },

        onRemove() {
            this.getAddress()
            this.setData({
                addressName: [],
                crumbsLength: null,
                pickerList: []
            })
        }
    }
})