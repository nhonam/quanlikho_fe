import actionTypes from "src/actions/types";
import PropTypes from 'prop-types';

class BaseActions {
    constructor(props) {
        this.actionType = { ...actionTypes, ...props.actionType }; // object contant key name of type
        this.dispatchType = props.dispatchType; // type of dispatch
        this.service = props.service
    }

    /**
     * mapping object/ array keys if needed
     * @param {*} data Some data to handle mapping
     * @returns new data with correct keys
     */
    _setDispatch = (type, payload, dispatchType = this.dispatchType) => (dispatch) => {
        if (type && dispatch) dispatch({ type: type + dispatchType, payload: payload });
    }
    /**
     * mapping object/ array keys if needed
     * @param {*} data Some data to handle mapping
     * @returns new data with correct keys
     */
    _mapping(data) {
        // do some assign here
        return data
    }
    /**
     * Get data 
     * @param {*} pagingInfor page information
     * @returns http response
     */
    Get = (pagingInfor) => async (dispatch) => {
        try {
            const res = await this.service.Get(pagingInfor);

            if (res.status === 200) {
                res.data = res.data.map(this._mapping)
                this._setDispatch(this.actionType.FIND_ALL_ITEM, res.data)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    GetPage = pagingInfor => async (dispatch) => {
        try {
            const res = await this.service.GetPage(pagingInfor);
            if (res.status === 200) {
                if (res.data.PageInfo) {
                    const PageInfo = res.data.PageInfo
                    pagingInfor.totalRow = PageInfo.TotalRecordCount ?? res.data.Data.length ?? 0
                    pagingInfor.totalPage = PageInfo.PageCount ?? 0
                    pagingInfor.page = PageInfo.Page ?? pagingInfor.page
                    pagingInfor.pageSize = PageInfo.PageSize ?? pagingInfor.pageSize
                }

                res.data = {
                    ...res.data,
                    items: res.data.Data ? res.data.Data.map(this._mapping) : [],
                    pagingInfor: pagingInfor,
                    pageInfo: pagingInfor,
                }

                this._setDispatch(this.actionType.PAGED_ITEM, res.data)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    }
    GetSingle = (id, pagingInfor) => async (dispatch) => {
        try {
            const res = await this.service.GetSingle(id, pagingInfor);

            if (res.status === 200) {
                res.data = this._mapping(res.data)
                this._setDispatch(this.actionType.FIND_SINGLE_ITEM, res.data)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    Insert = (item, option) => async (dispatch) => {
        try {
            const res = await this.service.Insert(item, option);

            if (res.status === 200) {
                this._setDispatch(this.actionType.ADD_ITEM, item)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    InsertList = (items, option) => async (dispatch) => {
        try {
            const res = await this.service.InsertList(items, option);

            if (res.status === 200) {
                this._setDispatch(this.actionType.ADD_ITEMS, items)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    Update = (id, item, option) => async (dispatch) => {
        try {
            const res = await this.service.Update(id, item, option);

            if (res.status === 200) {
                this._setDispatch(this.actionType.UPDATE_ITEM, item)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    UpdateList = (items, option) => async (dispatch) => {
        try {
            const res = await this.service.UpdateList(items, option);

            if (res.status === 200) {
                this._setDispatch(this.actionType.UPDATE_ITEMS, items)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    Delete = item => async (dispatch) => {
        try {
            const res = await this.service.Delete(item);

            if (res.status === 200) {
                this._setDispatch(this.actionType.REMOVE_ITEM, item)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    DeleteList = (items, option) => async (dispatch) => {
        try {
            const res = await this.service.DeleteList(items, option);

            if (res.status === 200) {
                this._setDispatch(this.actionType.REMOVE_ITEMS, items)(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    CheckExists = (pagingInfor) => async (dispatch) => {
        try {
            const res = await this.service.CheckExists(pagingInfor);
            if (res.status === 200) {
                this._setDispatch(this.actionType.CHECK_EXISTS, { pagingInfor: pagingInfor, isExist: res.data })(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    SearchByExpand = (pagingInfor) => async (dispatch) => {
        try {
            const res = await this.service.SearchByExpand(pagingInfor);
            if (res.status === 200) {
                this._setDispatch(this.actionType.SEARCH_BY_EXPAND, {
                    pagingInfor: pagingInfor, data: res.data
                })(dispatch)
            }

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
}

BaseActions.propTypes = {
    dispatchType: PropTypes.string.isRequired,
    service: PropTypes.any.isRequired,
    actionType: PropTypes.array,
};
BaseActions.defaultProps = {
    actionType: {},
};
export default BaseActions;