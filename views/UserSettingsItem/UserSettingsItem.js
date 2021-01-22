import SMS from "../../models/sms/sms";
import User from "../../models/user/user";

Page({
    data: {
        name: '',
        phone: '',
        code: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
        buttonName: "获取验证码",
        disabled: false,
        peIndex: ''
    },
    onShow: function () {

    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            peIndex: options.index
        })
    },

    // 名字更改
    nameInput(event) {
        let name = event.detail.value;
        this.setData({
            name
        })
    },

    // 密码更改
    passwordInput(event) {
        let password = event.detail.value;
        this.setData({
            password
        })
    },
    newPasswordInput(event) {
        let newPassword = event.detail.value;
        this.setData({
            newPassword
        })
    },
    confirmPasswordInput(event) {
        let confirmPassword = event.detail.value;
        this.setData({
            confirmPassword
        })
    },

    // 手机绑定
    phoneInput(event) {
        let phone = event.detail.value;
        this.setData({
            phone
        })
    },
    //获取验证码
    handCode: function () {
        if (this.data.disabled) {
            return
        }
        let phone = this.data.phone;
        // let Authorization = wx.getStorageSync('Authorization');
        let params = {
            // Authorization,
            phone
        }
        let source = /^1[34578]\d{9}$/.test(phone)
        if (source) {
            this.setData({
                disabled: true
            })

            SMS.UserSendsmsPhone(params).then(res => {
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




        }
    },
    codeInput(event) {
        let code = event.detail.value;
        this.setData({
            code
        })
    },

    // 保存按钮
    handSubmit() {
        let Authorization = wx.getStorageSync('Authorization');
        let phone = this.data.phone;
        let code = this.data.phone;
        let params = {
            Authorization,
            phone,
            code
        };

        User.userPhoneBinding(params).then(res => {
            console.log(res)
            if(res.data.state == 200){
                wx.showLoading({
                  title: '手机绑定成功',
                })
                setTimeout(function(){
                    wx.hideLoading()
                    wx.navigateBack({
                      delta: 1,
                    })
                },1500)
            }else{
                wx.showToast({
                  title: res.data.data,
                })
            }
        })
    }
})