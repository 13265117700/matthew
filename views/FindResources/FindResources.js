import user from '../../models/user/user';
import User from '../../models/user/user';
Page({
    data: {
        id:null,
        pageState:null,
        navbarTitle:'',
        idenID:null,
        shipList:[],
        focusStatus:false
    },
    onLoad: function (options) {
        
        console.log(options)
        this.setData({
            id:options.id,
            pageState:options.data,
            idenID:options.idenID
        })
    },
    onShow: function () {
        this.navbarTitle()
        this.handlePage()
        this.getShipList()
    },

    navbarTitle(){
        let id = this.data.id;
        let pageState = this.data.pageState;
        if(pageState){
            switch(id){
                case '9999999':
                    this.setData({
                        navbarTitle:'船期船源信息'
                    })
                    break
                case '9999998':
                    this.setData({
                        navbarTitle:'货源货期信息'
                    })
                    break
                case '9999997':
                    this.setData({
                        navbarTitle:'货源货期信息'
                    })
                    break
                case '9999996':
                    this.setData({
                        navbarTitle:'车源车期信息'
                    })
                    break
            }
        }else{
            this.setData({
                navbarTitle:'船期信息'
            })
        }
    },

    getShipList(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {Authorization,page,rows}
        User.UserShipPeriodList(params).then(res => {
            let rows = res.data.data.rows;
            let shipList = []
            rows.forEach(data => {
                let emptyDate = new Date(data.emptyDate).toLocaleDateString();
                let collegeId = data.mtShip.id;//船的ID
                data.emptyDate = emptyDate.replace(/\//g,"-");
                user.UserShipWhetherFocusOn({Authorization,collegeId}).then(focus => {
                    Promise.all([focus]).then(result => {
                        let focusStatus = result[0].data.data;
                        data.focusStatus = focusStatus;
                        shipList.push(data)
                        this.setData({
                            shipList
                        })
                    })
                })
            })
        })
       
    },
    handleShipFocus(e){
        console.log(e)
        // let shipList = this.data.shipList;
        let Authorization = wx.getStorageSync('Authorization');
        let shipId = e.currentTarget.dataset.id;
        let id = shipId;
        let status = e.currentTarget.dataset.status;
        let index = e.currentTarget.dataset.index;
        let params = {Authorization,shipId}
        if(status != true){
            console.log(12312)
            User.UserShipFocus(params).then(res => {
                console.log(res)
                if(res.data.state === 200){
                    this.setData({
                        [`shipList[${index}].focusStatus`]:true
                    })
                }
            })
        }else{
            console.log('从v骄傲')
            User.UserShipCancelFocus({Authorization,id}).then(res => {
                if(res.data.state === 200){
                    this.setData({
                        [`shipList[${index}].focusStatus`]:false
                    })
                }
            })
        }
        
        // console.log(this.data.shipList[0].focusStatus)
    },

    handlePage(){
        console.log(this.data.id)
        console.log(this.data.pageState)
    }
})