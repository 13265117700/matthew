import Wharf from "../../models/frontEnd/mtWharf"
Page({
    data: {
        navbarTitle:null,
        buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        // crumbsStatus:null,
        // regionListStatus:null,
        crumbs:[],
        regionList:[],
        list:[{
            name:'广东省',
            id:11,
            active:false
        },{
            name:'山东省',
            id:22,
            active:false
        },{
            name:'湖北省',
            id:33,
            active:false
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.navBar(options)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.frontDeskWharfList()
    },

    //修改navBar标题
    navBar(options){
        console.log(options.id)
        switch(options.id){
            case '147741':
                this.setData({
                    navbarTitle:'选择装货港'
                })
                break
            case '123321':
                this.setData({
                    navbarTitle:'选择目的地'
                })
                break
        }
    },
    //获取地区码头
    frontDeskWharfList(){
        let pId = 0;
        let page = 1;
        let rows = 10;
        let sortInt = 1;
        let params = { pId,page,rows,sortInt };
        Wharf.frontDeskWharfList(params).then(res => {
            console.log(res)
            let region = res.data.data.rows;
            let pro = [];
            region.forEach(data => {
                pro.push({
                    name:data.name,
                    id:data.id,
                    active:false
                })
            });
            console.log(pro)
            this.setData({
                regionList:pro
            })
        })
    },
    //地区点击事件
    handRegionChoose(event){
        console.log(event)
        let index = event.currentTarget.dataset.index;
        let pId = event.currentTarget.dataset.id;
        let regionList = this.data.regionList;
        let crumbs = this.data.crumbs;
        regionList.forEach( d => d.active = false );
        regionList[index].active = !regionList[index].active;
        this.setData({
            regionList
        })

        setTimeout(function() {
            let page = 1;
            let rows = 10;
            let sortInt = 1;
            let params = { pId,page,rows,sortInt }
            Wharf.frontDeskWharfList(params).then(res => {
                let region = res.data.data.rows;
                console.log(region)
                let pro = [];
                region.forEach(data => {
                    pro.push({
                        name:data.name,
                        id:data.id,
                        active:false
                    })
                });
            })
        },1000)
    }
})
