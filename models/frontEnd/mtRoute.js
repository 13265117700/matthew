import request from '../request/request';
import api from '../request/api';

export default {
    frontDeskRouteList: function (data) {
        return request.get(api.frontDeskRouteList, data)
    }
}