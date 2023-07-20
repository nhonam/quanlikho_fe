import baseReducer from '../BaseReducer';

const DispatchType = "_SERIALNUMBER"; // dispatch name
const ActionType = {
    ACTIVE_KEY: "ACTIVE_KEY",
    VERIFY_APP: "VERIFY_APP",
} // extended action type for customAction
export default baseReducer({
    DispatchType: DispatchType,
    extendState: {
        activeKey: "",
        verifyApp: false,
    },
    customAction: (state, action) => {
        switch (action.type) {
            case ActionType.ACTIVE_KEY + DispatchType:
                return { ...state, activeKey: action.payload };
            case ActionType.VERIFY_APP + DispatchType:
                return { ...state, verifyApp: action.payload };
            default:
                return;
        }
    }
});