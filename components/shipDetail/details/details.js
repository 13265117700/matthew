import User from '../../../models/user/user';
import mtWharf from "../../../models/frontEnd/mtWharf";



Component({
    properties: {
        porID: Number
    },
    lifetimes: {
        ready: function () {
            this.getUserInfo();
        }
    },
    data: {
        detail: {},
        btn: [{
            id: 1,
            title: '发起聊天',
            background: '#FF7038',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: false
        }, {
            id: 2,
            title: '选择船东承运',
            background: '#FF3C07',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: false
        }, {
            id: 3,
            icon: 'https://img.gdmatt.com/images/2021/01/14/16106173690245366.png',
            title: '投诉',
            background: '#FFFFFF',
            color: '#999999',
            family: 'PingFang-SC-Medium',
            weight: 'Medium',
            width: '89.5px',
            size: '12px',
            show: true
        }, {
            id: 4,
            title: '发起聊天',
            background: '#FF7038',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: true
        }, {
            id: 5,
            title: '选择船东承运',
            background: '#FF3C07',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: true
        }]
    },
    methods: {
        getUserInfo() {
            let Authorization = wx.getStorageSync('Authorization');
            let uId = '';
            let params = {
                Authorization,
                uId
            };

            User.userInfo(params).then(res => {
                let rows = res.data.data;
                this.getShipInfo(rows)
            })
        },
        //获取船期信息
        getShipInfo(user) {
            console.log(user)
            let id = this.properties.porID;
            mtWharf.frontDeskShipPeriodItem({
                id
            }).then(res => {
                let rows = res.data.data;

                let nowYears = new Date().getFullYear(); //当前年
                let years = new Date(parseInt(rows.mtShip.ageShip)).getFullYear(); //船创建的年份
                let nowMonth = new Date().getMonth(); //当前月
                let month = new Date(parseInt(rows.mtShip.ageShip)).getMonth(); //船创建的月份
                let nowDay = new Date().getDate(); //当前日
                let day = new Date(parseInt(rows.mtShip.ageShip)).getDate(); //船创建的日

                let age = nowYears - years;
                let ageMonth = nowMonth - month;
                if (age <= 0) {
                    if (ageMonth <= 0) {
                        rows.ageShip = nowDay - day + '天'
                    } else {
                        rows.ageShip = ageMonth + '月'
                    }
                } else {
                    rows.ageShip = age + '年'
                }

                console.log(rows)

                this.setData({
                    detail: rows
                })

            })
        }
    }
})