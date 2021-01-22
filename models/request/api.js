const PREFIX = 'https://api.gdmatt.com';
const ADMIN = 'http://8.129.87.113:8005';
const WebSocket = 'ws://chat.gdmatt.com';
export default {
    UserFriendChat: `${WebSocket}/ws`, //websocket连接通信

    //登录API
    passwordLogin: `${PREFIX}/login`, //密码登录
    wxLogin: `${PREFIX}/login/code`, // 微信登录

    //上传API
    imageUpload: `${PREFIX}/oss/file/upload`, //图片上传
    videoUpload: `${PREFIX}/oss/file/videoUpload`, //视频上传

    //用户API
    userInfo: `${PREFIX}/user/information/mtUserIdS`, //用户查询
    userPreference:`${PREFIX}/user/information/upperPreference`,//用户偏好设置
    userInvoiceAdd:`${PREFIX}/user/information/updateUserInvoice`,//用户添加发票


    // 用户船API
    mtShipownerUpdate: `${PREFIX}/user/information/mtShipownerUpdate`, //船东信息修改
    UserShipAdd: `${PREFIX}/user/ship/mtShipSave`, //用户添加船舶
    UserShipQuery: `${PREFIX}/user/ship/myFriendsRequestFriends`, //用户船列表查询   
    UserShipInfoQuery: `${PREFIX}/user/ship/findByShipId`, //用户船信息查询
    UserShipPeriodAdd: `${PREFIX}/user/releaseShipSource/saveReleaseShipSource`, //用户船期发布
    UserShipPeriodList: `${PREFIX}/user/releaseShipSource/releaseShipSourceFriends`, //用户船期列表
    UserShipDateInfoQuery: `${PREFIX}/user/releaseShipSource/findByReleaseShipSourceId`, //用户船期详情
    UserShipPeriodOnUnderFrame: `${PREFIX}/user/releaseShipSource/upAndDownUpdate`, //用户船期上下架
    UserShipPeriodDel: `${PREFIX}/user/releaseShipSource/deleteDownUpdate`, //用户船期删除

    //用户船关注管理
    UserShipWhetherFocusOn: `${PREFIX}/user/focusShips/shipYouConcerned`, //查询船是否已关注
    UserShipFocus: `${PREFIX}/user/focusShips/mtFocusShipsSave`, //用户船关注
    UserShipCancelFocus: `${PREFIX}/user/focusShips/delete`, //用户船取消关注
    UserFocusShips: `${PREFIX}/user/focusShips/focusShipsFindAll`, //关注列表查询



    // 用户货API
    mtCargoOwnerUpdate: `${PREFIX}/user/information/mtCargoOwnerUpdate`, //货主信息修改
    UserMtCargoSave: `${PREFIX}/user/cargo/mtCargoSave`, //用户货源添加
    UserMtCargoQuery: `${PREFIX}/user/cargo/mtCargoFriends`, //用户货源列表查询
    UserMtCargoQueryInfo: `${PREFIX}/user/cargo/findByCargoId`, //用户货源信息查询
    UserCargoOnUnderFrame: `${PREFIX}/user/cargo/upAndDownUpdate`, //用户货源上下架
    UserCargoUpdate: `${PREFIX}/user/cargo/mtCargoUpdate`, //用户货源修改

    //用户货关注API
    UserCargoFocusOn: `${PREFIX}/user/focusCargo/cargoYouConcerned`, //用户货源是否已关注
    UserCargoFocus: `${PREFIX}/user/focusCargo/focusCargoSave`, //用户货源关注
    UserCargoCancelFocus: `${PREFIX}/user/focusCargo/delete`, //用户货源取消关注
    UserFocusCargo: `${PREFIX}/user/focusCargo/focusCargoFindAll`, //用户货关注列表


    //用户车API
    mtOwnerUpdate: `${PREFIX}/user/information/mtOwnerUpdate`, //车主信息修改


    // 用户好友API
    UserFriendsListL: `${PREFIX}/user/friend/myFriendFriends`, //用户好友列表
    UserFriendSearch: `${PREFIX}/user/friend/searchFriends`, //用户好友搜索
    UserFriendRequest: `${PREFIX}/user/friend/friendApplication`, //用户好友申请
    UserFriendRequestList: `${PREFIX}/user/friend/myFriendsRequestFriends`, //用户好友申请列表
    UserFriendVerification: `${PREFIX}/user/friend/agreeOrRefuse`, //用户好友验证
    UserFriendChatMsg: `${PREFIX}/user/mtChatMsg/informationNotSignedByUsers`, //查询用户未签收的信息


    //用户订单API
    UserCargoOrderRequest: `${PREFIX}/user/appoint/saveAppoint`, //货主发起接单请求
    userAppointFriends: `${PREFIX}/user/appoint/appointFriends`, //船东\货主接单查询
    UserOrderQueryList: `${PREFIX}/user/appoint/appointFriends`, //用户接单查询列表
    UserShipOrderAgreeOrRefused: `${PREFIX}/user/appoint/agreeToRefuse`, //船用户订单同意或拒绝
    UserOrderDetails: `${PREFIX}/user/appoint/findByAppointId`, //用户接单详情
    UserOrderListQuery: `${PREFIX}/user/shippingOrder/mtShippingOrderFindAll`, //用户订单列表查询
    UserOrderQuery: `${PREFIX}/user/shippingOrder/userFindByShippingOrderId`, //用户订单查询
    UserCargoOrderContractGenerate: `${PREFIX}/user/shippingOrder/cargoContract`, //用户货主合同生成
    UserShipOrderConfirmContract: `${PREFIX}/user/shippingOrder/shipContract`, //用户船东确认合同信息
    UserShipConfirmOrderMoney: `${PREFIX}/user/shippingOrder/shipConfirmationAmount`, //船东确认订单金额
    UserShipUploadProcess: `${PREFIX}/user/shippingOrder/transportationProcess`, //船东上传运输流程
    UserCargoConfirmOrderMoney: `${PREFIX}/user/shippingOrder/cargoConfirmationAmount`, //货主确认订单金额



    //用户维权管理
    UserActivistComplaint: `${PREFIX}/user/rightsProtection/rightsProtectionSave`, //用户维权申请



    //前端API
    frontDeskShipTypeList: `${PREFIX}/reception/mtTypeShip/mtNameGoodsFriends`, //船类型列表
    frontDeskCargoList: `${PREFIX}/reception/mtNameGoods/mtNameGoodsFriends`, //货物名列表
    frontDeskCargoDeatil: `${PREFIX}/reception/cargo/findByCargoId`, //前端货源详情
    frontDeskShipPeriodList: `${PREFIX}/reception/releaseShipSource/releaseShipSourceFriends`, //船期列表
    frontDeskShipPeriodItem: `${PREFIX}/reception/releaseShipSource/findByReleaseShipSourceId`, //前端船期信息查询
    frontDeskWharfList: `${PREFIX}/reception/mtWharf/findAll`, //码头列表查询
    frontDeskShipList: `${PREFIX}/reception/ship/myFriendsRequestFriends`, //船信息列表
    frontDeskShipItem: `${PREFIX}/reception/ship/findByShipId`, //船信息查询
    frontDeskDefaultCompany: `${PREFIX}/reception/information/findByAcquiescence`, //平台公司信息
    frontDeskCargoFocusOn: `${PREFIX}/reception/cargo/mtCargoFriends`, //前端获取货源列表
    frontDeskRouteList:`${PREFIX}/reception/mtRoute/mtRouteFriends`,//前端航线查询

}