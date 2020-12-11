// components/my/user-admin/user-admin-info/user-admin-info.js
import upload from "../../../../models/upload/upload"
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
        //信息分组1
        infoGroupOne:[{
            title:'船舶名称：',
            vlaue:'',
            placeholder:'请输入船舶名称',
            type:'input',
            arrow:false
        },{
            title:'载货量A级：',
            vlaue:'',
            placeholder:'请输入航区载货量',
            type:'input',
            arrow:false,
            after:'吨'
        },{
            title:'载货量B级：',
            vlaue:'',
            placeholder:'请输入航区载货量',
            type:'input',
            arrow:false,
            after:'吨'
        },{
            title:'AIS码：',
            vlaue:'',
            placeholder:'请输入AIS码',
            type:'input',
            arrow:false,
        },{
            title:'船舶类型：',
            vlaue:'',
            placeholder:'请选择船舶类型',
            type:'picker',
            list:[{
                type:1,
                label:'驱逐舰'
            },{
                type:2,
                label:'巡航舰'
            },{
                type:3,
                label:'运输舰'
            },{
                type:4,
                label:'补给舰'
            }],
            arrow:true
        },{
            title:'船长姓名：',
            vlaue:'',
            placeholder:'请输入船长姓名',
            type:'input',
            arrow:false
        },{
            title:'船长电话：',
            vlaue:'',
            placeholder:'请输入船长联系方式',
            type:'input',
            arrow:false
        }],
        infoGroupTwo:[{
            title:'封仓设备：',
            vlaue:'',
            placeholder:'请选择封仓设备',
            list:[{
                type:1,
                label:'好设备'
            },{
                type:2,
                label:'烂设备'
            }],
            type:'picker',
            mode:'selector',
            arrow:true
        },{
            title:'船龄：',
            vlaue:'',
            placeholder:'请选择船舶建造日期',
            type:'picker',
            mode:'date',
            arrow:true
        },{
            title:'船籍港:',
            vlaue:'',
            placeholder:'请输入船籍港',
            type:'input',
            arrow:false
        },{
            title:'船总吨位：',
            vlaue:'',
            placeholder:'请输入船总吨位',
            type:'input',
            arrow:false
        },{
            title:'船总长：',
            vlaue:'',
            placeholder:'请输入船总长',
            type:'input',
            arrow:false
        },{
            title:'船总宽:',
            vlaue:'',
            placeholder:'请输入船总宽',
            type:'input',
            arrow:false
        },{
            title:'船总高：',
            vlaue:'',
            placeholder:'请输入最大船高',
            type:'input',
            arrow:false
        },{
            title:'满载吃水：',
            vlaue:'',
            placeholder:'请输入满载吃水',
            type:'input',
            arrow:false
        },{
            title:'型深:',
            vlaue:'',
            placeholder:'请输入型深',
            type:'input',
            arrow:false
        },{
            title:'监控装备：',
            vlaue:'',
            placeholder:'请选择监控装备',
            list:[{
                type:1,
                label:'神马级'
            },{
                type:2,
                label:'宝马级'
            }],
            type:'picker',
            mode:'selector',
            arrow:true
        },{
            title:'船舶保险:',
            vlaue:'',
            placeholder:'请选择船舶保险',
            list:[{
                type:1,
                label:'深水险种'
            },{
                type:2,
                label:'怪物险种'
            },{
                type:3,
                label:'太平洋险种'
            }],
            type:'picker',
            mode:'selector',
            arrow:true
        },{
            title:'可拉货物：',
            vlaue:'',
            placeholder:'请选择可拉货物',
            list:[{
                type:1,
                label:'水果'
            },{
                type:2,
                label:'衣服'
            },{
                type:3,
                label:'生鲜'
            }],
            type:'picker',
            mode:'selector',
            arrow:true
        }],
        
        nameVessel:'',// 船名称
        ladenA:'',//船区载货量A级
        ladenB:'',//船区载货量B级
        ais:'',//AIS码
        typeShip:'',//船舶类型
        captainName:'',//船长姓名
        captainPhone:'',//船长电话

        idenJust:'',// 身份证正面
        idenBack:'',// 身份证反面

        traitList:[],//船长特征

        projectList:[],//船舶主要项目

        aisCertificate:'', // AIS证书
        hanoiCertificate:'',// 内河证书

        shipOperationCertificate:'',// 船运营证书
        shipAnnualCertificate:'',// 船年审证书

        shipTestCertificate:[],// 船检验证书

        sealingEquipment:'',//封仓设备
        ageShip:'',//船龄
        membership:'',//船籍
        tonnage:'',//船总吨位数
        chief:'',//船总长
        breadth:'',//船宽
        shipHeight:'',//船高
        typeDepth:'',//吃水
        depthProfile:'',//型深
        monitoring:'',//监控设备
        insurance:'',//船舶保险
        kola:'',//可拉货物

        shipChart:[],//船图

        shipVideo:'' //船视频

    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 信息分组1下拉框
        infoGroupOneDropDown(e){
            let dataset = e.currentTarget.dataset;
            let index = dataset.index;
            let infoGroupOne = this.data.infoGroupOne;
            let listIndex = e.detail.value;
            console.log(index,listIndex)
            console.log(infoGroupOne[index].list[listIndex].label)
        },
        //信息分组下拉框
        infoGroupTwoDropDown(e){
            let dataset = e.currentTarget.dataset;
            let index = dataset.index;
            let infoGroupTwo = this.data.infoGroupTwo;
            let liseIndex = e.detail.value;
            console.log(index,liseIndex)
            if(index != 1){
                console.log(infoGroupTwo[index].list[liseIndex].label)
            }
        },

        // 信息分组1输入框
        infoGroupOneInput(e){
            let dataset = e.currentTarget.dataset;
            let index = dataset.index;
            let value = e.detail.value;
            console.log(index,value)
        },
        infoGroupTwoInput(e){
            let dataset = e.currentTarget.dataset;
            let index = dataset.index;
            let value = e.detail.value;
            console.log(index,value)
        },

        // 身份证正面
        justAfterRead(){
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    idenJust:res
                })
            })
        },

        // 身份证反面
        backAfterRead(){
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    idenBack:res
                })
            })
        },

        //船长特征
        handTrait(event){
            const { file } = event.detail;
            let filePath = file.url;
            upload.upload.uploadFile(filePath).then(res => {
                console.log(res)
                let traitList = this.data.traitList;
                traitList.push({url:res})
                console.log(traitList)
                this.setData({
                    traitList
                })
            })
        },

        //上传船舶主要项目
        handProject(event){
            const { file } = event.detail;
            let filePath = file.url;
            upload.upload.uploadFile(filePath).then(res => {
                console.log(res)
                let projectList = this.data.projectList;
                projectList.push({url:res})
                console.log(projectList)
                this.setData({
                    projectList
                })
            })
        },

        // AIS证书上传
        aisUpload(){
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    aisCertificate:res
                })
            })
        },
        //河内证书上传
        hanoiCertificateUpload(){
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    hanoiCertificate:res
                })
            })
        },

        // 船运营证书
        handShipOperationCertificate(){
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    shipOperationCertificate:res
                })
            })
        },

        //船年审证书
        handShipAnnualCertificate(){
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    shipAnnualCertificate:res
                })
            })
        },
        // 船检验证书
        handShipTestCertificate(event){
            const { file } = event.detail;
            let filePath = file.url;
            upload.upload.uploadFile(filePath).then(res => {
                console.log(res)
                let shipTestCertificate = this.data.shipTestCertificate;
                shipTestCertificate.push({url:res})
                console.log(shipTestCertificate)
                this.setData({
                    shipTestCertificate
                })
            })
        },
        //船图片
        handShipChartUpload(event){
            const { file } = event.detail;
            let filePath = file.url;
            upload.upload.uploadFile(filePath).then(res => {
                console.log(res)
                let shipChart = this.data.shipChart;
                shipChart.push({url:res})
                console.log(shipChart)
                this.setData({
                    shipChart
                })
            })
        },
        //船视频
        handleVideo(){
            console.log('添加船视频')
            upload.upload.chooseVideo().then(res => {
                console.log(res)
            })
        },
        handleSubmit(){
            console.log('添加1')
        }
    }
})
