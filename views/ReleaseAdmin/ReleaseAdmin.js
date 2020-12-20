// views/ReleaseAdmin/ReleaseAdmin.js
Page({
  data: {
    buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
    id:null,
    statusList:[{
      status:3,
      title:'上架中'
    },{
      status:2,
      title:'已下架'
    }],
    upAndDownState:1,
  },

  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  onShow: function () {
    console.log(this.data.id)
  },
  switchButton(e){
    console.log(e)
    let upAndDownState = e.detail.name;
    this.setData({
      upAndDownState
    })
  }
})