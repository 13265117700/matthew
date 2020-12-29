import mtWharf from '../../models/frontEnd/mtWharf'
Page({
    data: {
        idenID:null,
        shipList:[]
    },
    onLoad: function (options) {
        this.setData({
            idenID:options.idenID
        })
    },
    onShow: function () {
        this.getShipList()
    },
    getShipList(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {Authorization,page,rows}
        mtWharf.frontDeskShipList(params).then(res => {
            console.log(res)
            let shipList = res.data.data.rows;
            this.setData({
                shipList
            })
        })
    },
    handleCheckDetails(e){
        console.log(e)
        let id = e.currentTarget.dataset.id;
        
    }
})