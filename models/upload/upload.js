import request from '../request/request';
import api from '../request/api';

export default{
    upload:function(data){
        return request.post(api.upload, data)
    }
}