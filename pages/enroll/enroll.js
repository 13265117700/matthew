// pages/enroll/enroll.js
Page({
    data: {
        inputList: [{
            title: '用户昵称',
            placeholder: '请输入昵称',
            state: 1,
            type: 'input',
            show: true
        }, {
            title: '手机号',
            placeholder: '请输入手机号',
            state: 2,
            type: 'input',
            show: true
        }, {
            title: '登录账号',
            placeholder: '请输入登录账号',
            state: 4,
            type: 'input',
            show: true
        }, {
            title: '登录密码',
            placeholder: '请输入登录密码',
            state: 5,
            type: 'input',
            show: true
        }, {
            title: '验证码',
            placeholder: '请输入验证码',
            state: 3,
            type: 'sms',
            show: true
        }],
        active: false,
        buttonName: "获取验证码",
        nickName: '', //用户昵称
        password: '', //用户密码
        phone: '', //用户手机
        verifyCode: '', //短信验证码
        username: '', //用户账号
    },
    onLoad: function (options) {

    },
    onShow: function () {
        this.btnstatus()
    },
    btnstatus() {
        let nickName = this.data.nickName;
        let password = this.data.password;
        let phone = this.data.phone;
        let verifyCode = this.data.verifyCode;
        let username = this.data.username;
        if (!nickName || !password || !phone || !verifyCode || !username) {
            console.log(1)
            this.setData({
                active: true
            })
        } else {
            console.log(2)
            this.setData({
                active: false
            })
        }
    },
    handleInput(e) {
        let state = e.currentTarget.dataset.state;
        let value = e.detail.value;
        switch (state) {
            case 1:
                this.setData({
                    nickName: value
                })
                break;
            case 2:
                this.setData({
                    phone: value
                })
                break;
            case 4:
                this.setData({
                    username: value
                })
                break;
            case 5:
                this.setData({
                    password: value
                })
                break;
            case 3:
                this.setData({
                    verifyCode: value
                })
                break;
        }
        this.btnstatus()
    },
    handleConfirm() {
        let nickName = this.data.nickName;
        let password = this.data.password;
        let phone = this.data.phone;
        let verifyCode = this.data.verifyCode;
        let username = this.data.username;
        let params = {
            nickName,
            password,
            phone,
            verifyCode,
            username
        }
    }
})