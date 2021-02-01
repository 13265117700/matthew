import User from "../../models/user/user";


Page({
    data: {
        btnStyle: 'border-top-right-radius: 10px;border-top-left-radius: 10px;font-size: 19px;height: 60px;',
        form: [{
                label: '持卡人',
                placeholder: '请输入持卡人姓名',
                state: 1,
                type: 'input'
            }, {
                label: '联系方式',
                placeholder: '请输入手机号码',
                state: 2,
                type: 'input'
            }, {
                label: '卡号',
                placeholder: '请输入持卡人银行卡卡号',
                state: 3,
                type: 'input'
            }, {
                label: '开户银行',
                placeholder: '请输入开户银行',
                state: 4,
                type: 'input'
            },
            //  {
            //     label: '设置默认银行卡',
            //     state: 5,
            //     type: 'switch'
            // }
        ],
        checked: true,

        bankAccount: null, //银行账号
        bankDeposit: null, //开户银行
        contactInformation: null, //联系方式
        contacts: null, //联系人
    },
    handleInput(e) {
        let state = e.currentTarget.dataset.state;
        let value = e.detail.value;
        switch (state) {
            case 1:
                this.setData({
                    contacts: value
                })
                break;
            case 2:
                this.setData({
                    contactInformation: value
                })
                break;
            case 3:
                this.setData({
                    bankAccount: value
                })
                break;
            case 4:
                this.setData({
                    bankDeposit: value
                })
                break;
        }
    },
    onChange({
        detail
    }) {
        console.log(detail)
        this.setData({
            checked: detail
        });
    },
    handleSave() {
        let Authorization = wx.getStorageSync('Authorization');
        let bankAccount = this.data.bankAccount;
        let bankDeposit = this.data.bankDeposit;
        let contactInformation = this.data.contactInformation;
        let contacts = this.data.contacts;
        let params = {
            Authorization,
            bankAccount,
            bankDeposit,
            contactInformation,
            contacts
        }

        if (!bankAccount) {
            wx.showToast({
                title: '请输入卡号',
                icon: 'none'
            })
            return
        }

        if (!bankDeposit) {
            wx.showToast({
                title: '请输入开户行',
                icon: 'none'
            })
            return
        }

        if (!contactInformation) {
            wx.showToast({
                title: '请输入联系号码',
                icon: 'none'
            })
            return
        }

        if (!contacts) {
            wx.showToast({
                title: '请输入联系人名称',
                icon: 'none'
            })
            return
        }

        User.UserAddBankCardInfo(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '成功添加银行卡信息',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 1000)
            } else {
                wx.showToast({
                    title: res.data.message,
                })
            }
        })

    }
})