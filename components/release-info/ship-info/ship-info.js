import User from "../../../models/user/user"
Component({
    properties: {

    },
    data: {
        buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        inputList:[{
            type:'default',
            title:'选择船舶',
            placeholder:'请选择船舶',
            border:true,
        },{
            type:'default',
            title:'空船港',
            placeholder:'请选择空船港',
            border:true,
        },{
            type:'picker',
            mode:'date',
            title:'空船期',
            pickerDate:null,
            placeholder:'如2020-08-12 ±1天',
            border:false,
        }],
        popupShow:false,
        popupStyle:{},
        shipList:['杭州', '宁波', '温州', '嘉兴', '湖州'],
        terminalList:[],
    },
    methods: {
        handleOpenPopup(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            if(index === 0){
                let popupStyle = {
                    position:'bottom',
                    closeable:true,
                    closeIcon:'close'
                }
                this.setData({
                    popupStyle,
                    popupShow:true
                })
                this.getShipInfo()
            }else{
                wx.navigateTo({
                  url: '/views/AddressOfThePort/AddressOfThePort',
                })
            }
        },
        getShipInfo(){
            console.log(123)
            let params = {
                Authorization:wx.getStorageSync('Authorization'),
                page:1,
                rows:10,
            }
            User.myFriendsRequestFriends(params).then(res => {
                console.log(res)
            })
        },
        onClose(){
            this.setData({
                popupShow:false
            })
        },
        handlePickerItem(e){
            console.log(e)
        },
        // 时间弹框确认按钮
        handleconfirm(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            let value = e.detail.value;
            let inputList = this.data.inputList;
            console.log(inputList)
            this.setData({
                [`inputList[${index}].pickerDate`]:value + '±1天'
            })
        },
    }
})
