import request from '../request/request';
import api from '../request/api';

export default {
    //前端船类型查询
    frontDeskShipTypeList:function(data){
        return request.get(api.frontDeskShipTypeList, data)
    },
    //前端货物名称查询
    frontDeskCargoList:function(data){
        return request.get(api.frontDeskCargoList, data)
    },
    //前端码头分类
    frontDeskWharfList:function(data){
        return request.get(api.frontDeskWharfList, data)
    },
    //船信息列表
    frontDeskShipList:function(data){
        return request.get(api.frontDeskShipList, data)
    },
    //用户船期列表查询
    frontDeskShipPeriodList:function(data){
        return request.get(api.frontDeskShipPeriodList, data)
    }
}