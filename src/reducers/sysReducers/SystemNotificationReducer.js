import baseReducer from '../BaseReducer';

const DispatchType = "_SYSTEMNOTIFICATION"; // dispatch name
const ActionType = {
    GET_ACTIVE: "GET_ACTIVE",
} // extended action type for customAction
export default baseReducer({
    DispatchType: DispatchType,
    extendState: {
        activeItems: null
    },
    customAction: (state, action) => {
        switch (action.type) {
            case ActionType.GET_ACTIVE + DispatchType:
                return { ...state, activeItems: action.payload ?? [] }
            default:
                break
        }
    }
});