import User from "../../models/user/user";


Page({
    data: {
        confirmButtom: 'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        dialog: false, //弹框
        active: true, //企业或个人状态
        hiddenPhone: null, //半隐藏手机号码
        state: 1,
        activeBtn: [{
            label: '企业',
            active: true
        }, {
            label: '个人',
            active: false
        }],
        inputList: [{
            label: '发票抬头:',
            placeholder: '请输入公司全称',
            state: 1,
            show: true,
            border: true
        }, {
            label: '统一社会征信代码:',
            placeholder: '请输入税务登记证号',
            state: 2,
            show: true,
            border: true
        }, {
            label: '税号:',
            placeholder: '请输入纳税人识别号',
            state: 3,
            show: true,
            border: true
        }, {
            label: '注册地址:',
            placeholder: '请输入公司注册地址',
            state: 4,
            show: true,
            border: true
        }, {
            label: '注册电话:',
            placeholder: '请输入注册电话',
            state: 5,
            show: true,
            border: true
        }, {
            label: '开户银行:',
            placeholder: '请输入开户银行',
            state: 6,
            show: true,
            border: true
        }, {
            label: '银行账号:',
            placeholder: '请输入开户账号',
            state: 7,
            show: true,
            border: false
        }],


        invoiceTitle: null, //发票抬头
        creditCode: null, //统一信用代码
        dutyParagraph: null, //税号
        detailedAddress: null, //注册地址
        telephoneRegistration: null, //注册电话
        bankDeposit: null, //开户银行
        bankAccount: null, //银行账户
        contacts: null, //联系人
        contactInformation: null, //联系方式
        contactAddress: null, //联系地址

    },
    onActive(e) {
        let index = e.currentTarget.dataset.index;
        let activeBtn = this.data.activeBtn;
        let inputList = this.data.inputList;
        let active = this.data.active;
        activeBtn.forEach(b => b.active = false);
        activeBtn[index].active = !activeBtn[index].active;
        if (activeBtn[1].active == true) {
            inputList.map(data => {
                if (data.state == 1) {
                    data.show = true
                    data.placeholder = '请输入您的名字'
                } else {
                    data.show = false
                }
            })
            active = false
        } else {
            inputList.map(data => {
                data.show = true
                if (data.state == 1) {
                    data.placeholder = '请输入公司全称'
                }
            })
            active = true
        }
        this.setData({
            activeBtn,
            inputList,
            active
        })
    },
    onInput(e) {
        let state = e.currentTarget.dataset.state;
        let value = e.detail;
        switch (state) {
            case 1:
                this.setData({
                    invoiceTitle: value
                })
                break;
            case 2:
                this.setData({
                    creditCode: value
                })
                break;
            case 3:
                this.setData({
                    dutyParagraph: value
                })
                break;
            case 4:
                this.setData({
                    detailedAddress: value
                })
                break;
            case 5:
                this.setData({
                    telephoneRegistration: value
                })
                break;
            case 6:
                this.setData({
                    bankDeposit: value
                })
                break;
            case 7:
                this.setData({
                    bankAccount: value
                })
                break;
        }
    },
    onAddressAdd() {
        wx.navigateTo({
            url: '/views/MyAddressAdd/MyAddressAdd',
        })
    },


    onSave() {
        let active = this.data.active;
        let invoiceTitle = this.data.invoiceTitle;
        let creditCode = this.data.creditCode;
        let dutyParagraph = this.data.dutyParagraph;
        let detailedAddress = this.data.detailedAddress;
        let telephoneRegistration = this.data.telephoneRegistration;
        let bankDeposit = this.data.bankDeposit;
        let bankAccount = this.data.bankAccount;
        let contacts = this.data.contacts;
        let contactInformation = this.data.contactInformation;
        let contactAddress = this.data.contactAddress;
        if (active) {
            if (!invoiceTitle || !creditCode || !dutyParagraph || !detailedAddress || !telephoneRegistration || !bankDeposit || !bankAccount) {
                wx.showToast({
                    title: '请填写企业必填项',
                    icon: 'none'
                })
                return
            }
        } else {
            if (!invoiceTitle) {
                wx.showToast({
                    title: '请输入您得名字',
                    icon: 'none'
                })
                return
            }
        }

        if (!contacts || !contactInformation || !contactAddress) {
            wx.showToast({
                title: '请添加收货地址',
                icon: 'none'
            })
            return
        }
        this.setData({
            dialog: true
        })
    },
    onClose() {
        this.setData({
            dialog: false
        })
    },
    onConfirm() {
        let active = this.data.active;
        let Authorization = wx.getStorageSync('Authorization');
        let invoiceTitle = this.data.invoiceTitle;
        let creditCode = this.data.creditCode;
        let dutyParagraph = this.data.dutyParagraph;
        let detailedAddress = this.data.detailedAddress;
        let telephoneRegistration = this.data.telephoneRegistration;
        let bankDeposit = this.data.bankDeposit;
        let bankAccount = this.data.bankAccount;
        let contacts = this.data.contacts;
        let contactInformation = this.data.contactInformation;
        let contactAddress = this.data.contactAddress;

        let params = {}
        if (active) {
            params = {
                Authorization,
                invoiceTitle,
                creditCode,
                dutyParagraph,
                detailedAddress,
                telephoneRegistration,
                bankDeposit,
                bankAccount,
                contacts,
                contactInformation,
                contactAddress
            };
        } else {
            params = {
                Authorization,
                invoiceTitle,
                contacts,
                contactInformation,
                contactAddress
            }
        }

        console.log(params)

        User.userInvoiceAdd(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '添加成功',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 1500)
            } else {
                wx.showToast({
                  title: res.data.message,
                  icon:'loading'
                })
            }
        })

    }
})