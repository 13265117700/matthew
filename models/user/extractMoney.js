import request from '../request/request';
import api from '../request/api';

export default {
    //用户提现申请
    UserExtractMoneyApply: function (data) {
        return request.post(api.UserExtractMoneyApply, data)
    },
    //用户提现列表
    UserExtractMoneyList: function (data) {
        return request.get(api.UserExtractMoneyList, data)
    },
    //用户提现详情
    UserExtractMoneyItem: function (data) {
        return request.get(api.UserExtractMoneyItem, data)
    }
}