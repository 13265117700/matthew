import request from '../request/request';
import api from '../request/api';

export default {
    //用户发票申请
    UserInvoiceApply: function (data) {
        return request.post(api.UserInvoiceApply, data)
    },
    //用户发票记录
    UserInvoiceRecord: function (data) {
        return request.get(api.UserInvoiceRecord, data)
    },
    //用户发票详情
    UserInvoiceDetail: function (data) {
        return request.get(api.UserInvoiceDetail, data)
    }
}