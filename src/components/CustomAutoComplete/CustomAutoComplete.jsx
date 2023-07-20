import React from "react";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
// import { toast } from "react-toastify";
import "./CustomAutoComplete.styles.scss";
import { Translation } from "react-i18next";
import ChoieModal from "../ChoiceModal";
let transListTemp = {
  GeneralConfiguration_Delete: "GeneralConfiguration_Delete",
  GeneralConfiguration_Add: "GeneralConfiguration_Add",
  GeneralNotification_TextDeleteAttention: "GeneralNotification_TextDeleteAttention",
  GeneralNotification_TextNoData:
    "GeneralNotification_TextNoData",
};
class CustomAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dsKetQuaTimKiem: [],
      selected: props.objectList,
      ketQua: [],
      keyword: null,
      error: false,
    };
    this.ModalElementXoa = React.createRef();
    this.ModalElementThem = React.createRef();
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
    this.openModalDelete = this.openModalDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.insert = this.insert.bind(this);
    this.onBlurErorr = this.onBlurErorr.bind(this);
  }
  //Thay thế cho componentWillReceiveProps
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      selected: nextProps.objectList ? nextProps.objectList : [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };
  sourceAction = (keyword) => async (dispatch) => {
    try {
      var res = await new Promise();
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  openModalDelete(value) {
    this._isMounted &&
      this.setState({ ketQua: value }, () =>
        this.ModalElementXoa.current?.openModal()
      );
  }
  openModalAdd(value) {
    this._isMounted &&
      this.setState({ ketQua: value }, () =>
        this.ModalElementThem.current?.openModal()
      );
  }
  onBlurErorr(event) {
    const { value } = event.target;
    if (value?.length > 0) {
      this._isMounted && this.setState({ error: false });
    } else this._isMounted && this.setState({ error: true });
  }
  delete() {
    const { searchCallback } = this.props;
    const state = { ...this.state };
    let danhsachtimkiem = [];
    danhsachtimkiem = state.ketQua;
    this._isMounted &&
      this.setState({ selected: danhsachtimkiem }, () => {
        searchCallback && searchCallback(danhsachtimkiem);
      });
  }
  insert() {
    const state = { ...this.state };
    this.addTag(state.ketQua);
  }
  addTag(value) {
    const { searchCallback, multipleTag, selectedValue } = this.props;
    const state = { ...this.state };
    //Tag được chọn
    const selected = value[value.length - 1];
    let danhsachtimkiem = [];
    //Kiểm tra tag đó đã có chưa
    const indexExsist = state.selected.findIndex(
      (x) => x[selectedValue] === selected[selectedValue]
    );
    danhsachtimkiem = state.selected;
    //Khi chỉ cho chọn 1 tag
    if (!multipleTag) danhsachtimkiem = [];
    //Nêu chưa có tag thì thêm vô
    if (indexExsist === -1) {
      const vitri = value.findIndex(
        (x) => x[selectedValue] === selected[selectedValue]
      );
      danhsachtimkiem.push(value[vitri]);
    }
    this._isMounted &&
      this.setState({ selected: danhsachtimkiem }, () => {
        searchCallback && searchCallback(danhsachtimkiem);
      });
  }
  onChange(event, value) {
    const { searchCallback, isThongBaoThem } = this.props;
    const state = { ...this.state };
    let danhsachtimkiem = [];
    //Khi xóa tag
    if (state.selected?.length > value?.length) {
      if (this.props.isThongBaoXoa) {
        this.openModalDelete(value);
        return;
      } else {
        danhsachtimkiem = value;
        this._isMounted &&
          this.setState({ selected: danhsachtimkiem }, () => {
            searchCallback && searchCallback(danhsachtimkiem);
          });
      }
    } else {
      if (isThongBaoThem) {
        this.openModalAdd(value);
      } else this.addTag(value);
    }
  }
  async search(event) {
    const { minChars, sourceAction, searchParams } = this.props;
    const keyword = event.target.value;
    //Chỉ tìm khi có keyword và keyword có độ dài bằng hoặc lớn hơn minChars
    if (keyword?.length >= (minChars || 0) && sourceAction) {
      if (searchParams) {
        await sourceAction(keyword, searchParams).then((response) => {
          if (response.status === 200 && response.data) {
            this._isMounted &&
              this.setState({ dsKetQuaTimKiem: response.data, keyword: keyword });
          }
        });
      } else {
        await sourceAction(keyword).then((response) => {
          if (response.status === 200 && response.data) {
            this._isMounted &&
              this.setState({ dsKetQuaTimKiem: response.data, keyword: keyword });
          }
        });
      }
    }
  }
  render() {
    return (
      <Translation>
        {(t) => (
          <div className="custom-autocomplete">
            <Autocomplete
              multiple
              size={this.props.size}
              options={this.state.dsKetQuaTimKiem}
              noOptionsText={t(transListTemp.GeneralNotification_TextNoData)}
              value={this.state.selected}
              getOptionLabel={(option) =>
                option && option[this.props.displayValue]
              }
              getOptionDisabled={(option) =>
                this.state.selected?.findIndex(
                  (item) =>
                    item[this.props.selectedValue] ===
                    option[this.props.selectedValue]
                ) > -1
              }
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  return (
                    <Chip
                      size="small"
                      color="primary"
                      style={{ cursor: "pointer" }}
                      key={index}
                      label={option[this.props.displayValue]}
                      {...getTagProps({ index })}
                    />
                  );
                })
              }
              onChange={(event, value) => this.onChange(event, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={this.props.label ? this.props.label : undefined}
                  placeholder={this.props.placeholder}
                  variant="outlined"
                  value={this.state.keyword}
                  error={this.props.isKiemTraDuLieu ? this.state.error : false}
                  onBlur={this.onBlurErorr}
                  onChange={(event) => this.search(event)}
                />
              )}
            />
            <ChoieModal
              modalAnimation={true}
              modalSize={"sm"}
              ref={this.ModalElementXoa}
              submitButtonText={t(this.props.tenNutXoa)}
              onSubmitButtonClick={this.delete}
              question={t(transListTemp.GeneralNotification_TextDeleteAttention)}
              message={t(this.props.messageXoaTag)}
            />
            <ChoieModal
              modalAnimation={true}
              modalSize={"sm"}
              ref={this.ModalElementThem}
              submitButtonText={t(this.props.tenNutThem)}
              onSubmitButtonClick={this.insert}
              message={t(this.props.messageThemTag)}
            />
          </div>
        )}
      </Translation>
    );
  }
}
CustomAutoComplete.defaultProps = {
  multipleTag: true, //Cho phép có nhiều hơn một tag
  placeholder: "", //Text mặc định cho autocomplete
  isKiemTraDuLieu: false, //Kiểm tra có hay không nhập dữ liệu khi rời đi
  messageXoaTag: "", // Text cảnh báo khi xóa tag
  tenNutXoa: transListTemp.GeneralConfiguration_Delete, //Tên nút khi đồng ý thông báo xóa tag
  messageThemTag: "", //Text cảnh báo khi thêm tag
  tenNutThem: transListTemp.GeneralConfiguration_Add, //Tên nút khi đồng ý thông báo thêm tag hoặc thay thế tag
  size: "small", //Size mặc định cho autocomplete
  isThongBaoXoa: false, //Bật tắt thông báo khi xóa tag
  isThongBaoThem: false, //Bật tắt thông báo khi thêm tag
  searchParams: null, //Tham số truyền thêm khi tìm kiếm ngoài keyword
  label: "", //Text mặc định trên autocomplete
  minChars: 0, //Số lượng ký tự tối thiểu để có thể tìm kiếm
  objectList: [], //Dữ liệu từ prop bên ngoài truyền vào tags
  selectedValue: "TenDonVi", //Thuộc tính sẽ dùng để đối chiếu khi xử lý gợi ý được chọn
  displayValue: "TenDonVi", //Thuộc tính sẽ dùng để hiện trong danh sách gợi ý
};
export default CustomAutoComplete;
