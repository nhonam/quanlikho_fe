import { memo, Suspense } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import PropTypes from "prop-types";
import Loading from "src/components/Loading";
import { uuidv4 } from "src/utils/funcUtils";
import { useSelector } from "react-redux";
import configService from "src/configService";

const Content = ({ routes }) => {
  const { pathname } = useLocation();
  const authData = useSelector((state) => state.User.userInfor);
  return (

        <>
          <div className="c-main pt-4">
            <CContainer fluid>
              <Suspense fallback={<Loading />}>
                <Switch>
                  {routes?.map(
                    ({ component, render, _children, ...rest }, idx) => {
                      return (
                        <Route
                          {...rest}
                          key={idx}
                          render={() => (
                            <CFade key={uuidv4()}>
                              {render(component, authData)}
                            </CFade>
                          )}
                        />
                      );
                    }
                  )}
                  {pathname === "/" ? (
                    <Redirect from="/" to={configService.DEFAULT_ROUTER} />
                  ) : (
                    <Redirect from="*" to={"/404"} />
                  )}
                </Switch>
              </Suspense>
            </CContainer>
          </div>
        </>
  );
};

Content.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.any,
      render: PropTypes.func,
      component: PropTypes.any,
    })
  ).isRequired,
};

export default memo(Content);
