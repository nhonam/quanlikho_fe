import AuthenticateActions from "./sysActions/AuthenticateActions";
import UserActions from "./sysActions/UserActions";

export {
  AuthenticateActions,
  UserActions,
 
};

const actions = {
  AuthenticateActions,
  UserActions,
};

export default actions;

export const showProgress = () => (dispatch) => {
  dispatch?.({
    type: "SHOW_PROGRESS",
  });
};

export const hideProgress = () => (dispatch) => {
  dispatch?.({
    type: "HIDE_PROGRESS",
  });
};
export const showLoading = () => (dispatch) => {
  dispatch?.({
    type: "SHOW_LOADER",
  });
};

export const hideLoading = () => (dispatch) => {
  dispatch?.({
    type: "HIDE_LOADER",
  });
};

export const showSidebar = () => (dispatch) => {
  dispatch?.({
    type: "SHOW_SIDEBAR",
  });
};

export const hideSidebar = () => (dispatch) => {
  dispatch?.({
    type: "HIDE_SIDEBAR",
  });
};

export const unMinimizeSidebar = () => (dispatch) => {
  dispatch?.({
    type: "set",
    sidebarMinimize: false,
  });
};

export const minimizeSidebar = () => (dispatch) => {
  dispatch?.({
    type: "set",
    sidebarMinimize: true,
  });
};
