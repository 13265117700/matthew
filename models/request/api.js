const PREFIX  = 'http://8.129.87.113:8005';
export default {
    // 微信登录
    wxLogin: `${PREFIX}/login/code`,
    
    imageUpload: `${PREFIX}/oss/file/upload`,//图片上传
    videoUpload: `${PREFIX}/oss/file/videoUpload`,//视频上传

    //用户信息
    userInfo: `${PREFIX}/user/information/mtUserIdS`,//用户查询
    mtShipownerUpdate:`${PREFIX}/user/information/mtShipownerUpdate`,//船东信息修改
    mtCargoOwnerUpdate:`${PREFIX}/user/information/mtCargoOwnerUpdate`,//货主信息修改
    mtOwnerUpdate:`${PREFIX}/user/information/mtOwnerUpdate`,//车主信息修改
    
    //船API
    myFriendsRequestFriends:`${PREFIX}/user/ship/myFriendsRequestFriends`,//用户船列表查询
    mtShipSave:`${PREFIX}/user/ship/mtShipSave`,//添加船舶
    findAll:`${PREFIX}/reception/mtWharf/findAll`,//码头列表
}