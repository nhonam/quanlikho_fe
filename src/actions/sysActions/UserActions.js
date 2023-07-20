import { UserService } from "../../services";
import BaseActions from "../BaseActions";
import AuthenticateActions from "./AuthenticateActions";

const actionsProps = {
  dispatchType: "_USER",
  service: UserService,
  actionType: {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    VERIFY_LOGIN: "VERIFY_LOGIN",
  },
};
class UserActions extends BaseActions {
  // authentication
  Login = (authData) => async (dispatch) => {
    try {
      const res = await this.service.Login(authData);
      if (res.status === 200) {
        res.data = AuthenticateActions.AssignAuth(res.data);

        if (!res.data[AuthenticateActions.IsChangePassword]) {
          AuthenticateActions.SetAuth(res.data[AuthenticateActions.Token]);
          this._setDispatch(this.actionType.LOGIN, res.data)(dispatch);
        }
      }

      return Promise.resolve(res);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
  Logout = () => async (dispatch) => {
    try {
      AuthenticateActions.redirectToSSO(true);
      // this._setDispatch(this.actionType.LOGOUT, {})(dispatch)
      return Promise.resolve({ isLogout: true });
    } catch (err) {
      return Promise.reject(err);
    }
  };
  VerifyLogin = (clientId) => async (dispatch) => {
    try {
      const parameters = {
        clientId: clientId,
      };
      const res = await this.service.VerifyLogin(parameters);
      if (res.status === 200) {
        res.data = AuthenticateActions.AssignAuth(res.data);        
        AuthenticateActions.SetAuth(res.data[AuthenticateActions.Token], res.data['Employee']);
        this._setDispatch(this.actionType.VERIFY_LOGIN, res.data)(dispatch);
      }

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  // user api
  SendResetPassword = (userName, email, phone) => async (dispatch) => {
    try {
      const params = { userName, email, phone };
      const res = await this.service.SendResetPassword(params);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  UpdateRoleById = (id, arrRole) => async (dispatch) => {
    try {
      const res = await this.service.UpdateRoleById(id, arrRole);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  UpdateRangeByRoleIdc = (idc, arrUser) => async (dispatch) => {
    try {
      const res = await this.service.UpdateRangeByRoleIdc(idc, arrUser);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  GetByName = (userName, getRole, getUserJoinRole) => async (dispatch) => {
    try {
      const params = { getRole, getUserJoinRole };
      const res = await this.service.GetByName(userName, params);

      if (res.data) {
        this._setDispatch(this.actionType.FIND_SINGLE_ITEM, res.data)(dispatch);
      }

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  GetRoleById = (id, getDetail) => async (dispatch) => {
    try {
      const params = { getDetail };
      const res = await this.service.GetRoleById(id, params);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  GetByRoleIdc = (idc) => async (dispatch) => {
    try {
      const params = {};
      const res = await this.service.GetByRoleIdc(idc, params);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  UpdateInformation = (id, item, options) => async (dispatch) => {
    try {
      const res = await this.service.UpdateInformation(id, item, options);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  UpdatePassword = (userName, passwordNew, passwordOld) => async (dispatch) => {
    try {
      const params = { userName, passwordNew, passwordOld };
      const res = await this.service.UpdatePassword(params);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  ResetPasswordList = (data) => async (dispatch) => {
    try {
      const res = await this.service.ResetPasswordList(data);
      if (res.status === 200) {
        this._setDispatch(this.actionType.RESET_PASSWORD_LIST, data)(dispatch);
      }
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  SetPasswordWithToken = (userName, password, token) => async (dispatch) => {
    try {
      const data = { userName, password, token };
      const res = await this.service.SetPasswordWithToken(data);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  ResetPasswordRange = (items, isSendMail, isSendSMS) => async (dispatch) => {
    try {
      const data = {
        ArrUser: items,
        IsSendMail: isSendMail,
        IsSendSMS: isSendSMS,
      };
      const res = await this.service.ResetPasswordRange(data);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  SearchByType = (pagingInfor) => async (dispatch) => {
    try {
      const res = await this.service.SearchByType(pagingInfor);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  SearchUserEmployeeByKeyword = (pagingInfor) => async (dispatch) => {
    try {
      const res = await this.service.SearchUserEmployeeByKeyword(pagingInfor);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  SearchUnitByKeyword = (pagingInfor) => async (dispatch) => {
    try {
      const res = await this.service.SearchUnitByKeyword(pagingInfor);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  SearchDeparmentByKeyword = (pagingInfor) => async (dispatch) => {
    try {
      const res = await this.service.SearchDeparmentByKeyword(pagingInfor);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  SearchConnectDeparmentByKeyword = (pagingInfor) => async (dispatch) => {
    try {
      const res = await this.service.SearchConnectDeparmentByKeyword(
        pagingInfor
      );

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}
export default new UserActions(actionsProps);
