const PREFIX  = 'http://8.129.87.113:8005';
export default {
    // 微信登录
    wxLogin: `${PREFIX}/login/code`,
    //图片上传
    upload: `${PREFIX}/oss/file/upload`,

    //用户信息
    userInfo: `${PREFIX}/user/information/mtUserIdS`,
    mtShipownerUpdate:`${PREFIX}/user/information/mtShipownerUpdate`,//船东信息修改
    mtCargoOwnerUpdate:`${PREFIX}/user/information/mtCargoOwnerUpdate`,//货主信息修改
    mtOwnerUpdate:`${PREFIX}/user/information/mtOwnerUpdate`,//车主信息修改
    
}