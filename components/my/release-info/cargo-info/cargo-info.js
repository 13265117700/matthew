import Cargo from '../../../../models/cargo/cargo'
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
            type:'input',
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
        },{
            rate:true,
            title:'达到港：',
            placeholder:'请选择目的港',
            type:'default',
            arrow:true
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
                    type:'input',
                    placeholder:'请输入装货天数',
                    msg:'天'
                },{
                    type:'input',
                    placeholder:'请输入卸货天数',
                    msg:'天'
                },{
                    subTitle:'滞期单价 ：￥',
                    type:'input',
                    msg:'元  天/吨'
                }]
            }
        },{
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
            rate:false,
            title:'装货方式：',
            placeholder:'请选择装货方式',
            type:'default',
            arrow:true
        },{
            rate:false,
            title:'卸货方式：',
            placeholder:'请选择卸货方式',
            type:'default',
            arrow:true
        }],
        cargoNameShow:false,
        cargoNameList:[],
    },

    lifetimes:{
        attached:function(){
            this.mtNameGoodsFriends()
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //获取货物列表
        mtNameGoodsFriends(){
            let page = 1;
            let rows = 10;
            Cargo.mtNameGoodsFriends({page,rows}).then(res => {
                console.log(res)
                let rows = res.data.data.rows;
                let cargoNameList = rows.map(data => data.name);
                console.log(cargoNameList)
                this.setData({
                    cargoNameList
                })
            })
        },
        // 关闭弹框
        onClose(){
            this.setData({
                cargoNameShow:false
            })
        },
        // 分组1弹框
        GroupOneClick(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            if(index === 0){
                this.setData({
                    cargoNameShow:true
                })
            }
        },
        handObtainGoods(e){
            console.log(e)
        },



        handleSwith(e){
            console.log(e)
            this.setData({
                ['infoGroupThree[0].off']:e.detail.value
            })
        },
        onChangeRadio(e){
            console.log(e)
            let index = e.currentTarget.dataset.index;
            // let number = e.detail;
            this.setData({
                [`infoGroupTwo[${index}].radioValue`]:e.detail
            })
            if(index === 1){
                if(e.detail != '1'){
                    this.setData({
                        [`infoGroupTwo[${index}].list.input[0].msg`]:'元/船'
                    })
                }else{
                    this.setData({
                        [`infoGroupTwo[${index}].list.input[0].msg`]:'元/吨'
                    })
                }
            }else{
                if(e.detail != '1'){
                    this.setData({
                        [`infoGroupTwo[${index}].list.input[0].msg`]:'小时',
                        [`infoGroupTwo[${index}].list.input[1].msg`]:'小时',
                        [`infoGroupTwo[${index}].list.input[2].msg`]:'元  小时/吨'
                    })
                }else{
                    this.setData({
                        [`infoGroupTwo[${index}].list.input[0].msg`]:'天',
                        [`infoGroupTwo[${index}].list.input[1].msg`]:'天',
                        [`infoGroupTwo[${index}].list.input[2].msg`]:'元  天/吨'
                    })
                }
            }
            console.log(this.data.infoGroupTwo)
        }
    }
})
