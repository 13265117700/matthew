// views/MyAddressAdd/MyAddressAdd.js
Page({
    data: {
        buttonStyle: 'border-radius:10px;',
        show: false,
        addInputList: [{
            label: '收件人',
            placeholder: '请输入收件人姓名',
            value: '',
            type: 'input'
        }, {
            label: '手机号码',
            placeholder: '请输入手机号码',
            value: '',
            type: 'number'
        }, {
            label: '地址',
            placeholder: '请选择详细地址',
            value: '',
            type: 'default'
        }, {
            label: '详细地址',
            placeholder: '请输入收货详细地址',
            value: '',
            type: 'input'
        }],

        address: null,
        name: null,
        phone: null,
        detailed: null,
    },
    onLoad: function (options) {

    },

    onShow: function () {

    },
    onChange(e) {
        console.log(e)
        let index = e.currentTarget.dataset.index;
        let value = e.detail;
        switch (index) {
            case 0:
                this.setData({
                    name: value
                })
                break;
            case 1:
                this.setData({
                    phone: value
                })
                break;
            case 3:
                this.setData({
                    detailed: value
                })
                break;
        }
    },
    onOpenAddress() {
        this.setData({
            show: true
        })
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    onAddress(e) {
        console.log(e)
        let address = e.detail.addressName;
        if (address.length === 3) {
            let addressName = address.map(data => data.name).toString().replace(/,/g, "");
            this.setData({
                ['addInputList[2].value']: addressName,
                address: addressName,
                show: false
            })
        }
    },
    handleAddButton() {
        let address = this.data.address;
        let name = this.data.name;
        let phone = this.data.phone;
        let detailed = this.data.detailed;
        let detailedAddress = address + detailed;
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        if(!address || !name || !phone || !detailed){
            wx.showToast({
              title: '信息没有填写完整',
              icon:'none'
            })
            return
        }

        let hiddenPhone = phone.substr(0,3) + "****" + phone.substr(7);
        prevPage.setData({
            contacts:name,
            contactInformation:phone,
            contactAddress:detailedAddress,
            hiddenPhone,
            state:2
        });
        wx.navigateBack({
          delta: 1,
        })
    }
})