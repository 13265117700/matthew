import User from '../../models/user/user'
Page({
    data: {
        idenID:null,
        navbarTitle:null,
        imageUrl:null,
        describe:null,
        statusText:null,
        trialList:{},
        userInfo:{},
    },
    onLoad: function (options) {

    },
    onShow:function(){
        this.getUserInfo();
    },
    // 获取用户信息
    getUserInfo(){
        let Authorization = wx.getStorageSync('Authorization');
        let uId = '';
        User.userInfo({Authorization,uId}).then(res => {
            let user = res.data.data;
            if(user.identityDifference == 2){
                user.cargo = true;
                user.status = user.mtCargoOwner.status;
                this.setData({
                    trialList:user.mtCargoOwner
                })
            }else if(user.identityDifference == 3){
                user.car = true;
                user.status = user.mtOwner.status;
                this.setData({
                    trialList:user.mtOwner
                })
            }else if(user.identityDifference == 1){
                user.ship = true
                user.status = user.mtShipowner.status;
                this.setData({
                    trialList:user.mtShipowner
                })
            }
            this.setData({
                userInfo:user
            })
            this.showUserInfo()
            
        })
        
    },
    // 展示用户信息
    showUserInfo(){
        let trialList = this.data.trialList;
        let userInfo = this.data.userInfo;
        console.log(trialList)
        if(userInfo.ship === true){
            if(trialList.status === 0){
                let describe = '您的船东认证正在审核中';
                this.process(describe)
            }else if(trialList.status === 1){
                let navbarTitle = '船东认证成功';
                let describe = '您的船东认证信息审核通过';
                this.adopt(navbarTitle,describe)
            }else{
                let describe = '您的船东认证信息审核不通过';
                this.fail(describe)
            }
        }else if(userInfo.cargo === true){
            if(trialList.status === 0){
                let describe = '您的货主认证正在审核中';
                this.process(describe)
            }else if(trialList.status === 1){
                let navbarTitle = '货主认证成功';
                let describe = '您的货主认证信息审核通过';
                this.adopt(navbarTitle,describe)
            }else{
                let describe = '您的货主认证信息审核不通过';
                this.fail(describe)
            }
        }else if(userInfo.car === true){
            if(trialList.status === 0){
                let describe = '您的车主认证正在审核中';
                this.process(describe)
            }else if(trialList.status === 1){
                let navbarTitle = '车主认证成功';
                let describe = '您的车主认证信息审核通过';
                this.adopt(navbarTitle,describe)
            }else{
                let describe = '您的车主认证信息审核不通过';
                this.fail(describe)
            }
        }

    },
    // 审核中
    process(describe){
        wx.setNavigationBarTitle({
            title: '资料审核中',
        })
        this.setData({
            imageUrl:'/images/my/process.png',
            describe,
            statusText:'请耐心等待...'
        })
    },
    // 认证成功
    adopt(navbarTitle,describe){
        wx.setNavigationBarTitle({
            title: navbarTitle,
        })
        this.setData({
            imageUrl:'/images/my/adopt.png',
            describe,
            statusText:'认证成功'
        })

    },
    //认证失败
    fail(describe){
        wx.setNavigationBarTitle({
            title: '未通过审核',
        })
        this.setData({
            imageUrl:'/images/my/fail.png',
            describe,
            statusText:'认证失败'
        })
    }

})