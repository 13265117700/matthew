import User from '../../models/user/user';
import mtWharf from '../../models/frontEnd/mtWharf'
Page({
    data: {
        // idenID:null,
        cargoId:null,
        shipList:[],
        receiverid:null,
        senderid:null
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            cargoId:options.cargoId,
            senderid:options.senderid,
            receiverid:options.receiverid
        })
    },
    onShow: function () {
        this.getShipList()
    },
    getShipList(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {page,rows}
        mtWharf.frontDeskShipPeriodList(params).then(res => {
            console.log(res)
            let rows = res.data.data.rows;
            let shipList = []
            rows.forEach(data => {
                let emptyDate = new Date(data.emptyDate).toLocaleDateString();
                data.emptyDate = emptyDate.replace(/\//g,"-");
                shipList.push(data)
                console.log(shipList)
                this.setData({
                    shipList
                })
            })
        })
        // User.UserShipPeriodList(params).then(res => {
        //     let rows = res.data.data.rows;
        //     console.log(rows)
        //     let shipList = []
        //     rows.forEach(data => {
        //         let emptyDate = new Date(data.emptyDate).toLocaleDateString();
        //         data.emptyDate = emptyDate.replace(/\//g,"-");
        //         shipList.push(data)
        //     })
        //     console.log(shipList)
        //     this.setData({
        //         shipList
        //     })
        // })
    },
    handleConfirm(e){
        console.log(e)
        let cargoId = this.data.cargoId;
        let receiverid = this.data.receiverid;
        let senderid = this.data.senderid;
        let shipId = e.currentTarget.dataset.id;
        let state = true;
        let Authorization = wx.getStorageSync('Authorization');
        let params = {Authorization,cargoId,shipId}
        console.log(params)
        User.UserCargoOrderRequest(params).then(res => {
            console.log(res)
            
            if(res.data.state === 200){
                wx.navigateTo({
                  url: '/views/chat/chat?receiverid='+ receiverid + '&senderid='+senderid+'&state='+state,
                })
            }else{
                wx.showToast({
                  title: res.data.message,
                })
            }
        })
    },
    handleCheckDetails(e){
        console.log(e)
        let id = e.currentTarget.dataset.id;
        
    }
})