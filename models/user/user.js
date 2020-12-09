import request from '../request/request';
import api from '../request/api';

export default{
    userInfo:function(data){
        return request.get(api.userInfo, data)
    },
    mtShipownerUpdate:function(data){
        return request.post(api.mtShipownerUpdate, data)
    },
    mtCargoOwnerUpdate:function(data){
        return request.post(api.mtCargoOwnerUpdate, data)
    },
    mtOwnerUpdate:function(data){
        return request.post(api.mtOwnerUpdate, data)
    }
}