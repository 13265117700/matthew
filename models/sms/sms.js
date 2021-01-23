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
  },
  //修改密码验证码
  UserModifyPasswordSMS: function (data) {
    return request.post(api.UserModifyPasswordSMS, data)
  },
  //用户更换手机号验证码
  UserEditorPhoneSMS: function (data) {
    return request.post(api.UserEditorPhoneSMS, data)
  }
}