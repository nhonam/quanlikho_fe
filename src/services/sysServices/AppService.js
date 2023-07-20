import axios from "axios";
import BaseService from "../BaseService";

class AppService extends BaseService {
    async GetByIdc(idc, params) {
        return axios.get(this.serviceUrl + "/GetByIdc/" + idc, { params })
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    async GetUserAuthResourceByAppPageIdc(params) {
        return axios
            .get(this.serviceUrl + "/GetUserAuthResourceByAppPageIdc", { params })
            .then(this.handleResponse)
            .catch(this.handleError);
    }
}
var service = new AppService({ endPoint: "Apps", noVersion: true });
export default service
