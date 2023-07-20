import BaseService from "../BaseService";
import axios from "axios";
import { AuthenticateActions } from "src/actions";

class UserService extends BaseService {
    // authentication Api
    async Login(data) {
        console.log(this);
        return axios
            .post(this.serviceUrl + "/login", data)
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    async VerifyLogin(params) {
        return axios
            .get(this.serviceUrl + "/verify", { params })
            // .then(this.handleResponse)
            .then(res => {
                
                if (res.status === 401 || res.status === 400) {
                    AuthenticateActions.RemoveAuth()
                    return AuthenticateActions.redirectToSSO(true)
                }
                return res
            })
            .catch(this.handleError);
    };
    // user Api
    async GetByName(params) {
        return axios
            .get(`${this.serviceUrl}/GetByName/${params}`)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async GetRoleById(id, params) {
        return axios
            .get(`${this.serviceUrl}/GetRoleById/${id}`, { params })
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async GetByRoleIdc(id, params) {
        return axios
            .get(`${this.serviceUrl}/GetByRoleIdc/${id}`, { params })
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async UpdateRoleById(id, arrRole) {
        return axios
            .put(`${this.serviceUrl}/GetRoleById/${id}`, arrRole)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async UpdateRangeByRoleIdc(idc, arrUser) {
        return axios
            .put(`${this.serviceUrl}/UpdateRangeByRoleIdc/${idc}`, arrUser)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async UpdateInformation(id, item, options) {
        if (options?.isFormData) item = this.createFormData(item)
        return axios
            .put(`${this.serviceUrl}/UpdateInformation/${id}`, item)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async UpdatePassword(item) {
        return axios
            .put(`${this.serviceUrl}/UpdatePassword`, item)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async ResetPasswordList(item) {
        return axios
            .put(`${this.serviceUrl}/ResetPasswordList`, item)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async SendResetPassword(item) {
        return axios
            .post(`${this.serviceUrl}/SendResetPassword`, item)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async SetPasswordWithToken(data) {
        return axios
            .put(`${this.serviceUrl}/SetPasswordWithToken`, data)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async ResetPasswordRange(data) {
        return axios
            .put(`${this.serviceUrl}/ResetPasswordRange`, data)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    async SearchByType(pagingInfor) {
        const url = `${this.serviceUrl}/SearchByType`
        // const urlParam = url + this.createParameter(pagingInfor)
        // if (urlParam.length < 2000) {

        //     return axios
        //         .get(urlParam)
        //         .then(this.handleResponse)
        //         .catch(this.handleError);
        // }
        // else {

            return axios
                .post(url, pagingInfor)
                .then(this.handleResponse)
                .catch(this.handleError);
        // }
    }

    async SearchUserEmployeeByKeyword(pagingInfor) {
        const url = `${this.serviceUrl}/SearchUserEmployeeByKeyword`
        const urlParam = url + this.createParameter(pagingInfor)
        if (urlParam.length < 2000) {

            return axios
                .get(urlParam)
                .then(this.handleResponse)
                .catch(this.handleError);
        }
        else {

            return axios
                .post(url, pagingInfor)
                .then(this.handleResponse)
                .catch(this.handleError);
        }
    }

    async SearchUnitByKeyword(pagingInfor) {
        const url = `${this.serviceUrl}/SearchUnitByKeyword`
        const urlParam = url + this.createParameter(pagingInfor)
        if (urlParam.length < 2000) {

            return axios
                .get(urlParam)
                .then(this.handleResponse)
                .catch(this.handleError);
        }
        else {

            return axios
                .post(url, pagingInfor)
                .then(this.handleResponse)
                .catch(this.handleError);
        }
    }

    async SearchDeparmentByKeyword(pagingInfor) {
        const url = `${this.serviceUrl}/SearchDeparmentByKeyword`
        const urlParam = url + this.createParameter(pagingInfor)
        if (urlParam.length < 2000) {

            return axios
                .get(urlParam)
                .then(this.handleResponse)
                .catch(this.handleError);
        }
        else {

            return axios
                .post(url, pagingInfor)
                .then(this.handleResponse)
                .catch(this.handleError);
        }
    }

    async SearchConnectDeparmentByKeyword(pagingInfor) {
        const url = `${this.serviceUrl}/SearchConnectDeparmentByKeyword`
        const urlParam = url + this.createParameter(pagingInfor)
        if (urlParam.length < 2000) {

            return axios
                .get(urlParam)
                .then(this.handleResponse)
                .catch(this.handleError);
        }
        else {

            return axios
                .post(url, pagingInfor)
                .then(this.handleResponse)
                .catch(this.handleError);
        }
    }
}
var service = new UserService({ endPoint: "Users", noVersion: true });
export default service


