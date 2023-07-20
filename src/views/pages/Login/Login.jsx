import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Forms";
import "./auth.scss"
import { UserActions } from "src/actions";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateLogin = () => {
        let isValid = true;

        let validator = Form.validator({
            username: {
                value: username,
                isRequired: true,
            },
            password: {
                value: password,
                isRequired: true,
                minLength: 1,
            },
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors,
            });

            isValid = false;
        }
        return isValid;
    };

    const authenticate = (e) => {
        e.preventDefault();

        const validate = validateLogin();

        if (validate) {
            setValidate({});
            setUsername("");
            setPassword("");
        }
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit =async(e)=>{
        e.preventDefault()
        const func =  await UserActions.Login({username:username, password: password})()
     
    }
    return (
        <div className="row g-0 auth-wrapper">
            <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask"></div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <h1 style={{color:'white'}} >Phần mềm quản lý kho</h1>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" onSubmit={handleSubmit} autoComplete={"off"}>
                                <div className="username mb-3">
                                    <input
                                        type="username"
                                        className={`form-control ${
                                            validate.validate && validate.validate.username ? "is-invalid " : ""
                                        }`}
                                        id="username"
                                        name="username"
                                        value={username}
                                        placeholder="Tên đăng nhập"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <div
                                        className={`invalid-feedback text-start ${
                                            validate.validate && validate.validate.username ? "d-block" : "d-none"
                                        }`}>
                                        {validate.validate && validate.validate.username
                                            ? validate.validate.username[0]
                                            : ""}
                                    </div>
                                </div>

                                <div className="password mb-3">
                                    <div className="input-group border-1 border bg-white ">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`form-control border-0 ${
                                                validate.validate && validate.validate.password ? "is-invalid " : ""
                                            }`}
                                            name="password"
                                            id="password"
                                            value={password}
                                            placeholder="Mật khẩu"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <button type="button" className="btn btn-sm" onClick={(e) => togglePassword(e)}>
                                            <i className={showPassword ? "far fa-eye" : "far fa-eye-slash"}></i>{" "}
                                        </button>
                                    </div>
                                    <div
                                        className={`invalid-feedback text-start ${
                                            validate.validate && validate.validate.password ? "d-block" : "d-none"
                                        }`}>
                                        {validate.validate && validate.validate.password
                                            ? validate.validate.password[0]
                                            : ""}
                                    </div>
                                    <div className="extra mt-3 row justify-content-between">
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="remember"
                                                    checked={remember}
                                                    onChange={(e) => setRemember(e.currentTarget.checked)}
                                                />
                                                <label className="form-check-label" htmlFor="remember">
                                                    Nhớ mật khẩu
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="forgot-password text-end">
                                                <Link to="/forgot-password">
                                                    <div style={{color:'white'}}>Quên mật khẩu?</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
