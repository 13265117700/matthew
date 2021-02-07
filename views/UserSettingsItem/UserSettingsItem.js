import SMS from "../../models/sms/sms";
import User from "../../models/user/user";

Page({
    data: {
        userInfo: {},
        btnTitle: '保存',
        inputList: [{
            title: '手机号码',
            value: '12321321321',
            state: 7,
            type: 'default',
            show: true
        }, {
            title: '昵称',
            placeholder: '请输入昵称',
            state: 1,
            type: 'input',
            show: true
        }, {
            title: '绑定手机',
            placeholder: '请输入手机号',
            state: 2,
            type: 'input',
            show: true
        }, {
            title: '旧密码',
            placeholder: '请输入旧密码',
            state: 4,
            type: 'input',
            show: true
        }, {
            title: '新密码',
            placeholder: '请输入新密码',
            state: 5,
            type: 'input',
            show: true
        }, {
            title: '确认密码',
            placeholder: '请再次输入新密码',
            state: 6,
            type: 'input',
            show: true
        }, {
            title: '验证码',
            placeholder: '请输入验证码',
            state: 3,
            type: 'input',
            show: true,
            sms: true
        }],
        name: '',
        phone: '',
        code: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        buttonName: "获取验证码",
        disabled: false,
        peIndex: null
    },
    onLoad: function (options) {
        this.setData({
            peIndex: parseInt(options.index)
        })
    },
    onShow: function () {
        this.getUserInfo()
    },
    //获取用户
    getUserInfo() {
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {
            Authorization,
            page,
            rows
        }
        User.userInfo(params).then(res => {
            let user = res.data.data;
            console.log(user)
            this.navbarTitle(user)
            this.setData({
                userInfo: user
            })
        })

    },
    //状态切换
    navbarTitle(user) {
        let peIndex = this.data.peIndex;
        let inputList = this.data.inputList;
        switch (peIndex) {
            case 1:
                inputList.forEach(data => {
                    if (data.state == 1) {
                        if (user.nickName) {
                            data.placeholder = user.nickName
                        }
                        data.show = true
                    } else {
                        data.show = false
                    }
                })
                wx.setNavigationBarTitle({
                    title: '设置用户名',
                })
                this.setData({
                    btnTitle: '保存',
                    inputList
                })
                break;
            case 2:
                if (user.phone) {
                    inputList.forEach(data => {
                        if (data.state == 7 || data.state == 3) {
                            data.show = true
                            if (data.state == 7) {
                                data.value = user.phone
                            }
                        } else {
                            data.show = false
                        }
                    })
                    console.log(inputList)
                    wx.setNavigationBarTitle({
                        title: '换绑手机',
                    })
                    this.setData({
                        btnTitle: '下一步',
                        inputList
                    })
                } else {
                    inputList.forEach(data => {
                        if (data.state == 2 || data.state == 3) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })
                    console.log(inputList)
                    wx.setNavigationBarTitle({
                        title: '绑定手机号',
                    })
                    this.setData({
                        btnTitle: '确认绑定',
                        inputList
                    })
                }

                break;
            case 3:
                if (user.password) {
                    inputList.forEach(data => {
                        if (data.state > 2) {
                            data.show = true
                            if (data.state == 7) {
                                data.value = user.phone
                            }
                        } else {
                            data.show = false
                        }
                    })
                    wx.setNavigationBarTitle({
                        title: '修改登录密码',
                    })
                } else {
                    inputList.forEach(data => {
                        if (data.state == 1 || data.state == 4) {
                            data.show = false
                        } else {
                            data.show = true
                            if (data.state == 2) {
                                data.title = '手机号'
                                if (user.phone) {
                                    data.placeholder = user.phone
                                }
                            }
                            if (data.state == 5) {
                                data.title = '设置新密码'
                                data.placeholder = '输入密码'
                            }
                            if (data.state == 6) {
                                data.title = '确认密码'
                                data.placeholder = '请在此输入密码'
                            }
                        }
                    })
                    wx.setNavigationBarTitle({
                        title: '设置登录密码',
                    })
                }
                this.setData({
                    btnTitle: '完成',
                    inputList
                })

                break;
        }
    },

    //输入框
    handleInput(e) {
        let state = e.currentTarget.dataset.state;
        let value = e.detail.value;
        switch (state) {
            case 1:
                console.log('设置用户名')
                this.setData({
                    name: value
                })
                break;
            case 2:
                console.log('绑定手机')
                this.handlePhone(value)
                break;
            case 3:
                console.log('手机验证码')
                this.setData({
                    code: value
                })
                break;
            case 4:
                console.log('旧密码')
                this.setData({
                    oldPassword: value
                })
                break;
            case 5:
                console.log('新密码')
                this.setData({
                    newPassword: value
                })
                break;
            case 6:
                console.log('确认密码')
                this.setData({
                    confirmPassword: value
                })
                break;
        }
    },


    //手机绑定输入
    handlePhone(value) {
        this.setData({
            phone: value
        })
    },

    //获取验证码
    handCode: function () {
        let userInfo = this.data.userInfo;
        let peIndex = this.data.peIndex;
        if (this.data.disabled) {
            return
        }
        let phone = this.data.phone;
        if (userInfo.phone) {
            phone = userInfo.phone
        }
        let source = /^1[34578]\d{9}$/.test(phone)
        if (source) {
            this.setData({
                disabled: true
            })

            if (peIndex == 2) {
                if (userInfo.phone) {
                    this.handleReplacePhoneSMS()
                } else {
                    this.handleEditPhoneSMS(phone)
                }
            } else if (peIndex == 3) {
                if (userInfo.password) {
                    this.handleModifyPasswordSMS()
                } else {
                    this.handleEditPasswordSMS(phone)
                }
            }

        }
    },


    //更换手机号验证吗
    handleReplacePhoneSMS() {
        let Authorization = wx.getStorageSync('Authorization');
        SMS.UserEditorPhoneSMS({
            Authorization
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

    //绑定新手机验证码
    handleEditPhoneSMS(phone) {
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
                    icon:'none'
                })
            }
        })
    },

    //修改密码验证码
    handleModifyPasswordSMS() {
        let Authorization = wx.getStorageSync('Authorization');
        SMS.UserModifyPasswordSMS({
            Authorization
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

    //添加密码验证码
    handleEditPasswordSMS(phone) {
        console.log(phone)
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

    //按钮事件
    handSubmit() {
        let peIndex = this.data.peIndex;
        console.log(peIndex)
        switch (peIndex) {
            case 1:
                this.handleEditName()
                break;
            case 2:
                this.handleEditPhone()
                break
            case 3:
                this.handeleEditPassword()
                break
        }
    },

    //修改昵称
    handleEditName() {
        console.log('修改名称')
        let Authorization = wx.getStorageSync('Authorization');
        let nickName = this.data.name;
        let params = {
            Authorization,
            nickName
        }
        User.userEditorNickName(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '昵称修改成功',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 1500)

            } else {
                wx.showToast({
                    title: res.data.data,
                })
            }
        })
    },
    //手机绑定
    handleEditPhone() {
        console.log('手机绑定')
        let Authorization = wx.getStorageSync('Authorization');
        let phone = this.data.phone;
        let code = this.data.code;
        let params = {
            Authorization,
            phone,
            code
        }

        console.log(params)
        User.userPhoneBinding(params).then(res => {
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '手机绑定成功',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 1500)

            } else {
                wx.showToast({
                    title: res.data.data,
                })
            }
        })

    },



    //密码设置
    handeleEditPassword() {
        console.log('修改密码')
        let userInfo = this.data.userInfo;
        if (userInfo.password) {
            this.handleEditorPassword()
        } else {
            this.handleAddPassword()
        }
    },
    //修改密码
    handleEditorPassword() {
        let Authorization = wx.getStorageSync('Authorization');
        let code = this.data.code;
        let confirmNewPassword = this.data.confirmPassword;
        let newPassword = this.data.newPassword;
        let oldPassword = this.data.oldPassword;
        let params = {
            Authorization,
            code,
            confirmNewPassword,
            newPassword,
            oldPassword
        };
        console.log(params)

        User.userEditorPassword(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '密码修改成功',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 1500)

            } else {
                wx.showToast({
                    title: res.data.data,
                })
            }
        })
    },
    //添加密码
    handleAddPassword() {
        let userInfo = this.data.userInfo;
        let Authorization = wx.getStorageSync('Authorization');
        let phone = this.data.phone;
        let newPassword = this.data.newPassword;
        let confirmNewPassword = this.data.confirmPassword;
        let code = this.data.code;

        if (userInfo.phone) {
            phone = userInfo.phone
        }

        let params = {
            Authorization,
            phone,
            newPassword,
            confirmNewPassword,
            code
        }
        console.log(params)
        User.userForgotPassword(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '密码设置成功',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 1500)

            } else {
                wx.showToast({
                    title: res.data.data,
                })
            }
        })
    }
})