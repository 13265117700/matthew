import request from '../request/request';
import api from '../request/api';

export default {
    //前端船类型查询
    frontDeskShipTypeList: function (data) {
        return request.get(api.frontDeskShipTypeList, data)
    },
    //前端货物名称查询
    frontDeskCargoList: function (data) {
        return request.get(api.frontDeskCargoList, data)
    },
    //前端码头分类
    frontDeskWharfList: function (data) {
        return request.get(api.frontDeskWharfList, data)
    },
    //前端船信息列表
    frontDeskShipList: function (data) {
        return request.get(api.frontDeskShipList, data)
    },
    //前端船期列表查询
    frontDeskShipPeriodList: function (data) {
        return request.get(api.frontDeskShipPeriodList, data)
    },
    //前端船期信息查询
    frontDeskShipPeriodItem: function (data) {
        return request.get(api.frontDeskShipPeriodItem, data)
    },
    //前端船信息查询
    frontDeskShipItem: function (data) {
        return request.get(api.frontDeskShipItem, data)
    },
    //前端货源列表
    frontDeskCargoFocusOn: function (data) {
        return request.get(api.frontDeskCargoFocusOn, data)
    },
    //前端货源详情
    frontDeskCargoDeatil: function (data) {
        return request.get(api.frontDeskCargoDeatil, data)
    },
}