import request from '../request/request';
import api from '../request/api';

export default {
  //用户手机认证短信验证码
  UserSendsmsPhone: function (data) {
    return request.post(api.UserSendsmsPhone, data)
  },
  //用户忘记密码验证码
  UserForgetPasswordSMS: function (data) {
    return request.post(api.UserForgetPasswordSMS, data)
  }
}