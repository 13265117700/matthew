import api from '../request/api';
import request from '../request/request';

export default{
    //用户维权申请
    UserActivistComplaint:function(data) {
        return request.post(api.UserActivistComplaint, data)
    }
}