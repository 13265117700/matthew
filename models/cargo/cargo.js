import request from '../request/request';
import api from '../request/api';

export default {
    mtNameGoodsFriends:function(data){
        return request.get(api.mtNameGoodsFriends, data)
    }
}