import User from "../../../models/user/user";


Component({
  properties: {

  },
  lifetimes: {
    ready: function () {
      this.getUserInfo()
    }
  },
  data: {
    btnStyle: 'background: #E3211F;border-radius: 20px;border: 1px solid #F2511A;width: 100px;height: 40px;',
    user: {},
    mtWallet: {},
  },
  methods: {
    getUserInfo() {
      let Authorization = wx.getStorageSync('Authorization');
      User.userInfo({
        Authorization
      }).then(res => {
        let user = res.data.data;
        let mtWallet = user.mtWallet;
        console.log(mtWallet)
        let invoiceAmount = Math.round(parseFloat(mtWallet.invoiceAmount) * 100) / 100;
        let xsdinvoiceAmount = invoiceAmount.toString().split(".");
        if (xsdinvoiceAmount.length == 1) {
          invoiceAmount = invoiceAmount.toString() + ".00";
        }
        if (xsdinvoiceAmount.length > 1) {
          if (xsdinvoiceAmount[1].length < 2) {
            invoiceAmount = invoiceAmount.toString() + "0";
          }
        }

        mtWallet.invoiceAmount = invoiceAmount
        this.setData({
          user,
          mtWallet
        })
      })
    },
    oninvoiceapply() {
      console.log(this.data.user)
      let user = this.data.user;
      if (user.mtUserInvoice) {
        let state = 1;
        wx.navigateTo({
          url: '/views/invoiceInfo/invoiceInfo?state=' + state,
        })
      } else {
        wx.navigateTo({
          url: '/views/InvoiceAdmin/InvoiceAdmin',
        })
      }

    }
  }
})