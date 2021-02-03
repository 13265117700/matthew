import Invoice from "../../models/user/invoice";

Page({
  data: {
    id: null,
    invoiceDetail: {},
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  onShow: function () {
    this.handleInvoiceDetail()
  },

  handleInvoiceDetail() {
    let id = this.data.id;
    let Authorization = wx.getStorageSync('Authorization');
    Invoice.UserInvoiceDetail({
      Authorization,
      id
    }).then(res => {
      console.log(res)
      let invoiceDetail = res.data.data;

      switch (invoiceDetail.status) {
        case 0:
          wx.setNavigationBarTitle({
            title: '审核中',
          })
          invoiceDetail.icon = 'https://img.gdmatt.com/images/2021/02/03/16123646087977141.png';
          invoiceDetail.color = 'current'
          invoiceDetail.text = '审核中'
          break
        case 1:
          wx.setNavigationBarTitle({
            title: '已邮寄',
          })
          invoiceDetail.icon = 'https://img.gdmatt.com/images/2021/02/03/16123647344373455.png';
          invoiceDetail.color = 'checked'
          invoiceDetail.text = '已邮寄'
          break;
        case 2:
          wx.setNavigationBarTitle({
            title: '已完成',
          })
          invoiceDetail.icon = 'https://img.gdmatt.com/images/2021/01/25/16115584651559959.png';
          invoiceDetail.color = 'success'
          invoiceDetail.text = '已完成'
          break;
        case 3:
          wx.setNavigationBarTitle({
            title: '审核失败',
          })
          invoiceDetail.icon = 'https://img.gdmatt.com/images/2021/02/03/1612348644484579.png';
          invoiceDetail.color = 'fail'
          invoiceDetail.text = '审核失败'
          break;
      }


      this.setData({
        invoiceDetail
      })
    })
  }
})