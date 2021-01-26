// views/BankCardAdd/BankCardAdd.js
Page({
    data: {
        btnStyle:'border-top-right-radius: 10px;border-top-left-radius: 10px;font-size: 19px;height: 60px;',
        form: [{
            label: '持卡人',
            placeholder: '请输入持卡人姓名',
            state: 1,
            type: 'input'
        }, {
            label: '卡号',
            placeholder: '请输入持卡人银行卡卡号',
            state: 2,
            type: 'input'
        }, {
            label: '开户银行',
            placeholder: '请输入开户银行',
            state: 3,
            type: 'input'
        }, {
            label: '设置默认银行卡',
            state: 3,
            type: 'switch'
        }],
        checked: true,
    },
    onLoad: function (options) {

    },
    onShow: function () {

    },
    handleInput(e) {
        console.log(e)
    },
    onChange({ detail }) {
        console.log(detail)
        this.setData({ checked: detail });
    },
    handleSave(){
        console.log(1231)
    }
})