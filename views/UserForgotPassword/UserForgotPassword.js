import SMS from "../../models/sms/sms";
import User from "../../models/user/user";


Page({
    data: {
        inputList: [{
            title: '手机号码',
            placeholder: '请输入手机号码',
            state: 1,
            type: 'input',
            show: true
        }, {
            title: '新密码',
            placeholder: '请输入新密码',
            state: 2,
            type: 'input',
            show: true
        }, {
            title: '确认密码',
            placeholder: '请再次输入新密码',
            state: 3,
            type: 'input',
            show: true
        }, {
            title: '验证码',
            placeholder: '请输入验证码',
            state: 4,
            type: 'input',
            show: true,
            sms: true
        }],
        buttonName: '发送验证码',
        disabled: false,

        phone: null, //手机号
        newPassword: null, //新密码
        confirmNewPassword: null, //确认密码
        code: null, //验证码
    },

    handleInput: function (e) {
        let state = e.currentTarget.dataset.state;
        let value = e.detail.value;
        switch (state) {
            case 1:
                this.setData({
                    phone: value
                })
                break
            case 2:
                this.setData({
                    newPassword: value
                })
                break
            case 3:
                this.setData({
                    confirmNewPassword: value
                })
                break
            case 4:
                this.setData({
                    code: value
                })
                break
        }
    },

    handCode: function () {
        let phone = this.data.phone;
        console.log(phone)
        if (!phone) {
            wx.showToast({
                title: '请输入手机号码',
            })
            return
        }
        if (this.data.disabled) {
            return
        }
        let source = /^1[34578]\d{9}$/.test(phone)
        if (source) {
            this.setData({
                disabled: true
            })
        }

        SMS.UserForgetPasswordSMS({
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
    handSubmit: function () {
        let phone = this.data.phone;
        let newPassword = this.data.newPassword;
        let confirmNewPassword = this.data.confirmNewPassword;
        let code = this.data.code;

        if (!phone) {
            wx.showToast({
                title: '请输入手机号码',
            })
            return
        }
        if (!newPassword) {
            wx.showToast({
                title: '请输入密码',
            })
            return
        }
        if (!confirmNewPassword) {
            wx.showToast({
                title: '请输入确认密码',
            })
            return
        }
        if (!code) {
            wx.showToast({
                title: '请输入验证短信',
            })
            return
        }

        let params = {
            phone,
            newPassword,
            confirmNewPassword,
            code
        }

        User.userForgotPassword(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '修改成功',
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