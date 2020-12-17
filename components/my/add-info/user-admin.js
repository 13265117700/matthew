// components/my/userAdmin/userAdmin.js
// import Ship from '../../../models/ship/ship'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        status:Number,
    },

    /**
     * 组件的初始数据
     */
    data: {
        status:null,
        page:null,
        rows:null,
        seeList:[{
            title:'运输舰'
        },{
            title:'驱逐舰'
        },{
            title:'巡航舰'
        }]
    },
    lifetimes:{
        // attached:function(){
        //     let Authorization = wx.getStorageSync('Authorization');
        //     let status = this.data.status;
        //     let page = 1;
        //     let rows = 10;
        //     let params = {Authorization,status,page,rows}
        //     console.log(this.data.status)
        //     Ship.myFriendsRequestFriends(params).then(res => {
        //         console.log(res)
        //         if(res.statusCode === 200){
        //             let datas = res.data.data;
        //             console.log(datas)
        //         }
        //     })
        // }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handSee:function(e){
            let dataset = e.currentTarget.dataset;
            let index = dataset.index;
            let status = this.data.status;
            console.log('当前项'+index)
            console.log('状态'+status)

            let mode = JSON.stringify({ index, status })
            console.log(mode)
            // wx.navigateTo({
            //   url: '/pages/my/user-admin/user-admin-info/user-admin-info?mode=' + mode,
            // })
        }
    }
})
