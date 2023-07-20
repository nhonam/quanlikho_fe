import "../scss/layout/Layout.scss";
import { CRow, CSpinner, CSubheader } from "@coreui/react";
import {
  Breadcrumb,
  Timing,
  Content,
  Footer,
  Header,
  Sidebar,
} from "src/containers";
import { ToastContainer, Zoom } from "react-toastify";
import { useSelector } from "react-redux";
import ButtonScroll from "src/components/ButtonScroll";

import { layoutRoute, adminRoute } from "./AppRoute";
import { useState } from "react";
import { AuthenticateActions } from "src/actions";
const Layout = () => {
  const authData = useSelector((state) => state.User.userInfor);
  const isLoading = useSelector((state) => state.ChangeState.isLoading);
  const [routes] = useState([...layoutRoute, ...adminRoute]);

  if (authData) {
    return (
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={4}
            transition={Zoom}
            draggablePercent={50}
          />
          <Header />
          <div className="c-body">
            <CSubheader className="px-3 pt-3 chiba-bgHeaderCBody">
              <CRow className="m-0">
                <div className="chiba-custom-breadcrumb">
                  <Breadcrumb routes={routes} />
                  <CSpinner
                    className="my-auto"
                    size="sm"
                    color="primary"
                    hidden={!isLoading}
                  />
                </div>
                <div className="chiba-header-timing">
                  <Timing />
                </div>
              </CRow>
            </CSubheader>
            <Content routes={routes} />
          </div>
          <Footer />
          <ButtonScroll />
        </div>
      </div>
    );
  } else {
    AuthenticateActions.redirectToSSO();
  }
};
export default Layout;
