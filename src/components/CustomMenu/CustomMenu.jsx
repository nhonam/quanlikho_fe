import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./CustomMenu.styles.scss";

import action from "../../actions";

const ChucNangActions = action.FunctionActions
const NguoiDungActions = action.UserActions

class CustomMenu extends React.Component {
  _chucNangAction = ChucNangActions;
  _nguoiDungAction = NguoiDungActions;

  constructor(props) {
    super(props);
    this._isMount = true
    this.state = {
      hasError: false,
    };
    this._onDataChucNangChange = this._onDataChucNangChange.bind(this);
    this._onDataNguoiDungChange = this._onDataNguoiDungChange.bind(this);
    this.getQuyen = this.getQuyen.bind(this);
    this.getImg = this.getImg.bind(this);
    this.renderGroupButton = this.renderGroupButton.bind(this)
  }
  componentWillUnmount() {
    this._isMount = false
  };
  componentDidMount() {
    this._isMount = true
  }
  _onDataChucNangChange() {
    var result = this.props.chucnang.items;
    this.setState({ chucNangs: result });
  }
  _onDataNguoiDungChange() {
    this._chucNangAction = this.props.ChucNangActions;

    var result = this.props.nguoidung.userInfor;
    this.setState({ nguoiDung: result }, () => {
      this._chucNangAction
        .GetChucNangByNhomQuyenIdMenuChucNang(
          this.state.nguoiDung.NhomQuyenId,
          this.props.maQuanLyMenuChucNang
        )
        .then((response) => {
          if (response.status !== 200) {
            console.log("#" + response.status, response.message);
          }
        });
    });
  }
  getQuyen(chucNang) {
    return chucNang.disabled;
  }
  getImg(chucNang) {
    var src = "";
    if (this.state.chucNangs !== undefined)
      this.state.chucNangs.forEach((element) => {
        if (element.MaQuanLy === chucNang.MaQuanLy) {
          src = element.Img;
          return false;
        }
      });
    return src;
  }
  renderGroupButton(groupButton) {
    var groupButtonMenuClass = "group-button-menu";
    var btnMenuCustomClass = "btn-col-2 ";
    const buttons = [];
    groupButton.forEach((item) => {
      if (item.disabled === false) buttons.push(item);
    });
    if (buttons.length < 4) {
      if (this.props.menuButtonList.length > 6) {
        groupButtonMenuClass += " group-col-1 col-6";
        btnMenuCustomClass = "btn-col-1 col-6";
      }
      if (
        this.props.menuButtonList.length <= 6 &&
        this.props.menuButtonList.length > 4
      ) {
        groupButtonMenuClass += " group-col-2";
        btnMenuCustomClass = "btn-col-2 ";
      }
      if (this.props.menuButtonList.length === 4) {
        groupButtonMenuClass += " group-col-3";
        btnMenuCustomClass = "btn-col-2 ";
      }
      if (this.props.menuButtonList.length <= 3) {
        groupButtonMenuClass += " group-col-4";
        btnMenuCustomClass = "btn-col-2 ";
      }
    }
    if (buttons.length === 4) {
      if (this.props.menuButtonList.length > 4) {
        groupButtonMenuClass += " group-col-2";
        btnMenuCustomClass = "btn-col-2 ";
      }
      if (this.props.menuButtonList.length === 4) {
        groupButtonMenuClass += " group-col-3";
        btnMenuCustomClass = "btn-col-2 ";
      }
      if (this.props.menuButtonList.length <= 3) {
        groupButtonMenuClass += " group-col-4";
        btnMenuCustomClass = "btn-col-2 ";
      }
    }
    if (buttons.length > 4 && buttons.length <= 6) {
      groupButtonMenuClass += " group-col-3";
      btnMenuCustomClass = "btn-col-3 ";
    }
    if (buttons.length > 6 && buttons.length <= 8) {
      groupButtonMenuClass += " group-col-6";
      btnMenuCustomClass = "btn-col-6";
    }
    if (buttons.length > 8) {
      groupButtonMenuClass += " group-col-6";
      btnMenuCustomClass = "btn-col-6 ";
    }

    ;
    return (
      <>
        <div id="menuButtonPC" className={groupButtonMenuClass}>
          <div className="list-button-menu">
            {buttons.map((element, index) => {
              return (
                <div
                  key={element.buttonLabel}
                  className={"btn-menu-custom " + btnMenuCustomClass}
                >
                  <button
                    id={element.id ? element.id : `btn-${index}`}
                    //ref ={element.id ? element.id : `btn-${index}`}
                    className={
                      "btn btn-custom" +
                      (this.getQuyen(element) &&
                        " custom-menu-disabled")
                    }
                    onClick={
                      !this.getQuyen(element)
                        ? element.onClickFunction.bind(this)
                        : undefined
                    }
                    title={element.buttonLabel}
                  >
                    <img
                      className="img-button"
                      src={
                        this.getImg(element) !== ""
                          ? this.getImg(element)
                          : element.urlIcon
                      }
                      alt={element.buttonLabel}
                    />
                    {/* {element.buttonLabel} */}
                  </button>
                </div>
              );
            })}
          </div>
          {/* <div className="footer-group-button-menu card-footer small text-muted">
            {groupButton.groupLabel}
          </div> */}
        </div>
        {/* menu mobile */}
        <div className="menu-button-mobile px-3">
          <div className="row">
            <div className="col-12 col-sm-8 px-0">
              <div className="list-button-group-menu ">
                {groupButton.map((element, index) => {
                  return (
                    <button
                      key={"menu-mobile-" + element.buttonLabel}
                      className={
                        btnMenuCustomClass +
                        " btn-menu-custom btn " +
                        (!this.getQuyen(element) &&
                          " custom-menu-disabled")
                      }
                      onClick={
                        this.getQuyen(element) !== false
                          ? element.onClickFunction.bind(this)
                          : undefined
                      }
                    >
                      <div className="img-center">
                        <img
                          className="img-button"
                          src={
                            this.getImg(element) !== ""
                              ? this.getImg(element)
                              : element.urlIcon
                          }
                          alt={element.buttonLabel}
                        />
                        {/* <br /> */}
                        <div className="button-label">
                          {element.buttonLabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* <div className="col-12 col-sm-4 px-0">
              <div className="footer-group-button-menu card-footer small text-muted pt-sm-3">
                {groupButton.groupLabel}
              </div>
            </div> */}
          </div>
        </div>
      </>
    );
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return (
      <div className="card-menu">
        <Fragment>{this.renderGroupButton(this.props.menuButtonList)}</Fragment>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    nguoidung: state.User,
    chucnang: state.Function,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    NguoiDungActions: bindActionCreators(NguoiDungActions, dispatch),
    ChucNangActions: bindActionCreators(ChucNangActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomMenu);
