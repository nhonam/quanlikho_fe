import { SystemNotificationService } from '../../services';
import BaseActions from "../BaseActions";

const actionsProps = {
    dispatchType: "_SYSTEMNOTIFICATION",
    service: SystemNotificationService,
    actionType: {
        GET_ACTIVE: "GET_ACTIVE" // AppActions đang gọi tới dùng
    },
}
class SystemNotificationActions extends BaseActions {
    GetActive = () => async (dispatch) => {
        try {
            const response = await this.service.GetActive();
            if (response.status === 200)
                this._setDispatch(this.actionType.GET_ACTIVE, response.data)(dispatch)

            return Promise.resolve(response);
        } catch (err) {
            return Promise.reject(err);
        }
    };
}
export default new SystemNotificationActions(actionsProps);