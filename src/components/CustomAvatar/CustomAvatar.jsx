import React, { PureComponent } from "react";
import "./CustomAvatar.styles.scss";
import { Button } from "react-bootstrap";
import {
  CCol,
  //  CFormGroup,
  CInputFile,
  CLabel,
} from "@coreui/react";

class CustomAvatar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      file: "",
      imagePreviewUrl: "",
    };
  }

  //   UNSAFE_componentWillMount = () => {
  //     console.log("CustomAvatar will mount");
  //   };

  //   componentDidMount = () => {
  //     console.log("CustomAvatar mounted");
  //   };

  //   UNSAFE_componentWillReceiveProps = (nextProps) => {
  //     console.log("CustomAvatar will receive props", nextProps);
  //   };

  //   UNSAFE_componentWillUpdate = (nextProps, nextState) => {
  //     console.log("CustomAvatar will update", nextProps, nextState);
  //   };

  //   componentDidUpdate = () => {
  //     console.log("CustomAvatar did update");
  //   };

  //   componentWillUnmount = () => {
  //     console.log("CustomAvatar will unmount");
  //   };

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    // console.log("handle uploading-", this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    // console.log(this.state.file);
    let { imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (
        <img
          className="imgAvatar"
          src={imagePreviewUrl}
          alt={this.state.file.name}
        />
      );
    } else {
      imagePreview = <div className="previewText"  onChange={(e) => this._handleImageChange(e)}>Avatar</div>;
    }
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="CustomAvatar">
        <div className="previewComponent">
          <form onSubmit={(e) => this._handleSubmit(e)}>
            <div className="imgPreview">{imagePreview}</div>
            <CCol className="upload-avatar" xs="6" md="3">
              <CInputFile
                // id="file-multiple-input"
                name="file-multiple-input"
                custom
                onChange={(e) => this._handleImageChange(e)}
              />
              <CLabel htmlFor="file-multiple-input" variant="custom-file">
                {this.state.file !== ""
                  ? this.state.file.name
                  : "Chưa hình tải lên..."}
              </CLabel>
            </CCol>
            <Button variant="primary" onClick={(e) => this._handleSubmit(e)}>
              Cập nhật ảnh
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default CustomAvatar;
