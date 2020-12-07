import request from '../request/request';
import api from '../request/api';

export default{
    userInfo:function(data){
        return request.get(api.userInfo, data)
    }
}