import { PageService } from '../../services';
import BaseActions from "../BaseActions";

const actionsProps = {
    dispatchType: "_PAGE",
    service: PageService,
    actionType: {
        BY_APP_IDC: "BY_APP_IDC",
        BY_USER_APP_IDC: "BY_USER_APP_IDC",
    },
}
class PageActions extends BaseActions {
    /**
     * lấy trang theo mã quản lý
     * @param {*} idc mã quản lý
     * @returns page
     */
    GetByIdc = (idc) => async (dispatch) => {
        try {
            const response = await this.service.GetByIdc(idc)
            if (response.status === 200) {
                this._setDispatch(this.actionType.FIND_SINGLE_ITEM, response.data)(dispatch)
            }

            return Promise.resolve(response);
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * lấy trang theo mã quản lý phần mềm
     * @param {*} idc mã quản lý
     * @returns page
     */
    GetByAppIdc = (idc) => async (dispatch) => {
        try {
            const response = await this.service.GetByAppIdc(idc)
            if (response.status === 200) {
                this._setDispatch(this.actionType.BY_APP_IDC, {
                    idc: idc,
                    data: response.data
                })(dispatch)
            }

            return Promise.resolve(response);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    GetUserAuthorizablePage = (appIdc, orderBy, getDeleted) => async (dispatch) => {
        try {
            const params = { appIdc, orderBy, getDeleted }
            const response = await this.service.GetUserAuthorizablePage(params)
            if (response.status === 200 && appIdc) {
                this._setDispatch(this.actionType.BY_USER_APP_IDC, {
                    idc: appIdc,
                    data: response.data
                })(dispatch)
            }
            return Promise.resolve(response);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
export default new PageActions(actionsProps);
