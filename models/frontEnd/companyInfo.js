import request from '../request/request';
import api from '../request/api';

export default {
    //公司平台信息
    frontDeskDefaultCompany: function (data) {
        return request.get(api.frontDeskDefaultCompany, data)
    }
}