import axios from "axios";
import AuthenticateActions from "src/actions/sysActions/AuthenticateActions";
import configService from "../configService";

const Configuration = configService;


axios.interceptors.request.use(
  function (config) {
    const token = AuthenticateActions.GetAuth();
    console.log(token);
    if (token?.length > 0) config.headers["Authorization"] = "Bearer "+ `${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

class BaseService {
  constructor(props) {
    this.config = Configuration;
    this.serviceUrl = this.config.APP_URL;
  }
}

export default BaseService;
