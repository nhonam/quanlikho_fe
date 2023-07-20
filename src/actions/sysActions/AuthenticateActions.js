import configService from "src/configService";
import { isNotNullOrEmpty } from "src/utils/funcUtils";

class AuthenticateActions {
    constructor() {
        this.searchParams = {
            redirectUrl: "",
            clientId: configService.CLIENT_ID,
            key: "",
            search: "",
            code: "",
            forget: "",
            username: "",
            paramName: {
                client_id: "client_id",
                key: "key",
                code: "code",
                redirect_url: "redirect_url",
                forget: "forget",
                username: "username",
            },
            actionKey: {
                signout: "signout",
                login: "login",
            }
        };
        this.authorizationData = 'authorizationData'
        this.Id = 'Id'
        this.UserName = 'UserName'
        this.FullName = 'FullName'
        this.UserId = 'UserId'
        this.IsAdmin = 'IsAdmin'
        this.Email = 'Email'
        this.Phone = 'Phone'
        this.Photo = 'Photo'
        this.Token = 'Token'
        this.Prio = 'Prio'
        this.RoleNames = 'RoleNames'
        this.TimeIn = 'TimeIn'
        this.Expires = 'Expires'
        this.IsChangePassword = 'IsChangePassword'
        //
        this.Prio = 'Prio'
        this.Unit = 'Unit'
        this.Department = 'Department'
        this.Units = 'Units'
        this.Departments = 'Departments'
        this.WorkingGroups = 'WorkingGroups'
        this.Positions = 'Positions'
        this.Substitutes = 'Substitutes'
        this.Employee = "Employee"
        this.Employees = "Employees"
    }
    /**
     * get auth from local storage 
     * @returns auth data
     */
    GetAuth() {
        const auth = localStorage.getItem(this.authorizationData)
        return auth?.length > 0 ? auth : null
    }
    /**
     * Remove auth from local storage
     */
    RemoveAuth() {
        localStorage.removeItem(this.authorizationData);
    }
    /**
     * set auth to local storage
     * @param {*} data auth data
     */
    SetAuth(data, employee) {
        localStorage.setItem(this.authorizationData, data);
        localStorage.setItem("employee", employee)
    }
    /**
     * parse Auth data to a useable data 
     * @param {*} loginInfo verify login info
     * @returns useable login info
     */
    AssignAuth(loginInfo) {
        return {
            [this.Id]: loginInfo.Id,
            [this.UserName]: loginInfo.UserName,
            [this.FullName]: loginInfo.FullName,
            [this.UserId]: loginInfo.UserId,
            [this.Email]: loginInfo.Email,
            [this.Phone]: loginInfo.Phone,
            [this.Photo]: loginInfo.Photo,
            [this.Token]: loginInfo.Token ?? this.GetAuth(),
            [this.Prio]: isNaN(loginInfo.Prio) ? null : Number(loginInfo.Prio),
            // A JSON numeric value representing the number of seconds from
            // 1970-01-01T00:00:00Z UTC until the specified UTC date/time,
            // ignoring leap seconds. This is equivalent to the IEEE Std 1003.1,
            // 2013 Edition [POSIX.1] definition "Seconds Since the Epoch",
            // in which each day is accounted for by exactly 86400 seconds,
            // other than that non-integer values can be represented.
            // See RFC 3339 [RFC3339] for details regarding date/times in general and UTC in particular.
            // https://www.rfc-editor.org/rfc/rfc7519#section-2
            [this.TimeIn]: loginInfo.TimeIn,
            [this.Expires]: loginInfo.Expires,
            // [this.RoleNames]:
            //     loginInfo.RoleNames?.length > 0
            //         ? loginInfo.RoleNames.split(',').map((x) =>
            //               x.trim().toUpperCase(),
            //           )
            //         : [],
            [this.IsAdmin]: loginInfo.IsAdmin,
            [this.IsChangePassword]: loginInfo.IsChangePassword,
            // Nghiệp vụ người dùng
            [this.Prio]: loginInfo.Prio,
            [this.Unit]: loginInfo.Unit,
            [this.Department]: loginInfo.Department,
            // [this.Units]: loginInfo.Units?JSON.parse(loginInfo.Units):null,
            [this.Units]: Array.isArray(loginInfo.Units)
                ? loginInfo.Units
                : isNotNullOrEmpty(loginInfo.Units)
                ? JSON.parse(loginInfo.Units)
                : null,
            [this.Departments]: Array.isArray(loginInfo.Departments)
                ? loginInfo.Departments
                : isNotNullOrEmpty(loginInfo.Departments)
                ? JSON.parse(loginInfo.Departments)
                : null,
            // [this.Positions]: loginInfo.Positions,
            [this.Positions]: Array.isArray(loginInfo.Positions)
                ? loginInfo.Positions
                : isNotNullOrEmpty(loginInfo.Positions)
                ? JSON.parse(loginInfo.Positions)
                : null,
            // [this.WorkingGroups]: loginInfo.WorkingGroups,
            [this.WorkingGroups]: Array.isArray(loginInfo.WorkingGroups)
                ? loginInfo.WorkingGroups
                : isNotNullOrEmpty(loginInfo.WorkingGroups)
                ? JSON.parse(loginInfo.WorkingGroups)
                : null,
            // [this.Substitutes]: loginInfo.Substitutes,
            [this.Substitutes]: Array.isArray(loginInfo.Substitutes)
                ? loginInfo.Substitutes
                : isNotNullOrEmpty(loginInfo.Substitutes)
                ? JSON.parse(loginInfo.Substitutes)
                : null,
            [this.Employee]: loginInfo.Employee,
            [this.Employees]:
            Array.isArray(loginInfo.Employees)
            ? loginInfo.Employees
            : isNotNullOrEmpty(loginInfo.Employees)
            ? JSON.parse(loginInfo.Employees)
            : null, 
        }
    }
    /**
     * laays lấy thông tin người dùng
     * @param {*} auth { FullName: string, Department: string, Unit: string}
     * @returns FullName / Department / Unit
     */
    GetUserInfo(auth){
        let result = auth[this.FullName]
        if(auth[this.Department]){
            result += " / " + auth[this.Department]
        }
        if(auth[this.Unit]){
            result += " / " + auth[this.Unit]
        }

        return result
    }
    GetTokenCode4Verify() {
        let token = this.GetAuth()
        try {
            const search = new URLSearchParams(window.location.search)
            if (search.has(this.searchParams.paramName.code)) {
                token = search.get(this.searchParams.paramName.code)
                if (token) {
                    this.SetAuth(token)
                }
                search.delete(this.searchParams.paramName.code)
                window.location.search = search.toString()
            }
        } catch {
            token = null
        }

        return token
    }

    redirectToSSO(isLogout) {

        this.RemoveAuth()
        // const redirect_url = encodeURIComponent(window.location.origin + (isLogout ? "" : window.location.pathname))
        // return window.location.assign(`${configService.SSO_URL}`)
    }
    CheckAuth(auth, now = new Date()) {
    // CheckAuth(auth, now = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).getTime()) {
        return (
            auth &&
            auth[this.Token] &&
            auth[this.TimeIn] &&
            auth[this.Expires] &&
            now.getTime() <= new Date(auth[this.Expires]).getTime()
    );
    }
}

const action =  new AuthenticateActions()
export default action