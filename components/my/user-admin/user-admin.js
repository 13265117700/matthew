// components/my/userAdmin/userAdmin.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        status:String,
        seeId:Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        status:null,
        seeId:null,
        seeList:[{
            title:'运输舰'
        },{
            title:'驱逐舰'
        },{
            title:'巡航舰'
        }]
    },

    observers:{
        'status':function(status){
            this.data.status = status
        },
        'seeId':function(seeId){
            console.log(seeId)
            this.data.seeId = seeId
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        handSee:function(e){
            let dataset = e.currentTarget.dataset;
            let index = dataset.index;
            let status = this.data.status;
            let seeId = this.data.seeId;
            console.log('当前项'+index)
            console.log('状态'+status)
            console.log(seeId)

            let mode = JSON.stringify({ index, status, seeId })
            console.log(mode)
            wx.navigateTo({
              url: '/pages/my/user-admin/user-admin-info/user-admin-info?mode=' + mode,
            })
        }
    }
})
