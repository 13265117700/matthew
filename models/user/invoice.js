import request from '../request/request';
import api from '../request/api';

export default {
    //用户发票申请
    UserInvoiceApply: function (data) {
        return request.post(api.UserInvoiceApply, data)
    }
}