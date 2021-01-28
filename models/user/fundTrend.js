import request from '../request/request';
import api from '../request/api';

export default {
    //资金流水列表
    UserFundTrendList: function (data) {
        return request.get(api.UserFundTrendList, data)
    }
}