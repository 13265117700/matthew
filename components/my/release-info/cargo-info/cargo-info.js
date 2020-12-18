import mtWharf from '../../../../models/frontEnd/mtWharf'
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
        buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        //信息分组1
        infoGroupOne:[{
            rate:true,
            title:'货名：',
            placeholder:'请选择货名',
            type:'default',
            arrow:true
        },{
            rate:false,
            title:'货物代码：',
            placeholder:'货物分类代码自动生成',
            type:'default',
            arrow:false
        },{
            rate:true,
            title:'数量(吨)：',
            placeholder:'请输入吨数',
            type:'input',
            arrow:false,
        },{
            rate:true,
            title:'起运港：',
            placeholder:'请选择装货地',
            type:'default',
            arrow:true,
            id:147741
        },{
            rate:true,
            title:'达到港：',
            placeholder:'请选择目的港',
            type:'default',
            arrow:true,
            id:123321
        }],
        //信息分组2
        infoGroupTwo:[{
            rate:true,
            title:'装货日期：',
            placeholder:'请选择装货日期',
            type:'picker',
            mode:'date',
            arrow:true
        },{
            rate:true,
            title:'运价(含税）',
            radioValue:'1',
            list:{
                radio:[{name:'运费单价',number:'1'},{name:'包船单价',number:'2'}],
                input:[{
                    id:555,
                    type:'input',
                    placeholder:'请输入运费单价',
                    msg:'元/吨'
                }]
            }
        },{
            rate:false,
            title:'其它费用：',
            placeholder:'其它费用',
            type:'input',
            arrow:false
        },{
            rate:false,
            title:'滞期约定：',
            radioValue:'1',
            list:{
                radio:[{name:'按天',number:'1'},{name:'按小时',number:'2'}],
                input:[{
                    id:111,
                    type:'input',
                    placeholder:'请输入装货天数',
                    msg:'天'
                },{
                    id:222,
                    type:'input',
                    placeholder:'请输入卸货天数',
                    msg:'天'
                },{
                    id:333,
                    subTitle:'滞期单价 ：￥',
                    type:'input',
                    msg:'元  天/吨'
                }]
            }
        },{
            id:999,
            rate:true,
            title:'船舶类型：',
            placeholder:'其它费用',
            type:'default',
            arrow:true
        },{
            rate:false,
            title:'货物交接：',
            placeholder:'请输入货物交接',
            type:'input',
            arrow:false
        }],
        //信息分组3
        infoGroupThree:[{
            rate:false,
            title:'货物赔偿约定：',
            off:true,
            placeholder:'请设置货物赔偿约定',
            list:{
                input:[{
                    subTitle:'货损≤：',
                    type:'input',
                    placeholder:'请输入货损',
                    msg:'%'
                },{
                    subTitle:'按：',
                    type:'input',
                    placeholder:'请输入金额',
                    msg:'元/吨'
                }]
            }
        },{
            on:1,
            rate:true,
            title:'船舶大小：',
        },{
            rate:false,
            title:'封仓要求：',
            placeholder:'请选择封仓要求',
            type:'input',
            arrow:false
        },{
            id:888,
            rate:false,
            title:'装货方式：',
            placeholder:'请选择装货方式',
            type:'default',
            arrow:true
        },{
            id:777,
            rate:false,
            title:'卸货方式：',
            placeholder:'请选择卸货方式',
            type:'default',
            arrow:true
        }],
        pickerOneShow:false,//分组1弹框
        addressShow:false,//地区选择弹框
        shipTypeShow:false,//船类型弹框

        pickerListRows:[],//弹框Picker所有数据
        pickerList:[],//弹框Picker列表
        pickerItemId:null,//弹框Picker当前项ID

        cargoNameList:[],//货名name列表
        cargoNameRows:[],//货名列表
        cargoCode:null,//货物代码
        
        // buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        crumbs:[],
        crumbsTitle:'请选择',
        regionList:[],
        wharfShow:false,
        columns:[],//码头选择Picker
        inputValue:'',
        address:[],
        addressID:null,
        addressTitle:'请选择码头',
        infoGroupOneIndex:null,//分组1弹框当前项

        nameGoodsId:null,//货名ID
        number:null,//数量(吨)
        portDepartureAddress:null,//起运港详细地址
        portDepartureId:null,//起运港Id
        portArrivalAddress:null,//到达港详细地址
        portArrivalId:null,//到达港Id
        loadingDate :null,//装货日期(时间戳)
        freightRate:null,//运价类型
        freightAmount:null,//运价金额
        otherExpenses:null,//其它费用
        lagPeriodType:null,//滞期约定类型 1.天 2.小时
        delayedLoading:null,//滞期装货(天/小时)
        delayedDischarge:null,//滞期卸货(天/小时)
        delayedCost:null,//滞期费用
        lagPeriodType:null,//滞期约定类型 1.天 2.小时
        typeShip:null,//船舶类型文字
        mtTypeShipId:null,//船舶类型Id
        deliveryGoods:null,//货物交接
        compensation:null,//货物赔偿约定(0.否，1是)
        lossGoods:null,//货物损耗
        goodsDamages:null,//货物赔偿金额
        vesselMinimum:null,//船舶最小值
        vesselMaximum:null,//船舶最大值
        warehouse:null,//封仓要求
    },

    lifetimes:{
        attached:function(){
            // this.frontDeskWharfList();
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

        /**
         * 信息分组1
         */
        //获取货物列表
        frontDeskCargoList(){
            let page = 1;
            let rows = 10;
            mtWharf.frontDeskCargoList({page,rows}).then(res => {
                let rows = res.data.data.rows;
                console.log(rows)
                let cargoNameList = rows.map(data => data.name);
                console.log(cargoNameList)
                this.setData({
                    cargoNameList,
                    cargoNameRows:rows,
                })
            })
        },
        // 关闭弹框
        onClose(){
            this.setData({
                cargoNameShow:false,
                wharfShow:false,
                shipTypeShow:false
            })
        },
        // 分组1弹框
        GroupOneClick(e){
            let index = e.currentTarget.dataset.index;
            switch(index){
                case 0:
                    this.setData({
                        cargoNameShow:true,
                    })
                    this.frontDeskCargoList();
                    break
                case 3:
                    this.setData({
                        addressShow:true,
                        infoGroupOneIndex:index,
                        crumbs:[],
                        regionList:[],
                        addressTitle:'请选择码头',
                    })
                    this.triggerEvent('myevent','选择装货港')
                    this.frontDeskWharfList();
                    break
                case 4:
                    this.setData({
                        addressShow:true,
                        infoGroupOneIndex:index,
                        crumbs:[],
                        regionList:[],
                        addressTitle:'请选择码头',
                    })
                    this.triggerEvent('myevent','选择目的港')
                    this.frontDeskWharfList();
                    break
            }
        },
        handObtainGoods(e){
            console.log(e)
            let index = e.detail.index;
            let nameGoodsId = this.data.cargoNameRows[index].id;
            let cargoCode = this.data.cargoNameRows[index].cargoCode;
            let name = this.data.cargoNameList[index];
            console.log(name,nameGoodsId)
            this.setData({
                nameGoodsId,
                ['infoGroupOne[0].placeholder']:name,
                cargoNameShow:false,
                cargoCode,
                ['infoGroupOne[1].placeholder']:cargoCode
            })
        },
        infoGroupOneInput(e){
            this.setData({
                number:e.detail.value
            })
        }, 
        //获取地区码头
        frontDeskWharfList(){
            let pId = 0;
            let page = 1;
            let rows = 10;
            let sortInt = 1;
            let params = { pId,page,rows,sortInt };
            mtWharf.frontDeskWharfList(params).then(res => {
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
                    mtWharf.frontDeskWharfList(params).then(res => {
                        console.log(res)
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
            let regionList = this.data.regionList;
            console.log(regionList)
            let columns = regionList.map(data => data.name);
            console.log(columns)
            this.setData({
                columns,
                wharfShow:true
            })
        },
        //码头选择器
        handObtainWharf(e){
            let value = e.detail.value;
            console.log(value)
            let index = e.detail.index;
            let regionList = this.data.regionList;
            let inputValue = this.data.inputValue;
            let crumbs = this.data.crumbs;
            let arr = crumbs.map(data => data.name)
            let address = this.data.address;//地址
            console.log(regionList[index].id)
            let addressID = regionList[index].id;//地址ID
            if(address.length === 0){
                console.log(123123)
                if(inputValue != null && inputValue != ''){
                    arr.push(inputValue)
                    this.setData({
                        address:arr,
                        addressID:0,
                        addressTitle:inputValue,
                        wharfShow:false,
                    })
                }else{
                    arr.push(value)
                    this.setData({
                        address:arr,
                        addressID,
                        addressTitle:value,
                        wharfShow:false,
                    })
                }
            }else{
                if(inputValue != null && inputValue != ''){
                    address.splice(3,1,inputValue)
                    console.log(address)
                    this.setData({
                        address,
                        addressTitle:inputValue,
                        wharfShow:false
                    })
                }else{
                    address.splice(3,1,value)
                    console.log(address)
                    this.setData({
                        address,
                        addressTitle:value,
                        wharfShow:false
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
        //关闭地区选择
        onCloseAddress(){
            this.setData({
                addressShow:false,
            })
            this.triggerEvent('myevent','发布货源');
        },
        //确认地区
        handConfirmButton(){
            let address = this.data.address;
            if(address.length === 0){
                console.log('请选择码头')
            }else{
                let a = address.toString();
                let b = a.replace(/,/g,'');
                console.log(b)
                let infoGroupOneIndex = this.data.infoGroupOneIndex;
                let addressID = this.data.addressID;
               if(infoGroupOneIndex === 3){
                    this.setData({
                        portDepartureAddress:b,
                        portDepartureId:addressID,
                        [`infoGroupOne[${infoGroupOneIndex}].placeholder`]:b,
                        addressShow:false
                    })
               }else{
                    this.setData({
                        portArrivalAddress:b,
                        portArrivalId:addressID,
                        [`infoGroupOne[${infoGroupOneIndex}].placeholder`]:b,
                        addressShow:false
                    })
               }
            }
        },


        /**
         * 信息分组2
         */
        //选择日子
        infoGroupTwoDate(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            let value = e.detail.value;
            // let infoGroupTwo = this.data.infoGroupTwo;
            // console.log(infoGroupTwo[index].placeholder)
            let date = new Date(value);
            let loadingDate = Date.parse(date);
            this.setData({
                [`infoGroupTwo[${index}].placeholder`]:value,
                loadingDate
            })
        },
        //分组2内列表单选框
        onChangeRadio(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            let infoGroupTwo = this.data.infoGroupTwo;
            this.setData({
                [`infoGroupTwo[${index}].radioValue`]:e.detail
            })
            if(index === 1){
                if(e.detail != '1'){
                    let freightRate = infoGroupTwo[index].list.radio[1].name;
                    console.log(freightRate)
                    this.setData({
                        [`infoGroupTwo[${index}].list.input[0].msg`]:'元/船',
                        freightRate
                    })
                }else{
                    let freightRate = infoGroupTwo[index].list.radio[0].name;
                    console.log(freightRate)
                    this.setData({
                        [`infoGroupTwo[${index}].list.input[0].msg`]:'元/吨',
                        freightRate
                    })
                }
            }else{
                if(e.detail != '1'){
                    console.log('小时')
                    this.setData({
                        [`infoGroupTwo[${index}].list.input[0].msg`]:'小时',
                        [`infoGroupTwo[${index}].list.input[1].msg`]:'小时',
                        [`infoGroupTwo[${index}].list.input[2].msg`]:'元  小时/吨',
                        lagPeriodType:2
                    })
                }else{
                    console.log('天')
                    this.setData({
                        [`infoGroupTwo[${index}].list.input[0].msg`]:'天',
                        [`infoGroupTwo[${index}].list.input[1].msg`]:'天',
                        [`infoGroupTwo[${index}].list.input[2].msg`]:'元  天/吨',
                        lagPeriodType:1
                    })
                }
            }
        },
        //分组2内列表Input
        infoGroupTwoListInput(e){
            console.log(e)
            let id = e.currentTarget.dataset.id;
            switch(id){
                //运价金额
                case 555:
                    this.setData({
                        freightAmount:e.detail.value
                    })
                    break
                //滞期装货(天/小时)
                case 111:
                    this.setData({
                        delayedLoading:e.detail.value
                    })
                    break
                //滞期卸货(天/小时)
                case 222:
                    this.setData({
                        delayedDischarge:e.detail.value
                    })
                    break
                //滞期费用
                case 333:
                    this.setData({
                        delayedCost:e.detail.value
                    })
                    break
            }
        },
        //分组2输入框
        infoGroupTwoInput(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            if(index === 2){
                this.setData({
                    otherExpenses:e.detail.value
                })
            }else if(index === 5){
                this.setData({
                    deliveryGoods:e.detail.value
                })
            }else{
                this.setData({
                    warehouse:e.detail.value
                })
            }
        },
       


        /**
         * 信息分组3
         */
        //赔偿约定开关
        handleSwith(e){
            console.log(e)
            let compensation = e.detail.value === false ? 0 : 1;
            console.log(compensation)
            this.setData({
                ['infoGroupThree[0].off']:e.detail.value,
                compensation
            })
        },
        //货物赔偿input
        compensationInput(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            if(index === 0){
                this.setData({
                    lossGoods:e.detail.value
                })
            }else{
                this.setData({
                    goodsDamages:e.detail.value
                })
            }
        },
        //船舶最小值
        vesselMinimum(e){
            console.log(e)
            this.setData({
                vesselMinimum:e.detail.value
            })
        },
        //船舶最大值
        vesselMaximum(e){
            console.log(e)
            this.setData({
                vesselMaximum:e.detail.value
            })
        },



        //总弹框显示
        totalPicker(e){
            console.log(e)
            let id = e.currentTarget.dataset.id;
            this.setData({
                shipTypeShow:true
            })
            switch(id){
                case 999:
                    this.frontDeskShipTypeList(id);
                    break
                case 888:
                    this.loadingMethod(id);
                    break
                case 777:
                    this.unloadingMode(id);
                    break
            }
        },
        //总弹框确认按钮
        handlePickerConfirm(e){
            console.log(this.data.pickerItemId)
            console.log(e)
            let pickerItemId = this.data.pickerItemId;
            let value = e.detail.value;
            let index = e.detail.index;
            switch(pickerItemId){
                case 999:
                    let pickerListRows = this.data.pickerListRows;
                    console.log(pickerListRows[index])
                    this.setData({
                        typeShip:value,
                        mtTypeShipId:pickerListRows[index].id
                    })
                    break
            }
        },
        
        //船舶类型
        frontDeskShipTypeList(id){
            let page = 1;
            let rows = 10;
            mtWharf.frontDeskShipTypeList({page,rows}).then(res => {
                console.log(res)
                let rows = res.data.data.rows;
                let shipTypeList = rows.map(data => data.name);
                this.setData({
                    pickerList:shipTypeList,
                    pickerItemId:id,
                    pickerListRows:rows
                })
            })
        },
        //装货方式
        loadingMethod(id){
            this.setData({
                pickerItemId:id
            })
        },
        //卸货方式
        unloadingMode(id){
            this.setData({
                pickerItemId:id
            })
        }
    }
})
