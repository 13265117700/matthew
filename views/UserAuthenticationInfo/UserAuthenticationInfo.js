import User from '../../models/user/user'
Page({
    data: {
        idenID:null,
        navbarTitle:null,
        imageUrl:null,
        describe:null,
        statusText:null,
        trialList:{}
    },
    onLoad: function (options) {
        console.log(options.idenID)
        let Authorization = wx.getStorageSync('Authorization');
        let uId = '';
        User.userInfo({Authorization,uId}).then(res => {
            let user = res.data.data;

            if(user.mtCargoOwner.idNumber != null){
                user.idenID = user.mtCargoOwner.id;
                user.status = user.mtCargoOwner.status;
                this.setData({
                    trialList:user.mtCargoOwner
                })
            }else if(user.mtOwner.idNumber != null){
                user.idenID = user.mtOwner.id;
                user.status = user.mtOwner.status;
                this.setData({
                    trialList:user.mtOwner
                })
            }else if(user.mtShipowner.idNumber != null){
                user.idenID = user.mtShipowner.id;
                user.status = user.mtShipowner.status;
                this.setData({
                    trialList:user.mtShipowner
                })
            }

            switch(user.idenID){
                case 153:
                    if(user.status === 0){
                        let describe = '您的船东认证正在审核中';
                        this.process(describe)
                    }else if(user.status === 1){
                        let navbarTitle = '船东认证成功';
                        let describe = '您的船东认证信息审核通过';
                        this.adopt(navbarTitle,describe)
                    }else{
                        let describe = '您的船东认证信息审核不通过';
                        this.fail(describe)
                    }
                    break
            }
        })
    },
    process(describe){
        this.setData({
            navbarTitle:'资料审核中',
            imageUrl:'/images/my/process.png',
            describe,
            statusText:'请耐心等待...'
        })
    },
    adopt(navbarTitle,describe){
        this.setData({
            navbarTitle,
            imageUrl:'/images/my/adopt.png',
            describe,
            statusText:'认证成功'
        })
    },
    fail(describe){
        this.setData({
            navbarTitle:'未通过审核',
            imageUrl:'/images/my/fail.png',
            describe,
            statusText:'认证失败'
        })
    }
})