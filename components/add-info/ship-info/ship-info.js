// components/my/user-admin/user-admin-info/user-admin-info.js
import upload from "../../../models/upload/upload";
import mtWharf from "../../../models/frontEnd/mtWharf";
import User from "../../../models/user/user";

Component({
    properties: {

    },

    data: {
        repeat:true,
        //信息分组1
        infoGroupOne: [{
            title: '船舶名称：',
            placeholder: '请输入船舶名称',
            type: 'input',
            maxlength: 100,
            arrow: false
        }, {
            title: '载货量A级：',
            placeholder: '请输入航区载货量',
            type: 'input',
            arrow: false,
            maxlength: 100,
            after: '吨'
        }, {
            title: '载货量B级：',
            placeholder: '请输入航区载货量',
            type: 'input',
            arrow: false,
            maxlength: 100,
            after: '吨'
        }, {
            title: 'AIS码：',
            placeholder: '请输入AIS码',
            type: 'input',
            maxlength: 9,
            arrow: false,
        }, {
            title: '船舶类型：',
            placeholder: '请选择船舶类型',
            type: 'default',
            arrow: true
        }, {
            title: '船长姓名：',
            placeholder: '请输入船长姓名',
            type: 'input',
            maxlength: 100,
            arrow: false
        }, {
            title: '船长电话：',
            placeholder: '请输入船长联系方式',
            type: 'input',
            maxlength: 11,
            arrow: false
        }],
        //信息分组2
        infoGroupTwo: [{
            title: '封仓设备：',
            placeholder: '请选择封仓设备',
            rangeKey: 'label',
            mode: 'selector',
            type: 'default',
            arrow: true
        }, {
            title: '船龄：',
            placeholder: '请选择船舶建造日期',
            type: 'picker',
            mode: 'date',
            arrow: true
        }, {
            title: '船籍港:',
            placeholder: '请输入船籍港',
            type: 'input',
            arrow: false
        }, {
            title: '船总吨位：',
            placeholder: '请输入船总吨位',
            type: 'input',
            arrow: false
        }, {
            title: '船总长：',
            placeholder: '请输入船总长',
            type: 'input',
            arrow: false
        }, {
            title: '船总宽:',
            placeholder: '请输入船总宽',
            type: 'input',
            arrow: false
        }, {
            title: '船总高：',
            placeholder: '请输入最大船高',
            type: 'input',
            arrow: false
        }, {
            title: '满载吃水：',
            placeholder: '请输入满载吃水',
            type: 'input',
            arrow: false
        }, {
            title: '型深:',
            placeholder: '请输入型深',
            type: 'input',
            arrow: false
        }, {
            title: '监控装备：',
            placeholder: '请选择监控装备',
            list: [{
                type: 0,
                label: '无'
            }, {
                type: 1,
                label: '有'
            }],
            rangeKey: 'label',
            type: 'picker',
            mode: 'selector',
            arrow: true
        }, {
            title: '船舶保险:',
            placeholder: '请选择船舶保险',
            list: [{
                type: 0,
                label: '无'
            }, {
                type: 1,
                label: '有'
            }],
            rangeKey: 'label',
            type: 'picker',
            mode: 'selector',
            arrow: true
        }, {
            title: '自卸设备:',
            placeholder: '请选择自卸设备',
            list: [{
                type: 0,
                label: '无'
            }, {
                type: 1,
                label: '有'
            }],
            rangeKey: 'label',
            type: 'picker',
            mode: 'selector',
            arrow: true
        }, {
            title: '可拉货物：',
            placeholder: '请选择可拉货物',
            list: [{
                type: 1,
                label: '水果'
            }, {
                type: 2,
                label: '衣服'
            }, {
                type: 3,
                label: '生鲜'
            }],
            rangeKey: 'label',
            type: 'default',
            mode: 'selector',
            arrow: true
        }],

        fullScreen: false, //视频是否播放
        shipTypeShow: false, //船类型弹出层
        shipSealShow: false, //封仓设备弹出层
        shipCargoShow: false, //可拉货物弹出层

        typeList: ['自卸水泥船', '油船', '液化气船', '散装水泥船', '谷物船'], // 船类型列表
        typeRows: [],
        sealList: ['雨布', '帆布', '灌装', '无'], //封仓设备列表
        video: [],
        //可拉货复选框列表
        checkboxList: [{
            id: 1,
            name: '煤炭'
        }, {
            id: 2,
            name: '石子'
        }, {
            id: 3,
            name: '沙'
        }, {
            id: 4,
            name: '玉米'
        }, {
            id: '5',
            name: '钢筋'
        }, {
            id: 6,
            name: '大米'
        }],



        shipTypeInput: null, //船类型input值
        sealInput: null, //封仓设备input值

        nameVessel: '', // 船名称
        ladenA: '', //船区载货量A级
        ladenB: '', //船区载货量B级
        ais: '', //AIS码
        typeShip: '', //船舶类型
        captainName: '', //船长姓名
        captainPhone: '', //船长电话
        corporateId: '', // 身份证正面
        backViewIdCard: '', // 身份证反面
        captainFeatures: [], //船长特征
        mainItemsShip: [], //船舶主要项目
        aisCertificate: '', // AIS证书
        hanoiCertificate: '', // 内河证书
        operationCertificate: '', // 船运营证书
        annualCertificate: '', // 船年审证书
        certificateInspection: [], // 船检验证书
        closure: '', //封仓设备
        ageShip: '', //船龄
        membership: '', //船籍
        tonnage: '', //船总吨位数
        chief: '', //船总长
        breadth: '', //船宽
        shipHeight: '', //船高
        typeDepth: '', //吃水
        depthProfile: '', //型深
        monitoring: '', //监控设备
        insurance: '', //船舶保险
        kola: [], //可拉货物
        shipChart: [], //船图
        shipVideo: '', //船视频
        typeShiId: null, //类型ID
        dump: null,
    },

    lifetimes: {
        attached: function () {
            this.frontDeskShipTypeList()
        }
    },
    methods: {
        //获取船舶类型
        frontDeskShipTypeList() {
            let page = 1;
            let rows = 10;
            mtWharf.frontDeskShipTypeList({
                page,
                rows
            }).then(res => {
                console.log(res)
                let rows = res.data.data.rows;
                let typeList = rows.map(data => data.name);
                console.log(typeList)
                this.setData({
                    typeList,
                    typeRows: rows
                })
                console.log(this.data.typeRows)
            })
        },
        // 关闭弹出层
        onClose() {
            this.setData({
                shipTypeShow: false,
                shipSealShow: false,
                shipCargoShow: false
            })
        },

        // 信息分组1输入框
        infoGroupOneInput(e) {
            let dataset = e.currentTarget.dataset;
            let index = dataset.index;
            let value = e.detail.value;
            switch (index) {
                case 0:
                    this.setData({
                        nameVessel: value
                    })
                    break
                case 1:
                    this.setData({
                        ladenA: value
                    })
                    break
                case 2:
                    this.setData({
                        ladenB: value
                    })
                    break
                case 3:
                    console.log(value)
                    let AISlength = value.split("").length;
                    console.log(AISlength)
                    if (AISlength >= 9) {
                        wx.showToast({
                            title: '最长输入9个字符串',
                        })
                    }
                    this.setData({
                        ais: value
                    })
                    break
                case 5:
                    this.setData({
                        captainName: value
                    })
                    break
                case 6:
                    let PhoneLength = value.split("").length;
                    console.log(PhoneLength)
                    if (PhoneLength >= 11) {
                        wx.showToast({
                            title: '最长输入11个字符串',
                        })
                    }
                    this.setData({
                        captainPhone: value
                    })
                    break
            }
        },

        //船类型打开弹出层
        handShipTypeChoose() {
            this.setData({
                shipTypeShow: true
            })
        },
        //输入船类型
        addShipType(e) {
            this.setData({
                shipTypeInput: e.detail
            })
        },
        handleType(e) {
            console.log(e)
            let typeRows = this.data.typeRows;
            let index = e.detail.index;
            let shipTypeInput = this.data.shipTypeInput;
            let typeShiId = typeRows[index].id;
            console.log(typeShiId)
            if (shipTypeInput != null && shipTypeInput != '') {
                console.log('input有值')
                this.setData({
                    typeShip: shipTypeInput,
                    ["infoGroupOne[4].placeholder"]: shipTypeInput,
                    typeShiId,
                    shipTypeShow: false
                })
            } else {
                console.log('input没有值')
                this.setData({
                    typeShip: e.detail.value,
                    ["infoGroupOne[4].placeholder"]: e.detail.value,
                    typeShiId,
                    shipTypeShow: false
                })
            }
        },


        handleOpenImg(e) {
            let url = e.currentTarget.dataset.url;
            wx.previewImage({
                current: url,
                urls: [url]
            })
        },

        // 身份证正面
        justAfterRead() {
            upload.upload.chooseImage().then(res => {
                console.log(res)
                wx.getImageInfo({
                    src: res,
                    success: (img) => {
                        console.log(img)
                    }
                })
                this.setData({
                    corporateId: res
                })
            })
        },


        // 身份证反面
        backAfterRead() {
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    backViewIdCard: res
                })
            })
        },


        //船长特征
        handTrait(event) {
            const {
                file
            } = event.detail;
            let filePath = file.url;
            upload.upload.uploadFile(filePath).then(res => {
                console.log(res)
                let captainFeatures = this.data.captainFeatures;
                captainFeatures.push({
                    url: res
                })
                console.log(captainFeatures)
                this.setData({
                    captainFeatures
                })
            })
        },
        //删除船长特征图片
        captainFeaturesDel(e) {
            let index = e.detail.index;
            let captainFeatures = this.data.captainFeatures;
            captainFeatures.splice(index, 1)
            this.setData({
                captainFeatures
            })
        },

        //上传船舶主要项目
        handProject(event) {
            const {
                file
            } = event.detail;
            let filePath = file.url;
            upload.upload.uploadFile(filePath).then(res => {
                console.log(res)
                let mainItemsShip = this.data.mainItemsShip;
                mainItemsShip.push({
                    url: res
                })
                console.log(mainItemsShip)
                this.setData({
                    mainItemsShip
                })
            })
        },
        //删除船舶项目图片
        mainItemsShipDel(e) {
            console.log(e)
            let index = e.detail.index;
            let mainItemsShip = this.data.mainItemsShip;
            console.log(mainItemsShip)
            mainItemsShip.splice(index, 1)
            this.setData({
                mainItemsShip
            })
        },

        // AIS证书上传
        aisUpload() {
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    aisCertificate: res
                })
            })
        },


        //河内证书上传
        hanoiCertificateUpload() {
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    hanoiCertificate: res
                })
            })
        },

        // 船运营证书
        handleOperationCertificate() {
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    operationCertificate: res
                })
            })
        },


        //船年审证书
        handleAnnualCertificate() {
            console.log(123123)
            upload.upload.chooseImage().then(res => {
                console.log(res)
                this.setData({
                    annualCertificate: res
                })
            })
        },


        // 船检验证书
        handcertificateInspection(event) {
            const {
                file
            } = event.detail;
            let filePath = file.url;
            upload.upload.uploadFile(filePath).then(res => {
                console.log(res)
                let certificateInspection = this.data.certificateInspection;
                certificateInspection.push({
                    url: res
                })
                console.log(certificateInspection)
                this.setData({
                    certificateInspection
                })
            })
        },
        //删除船舶检验证书
        certificateInspectionDel(e) {
            let index = e.detail.index;
            let certificateInspection = this.data.certificateInspection;
            certificateInspection.splice(index, 1)
            this.setData({
                certificateInspection
            })
        },


        //信息分组2输入框
        infoGroupTwoInput(e) {
            let dataset = e.currentTarget.dataset;
            let index = dataset.index;
            let value = e.detail.value;
            switch (index) {
                case 2:
                    this.setData({
                        membership: value
                    })
                    break
                case 3:
                    this.setData({
                        tonnage: value
                    })
                    break
                case 4:
                    this.setData({
                        chief: value
                    })
                    break
                case 5:
                    this.setData({
                        breadth: value
                    })
                    break
                case 6:
                    this.setData({
                        shipHeight: value
                    })
                    break
                case 7:
                    this.setData({
                        typeDepth: value
                    })
                    break
                case 8:
                    this.setData({
                        depthProfile: value
                    })
                    break
            }
        },
        //信息分组2普通选择框
        infoGroupTwoDropDown(e) {
            console.log(e)
            let dataset = e.currentTarget.dataset;
            let index = dataset.index;
            let infoGroupTwo = this.data.infoGroupTwo;
            let liseIndex = e.detail.value;

            if (index != 1) {
                let value = infoGroupTwo[index].list[liseIndex].label;
                this.setData({
                    [`infoGroupTwo[${index}].placeholder`]: value
                })
            } else {
                console.log(liseIndex)
                let arr = liseIndex.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if (arr == null) return false;
                let array = new Date(arr[1], arr[3] - 1, arr[4]);
                if (array.getFullYear() == arr[1] && (array.getMonth() + 1) == arr[3] && array.getDate() == arr[4]) {
                    let years = new Date().getFullYear();
                    let age = years - arr[1];
                    if (age <= 0) {
                        let month = new Date().getMonth();
                        let ageMonth = month - arr[3]
                        this.setData({
                            [`infoGroupTwo[${index}].placeholder`]: ageMonth + '月'
                        })
                    } else {
                        this.setData({
                            [`infoGroupTwo[${index}].placeholder`]: age + '年'
                        })
                    }
                }

            }

            switch (index) {
                case 1:
                    console.log(new Date(liseIndex).getTime())
                    this.setData({
                        ageShip: new Date(liseIndex).getTime()
                    })
                    break
                case 9:
                    // let monitoring = infoGroupTwo[index].list[liseIndex].label;
                    this.setData({
                        monitoring: e.detail.value
                    })
                    break
                case 10:
                    // let insurance = infoGroupTwo[index].list[liseIndex].label;
                    this.setData({
                        insurance: e.detail.value
                    })
                    break
                case 11:
                    this.setData({
                        dump: e.detail.value,
                    })
                    break
            }
        },
        //信息分组2弹出层
        infoGroupTwoChoose(e) {
            console.log(e)
            let index = e.currentTarget.dataset.index;
            if (index === 0) {
                this.setData({
                    shipSealShow: true
                })
            } else {
                this.setData({
                    shipCargoShow: true
                })
            }
        },

        //输入封仓
        addShipSeal(e) {
            console.log(e)
            this.setData({
                sealInput: e.detail
            })
        },
        handShipSealConfirm(e) {
            console.log(e)
            let value = e.detail.value;
            let sealInput = this.data.sealInput;

            if (sealInput != null && sealInput != '') {
                console.log('input有值')
                this.setData({
                    closure: sealInput,
                    ["infoGroupTwo[0].placeholder"]: sealInput
                })
            } else {
                console.log('input没有值')
                this.setData({
                    closure: value,
                    ["infoGroupTwo[0].placeholder"]: value
                })
            }

            this.setData({
                shipSealShow: false
            })
        },


        //可拉货物
        onChange(event) {
            console.log(event)
            this.setData({
                kola: event.detail,
                ["infoGroupTwo[12].placeholder"]: event.detail
            });
        },
        handShipCargoConfirm() {
            let kola = this.data.kola;
            if (kola != null && kola != '') {
                this.setData({
                    shipCargoShow: false
                })
            } else {
                console.log('请选择货物')
            }
        },


        //船图片
        handShipChartUpload(event) {
            const {
                file
            } = event.detail;
            let filePath = file.url;
            upload.upload.uploadFile(filePath).then(res => {
                console.log(res)
                let shipChart = this.data.shipChart;
                shipChart.push({
                    url: res
                })
                console.log(shipChart)
                this.setData({
                    shipChart
                })
            })
        },
        //删除船图片
        shipChartDel(e) {
            let index = e.detail.index;
            let shipChart = this.data.shipChart;
            shipChart.splice(index, 1)
            this.setData({
                shipChart
            })
        },

        //船视频
        handleVideo() {
            console.log('添加船视频')
            upload.upload.chooseVideo().then(res => {
                console.log(res)
                this.setData({
                    video: res,
                    shipVideo: res.name
                })
            })
        },

        handleSubmit() {
            let repeat = this.data.repeat;
            let captainFeatures = [...(this.data.captainFeatures.map(data => data.url))];
            let mainItemsShip = [...(this.data.mainItemsShip.map(data => data.url))];
            let certificateInspection = [...(this.data.certificateInspection.map(data => data.url))];
            let shipChart = [...(this.data.shipChart.map(data => data.url))];

            let params = {
                Authorization: wx.getStorageSync('Authorization'),
                nameVessel: this.data.nameVessel,
                ladenA: this.data.ladenA,
                ladenB: this.data.ladenB,
                ais: this.data.ais,
                // typeShip: this.data.typeShip,
                captainName: this.data.captainName,
                captainPhone: this.data.captainPhone,
                corporateId: this.data.corporateId,
                backViewIdCard: this.data.backViewIdCard,
                captainFeatures: captainFeatures.toString(),
                mainItemsShip: mainItemsShip.toString(),
                aisCertificate: this.data.aisCertificate,
                hanoiCertificate: this.data.hanoiCertificate,
                operationCertificate: this.data.operationCertificate,
                annualCertificate: this.data.annualCertificate,
                certificateInspection: certificateInspection.toString(),
                closure: this.data.closure,
                ageShip: this.data.ageShip,
                membership: this.data.membership,
                tonnage: this.data.tonnage,
                chief: this.data.chief,
                breadth: this.data.breadth,
                shipHeight: this.data.shipHeight,
                typeDepth: this.data.typeDepth,
                depthProfile: this.data.depthProfile,
                monitoring: this.data.monitoring,
                insurance: this.data.insurance,
                kola: this.data.kola.toString(),
                shipChart: shipChart.toString(),
                shipVideo: this.data.shipVideo,
                typeShiId: this.data.typeShiId,
                dump: this.data.dump
            }

            if (
                !this.data.nameVessel ||
                !this.data.ladenA ||
                !this.data.ladenB ||
                !this.data.ais ||
                // !this.data.typeShip ||
                !this.data.captainName ||
                !this.data.captainPhone ||
                !this.data.corporateId ||
                !this.data.backViewIdCard ||
                !this.data.captainFeatures ||
                !this.data.mainItemsShip ||
                !this.data.aisCertificate ||
                !this.data.hanoiCertificate ||
                !this.data.operationCertificate ||
                !this.data.annualCertificate ||
                !this.data.certificateInspection ||
                !this.data.closure ||
                !this.data.ageShip ||
                !this.data.membership ||
                !this.data.tonnage ||
                !this.data.chief ||
                !this.data.breadth ||
                !this.data.shipHeight ||
                !this.data.typeDepth ||
                !this.data.depthProfile ||
                !this.data.monitoring ||
                !this.data.insurance ||
                !this.data.kola ||
                !this.data.shipChart ||
                !this.data.shipVideo
            ) {
                wx.showLoading({
                    title: '请认真填写所有必填项',
                })
                setTimeout(function () {
                    wx.hideLoading()
                }, 2000)
                return
            }
            console.log(repeat)
            if (repeat) {
                this.setData({
                    repeat:false
                })
            } else {
                wx.showToast({
                  title: '正在为您添加船舶,不要着急',
                  icon:'none'
                })
                return
            }
            
            User.UserShipAdd(params).then(res => {
                console.log(res)
                if (res.data.state == 200) {
                    wx.showLoading({
                        title: '添加成功',
                    })
                    setTimeout(function () {
                        wx.hideLoading();
                        wx.navigateBack({
                            delta: 1,
                        })
                    }, 1000)
                } else {
                    this.setData({
                        repeat:true
                    })
                    wx.showToast({
                        title: '服务器出错',
                    })
                }
            })

        }
    }
})