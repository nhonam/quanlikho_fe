import { AppService } from '../../services';
import BaseActions from "../BaseActions";

const actionsProps = {
    dispatchType: "_APP",
    service: AppService,
    // actionType: {
    // },
}
class AppActions extends BaseActions {
    /**
     * lấy phần mềm theo mã quản lý
     * 
   
     */


}
export default new AppActions(actionsProps);