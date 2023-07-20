import { SignService } from '../../services';
import BaseActions from "../BaseActions";

const actionsProps = {
    dispatchType: "_SIGN",
    service: SignService,
    actionType: {
    },
}
class SignActions extends BaseActions {
}
export default new SignActions(actionsProps);