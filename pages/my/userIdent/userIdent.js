const { $Toast } = require('../../../miniprogram_npm/iview-weapp/base/index');
import upload from './../../../models/upload/upload';

Page({
  data: {
    identity:null,
    ahtcId:null,
    navbarTitle:'',
    radioTitle:'提交认证',
    // disabled: false,
    checked: false,

    // 未上传驾驶证默认照片
    dslImage:[{
      src:'/images/my/scc@3x.png'
    },{
      src:'/images/my/scc@3x.png'
    }],

    creditCode:'',// 统一社会信用代码
    nameEnterprise:'',//企业名称
    contacts:'',//联系人
    phone:'',//联系方式
    idNumber:'',//身份证号
    corporateId:'',//身份证正面
    backViewIdCard:'',//身份证反面
    businessLicense:'',//营业执照
    licensePlate:'',//车牌号
    driveJust:'',//驾驶证正面
    driveBack:'',//驾驶证反面
    transportPermit:'',//道路许可证照片
  },
  onLoad: function (options) {
    this.setData({
      identity:options.identity,
      ahtcId:options.ahtcId
    })
    let identity = this.data.identity;
    switch(identity){
      case '1':
        this.setData({
          navbarTitle:'申请船东认证'
        })
        break;
      case '2':
        this.setData({
          navbarTitle:'申请货主认证'
        })
        break;
      case '3':
        this.setData({
          navbarTitle:'申请车主认证'
        })
        break;
    }
    console.log(this.data.identity,'认证身份')
    console.log(this.data.ahtcId,'认证方式')
  },
  handleAnimalChange({ detail = {} }) {
    this.setData({
        checked: detail.current
    });
    console.log(this.data.checked)
  },
  // 统一社会信用代码input
  handcreditCode(e){
    let creditCode = e.detail.value;
    this.setData({
      creditCode
    })
  },
  //企业名称input
  handnameEnterprise(e){
    let nameEnterprise = e.detail.value;
    this.setData({
      nameEnterprise
    })
  },
  // 姓名input
  handcontacts(e){
    let contacts = e.detail.value;
    this.setData({
      contacts
    })
  },
  //联系方式input
  handphone(e){
    let phone = e.detail.value;
    this.setData({
      phone
    })
  },
  //身份证input
  handIdenInput(e){
    let idNumber = e.detail.value;
    this.setData({
      idNumber
    })
  },

   //身份证正面照片上传
   IdJustUpload(){
    upload.upload.chooseImage().then(file => {
      this.setData({
        corporateId:file
      })
    })
  },
  //身份证反面照片上传
  IdBackUpload(){
    upload.upload.chooseImage().then(file => {
      console.log(file)
      this.setData({
        backViewIdCard:file
      })
    })
  },

  handleSubmit(){
    let identity = this.data.identity;
    let ahtcId = this.data.ahtcId;
    if(this.data.checked === false){
      $Toast({
        content: '请勾选提交认证',
        type: 'warning'
      })
      return
    }else{
      if(ahtcId === '0'){
        this.IndividAuth(identity,ahtcId)
      }else{
        this.EnterpAuth(identity,ahtcId)
      }
    }
  },
  


  //个人认证
  IndividAuth(identity,ahtcId){
    let Authorization = wx.getStorageSync('Authorization')
    let contacts = this.data.contacts;//联系人
    let phone = this.data.phone;//联系电话
    let idNumber = this.data.idNumber;//身份证号码
    let idenJust = this.data.corporateId;//身份证正面
    let idenBack = this.data.backViewIdCard;//身份证反面
    let licensePlate = this.data.licensePlate;//车牌号码
    let driveJust = this.data.driveJust;//驾照正面
    let driveBack = this.data.driveBack;//驾照反面
    //船东
    let shipOwner = identity === '1' && ahtcId === '0'
    //货主
    let cargoOwner = identity === '2' && ahtcId === '0'
    if(shipOwner || cargoOwner){
      console.log('船东','货主')
      if( !contacts || !phone || !idNumber || !idenJust || !idenBack ){
        $Toast({
          content: '红色*号为必填项目',
          type: 'warning'
        })
        return
      }else{
        console.log('提交船或货认证')
      }
    }

    //车主
    if(identity === '3' && ahtcId === '0'){
      if( !contacts || !phone || !idNumber || !idenJust || !idenBack || !licensePlate || !driveJust || !driveBack ){
        $Toast({
          content: '红色*号为必填项目',
          type: 'warning'
        })
        return
      }else{
        console.log('提交车认证')
      }
    }
  },




  // 企业认证
  EnterpAuth(identity,ahtcId){
    let Authorization = wx.getStorageSync('Authorization')
    let creditCode = this.data.creditCode;//统一信用代码
    let nameEnterprise = this.data.nameEnterprise;//企业名称
    let contacts = this.data.contacts;//联系人
    let phone = this.data.phone;//联系电话
    let idNumber = this.data.idNumber;//身份证号码
    let idenJust = this.data.corporateId;//身份证正面
    let idenBack = this.data.backViewIdCard;//身份证反面
    let businessLicense = this.data.businessLicense;//营业执照
    let transportPermit = this.data.transportPermit;//道路许可证照片
    //船东
    let shipOwner = identity === '1' && ahtcId === '1'
    //货主
    let cargoOwner = identity === '2' && ahtcId === '1'
    if(shipOwner || cargoOwner){
      console.log('船东企业','货主企业')
      if( !creditCode || !nameEnterprise|| !contacts || !phone || !idNumber || !idenJust || !idenBack ){
        console.log(Authorization)
      }
    }
  },
})