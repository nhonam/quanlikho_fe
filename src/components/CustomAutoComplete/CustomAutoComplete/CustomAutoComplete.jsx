import React from "react";
import TagsInput from "react-tagsinput";

import Autosuggest from "react-autosuggest";
import "./CustomAutoComplete.styles.scss";
// import { Fragment } from "react";

//https://github.com/olahol/react-tagsinput

const clone = (obj) => {
  if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
    return obj;

  let temp
  if (obj instanceof Date)
    temp = new obj.constructor(); //or new Date(obj);
  else temp = obj.constructor();

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj['isActiveClone'] = null;
      temp[key] = clone(obj[key]);
      delete obj['isActiveClone'];
    }
  }
  return temp;
}

class CustomAutoComplete extends React.Component {
  sourceAction = (keyword) => async (dispatch) => {
    try {
      var res = await new Promise();

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Thay thế cho componentWillReceiveProps
  static getDerivedStateFromProps(nextProps, prevState) {
    const {useExternalProp, selectedValue, } = nextProps;
    const objectList = clone(nextProps.objectList)

   if(useExternalProp && objectList){
      var tagList = [];

      if(objectList.length !== 0) {
        objectList.forEach((item, index) => {
          item && typeof(item) === 'object' && tagList.push(item[selectedValue]);
        });
      }

      tagList = [...new Set(tagList)];

      return { tags: tagList, selectedTagObjects: objectList };
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      tags: [],
      selectedTagObject: null,
      selectedTagObjects: [],
      value: '',
      tagsObject: [],
      textInput: "",
    };
    
    this.renderAutocompleteInput = this.renderAutocompleteInput.bind(this);
    this.defaultRenderLayout = this.defaultRenderLayout.bind(this);
    this.defaultRenderTag = this.defaultRenderTag.bind(this);

    this.handleChange = this.handleChange.bind(this); 
  }
  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleChange(newTags, changedTags, changedIndexes) {
    
    var tags = this.state.tags;
    var selectedTagObject = this.state.selectedTagObject;
    var selectedTagObjects = this.state.selectedTagObjects;
    const { multipleTag, deleteCallback, selectedValue } = this.props;

    //Lọc những tag trùng lặp
    newTags = [...new Set(newTags)];

    //Chỉ cho phép có một tag
    if(!multipleTag){
      newTags = newTags.slice(0, 1);
    }

    tags = newTags;

    //Xóa tag
    if(this.state.tags.length > newTags.length){ 
      selectedTagObject = null;
      changedTags.forEach((tag, index) => {
        const idx = selectedTagObjects.findIndex(x => x[selectedValue] === tag);
        if(idx !== -1){
          selectedTagObjects.splice(idx,1);
        }
      });

      this.setState({tags, selectedTagObject, selectedTagObjects}, () => {
        deleteCallback && deleteCallback(changedTags);
      });
    }
    else {
      this.setState({tags});
    }
  }
  //Lấy danh sách object bằng cách gọi qua action được truyền vào
  searchWithKeyword = (keyword) => {
    const { 
      minChars, 
      sourceAction, 
      searchParams
      //  tagsObject, selectedValue 
    } = this.props;
    
    //Chỉ tìm khi độ dài keyword bằng hoặc lớn hơn minChars
    ;
    if (keyword !== undefined && keyword !== null && keyword.length >= (minChars || 0)){
      if (sourceAction)
        if(searchParams !== undefined && searchParams !== null){
          sourceAction(keyword, searchParams).then((response) => {
            if (response) {
              if (response.status === 200 && response.data) {
                this._isMounted && this.setState({ tagsObject: response.data });
              } else {
                console.log(
                  "error",
                  "#" + response.status + " - " + response.message
                );
              }
            }
          });
        } else {
          sourceAction(keyword).then((response) => {
            if (response) {
              if (response.status === 200 && response.data) {
                this._isMounted && this.setState({ tagsObject: response.data });
              } else {
                console.log(
                  "error",
                  "#" + response.status + " - " + response.message
                );
              }
            }
          });
        }
    }
  };

  defaultRenderLayout(tagComponents, inputComponent) {
    const { placeholder, disableInput } = this.props;

    return (
      <div className="chiba-render-layout">
        {tagComponents}
        {/* {inputComponent} */}
        {this.props.activeTags ? (
          inputComponent
        ) : (
          <input
            className="form-control chiba-inpurt-text-search"
            type="text"
            // id="name"
            placeholder={placeholder}
            required=""
            disabled={disableInput ? disableInput : false}
            value={this.state.textInput ? this.state.textInput : ''}
            onChange={(e) =>
              this.setState({
                textInput: e.target.value
              })
            }
          ></input>
        )}
      </div>
    );
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    }, () => {
      //Gọi đến hàm tìm kiếm mỗi khi người dùng nhập text
      this.searchWithKeyword(this.state.value);
    });
    
  };

