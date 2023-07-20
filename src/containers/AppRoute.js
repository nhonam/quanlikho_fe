import { CFade } from "@coreui/react";
import { lazy } from "react";
import { AuthenticateActions } from "src/actions";
import configService from "src/configService";

/**
 * pass props value to component
 * @param {*} props property
 * @param {*} Component react component
 * @returns a react component
 */
const handleRoute = (Component, authData) => {
  if (
    AuthenticateActions.CheckAuth(authData) &&
    window.location.pathname === "/login"
  ) {
    window.location.assign(configService.APP_URL);
  }
  return <CFade children={<Component />} />;
};
/**
 * pass props value to component and authenticate access permission
 * @param {*} props property
 * @param {*} authData authentication data
 * @param {*} Component react component
 * @returns
 */
const handlePrivateRoute = (Component, authData) => {
  if (AuthenticateActions.CheckAuth(authData))
    {
  return <CFade children={<Component />} />;
    }
  return AuthenticateActions.redirectToSSO()
};
const handleAdminRoute = (Component, authData) => {
  if (
    AuthenticateActions.CheckAuth(authData) &&
    authData[AuthenticateActions.IsAdmin]
  )
    return <CFade children={<Component />} />;
  return AuthenticateActions.redirectToSSO();
};
const routeLookup = {
  404: {
    path: "/404",
    name: "Page 404",
    exact: true,
    component: lazy(() => import("src/views/pages/page404/Page404")),
    render: handleRoute,
  },

  "/": {
    path: "/",
    component: lazy(() => import("src/containers/Layout")),
    render: handleRoute,
  },
  Login: {
    path: "/login",
    name: "Login",
    exact: true,
    component: lazy(() => import("src/views/pages/Login/Login")),
    render: handleRoute,
  },
  DashBoard: {
    IconName: "tasks",
    path: "/dashboard",
    name: "Dashboard",
    exact: true,
    component: lazy(() => import("src/views/main/DashBoard")),
    render: handlePrivateRoute,
  },
  OrderList: {
    //path: "/dashBoardTTHC",
    IconName: "sharp-add",
    path: "/addlist",
    name: "Danh sách phiếu nhập",
    exact: true,
    component: lazy(() => import("src/views/main/DashBoard")),
    render: handlePrivateRoute,
  },
  AddList: {
    //path: "/dashBoardTTHC",
    IconName: "list",
    path: "/entrylist",
    name: "Danh sách phiếu xuất",
    exact: true,
    component: lazy(() => import("src/views/main/DashBoard")),
    render: handlePrivateRoute,
  },
  ListSupplier: {
    //path: "/dashBoardTTHC",
    IconName: "founder",
    path: "/list-supplier",
    name: "Danh sách NCC",
    exact: true,
    component: lazy(() => import("src/views/main/DashBoard")),
    render: handlePrivateRoute,
  },
  ListEmployee: {
    //path: "/dashBoardTTHC",
    IconName: "employee",
    path: "/list-employee",
    name: "Danh sách nhân sự",
    exact: true,
    component: lazy(() => import("src/views/main/DashBoard")),
    render: handlePrivateRoute,
  },
  ProductList: {
    //path: "/dashBoardTTHC",
    IconName: "product",
    path: "/list-product",
    name: "Danh sách sản phẩm",
    exact: true,
    component: lazy(() => import("src/views/main/DashBoard")),
    render: handlePrivateRoute,
  },
};
const route = [routeLookup[404], routeLookup["Login"], routeLookup["/"]];
const adminRoute = [
  // routeLookup.Language,
];
const layoutRoute = [
  routeLookup.DashBoard,
  routeLookup.OrderList,
  routeLookup.AddList,
  routeLookup.ListSupplier,
  routeLookup.ListEmployee,
  routeLookup.ProductList,
];
export {
  handleRoute,
  handlePrivateRoute,
  handleAdminRoute,
  route,
  routeLookup,
  adminRoute,
  layoutRoute,
};
