import baseReducer from '../BaseReducer';

const DispatchType = "_PAGE"; // dispatch name
const ActionType = {
    BY_APP_IDC: "BY_APP_IDC",
    BY_USER_APP_IDC: "BY_USER_APP_IDC",
} // extended action type for customAction
export default baseReducer({
    DispatchType: DispatchType,
    extendState: {
        objItemsByAppIdc: null,
        objUserAuthorizableItemsByAppIdc: null,
    },
    customAction: (state, action) => {
        switch (action.type) {
            case ActionType.BY_USER_APP_IDC + DispatchType:
                return {
                    ...state,
                    objUserAuthorizableItemsByAppIdc: {
                        ...state.objUserAuthorizableItemsByAppIdc ?? {},
                        [action.payload.idc]: action.payload.data
                    }
                }
            case ActionType.BY_APP_IDC + DispatchType:
                return {
                    ...state,
                    objItemsByAppIdc: {
                        ...state.objItemsByAppIdc ?? {},
                        [action.payload.idc]: action.payload.data
                    }
                }
            default:
                break;
        }
    }
});