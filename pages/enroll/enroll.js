import SMS from "../../models/sms/sms";
import User from "../../models/user/user";


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
                active: 1
            })

        } else {
            console.log(2)
            this.setData({
                active: 2
            })
        }
    },
    handCode() {
        let phone = this.data.phone;
        console.log(phone)
        let source = /^1[34578]\d{9}$/.test(phone);
        if (source) {
            this.setData({
                disabled: true
            })
        }


        SMS.UserSendsmsPhone({
            phone
        }).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showToast({
                    title: '验证码发送成功',
                    icon: 'none'
                })

                let time = 60;
                this.setData({
                    buttonName: `(${time})秒重新发送`
                })
                const interval = setInterval(() => {
                    time -= 1;
                    this.setData({
                        buttonName: `(${time})秒重新发送`
                    })
                    if (time <= 0) {
                        this.setData({
                            buttonName: '秒重新发送',
                            disabled: false,
                        })
                        clearInterval(interval)
                    }
                }, 1000);

            } else {
                wx.showToast({
                    title: res.data.message,
                })
            }
        })
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

        User.UserRegistered(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '注册成功',
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