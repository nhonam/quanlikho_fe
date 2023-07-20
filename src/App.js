import { Component, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./scss/style.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import { CSpinner, CLabel } from "@coreui/react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUlt from "@date-io/date-fns";
// import { getI18n } from "react-i18next";
import { connect } from "react-redux";
import { MuiTheme } from "./views/theme/CustomTheme";
import { AuthenticateActions, UserActions } from "src/actions";

import UnSupportIEPage from "src/views/pages/page403/Page403";
import { detectIE } from "./utils/funcUtils";
import { route } from "./containers/AppRoute";
import configService from "./configService";

/**render loading*/
const loading = (
  <div className="animated fadeIn pt-3 text-center">
    <CSpinner size="sm" className="mr-1" />
    <CLabel tag="span">Loading</CLabel>
  </div>
);
class App extends Component {
  constructor(props) {
    super(props);
    /**locale dictionary */
    this.localeMap = {};

    this.state = {
      language: null,
      // hasError: false,
      isInitialized: false,
    };
    const vertion = detectIE();
    this.state.isIE = isNaN(vertion.toString()) ? vertion : vertion < 12;
  }
  /**
   * @param {*} name language name
   */
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  async componentDidMount() {
    if (!this.isIE && this.props.authData[AuthenticateActions.Token]) {
      const res = await this.props.VerifyLogin(configService.CLIENT_ID);
      if (res.data) {
        this.setState({ isInitialized: true });
      }
    } else {
      this.setState({ isInitialized: true });
    }
  }

  renderRoutes(route) {
    if (route?.length > 0)
      return route.map(({ component, render, _children, ...rest }, key) => (
        <Route
          {...rest}
          key={key}
          render={() => render(component, this.props.authData)}
          // children={this.renderRoutes(_children)}
        />
      ));

    return <></>;
  }
  renderBrowserRouter() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Switch>
            {this.renderRoutes(route)}
            <Redirect from="*" to={"/404"} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
  render() {
    const { hasError, isInitialized, isIE } = this.state;

    switch (true) {
      case hasError:
        return (
          <CLabel tag="h4" className="pt-3 text-center">
            Something went wrong.
          </CLabel>
        );
      case !isInitialized:
        return loading;
      case isIE:
        return <UnSupportIEPage unSupportIE={isIE} />;
      default:
        return (
          <ThemeProvider theme={MuiTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUlt}>
              {this.renderBrowserRouter()}
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authData: state.User.userInfor,
  };
};
const mapActionsToProps = (dispatch) => ({
  VerifyLogin: (client_id) => UserActions.VerifyLogin(client_id)(dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(App);
