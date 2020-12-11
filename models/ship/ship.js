import request from '../request/request';
import api from '../request/api';

export default {
    myFriendsRequestFriends:function(data){
        return request.get(api.myFriendsRequestFriends, data)
    },
    mtShipSave:function(data){
        return request.post(api.mtShipSave, data)
    }
}