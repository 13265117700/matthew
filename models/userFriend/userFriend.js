import api from '../request/api';
import websocket from '../request/websocket';
import request from '../request/request';

export default{
      //用户好友列表
      UserFriendsListL:function(data){
        return request.get(api.UserFriendsListL, data)
    },
    //用户搜索好友
    UserFriendSearch:function(data){
        return request.get(api.UserFriendSearch, data)
    },
    //用户好友申请
    UserFriendRequest:function(data){
        return request.post(api.UserFriendRequest, data)
    },
    //用户好友申请列表
    UserFriendRequestList:function(data){
        return request.get(api.UserFriendRequestList, data)
    },
    UserFriendVerification:function(data){
        return request.post(api.UserFriendVerification, data)
    }
}