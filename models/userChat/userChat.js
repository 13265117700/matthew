import api from '../request/api';
import websocket from '../request/websocket';

export default{
    //用户好友聊天
    UserFriendChat:function(data){
        return websocket.get(api.UserFriendChat, data)
    }
}