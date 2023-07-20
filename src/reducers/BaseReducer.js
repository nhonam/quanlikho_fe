import ActionType from "src/actions/types";

const baseReducer = ({
    DispatchType,
    extendState = {}, // add state to initial state
    customAction  // a expand func for reducer logic default at end => required return state
}) => {
    // for dynamic key
    // const dynamicField = { id: "Id" }
    const INITIAL_STATE = {
        items: null,
        item: null,
        itemsByPage: null,
        pagingInfor: {
            expand: "",
            filter: "",
            filterBy: "",
            search: null,
            sort: "Created DESC",
            maxSize: 5,
            page: 1,
            pageSize: 10,
            TotalRow: 0,
        },
        selectedItems: null,
        searchItems: null,
        objectCheckExistsByFilter: null,
        ...extendState
    }

    return (state = INITIAL_STATE, action) => {
        if (customAction) {
            const returnState = customAction(state, action)
            if (returnState) return returnState
        }

        switch (action.type) {
            case ActionType.FIND_ALL_ITEM + DispatchType:
                return { ...state, items: action.payload ?? [] };
            case ActionType.FIND_SINGLE_ITEM + DispatchType:
                return { ...state, item: action.payload ?? null };
            case ActionType.PAGED_ITEM + DispatchType:
                if (action.payload) {
                    return {
                        ...state,
                        itemsByPage: action.payload.items,
                        pagingInfor: { ...action.payload.pagingInfor },
                    };
                }
                return { ...state };
            case ActionType.ADD_ITEM + DispatchType:
                return {
                    ...state,
                    // items: [...state.items, action.payload],
                    new: [action.payload],
                };
            case ActionType.UPDATE_ITEM + DispatchType:
                return {
                    ...state,
                    // items: state.items.map((x) =>
                    //     x[dynamicField.id] === action.payload[dynamicField.id]
                    //         ? action.payload
                    //         : x
                    // ),
                    updated: [action.payload],
                };
            case ActionType.REMOVE_ITEM + DispatchType:
                return {
                    ...state,
                    // items: state.items.filter(
                    //     (x) => x[dynamicField.id] !== action.payload[dynamicField.id]
                    // ),
                    deleted: [action.payload],
                };
            // case ActionType.ADD_ITEMS + DispatchType:
            //     return {
            //         ...state,
            //         items: [...state.items, ...action.payload],
            //         new: action.payload,
            //     };
            // case ActionType.UPDATE_ITEMS + DispatchType:
            //     return {
            //         ...state,
            //         items: [
            //             ...new Map(
            //                 [...state.items, ...action.payload].map((item) => [
            //                     item[dynamicField.id],
            //                     item,
            //                 ])
            //             ).values(),
            //         ],
            //         updated: action.payload,
            //     };
            // case ActionType.REMOVE_ITEMS + DispatchType:
            //     const delIds = action.payload.map((x) => x[dynamicField.id]);
            //     const items = state.items.filter(
            //         (x) => !delIds.includes(x[dynamicField.id])
            //     );
            //     return { ...state, items, deleted: action.payload };
            case ActionType.SELECT_ITEM + DispatchType:
                return { ...state, selectedItems: action.payload ?? [] };
            case ActionType.CHECK_EXISTS + DispatchType:
                if (action.payload.pagingInfor.filter) {
                    return {
                        ...state,
                        objectCheckExistsByFilter: {
                            ...state.objectCheckExistsByFilter ?? {},
                            [action.payload.pagingInfor.filter]: {
                                pagingInfor: action.payload.pagingInfor,
                                isExist: action.payload.isExist,
                            }
                        }
                    }
                };
                return state
            case ActionType.SEARCH_BY_EXPAND + DispatchType:
                return { ...state, searchItems: action.payload ?? [] }
            default:
                return state
        }
    };

};

export default baseReducer;