  onKeyDown = (e) => {
    const { multipleTag } = this.props;

    if (e.keyCode === 13) { // Enter
        // Stop it here
        e.preventDefault();

        const value = "";
        const tags = this.state.tags;
      
        if(multipleTag || (!multipleTag && tags.length === 0)) {
          tags.push(this.state.value);
        }
        
        const newStags = [...new Set(tags)];

        this.setState({
          value,
          tags: newStags
        });

        e.stopPropagation();
        // Do something else...
    }
  }

  renderAutocompleteInput({ addTag, ...props }) {
    const {
      placeholder,
      disableInput,
      multipleTag,
      selectedValue, //Thuộc tính sẽ dùng để đối chiếu khi xử lý gợi ý được chọn
      displayValue, //Thuộc tính sẽ dùng để hiện trong danh sách gợi ý
      renderDisplay, //Nếu muốn hiện nhiều hơn một thuộc tính của object gợi ý thì dùng hàm này
      searchCallback
    } = this.props;
    const { value, tagsObject } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      ...props,
      value,
      placeholder: placeholder,
      disabled: disableInput ? disableInput : false,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    return (
      <Autosuggest
        ref={props.ref}
        inputProps={inputProps}
        suggestions={tagsObject ? tagsObject : []}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion[selectedValue]}
        renderSuggestion={(suggestion) => {
          if (renderDisplay) {
            //Hiện danh sách gợi ý dựa vào renderDisplay hoặc displayValue truyền vào
            return renderDisplay(suggestion);
          } else {
            <span>{suggestion[displayValue]}</span>;
          }
        }}
        onSuggestionSelected={(e, { suggestion }) => {
          const state = { ...this.state };

          const value = "";
          const selectedTagObject = suggestion;
          const selectedTagObjects = state.selectedTagObjects;

          //Thêm object được chọn vào danh sách object được chọn
          const tags = this.state.tags;
          const indexExsist = selectedTagObjects.findIndex(
            (x) => x[selectedValue] === suggestion[selectedValue]
          );

          if(!multipleTag){
            tags.length = 0;
            selectedTagObjects.length = 0;
          }

          if (indexExsist === -1) {
            selectedTagObjects.push(suggestion);
            tags.push(suggestion[selectedValue]);
          }

          // //Hàm thêm tag vào danh sách sẽ hiện trên giao diện
          // addTag(selectedTagObject[selectedValue]);

          this.setState({
            value,
            tags,
            selectedTagObject,
            selectedTagObjects
          }, () => {
            if(searchCallback){
              searchCallback(selectedTagObject, selectedTagObjects);
            }
          });
        }}
        onSuggestionsClearRequested={() => { }}
        onSuggestionsFetchRequested={() => { }}
      />
    );
  }
  //tags
  defaultRenderTag(props) {
    const { disableRemove } = this.props;

    let {
      tag,
      key,
      disabled,
      onRemove,
      classNameRemove,
      getTagDisplayValue,
      ...other
    } = props;

    disabled = disableRemove ? disableRemove : false;
    return (
      <span key={key} classkey={key} {...other}>
        <span className="chiba-tag-name">{getTagDisplayValue(tag)}</span>
        {!disabled && (
          <span className="chiba-tag-button">
            <span className={classNameRemove} onClick={(e) => onRemove(key)}>
              x
            </span>
          </span>
        )}

      </span>
    );
  }

  render() {

    return (
      <div className="chiba-tags-input">
        <TagsInput
          renderInput={this.renderAutocompleteInput}
          value={
            this.state.tags
          }
          onChange={this.handleChange}
          inputProps={{
            className: "react-tagsinput-input"
          }}
          renderTag={this.defaultRenderTag}
          renderLayout={this.defaultRenderLayout}
        />
      </div>
    );
  }
}

CustomAutoComplete.defaultProps = {
  minChars: 0, //Số lượng ký tự tối thiểu để có thể tìm kiếm
  disableInput: false, //Không cho phép nhập từ khóa tìm kiếm
  activeTags: true, //Sử dụng thẻ tag (Chức năng năng autocomplete sẽ tắt nếu activeTags = false)
  multipleTag: true, //Cho phép có nhiều hơn một tag
  objectList: [], //Dữ liệu từ prop bên ngoài truyền vào tags
  searchParams: null, //Tham số truyền thêm khi tìm kiếm ngoài keyword
  useExternalProp: false, //Cho phép lấy dữ liệu từ prop bên ngoài truyền vào
  placeholder: "Nhập...", //Text mặc định cho autocomplete
  disableRemove: false, //Không cho phép xóa tag
  selectedValue: "Ten", //Thuộc tính sẽ dùng để đối chiếu khi xử lý gợi ý được chọn
  displayValue: "Ten", //Thuộc tính sẽ dùng để hiện trong danh sách gợi ý
  renderDisplay: null, //Nếu muốn hiện nhiều hơn một thuộc tính của object gợi ý thì dùng hàm này
  searchCallback: null, //Hàm xử lý sau khi tìm thành công
  deleteCallback: null, //Hàm xử lý sau khi đã xóa tag
}

export default CustomAutoComplete;