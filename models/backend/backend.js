import request from '../request/request';
import api from '../request/api';

export default {
    backEndDefaultCompany: function (data) {
        return request.get(api.backEndDefaultCompany, data)
    }
}