import User from "../../models/user/user"


Page({
  data: {
    id: null,
    orderInfo: {},
    step: [],
    orderStatus: {
      title: '船到装货港',
      date: '2021-01-08 09:52:40'
    }
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
  },

  onShow: function () {
    this.getUserOrderInfo()
  },

  getUserOrderInfo() {
    let Authorization = wx.getStorageSync('Authorization');
    let id = this.data.id;
    let params = {
      Authorization,
      id
    }
    User.UserOrderQuery(params).then(res => {
      let rows = res.data.data;
      let step = [];

      if (rows.arrivalLoading) {
        let aImg = rows.arrivalLoading.processImg.split(',');

        let a = []
        aImg.forEach(img => {
          let arr = {}
          arr.url = img;
          a.push(arr)
        })
        rows.arrivalLoading.processImg = a;
        rows.arrivalLoading.active = true;
        rows.arrivalLoading.title = '船到装货港';
        rows.arrivalLoading.subtitle = '上传空船照片时间：';
        step.unshift(rows.arrivalLoading);

        if (rows.loadingCargo) {
          let bImg = rows.loadingCargo.processImg.split(',');
          let b = []
          bImg.forEach(img => {
            let arr = {}
            arr.url = img
            b.push(arr)
          })
          rows.loadingCargo.processImg = b
          rows.loadingCargo.active = true
          rows.loadingCargo.title = '装好货';
          rows.loadingCargo.subtitle = '上传装好货时间：';
          step.unshift(rows.loadingCargo)
          step.forEach(data => {
            if (data.arrivalPoint == 1) {
              data.active = false
            }
          })


          if (rows.inTransit) {
            rows.inTransit.active = true
            rows.inTransit.title = '运输中';
            rows.inTransit.subtitle = '运输中：';
            step.unshift(rows.inTransit)
            step.forEach(data => {
              if (data.arrivalPoint < 3) {
                data.active = false
              }
            })

            if (rows.arrivalObjective) {
              let cImg = rows.arrivalObjective.processImg.split(',');
              let c = [];
              cImg.forEach(img => {
                let arr = {};
                arr.url = img;
                c.push(arr)
              })
              rows.arrivalObjective.processImg = c
              rows.arrivalObjective.active = true
              rows.arrivalObjective.title = '到达目的港';
              rows.arrivalObjective.subtitle = '到达目的港：';
              step.unshift(rows.arrivalObjective)
              step.forEach(data => {
                if (data.arrivalPoint < 4) {
                  data.active = false
                }
              })


              if (rows.unloadingCompleted) {
                rows.unloadingCompleted.active = true
                rows.unloadingCompleted.title = '卸货完成';
                rows.unloadingCompleted.subtitle = '卸货完成 签收时间：';
                step.unshift(rows.unloadingCompleted)
                step.forEach(data => {
                  if (data.arrivalPoint < 5) {
                    data.active = false
                  }
                })

              }
            }
          }
        }
      }

      this.onOrderStatus(rows)
      this.setData({
        orderInfo: rows,
        step
      })
    })
  },

  onOrderStatus(order) {
    console.log(order)
    switch (order.transportStatus) {
      case 0:
        if(order.status > 6){
          this.setData({
            ["orderStatus.title"]: '订单正在售后中',
            ["orderStatus.date"]: ''
          })
        }else{
          this.setData({
            ["orderStatus.title"]: '船正在赶往装货港...',
            ["orderStatus.date"]: ''
          })
        }
        
        break;
      case 1:
        this.setData({
          ["orderStatus.title"]: order.arrivalLoading.title,
          ["orderStatus.date"]: order.arrivalLoading.createTime
        })
        break;
      case 2:
        this.setData({
          ["orderStatus.title"]: order.loadingCargo.title + '：',
          ["orderStatus.date"]: order.loadingCargo.createTime
        })
        break;
      case 3:
        this.setData({
          ["orderStatus.title"]: order.inTransit.title + '：',
          ["orderStatus.date"]: order.inTransit.createTime
        })
        break;
      case 4:
        this.setData({
          ["orderStatus.title"]: order.arrivalObjective.title + '：',
          ["orderStatus.date"]: order.arrivalObjective.createTime
        })
        break;
      case 5:
        this.setData({
          ["orderStatus.title"]: order.unloadingCompleted.title + '：',
          ["orderStatus.date"]: order.unloadingCompleted.createTime
        })
        break;
    }
  },
  onOpenImage(e) {
    console.log(e)
    let list = [...(e.currentTarget.dataset.list.map(a => a.url))];
    let url = e.currentTarget.dataset.url;
    console.log(list, url)
    wx.previewImage({
      current: url,
      urls: list
    })
  }
})