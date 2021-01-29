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
    mtWallet: {},
    btn: [{
      title: '提现',
      index: 1
    }],
    btnStyle: 'width: 70px;height: 30px;background: #E95C31;border: 1px solid #F1AE99;font-size: 15px;',
  },
  methods: {
    getUserInfo() {
      let Authorization = wx.getStorageSync('Authorization');
      User.userInfo({
        Authorization
      }).then(res => {
        let mtWallet = res.data.data.mtWallet;
        let balance = Math.round(parseFloat(mtWallet.balance) * 100) / 100;
        let xsdbalance = balance.toString().split(".");
        let total = Math.round(parseFloat(mtWallet.total) * 100) / 100;
        let xsdtotal = total.toString().split(".");
        let withdrawalAmount = Math.round(parseFloat(mtWallet.withdrawalAmount) * 100) / 100;
        let xsdwithdrawalAmount = withdrawalAmount.toString().split(".");

        if (xsdbalance.length == 1) {
          balance = balance.toString() + ".00";
        }
        if (xsdbalance.length > 1) {
          if (xsdbalance[1].length < 2) {
            balance = balance.toString() + "0";
          }
        }

        if (xsdtotal.length == 1) {
          total = total.toString() + ".00";
        }
        if (xsdtotal.length > 1) {
          if (xsdtotal[1].length < 2) {
            total = total.toString() + "0";
          }
        }

        if (xsdwithdrawalAmount.length == 1) {
          withdrawalAmount = withdrawalAmount.toString() + ".00";
        }
        if (xsdwithdrawalAmount.length > 1) {
          if (xsdwithdrawalAmount[1].length < 2) {
            withdrawalAmount = withdrawalAmount.toString() + "0";
          }
        }

        mtWallet.balance = balance
        mtWallet.total = total
        mtWallet.withdrawalAmount = withdrawalAmount


        this.setData({
          mtWallet
        })
      })
    },
    pageclose() {
      wx.navigateBack({
        data: 1
      })
    },
    onBtn(e) {
      let index = e.currentTarget.dataset.index;
      if (index == 0) {
        wx.navigateTo({
          url: '/views/top-up/top-up',
        })
      } else {
        wx.navigateTo({
          url: '/views/walletAmountExtract/walletAmountExtract',
        })
      }
    }
  }
})