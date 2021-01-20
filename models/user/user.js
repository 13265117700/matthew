import request from '../request/request';
import api from '../request/api';

export default {
    //用户查询
    userInfo: function (data) {
        return request.get(api.userInfo, data)
    },



    //船东信息修改
    mtShipownerUpdate: function (data) {
        return request.post(api.mtShipownerUpdate, data)
    },
    //用户添加船舶
    UserShipAdd: function (data) {
        return request.post(api.UserShipAdd, data)
    },
    //用户船列表查询
    UserShipQuery: function (data) {
        return request.get(api.UserShipQuery, data)
    },
    //用户船信息查询
    UserShipInfoQuery: function (data) {
        return request.get(api.UserShipInfoQuery, data)
    },
    //用户船期发布
    UserShipPeriodAdd: function (data) {
        return request.post(api.UserShipPeriodAdd, data)
    },
    //用户船期列表
    UserShipPeriodList: function (data) {
        return request.get(api.UserShipPeriodList, data)
    },
    UserShipDateInfoQuery: function (data) {
        return request.get(api.UserShipDateInfoQuery, data)
    },
    //用户船期上下架
    UserShipPeriodOnUnderFrame: function (data) {
        return request.post(api.UserShipPeriodOnUnderFrame, data)
    },
    //用户船期删除
    UserShipPeriodDel: function (data) {
        return request.post(api.UserShipPeriodDel, data)
    },




    //用户船是否已关注
    UserShipWhetherFocusOn: function (data) {
        return request.get(api.UserShipWhetherFocusOn, data)
    },
    //用户船关注
    UserShipFocus: function (data) {
        return request.post(api.UserShipFocus, data)
    },
    //用户船取消关注
    UserShipCancelFocus: function (data) {
        return request.post(api.UserShipCancelFocus, data)
    },
    //船关注列表
    UserFocusShips: function (data) {
        return request.get(api.UserFocusShips, data)
    },





    //货主信息修改
    mtCargoOwnerUpdate: function (data) {
        return request.post(api.mtCargoOwnerUpdate, data)
    },
    //用户货源添加
    UserMtCargoSave: function (data) {
        return request.post(api.UserMtCargoSave, data)
    },
    //用户货源列表查询
    UserMtCargoQuery: function (data) {
        return request.get(api.UserMtCargoQuery, data)
    },
    //用户货源信息查询
    UserMtCargoQueryInfo: function (data) {
        return request.get(api.UserMtCargoQueryInfo, data)
    },
    //用户船货上下架
    UserCargoOnUnderFrame: function (data) {
        return request.post(api.UserCargoOnUnderFrame, data)
    },
    //用户货源修改
    UserCargoUpdate: function (data) {
        return request.post(api.UserCargoUpdate, data)
    },

    //用户货源是否已关注
    UserCargoFocusOn: function (data) {
        return request.get(api.UserCargoFocusOn, data)
    },
    //用户货源关注
    UserCargoFocus: function (data) {
        return request.post(api.UserCargoFocus, data)
    },
    //用户货源取消关注
    UserCargoCancelFocus: function (data) {
        return request.post(api.UserCargoCancelFocus, data)
    },
    //用户货关注列表
    UserFocusCargo: function (data) {
        return request.get(api.UserFocusCargo, data)
    },



    //车主信息修改
    mtOwnerUpdate: function (data) {
        return request.post(api.mtOwnerUpdate, data)
    },




    //船东\货主接单查询
    userAppointFriends: function (data) {
        return request.get(api.userAppointFriends, data)
    },
    //货主发起接单请求
    UserCargoOrderRequest: function (data) {
        return request.post(api.UserCargoOrderRequest, data)
    },
    //用户接单查询列表
    UserOrderQueryList: function (data) {
        return request.get(api.UserOrderQueryList, data)
    },
    //船用户订单同意或拒绝
    UserShipOrderAgreeOrRefused: function (data) {
        return request.post(api.UserShipOrderAgreeOrRefused, data)
    },
    //用户接单详情
    UserOrderDetails: function (data) {
        return request.get(api.UserOrderDetails, data)
    },

    //用户订单列表查询
    UserOrderListQuery: function (data) {
        return request.get(api.UserOrderListQuery, data)
    },
    //用户订单查询
    UserOrderQuery: function (data) {
        return request.get(api.UserOrderQuery, data)
    },
    //用户货主合同生成
    UserCargoOrderContractGenerate: function (data) {
        return request.post(api.UserCargoOrderContractGenerate, data)
    },
    //用户船东确认合同信息
    UserShipOrderConfirmContract: function (data) {
        return request.post(api.UserShipOrderConfirmContract, data)
    },
    //船东确认订单金额
    UserShipConfirmOrderMoney: function (data) {
        return request.post(api.UserShipConfirmOrderMoney, data)
    },
    //船东上传运输流程
    UserShipUploadProcess: function (data) {
        return request.post(api.UserShipUploadProcess, data)
    },
    //货主确认订单金额
    UserCargoConfirmOrderMoney: function (data) {
        return request.post(api.UserCargoConfirmOrderMoney, data)
    },





    //公司平台信息
    frontDeskDefaultCompany: function (data) {
        return request.get(api.frontDeskDefaultCompany, data)
    }
}