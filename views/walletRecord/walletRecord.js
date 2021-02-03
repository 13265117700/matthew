import invoice from "../../models/user/invoice";
import ExtractMoney from "../../models/user/extractMoney";


Page({
    data: {
        active: null,
        index: 0,
        tabs: [{
            title: '全部',
            index: 0,
            status: null
        }, {
            title: '待审核',
            index: 1,
            status: 0
        }, {
            title: '已邮寄',
            index: 2,
            status: 1
        }, {
            title: '已完成',
            index: 3,
            status: 2
        }, {
            title: '未通过',
            index: 4,
            status: 3
        }],

        textList: [], //发票列表
    },
    onLoad: function (options) {
        this.setData({
            index: parseInt(options.index)
        })
    },
    onShow: function () {
        this.tabsList()
    },
    tabsList() {
        let index = this.data.index;
        let tabs = this.data.tabs;
        if (index == 0) {
            wx.setNavigationBarTitle({
                title: '发票记录',
            })
            this.setData({
                ['tabs[2].title']: '已邮寄',
                ['tabs[3].title']: '已完成',
                ['tabs[4].title']: '未通过',
            })

            this.onInvoiceRecord()
        } else {
            wx.setNavigationBarTitle({
                title: '提现记录',
            })
            this.setData({
                ['tabs[2].title']: '打款中',
                ['tabs[3].title']: '未通过',
                ['tabs[4].title']: '已提现',
            })

            this.onExtractMoney()
        }

        this.setData({
            tabs
        })
    },

    onTabs(e) {
        let status = e.detail.name;
        let index = this.data.index;
        if (index == 0) {
            this.onInvoiceRecord(status)
        } else {
            this.onExtractMoney(status)
        }
    },

    onInvoiceRecord(status) {
        let params = {}
        let Authorization = wx.getStorageSync('Authorization');
        if (status == null) {
            params = {
                Authorization,
                page: 1,
                rows: 10
            }
        } else {
            params = {
                Authorization,
                page: 1,
                rows: 10,
                status
            }
        }
        console.log(params)
        invoice.UserInvoiceRecord(params).then(res => {
            let textList = res.data.data.rows;

            textList.forEach(data => {
                console.log(data)
                switch (data.status) {
                    case 0:
                        data.color = 'hover'
                        data.text = '审核中'
                        break;
                    case 1:
                        data.color = 'checked'
                        data.text = '已邮寄'
                        break;
                    case 2:
                        data.color = 'success'
                        data.text = '已完成'
                        break;
                    case 3:
                        data.color = 'fail'
                        data.text = '未通过'
                        break;
                }
            })

            console.log(textList)
            this.setData({
                textList
            })
        })

    },
    onExtractMoney(status) {
        let params = {}
        let Authorization = wx.getStorageSync('Authorization');
        if (status == null) {
            params = {
                Authorization,
                page: 1,
                rows: 10
            }
        } else {
            params = {
                Authorization,
                page: 1,
                rows: 10,
                status
            }
        }

        console.log(params)
        ExtractMoney.UserExtractMoneyList(params).then(res => {
            console.log(res)
            let textList = res.data.data.rows;
            textList.forEach(data => {
                console.log(data)
                switch (data.status) {
                    case 0:
                        data.color = 'hover'
                        data.text = '审核中'
                        break;
                    case 1:
                        data.color = 'current'
                        data.text = '打款中'
                        break;
                    case 2:
                        data.color = 'success'
                        data.text = '已通过'
                        break;
                    case 3:
                        data.color = 'fail'
                        data.text = '提现失败'
                        break;
                }
            })
            this.setData({
                textList
            })
        })
    },
    onDetail(e) {
        console.log(e)
        let index = this.data.index;
        let id = e.currentTarget.dataset.id;
        if (index == 0) {
            wx.navigateTo({
                url: '/views/walletExtractDetail/walletExtractDetail?id=' + id,
            })
        } else {
            wx.navigateTo({
                url: '/views/walletExtractDetail/walletExtractDetail?id=' + id,
            })
        }

    }
})