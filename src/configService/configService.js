class Configuration {// Setup 
    SSO_URL = process.env.REACT_APP_SSO_URL;
    APP_URL = process.env.REACT_APP_APP_URL;

    DEFAULT_ROUTER = "/dashboard";
    LOCATE_DATE = "vi"

    DATE_MIN = new Date("1950-01-01")
    DATE_Max = new Date()

}
const config = new Configuration();
export default config;
