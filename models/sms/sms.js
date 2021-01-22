import request from '../request/request';
import api from '../request/api';

export default {
  UserSendsmsPhone: function (data) {
    return request.post(api.UserSendsmsPhone, data)
  }
}