import { CustomerService } from "../../services";
import BaseActions from "../BaseActions";

const actionsProps = {
  dispatchType: "_CUSTOMER",
  service: CustomerService,
  actionType: {},
};
const languageResource = {

  GeneralConfiguration_Individual: "Cá nhân",
  GeneralConfiguration_Organization: "Tổ chức",
  //GENDER
  GeneralConfiguration_Male: "Nam",
  GeneralConfiguration_Female: "Nữ",
  GeneralConfiguration_Other: "Khác",
}
class CustomerActions extends BaseActions {
  arrGender = [
    {
      name: languageResource.GeneralConfiguration_Male,
      title: "Nam",
      value: 2,
    },
    {
      name: languageResource.GeneralConfiguration_Female,
      title: "Nữ",
      value: 3,
    },
    {
      name: languageResource.GeneralConfiguration_Other,
      title: "Khác",
      value: 4,
    },
  ];
  arrSubmissionSubjects = [
    {
      name: languageResource.GeneralConfiguration_Individual,
      title: "Cá nhân",
      value: 1,
    },
    {
      name: languageResource.GeneralConfiguration_Organization,
      title: "Tổ Chức",
      value: 2
    }
  ];
  arrNationality = [
    {
      Id: null,
      Name: "Việt Nam",
      Value: "VN",
      IsDefault: null,
      Prio: 1,
      Parent: null
    },
    {
      Id: null,
      Name: "Nhật Bản",
      Value: "JP",
      IsDefault: null,
      Prio: 2,
      Parent: null
    },
    {
      Id: null,
      Name: "Mỹ",
      Value: "USA",
      IsDefault: null,
      Prio: 2,
      Parent: null
    },
  ];

  GetByName = (username, params) => async (dispatch) => {
    try {
      const response = await this.service.GetByIdc(username, params);
      if (response.status === 200) {
        this._setDispatch(
          this.actionType.FIND_SINGLE_ITEM,
          response.data
        )(dispatch);
      }

      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  SearchIndividual = ( params) => async (dispatch) => {
    try {
      const response = await this.service.SearchIndividual(params);

      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  SearchOrganization = (params) => async (dispatch) => {
    try {
      const response = await this.service.SearchOrganization(params);
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  GetByCitizenIdentityCardNumber = (code, params) => async (dispatch) => {
    try {
      const response = await this.service.GetByCitizenIdentityCardNumber(code, params);
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  GetByBusinessRegistrationNumber = (code, params) => async (dispatch) => {
    try {
      const response = await this.service.GetByBusinessRegistrationNumber(code, params);
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
}

var action = new CustomerActions(actionsProps);
export default action;
