import User from "../../../models/user/user"
Component({
    properties: {

    },
    data: {
        buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        inputList:[{
            id:2000001,
            type:'default',
            title:'选择船舶',
            placeholder:'请选择船舶',
            border:true,
        },{
            id:2000002,
            type:'default',
            title:'空船港',
            placeholder:'请选择空船港',
            border:true,
        },{
            id:2000003,
            type:'picker',
            mode:'date',
            title:'空船期',
            pickerDate:null,
            placeholder:'如2020-08-12 ±1天',
            border:false,
        }],
        popupShow:false,
        addressShow:false,
        popupStyle:{},
        shipNameList:[],//船名字列表
        shipList:[],//船列表
        terminalList:[],
        id:null,
        detailedAddress:null,


        shipId:null,//船ID
        wharfId:null,//港口id
        emptyDate:null,//船期时间戳
        note:null,//备注
    },
    methods: {
        //港口选择
        onMyEvent(e){
            console.log(e)
            let detailedAddress = e.detail.detailedAddress;
            // let propID = e.detail.propID;
            let wharfId = e.detail.wharfID;
            console.log(wharfId)
            if(detailedAddress != null){
                this.setData({
                    ['inputList[1].placeholder']:detailedAddress,
                    detailedAddress,
                    wharfId,
                    addressShow:false
                })
                console.log(this.data.inputList)
            }
        },
        onCloseAddress(){
            this.setData({
                addressShow:false,
            })
            this.triggerEvent('myevent','发布货源');
        },


        handleOpenPopup(e){
            // console.log(e)
            let index = e.currentTarget.dataset.index;
            let id = e.currentTarget.dataset.id;
            console.log(index)
            if(index === 0){
                let popupStyle = {
                    position:'bottom',
                    closeable:false,
                    closeIcon:'close'
                }
                this.setData({
                    popupStyle,
                    popupShow:true
                })
                this.getShipInfo()
            }else{
                this.setData({
                    id,
                    addressShow:true
                })
                this.triggerEvent('myevent','选择空船港');
            }
        },
        getShipInfo(){
            console.log(123)
            let params = {
                Authorization:wx.getStorageSync('Authorization'),
                page:1,
                rows:10,
            }
            console.log(params)
            User.UserShipQuery(params).then(res => {
                console.log(res)
                let rows = res.data.data.rows;
                let shipNameList = rows.map(data => data.nameVessel)
                console.log(shipNameList)
                this.setData({
                    shipNameList,
                    shipList:rows
                })
            })
        },
        onClose(){
            this.setData({
                popupShow:false
            })
        },
        //确定船舶
        handlePickerItem(e){
            console.log(e)
            let index = e.detail.index;
            let shipList = this.data.shipList;
            let shipId = shipList[index].id;
            console.log(shipId)
            this.setData({
                ['inputList[0].placeholder']:e.detail.value,
                shipId,
                popupShow:false
            })
        },

        /**
         * handleConfirmShip(e){
            console.log(e)
            this.setData({
                popupShow:false
            })
        },
         * 
         * @param {*} e 
         */
        
        
        // 时间弹框确认按钮
        handleconfirm(e){
            let index = e.currentTarget.dataset.index;
            console.log(index)
            if(index === 2){
                let value = e.detail.value;
                console.log(value)
                let emptyDate = new Date(value).getTime();
                this.setData({
                    [`inputList[${index}].pickerDate`]:value + '±1天',
                    emptyDate
                })
            }
            
        },
        //备注
        handleNote(e){
            console.log(e)
            this.setData({
                note:e.detail.value
            })
        },
        handleRelease(){
            let Authorization = wx.getStorageSync('Authorization');
            let shipId = this.data.shipId;
            let wharfId = this.data.wharfId;
            let emptyDate = this.data.emptyDate;
            let note = this.data.note;
            let params = { Authorization, shipId, wharfId ,emptyDate, note }
            console.log(params)
            User.UserShipPeriodAdd(params).then(res => {
                console.log(res)
            })
        }
    }
})
