import mtWharf from '../../../models/frontEnd/mtWharf';
import User from '../../../models/user/user';
Component({
    properties: {

    },
    data: {
        buttonStyle: 'border-top-left-radius: 10px;border-top-right-radius: 10px;',
        //信息分组1
        infoGroupOne: [{
            id: 1000001,
            rate: true,
            title: '货名：',
            placeholder: '请选择货名',
            type: 'default',
            arrow: true
        }, {
            id: 1000002,
            rate: true,
            title: '货物代码：',
            placeholder: '货物分类代码自动生成',
            type: 'default',
            arrow: false
        }, {
            id: 1000003,
            rate: true,
            title: '数量(吨)：',
            placeholder: '请输入吨数',
            type: 'input',
            arrow: false,
        }, {
            id: 1000004,
            rate: true,
            title: '装货港：',
            placeholder: '请选择装货地',
            type: 'default',
            arrow: true
        }, {
            id: 1000005,
            rate: true,
            title: '目的港：',
            placeholder: '请选择目的港',
            type: 'default',
            arrow: true
        }],
        //信息分组2
        infoGroupTwo: [{
            rate: true,
            title: '装货日期：',
            placeholder: '请选择装货日期',
            type: 'picker',
            mode: 'date',
            arrow: true
        }, {
            rate: true,
            title: '运价(含税）',
            radioValue: '1',
            list: {
                radio: [{
                    name: '运费单价',
                    number: '1'
                }, {
                    name: '包船单价',
                    number: '2'
                }],
                input: [{
                    id: 555,
                    type: 'input',
                    placeholder: '请输入运费单价',
                    msg: '元/吨',
                    show: true
                }]
            }
        }, {
            rate: false,
            title: '其它费用：',
            radioValue: '1',
            list: {
                radio: [{
                    name: '其它',
                    number: '1'
                }, {
                    name: '无',
                    number: '2'
                }],
                input: [{
                    id: 233,
                    type: 'input',
                    placeholder: '请输入其它费用',
                    show: true
                }]
            }
        }, {
            rate: true,
            title: '滞期约定：',
            radioValue: '1',
            list: {
                radio: [{
                    name: '按天',
                    number: '1'
                }, {
                    name: '按小时',
                    number: '2'
                }],
                input: [{
                    id: 111,
                    type: 'input',
                    placeholder: '请输入装货天数',
                    msg: '天',
                    show: true
                }, {
                    id: 222,
                    type: 'input',
                    placeholder: '请输入卸货天数',
                    msg: '天',
                    show: true
                }, {
                    id: 333,
                    subTitle: '滞期单价 ：￥',
                    type: 'input',
                    msg: '元  天/吨',
                    show: true
                }]
            }
        }, {
            id: 999,
            rate: true,
            title: '船舶类型：',
            placeholder: '请选择船舶类型',
            value: '',
            type: 'default',
            arrow: true
        }, {
            id: 101,
            rate: true,
            title: '货物交接：',
            placeholder: '请输入货物交接',
            value: '',
            type: 'default',
            arrow: true
        }],
        //信息分组3
        infoGroupThree: [{
            rate: true,
            title: '货物赔偿约定：',
            off: true,
            // placeholder: '请设置货物赔偿约定',
            list: {
                input: [{
                    subTitle: '货损≤：',
                    type: 'input',
                    placeholder: '请输入货损',
                    msg: '‰'
                }, {
                    subTitle: '按：',
                    type: 'input',
                    placeholder: '请输入金额',
                    msg: '元/吨'
                }]
            }
        }, {
            on: 1,
            rate: true,
            title: '船舶大小：',
        }, {
            id: 202,
            rate: true,
            title: '封仓要求：',
            placeholder: '请输入封仓要求',
            value: '',
            type: 'default',
            arrow: true
        }, {
            id: 888,
            rate: true,
            title: '装货方式：',
            placeholder: '请选择装货方式',
            value: '',
            type: 'default',
            arrow: true
        }, {
            id: 777,
            rate: true,
            title: '卸货方式：',
            placeholder: '请选择卸货方式',
            value: '',
            type: 'default',
            arrow: true
        }],
        infoGroupOneIndexID: null, //分组1当前项ID

        addressShow: false, //地区选择弹框

        pickerListRows: [], //弹框Picker所有数据
        pickerList: [], //弹框Picker列表
        pickerItemId: null, //弹框Picker当前项ID
        handlePickerInput: '', //弹框Picker输入框值
        handlePickerShow: false, //弹框Picker显示开关

        cargoNameList: [], //货名name列表
        cargoNameRows: [], //货名列表
        cargoCode: null, //货物代码

        //确认按钮
        // confirmButton: [{
        //     name: '不指定',
        //     active: false,
        //     id: '0'
        // }, {
        //     name: '指定船东',
        //     active: true,
        //     id: '1'
        // }],

        // visible: false, //提示框
        // specifiedShow: false, //指定船东弹框

        nameGoodsId: null, //货名ID
        number: 0, //数量(吨)
        portDepartureAddress: null, //起运港详细地址
        portDepartureId: 0, //起运港Id
        portArrivalAddress: null, //到达港详细地址
        portArrivalId: 0, //到达港Id
        loadingDate: null, //装货日期(时间戳)
        freightRate: 1, //运价类型
        freightAmount: 0, //运价金额
        otherExpenses: null, //其它费用
        lagPeriodType: 1, //滞期约定类型 1.天 2.小时
        delayedLoading: 0, //滞期装货(天/小时)
        delayedDischarge: 0, //滞期卸货(天/小时)
        delayedCost: null, //滞期费用
        typeShip: null, //船舶类型文字
        mtTypeShipId: null, //船舶类型Id
        deliveryGoods: null, //货物交接
        compensation: 1, //货物赔偿约定(0.否，1是)
        lossGoods: 0, //货物损耗
        goodsDamages: 0, //货物赔偿金额
        vesselMinimum: 0, //船舶最小值
        vesselMaximum: 0, //船舶最大值
        warehouse: null, //封仓要求
        loadingMethod: null, //装货方式
        unloadingMode: null, //卸货方式
        remarks: null, //船东留言
    },

    lifetimes: {
        attached: function () {}
    },
    methods: {
        onMyEvent(e) {
            let detailedAddress = e.detail.detailedAddress;
            let propID = e.detail.propID;
            let wharfID = e.detail.wharfID;
            if (detailedAddress != null) {
                if (propID === '1000004') {
                    this.setData({
                        ['infoGroupOne[3].placeholder']: detailedAddress,
                        portDepartureAddress: detailedAddress,
                        portDepartureId: wharfID,
                        addressShow: false
                    })
                } else if (propID === '1000005') {
                    this.setData({
                        ['infoGroupOne[4].placeholder']: detailedAddress,
                        portArrivalAddress: detailedAddress,
                        portArrivalId: wharfID,
                        addressShow: false
                    })
                }
            }
        },

        /**
         * 信息分组1
         */
        //获取货物列表
        frontDeskCargoList() {
            let page = 1;
            let rows = 10;
            mtWharf.frontDeskCargoList({
                page,
                rows
            }).then(res => {
                let rows = res.data.data.rows;
                console.log(rows)
                let cargoNameList = rows.map(data => data.name);
                console.log(cargoNameList)
                this.setData({
                    cargoNameList,
                    cargoNameRows: rows,
                })
            })
        },
        // 关闭弹框
        onClose() {
            this.setData({
                cargoNameShow: false,
                handlePickerShow: false
            })
        },
        // 分组1弹框
        GroupOneClick(e) {
            console.log(e)
            let index = e.currentTarget.dataset.index;
            let id = e.currentTarget.dataset.id;
            console.log(id)
            switch (index) {
                case 0:
                    this.setData({
                        cargoNameShow: true,
                    })
                    this.frontDeskCargoList();
                    break
                case 3:
                    this.setData({
                        addressShow: true,
                        infoGroupOneIndexID: id
                    })
                    this.triggerEvent('myevent', '选择装货港')
                    break
                case 4:
                    this.setData({
                        addressShow: true,
                        infoGroupOneIndexID: id
                    })
                    this.triggerEvent('myevent', '选择目的港')
                    break
            }
        },
        handObtainGoods(e) {
            console.log(e)
            let index = e.detail.index;
            let nameGoodsId = this.data.cargoNameRows[index].id;
            let cargoCode = this.data.cargoNameRows[index].cargoCode;
            let name = this.data.cargoNameList[index];
            console.log(name, nameGoodsId)
            this.setData({
                nameGoodsId,
                ['infoGroupOne[0].placeholder']: name,
                cargoNameShow: false,
                cargoCode,
                ['infoGroupOne[1].placeholder']: cargoCode
            })
        },
        infoGroupOneInput(e) {
            this.setData({
                number: e.detail.value
            })
        },
        onCloseAddress() {
            this.setData({
                addressShow: false,
                specifiedShow: false
            })
            this.triggerEvent('myevent', '发布货源');

        },


        /**
         * 信息分组2
         */
        //选择日子
        infoGroupTwoDate(e) {
            console.log(e)
            let index = e.currentTarget.dataset.index;
            let value = e.detail.value;
            let date = new Date(value);
            let loadingDate = Date.parse(date);
            console.log(loadingDate)
            this.setData({
                [`infoGroupTwo[${index}].placeholder`]: value,
                loadingDate
            })
        },
        //分组2内列表单选框
        onChangeRadio(e) {
            console.log(e)
            let index = e.currentTarget.dataset.index;
            this.setData({
                [`infoGroupTwo[${index}].radioValue`]: e.detail
            })
            switch (index) {
                case 1:
                    if (e.detail != '1') {
                        this.setData({
                            [`infoGroupTwo[${index}].list.input[0].msg`]: '元/船',
                            freightRate: 2
                        })
                    } else {
                        this.setData({
                            [`infoGroupTwo[${index}].list.input[0].msg`]: '元/吨',
                            freightRate: 1
                        })
                    }
                    break;
                case 2:
                    let input = this.data.infoGroupTwo[index].list.input[0].show;
                    let show = input = !input
                    this.setData({
                        [`infoGroupTwo[${index}].list.input[0].show`]: show
                    })
                    break;
                case 3:
                    if (e.detail != '1') {
                        this.setData({
                            [`infoGroupTwo[${index}].list.input[0].msg`]: '小时',
                            [`infoGroupTwo[${index}].list.input[1].msg`]: '小时',
                            [`infoGroupTwo[${index}].list.input[2].msg`]: '元  小时/吨',
                            lagPeriodType: 2
                        })
                    } else {
                        this.setData({
                            [`infoGroupTwo[${index}].list.input[0].msg`]: '天',
                            [`infoGroupTwo[${index}].list.input[1].msg`]: '天',
                            [`infoGroupTwo[${index}].list.input[2].msg`]: '元  天/吨',
                            lagPeriodType: 1
                        })
                    }
                    break;
            }

        },
        //分组2内列表Input
        infoGroupTwoListInput(e) {
            console.log(e)
            let id = e.currentTarget.dataset.id;
            switch (id) {
                //运价金额
                case 555:
                    this.setData({
                        freightAmount: e.detail.value
                    })
                    break
                    //滞期装货(天/小时)
                case 111:
                    this.setData({
                        delayedLoading: e.detail.value
                    })
                    break
                    //滞期卸货(天/小时)
                case 222:
                    this.setData({
                        delayedDischarge: e.detail.value
                    })
                    break
                    //滞期费用
                case 333:
                    this.setData({
                        delayedCost: e.detail.value
                    })
                    break;
                case 233:
                    this.setData({
                        otherExpenses:e.detail.value
                    })
                    break;
            }
        },
        // //分组2输入框
        // infoGroupTwoInput(e) {
        //     console.log(e)
        //     let index = e.currentTarget.dataset.index;
        //     if (index === 2) {
        //         this.setData({
        //             otherExpenses: e.detail.value
        //         })
        //     } else if (index === 5) {
        //         this.setData({
        //             deliveryGoods: e.detail.value
        //         })
        //     } else {
        //         this.setData({
        //             warehouse: e.detail.value
        //         })
        //     }
        // },



        /**
         * 信息分组3
         */
        //赔偿约定开关
        handleSwith(e) {
            console.log(e)
            let compensation = e.detail.value === false ? 0 : 1;
            console.log(compensation)
            this.setData({
                ['infoGroupThree[0].off']: e.detail.value,
                compensation
            })
        },
        //货物赔偿input
        compensationInput(e) {
            console.log(e)
            let index = e.currentTarget.dataset.index;
            if (index === 0) {
                this.setData({
                    lossGoods: e.detail.value
                })
            } else {
                this.setData({
                    goodsDamages: e.detail.value
                })
            }
        },
        //船舶最小值
        vesselMinimum(e) {
            console.log(e)

            this.setData({
                vesselMinimum: e.detail.value
            })
        },
        //船舶最大值
        vesselMaximum(e) {
            console.log(e)

            this.setData({
                vesselMaximum: e.detail.value
            })
        },
        //总弹框显示
        totalPicker(e) {
            console.log(e)
            let id = e.currentTarget.dataset.id;
            this.setData({
                handlePickerShow: true
            })
            switch (id) {
                case 999:
                    this.frontDeskShipTypeList(id);
                    break
                case 888:
                    this.loadingMethod(id);
                    break
                case 777:
                    this.unloadingMode(id);
                    break;
                case 101:
                    this.theGoodsDelivery(id)
                    break;
                case 202:
                    this.storageRequirements(id)
                    break;
            }
        },
        //总弹框输入框
        handlePickerInput(e) {
            console.log(e)
            this.setData({
                handlePickerInput: e.detail
            })
        },
        handlePickerChange(e) {
            console.log(e)
            this.setData({
                handlePickerInput: ''
            })
        },
        //总弹框确认按钮
        handlePickerConfirm(e) {
            let pickerItemId = this.data.pickerItemId;
            let handlePickerInput = this.data.handlePickerInput;
            let value = e.detail.value;
            let index = e.detail.index;
            if (handlePickerInput) {
                switch (pickerItemId) {
                    case 999:
                        let pickerListRows = this.data.pickerListRows;
                        console.log(pickerListRows[index])
                        this.setData({
                            typeShip: handlePickerInput,
                            mtTypeShipId: pickerListRows[index].id,
                            ['infoGroupTwo[4].placeholder']: handlePickerInput,
                            ['infoGroupTwo[4].value']: handlePickerInput,
                            handlePickerShow: false
                        })
                        break
                    case 888:
                        this.setData({
                            loadingMethod: handlePickerInput,
                            ['infoGroupThree[3].placeholder']: handlePickerInput,
                            ['infoGroupThree[3].value']: handlePickerInput,
                            handlePickerShow: false
                        })
                        break
                    case 777:
                        this.setData({
                            unloadingMode: handlePickerInput,
                            ['infoGroupThree[4].placeholder']: handlePickerInput,
                            ['infoGroupThree[4].value']: handlePickerInput,
                            handlePickerShow: false
                        })
                        break;
                    case 101:
                        this.setData({
                            deliveryGoods: handlePickerInput,
                            ['infoGroupTwo[5].placeholder']: handlePickerInput,
                            ['infoGroupTwo[5].value']: handlePickerInput,
                            handlePickerShow: false
                        })
                        break;
                    case 202:
                        this.setData({
                            warehouse: handlePickerInput,
                            ['infoGroupThree[2].placeholder']: handlePickerInput,
                            ['infoGroupThree[2].value']: handlePickerInput,
                            handlePickerShow: false
                        })
                        break;
                }
            } else {
                switch (pickerItemId) {
                    case 999:
                        let pickerListRows = this.data.pickerListRows;
                        this.setData({
                            typeShip: value,
                            mtTypeShipId: pickerListRows[index].id,
                            ['infoGroupTwo[4].placeholder']: value,
                            handlePickerShow: false
                        })
                        break
                    case 888:
                        this.setData({
                            loadingMethod: value,
                            ['infoGroupThree[3].placeholder']: value,
                            handlePickerShow: false
                        })
                        break
                    case 777:
                        this.setData({
                            unloadingMode: value,
                            ['infoGroupThree[4].placeholder']: value,
                            handlePickerShow: false
                        })
                        break
                    case 101:
                        this.setData({
                            deliveryGoods: value,
                            ['infoGroupTwo[5].placeholder']: value,
                            handlePickerShow: false
                        })
                        break;
                    case 202:
                        this.setData({
                            warehouse: value,
                            ['infoGroupThree[2].placeholder']: value,
                            handlePickerShow: false
                        })
                        break;
                }
            }
        },
        //船舶类型
        frontDeskShipTypeList(id) {
            let page = 1;
            let rows = 10;
            let infoGroupTwo = this.data.infoGroupTwo;
            console.log(infoGroupTwo)
            mtWharf.frontDeskShipTypeList({
                page,
                rows
            }).then(res => {
                console.log(res)
                let rows = res.data.data.rows;
                let shipTypeList = rows.map(data => data.name);
                this.setData({
                    pickerList: shipTypeList,
                    pickerItemId: id,
                    pickerListRows: rows,
                    handlePickerInput: infoGroupTwo[4].value
                })
            })
        },
        // 货物交接
        theGoodsDelivery(id) {
            let pickerList = ['水路货物运单', '卸货实收数量', '包船商定数', '量方', '件数', '量水尺', '封舱（盖印/封条）'];
            let infoGroupTwo = this.data.infoGroupTwo;
            this.setData({
                pickerItemId: id,
                pickerList,
                handlePickerInput: infoGroupTwo[5].value
            })
        },
        //封仓要求
        storageRequirements(id) {
            let pickerList = ['雨布', '帆布', '灌装', '无']
            let infoGroupThree = this.data.infoGroupThree;
            this.setData({
                pickerItemId: id,
                pickerList,
                handlePickerInput: infoGroupThree[2].value
            })
        },
        //装货方式
        loadingMethod(id) {
            let pickerList = ['挖机', '汽车自卸', '传输带', '自卸船', '过驳', '岸吊'];
            let infoGroupThree = this.data.infoGroupThree;
            this.setData({
                pickerItemId: id,
                pickerList,
                handlePickerInput: infoGroupThree[3].value
            })
        },
        //卸货方式
        unloadingMode(id) {
            let pickerList = ['挖机', '汽车自卸', '传输带', '自卸船', '过驳', '岸吊'];
            let infoGroupThree = this.data.infoGroupThree;
            this.setData({
                pickerItemId: id,
                pickerList,
                handlePickerInput: infoGroupThree[4].value
            })
        },



        /**
         * 信息分组4
         */
        infoGroupFour(e) {
            console.log(e)
            this.setData({
                remarks: e.detail.value
            })
        },


        //添加按钮
        handleCargoRelease() {
            let params = {
                Authorization: wx.getStorageSync('Authorization'),
                nameGoodsId: this.data.nameGoodsId,
                number: this.data.number,
                portDepartureAddress: this.data.portDepartureAddress,
                portArrivalAddress: this.data.portArrivalAddress,
                loadingDate: this.data.loadingDate,
                freightRate: this.data.freightRate,
                freightAmount: this.data.freightAmount,
                // otherExpenses: this.data.otherExpenses,
                lagPeriodType: this.data.lagPeriodType,
                delayedLoading: this.data.delayedLoading,
                delayedDischarge: this.data.delayedDischarge,
                delayedCost: this.data.delayedCost,
                lagPeriodType: this.data.lagPeriodType,
                typeShip: this.data.typeShip,
                mtTypeShipId: this.data.mtTypeShipId,
                deliveryGoods: this.data.deliveryGoods,
                compensation: this.data.compensation,
                lossGoods: this.data.lossGoods,
                goodsDamages: this.data.goodsDamages,
                vesselMinimum: this.data.vesselMinimum,
                vesselMaximum: this.data.vesselMaximum,
                warehouse: this.data.warehouse,
                loadingMethod: this.data.loadingMethod,
                unloadingMode: this.data.unloadingMode,
                remarks: this.data.remarks
            }
            if (this.data.otherExpenses) {
                params.otherExpenses = this.data.otherExpenses
            }
            if (this.data.portDepartureId) {
                params.portDepartureId = this.data.portDepartureId
            }
            if (this.data.portArrivalId) {
                params.portArrivalId = this.data.portArrivalId
            }
            console.log(params)
            User.UserMtCargoSave(params).then(res => {
                console.log(res)
                if (res.data.state === 200) {
                    wx.showLoading({
                        title: '添加成功,请等待审核通过',
                    })
                    setTimeout(function () {
                        wx.hideLoading()
                        wx.navigateBack({
                            data: 1
                        })
                    }, 1000)

                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'loading'
                    })
                    this.setData({
                        visible: false
                    });
                }
            })

        },

        // //添加按钮
        // handleCargoRelease() {
        //     this.setData({
        //         visible: true
        //     });
        // },
        // handleconfirmButton(e) {
        //     console.log(e)
        //     let index = e.currentTarget.dataset.index;
        //     if (index === 0) {
        //         this.handNospecified()
        //     } else {
        //         this.handspecified()
        //     }
        // },
        // 不指定船东
        // handNospecified() {
        //     let params = {
        //         Authorization: wx.getStorageSync('Authorization'),
        //         nameGoodsId: this.data.nameGoodsId,
        //         number: this.data.number,
        //         portDepartureAddress: this.data.portDepartureAddress,
        //         portArrivalAddress: this.data.portArrivalAddress,
        //         loadingDate: this.data.loadingDate,
        //         freightRate: this.data.freightRate,
        //         freightAmount: this.data.freightAmount,
        //         otherExpenses: this.data.otherExpenses,
        //         lagPeriodType: this.data.lagPeriodType,
        //         delayedLoading: this.data.delayedLoading,
        //         delayedDischarge: this.data.delayedDischarge,
        //         delayedCost: this.data.delayedCost,
        //         lagPeriodType: this.data.lagPeriodType,
        //         typeShip: this.data.typeShip,
        //         mtTypeShipId: this.data.mtTypeShipId,
        //         deliveryGoods: this.data.deliveryGoods,
        //         compensation: this.data.compensation,
        //         lossGoods: this.data.lossGoods,
        //         goodsDamages: this.data.goodsDamages,
        //         vesselMinimum: this.data.vesselMinimum,
        //         vesselMaximum: this.data.vesselMaximum,
        //         warehouse: this.data.warehouse,
        //         loadingMethod: this.data.loadingMethod,
        //         unloadingMode: this.data.unloadingMode,
        //         remarks: this.data.remarks
        //     }
        //     if (this.data.portDepartureId) {
        //         params.portDepartureId = this.data.portDepartureId
        //     }
        //     if (this.data.portArrivalId) {
        //         params.portArrivalId = this.data.portArrivalId
        //     }
        //     console.log(params)
        //     User.UserMtCargoSave(params).then(res => {
        //         console.log(res)
        //         if (res.data.state === 200) {
        //             wx.showLoading({
        //                 title: '添加成功,请等待审核通过',
        //             })
        //             setTimeout(function () {
        //                 wx.hideLoading()
        //                 wx.navigateBack({
        //                     data: 1
        //                 })
        //             }, 1000)

        //         } else {
        //             wx.showToast({
        //                 title: res.data.message,
        //                 icon: 'loading'
        //             })
        //             this.setData({
        //                 visible: false
        //             });
        //         }
        //     })

        // },
        // // 指定船东
        // handspecified() {
        //     this.setData({
        //         visible: false,
        //     })
        //     wx.navigateTo({
        //         url: '/views/UserSpecifiedShip/UserSpecifiedShip',
        //     })
        // }
    }
})