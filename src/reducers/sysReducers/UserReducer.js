import { AuthenticateActions } from 'src/actions';
import baseReducer from '../BaseReducer';

export const DispatchType = "_USER"; // dispatch name
export const ActionType = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    VERIFY_LOGIN: "VERIFY_LOGIN",
    UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE"
} // extended action type for customAction

export default baseReducer({
    DispatchType: DispatchType,
    extendState: {
        userInfor: {
            Token: AuthenticateActions.GetTokenCode4Verify()
        }
    },
    customAction: (state, action) => {
        switch (action.type) {
            case ActionType.LOGIN + DispatchType:
            case ActionType.VERIFY_LOGIN + DispatchType:
                return { ...state, userInfor: action.payload }
            case ActionType.LOGOUT + DispatchType:
                return { ...state, userInfor: {} };
            case ActionType.UPDATE_EMPLOYEE + DispatchType : {
                const newState = {...state}                
                const payload = action.payload
                newState.userInfor.Employee = payload.id
                return newState
            }                                
            default:
                break;
        }
    }
});