import mtWharf from '../../models/frontEnd/mtWharf';
Component({
    properties: {
        propID: String
    },
    lifetimes: {
        attached: function () {
            this.getAddress();
        }
    },
    data: {
        buttonStyle: 'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        addressName: [], //面包屑
        // crumbsLength: null, //面包屑长度
        isAWharf: false, //是否码头
        show: true, //面包屑选择提示显示
        address: [], //每次获取的列表
        cellValue: '请选择码头',
        popupShow: false, //弹框显示/隐藏
        popupInputValue: null, //弹框input输入框
        pickerList: [], //选择列表
        detailedAddress: null, //详细地址
        wharfID: null, //地址ID
        value: null,
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
                console.log(rows)
                let address = [];
                rows.forEach(data => {
                    data.active = false;
                    address.push(data)
                });
                this.setData({
                    address,
                    addressName: [],
                    isAWharf: false,
                    show: true
                })
            })
        },
        getAddressChild(e) {
            console.log(e)
            let index = e.currentTarget.dataset.index;
            let name = e.currentTarget.dataset.name;
            let isAWharf = e.currentTarget.dataset.isawharf;
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
            if (isAWharf === 0) {
                mtWharf.frontDeskWharfList(params).then(res => {
                    let rows = res.data.data.rows;
                    console.log(rows)
                    let arr = rows.every(data => data.isAWharf == 1);
                    addressName.forEach(a => a.active = false);
                    addressName.push({
                        name,
                        id: pId,
                        active: true
                    })
                    this.setData({
                        addressName,
                        address: rows,
                        isAWharf: arr,
                        popupInputValue: null,
                        cellValue: '请选择码头',
                    })

                })
            } else {
                address.forEach(b => b.active = false)
                addressName.forEach(a => a.active = false);
                address[index].active = !address[index].active;
                console.log(address)
                if (addressName.length == 3) {
                    addressName.splice(2, 1)
                }
                addressName.push({
                    name,
                    id: pId,
                    active: true
                })

                let array = addressName.map(data => data.name);
                let detailedAddress = array.toString().replace(/,/g, '');

                this.setData({
                    addressName,
                    address,
                    detailedAddress,
                    wharfID:address[index].id,
                    show: false
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
        handleChangePicker(e) {
            console.log(e)
            let index = e.detail.index;
            let value = e.detail.value;

            let addressName = this.data.addressName;
            let address = this.data.address;

            if (addressName.length > 3) {
                addressName.splice(3, 1)
            }
            addressName.push(address[index])
            console.log(addressName)
            let array = addressName.map(data => data.name);
            let detailedAddress = array.toString().replace(/,/g, '');

            this.setData({
                detailedAddress,
                value,
                wharfID: address[index].id,
                popupInputValue: null
            })

        },
        handlePopupInput(e) {
            let addressName = this.data.addressName;
            if (addressName.length > 3) {
                addressName.splice(3, 1)
            }
            addressName.push({
                name: e.detail
            });
            let array = addressName.map(data => data.name);
            let detailedAddress = array.toString().replace(/,/g, '');
            this.setData({
                detailedAddress,
                value: e.detail
            })
        },
        onPickerConfirm(e) {
            console.log(e)
            let confirm = this.data.value;
            if (!confirm) {
                let index = e.detail.index;
                let value = e.detail.value;

                let addressName = this.data.addressName;
                let address = this.data.address;

                if (addressName.length > 3) {
                    addressName.splice(3, 1)
                }
                addressName.push(address[index])
                let array = addressName.map(data => data.name);
                let detailedAddress = array.toString().replace(/,/g, '');

                this.setData({
                    detailedAddress,
                    cellValue: value,
                    wharfID: address[index].id,
                    popupShow: false
                })
            } else {
                console.log(confirm)
                this.setData({
                    cellValue: confirm,
                    popupShow: false
                })
            }

        },

        //点击面包屑
        clickCrumbs(e) {
            let addressName = this.data.addressName;
            console.log(addressName)
            let index = e.currentTarget.dataset.index;
            let pId = null;
            switch (index) {
                case 0:
                    this.getAddress()
                    break;
                case 1:
                    pId = addressName[index - 1].id;
                    if (addressName.length == 2) {
                        addressName.splice(1, 1)
                    }
                    if (addressName.length == 3) {
                        addressName.splice(1, 2)
                    }
                    if (addressName.length == 4) {
                        addressName.splice(1, 3)
                    }


                    this.crumbsGetAddress({
                        addressName,
                        pId
                    })
                    break;
                case 2:
                    pId = addressName[index - 1].id;
                    if (addressName.length == 3) {
                        addressName.splice(2, 1)
                    }
                    if (addressName.length == 4) {
                        addressName.splice(2, 2)
                    }

                    this.crumbsGetAddress({
                        addressName,
                        pId
                    })
                    break;
            }
        },
        crumbsGetAddress(data) {
            console.log(data)
            let params = {
                pId: data.pId,
                page: 1,
                rows: 10,
                sortInt: 1
            }

            mtWharf.frontDeskWharfList(params).then(res => {
                let address = res.data.data.rows;
                console.log(address)
                this.setData({
                    addressName: data.addressName,
                    address,
                    show: true,
                    isAWharf: false,
                })
            })

        },

        bindleConfirm() {
            let detailedAddress = this.data.detailedAddress;
            let propID = this.data.propID;
            let wharfID = this.data.wharfID;
            let onMyEvent = {
                detailedAddress,
                propID,
                wharfID
            }
            this.triggerEvent('myevent', onMyEvent)

            if (detailedAddress != null) {
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
                        address,
                        addressName: [],
                        cellValue: '请选择码头',
                        detailedAddress: null,
                        wharfID: null,
                        show: true,
                        isAWharf: false
                    })
                })
            }
        }
    }
})