import { SerialNumberService } from '../../services';
import BaseActions from "../BaseActions";

const actionsProps = {
    dispatchType: "_SERIALNUMBER",
    service: SerialNumberService,
    actionType: {
        ACTIVE_KEY: "ACTIVE_KEY",
        VERIFY_APP: "VERIFY_APP",
    },
}
class SerialNumberActions extends BaseActions {

    VerifyProductKey = (activeKey) => async (dispatch) => {
        try {
            const params = {
                activeKey: activeKey
            }
            const res = await this.service.VerifyProductKey(params);

            if (res.status === 200) {
                this._setDispatch(this.actionType.ACTIVE_KEY, res.data)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    CheckProductActive = () => async (dispatch) => {
        try {
            const res = await this.service.CheckProductActive();

            if (res.status === 200) {
                this._setDispatch(this.actionType.VERIFY_APP, res.data)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
}
export default new SerialNumberActions(actionsProps);
