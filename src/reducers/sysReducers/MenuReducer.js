import configService from 'src/configService';
import baseReducer from '../BaseReducer';

const DispatchType = "_MENU"; // dispatch name
const ActionType = {
    GET_TREE: "GET_TREE",
    GET_SIDEBAR: "GET_SIDEBAR",// AppActions đang gọi tới dùng
    BY_APP_IDC: "BY_APP_IDC",
} // extended action type for customAction

/**
 * gắn mảng con vào menu cha có sẵn trong danh sách cây ban đầu nếu tìm ra
 * @param {*} appIdc mã quản lý phần mềm
 * @param {*} parentIdOfData id cha ParentId của dữ liệu data được truyền vào
 * @param {*} tree mảng cây ban đầu
 * @param {*} data mảng dữ liệu cần thêm vào mảng ban đầu
 * @returns arr[menu]
 */
const _assignNodeToTree = (appIdc, parentIdOfData, tree, data) => {
    if (tree?.[0]?.AppIdc === appIdc) {
        if (tree[0].ParentId === parentIdOfData) {
            // cùng cấp với tầng đầu tiên của mảng thì thêm vào mảng luôn
            return [...new Map([...tree, ...data].map((item) => [item.Id, item,])).values()]

        } else if (parentIdOfData?.length > 0) {
            // ở đây nếu ko có parentIdOfData tức data là của tầng đầu tiên
            // cao nhất của cây(trường hợp này sẽ không xảy ra nếu cây luôn 
            // được lấy từ node gốc đầu tiên, nếu lấy lưng chừng thì dữ liệu sẽ bị lỗi),
            // còn nếu có parentIdOfData thì data là dữ liệu của 1 node có Id là
            // parentIdOfData trong mảng
            const _loop = (arr) => arr.map(x => {
                if (x.Id === parentIdOfData) x.ArrMenu = data
                else if (x.ArrMenu?.length > 0) x.ArrMenu = _loop(x.ArrMenu)

                return x;
            })
            return _loop(tree)

        }
        // else {
        //     // trường hợp là dữ liệu ở trên cùng(parentIdOfData 0 có) sẽ 0 xảy ra nếu đi
        //     // theo thứ tự từ trên xuống dưới. Dữ liệu tree và data có khả năng sẽ ko có
        //     // điểm tiếp xúc nhau. KO làm trường hợp này
        // }
    }
    return data
}
export default baseReducer({
    DispatchType: DispatchType,
    extendState: {
        tree: null,
        sidebar: null,
        objItemsByAppIdc: null,
    },
    customAction: (state, action) => {
        switch (action.type) {
            case ActionType.GET_TREE + DispatchType: {
                const { id, appIdc, getAll, data } = action.payload
                const newState = { ...state }
                if (getAll) {
                    newState.tree = [...data]
                    if (appIdc === configService.CLIENT_ID) {
                        newState.sidebar = [...data]
                    }
                } else newState.tree = _assignNodeToTree(appIdc, id, [...state.tree ?? []], data)

                return newState
            }
            case ActionType.GET_SIDEBAR + DispatchType:
                return { ...state, sidebar: action.payload }
            // const { id, appIdc, data } = action.payload
            // return { ...state, sidebar: _assignNodeToTree(appIdc, id, [...state.sidebar ?? []], data) }
            case ActionType.BY_APP_IDC + DispatchType:
                const temp = state.objItemsByAppIdc ? { ...state.objItemsByAppIdc } : {}
                temp[action.payload.idc] = action.payload.data
                return { ...state, objItemsByAppIdc: temp }
            default:
                break
        }
    }
});