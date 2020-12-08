// components/my/user-admin/user-admin-info/user-admin-info.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        // 身份证正面
        idenJust:'https://img.yzcdn.cn/vant/leaf.jpg',
        // 身份证反面
        idenBack:'',
        //船长特征
        traitList:[{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg',
            name: '图片1',
        },{
            url: 'https://img.yzcdn.cn/vant/tree.jpg',
            name: '图片2',
        }],
        //船舶主要项目
        projectList:[{
            url: 'https://img.yzcdn.cn/vant/leaf.jpg',
            name: '图片1',
        },{
            url: 'https://img.yzcdn.cn/vant/tree.jpg',
            name: '图片2',
        }],
        //船视频
        shipVideo:''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 身份证正面
        justAfterRead(event){
            console.log(event)
            let file = event.detail.file;
            this.setData({
                idenJust:file.url
            })
        },
        // 身份证反面
        backAfterRead(event){
            console.log(event)
            let file = event.detail.file;
            this.setData({
                idenBack:file.url
            })
        },
        //船长特征
        handTrait(event){
            let file = event.detail.file;
            let traitList = this.data.traitList;
            console.log(traitList)
            console.log(file)
        },
        //上传船舶主要项目
        handProject(event){
            let file = event.detail.file;
            console.log(file)
        },
        handleVideo(){
            console.log('添加船视频')
        },
        handleSubmit(){
            console.log('添加')
        }
    }
})
