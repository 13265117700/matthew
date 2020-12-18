import Wharf from "../../models/frontEnd/mtWharf"
Page({
    data: {
        navbarTitle:null,
        buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        crumbs:[],
        crumbsTitle:'请选择',
        regionList:[],
        wharfShow:false,
        columns:[],
        inputValue:'',
        address:[]
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
        this.frontDeskWharfList();
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
            let region = res.data.data.rows;
            let pro = [];
            region.forEach(data => {
                console.log(data)
                data.active = false
                pro.push(data)
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
        let that = this;
        let index = event.currentTarget.dataset.index;
        let pId = event.currentTarget.dataset.id;
        let regionList = that.data.regionList;
        let crumbs = that.data.crumbs;
        let page = 1;
        let rows = 10;
        let sortInt = 1;
        let params = { pId,page,rows,sortInt }

        if(crumbs.length < 3){
            crumbs.push(regionList[index])
            crumbs.forEach(a => a.active = false);
            regionList.forEach( d => d.active = false );
            regionList[index].active = !regionList[index].active;
            setTimeout(function() {
                Wharf.frontDeskWharfList(params).then(res => {
                    let region = res.data.data.rows;
                    let pro = [];
                    region.forEach(data => {
                        data.active = false
                        pro.push(data)
                    });
                    that.setData({
                        regionList:pro
                    })
                })
            },500)
        }

        that.setData({
            regionList,
            crumbs
        })

        console.log(regionList[index])
    },
    //码头选择显示
    wharfShow(){
        console.log(this.data.regionList)
        let regionList = this.data.regionList;
        let columns = regionList.map(data => data.name);
        this.setData({
            columns,
            wharfShow:true
        })
    },
    //码头选择隐藏
    onClose(){
        this.setData({
            wharfShow:false
        })
    },
    //码头选择器
    handObtainWharf(e){
        let inputValue = this.data.inputValue;
        let crumbs = this.data.crumbs;
        let arr = crumbs.map(data => data.name)
        let value = e.detail.value;
        let address = this.data.address;
        console.log(address)
        if(address.length === 0){
            console.log(123123)
            if(inputValue != null && inputValue != ''){
                arr.push(inputValue)
                this.setData({
                    address:arr,
                    wharfShow:false
                })
            }else{
                arr.push(value)
                this.setData({
                    address:arr,
                    wharfShow:false
                })
            }
        }else{
            if(inputValue != null && inputValue != ''){
                address.splice(3,1,inputValue)
                console.log(address)
                this.setData({
                    address,wharfShow:false
                })
            }else{
                address.splice(3,1,value)
                console.log(address)
                this.setData({
                    address,wharfShow:false
                })
            }
        }
    },
    //输入码头
    handInputWharf(e){
        let value = e.detail;
        this.setData({
            inputValue:value
        })
    },
    //确认地区
    handConfirmButton(){
        let address = this.data.address;
        if(address.length === 0){
            console.log('请选择码头')
        }else{
            let a = address.toString();
            let b = a.replace(/,/g,'')
            let pages = getCurrentPages();
            let perPage = pages[pages.length-2];
            perPage.setData({
                address:b
            })
            wx.navigateBack({
              delta: 1,
            })
        }
    }
})
