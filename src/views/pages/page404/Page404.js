import { CCol, CContainer, CRow } from "@coreui/react";
import { Translation } from "react-i18next";
import Footer from "src/containers/Footer";
import configService from "src/configService";
import { useHistory } from "react-router-dom";

const LanguageResource = {
    GeneralConfiguration_PageUnavailable: "GeneralConfiguration_PageUnavailable",
    GeneralConfiguration_GoBack: "GeneralConfiguration_GoBack",
    GeneralConfiguration_ReturnHomePage: "GeneralConfiguration_ReturnHomePage"
}
//The server has not found anything matching the Request-URI
const Page404 = () => {
    const { goBack, push } = useHistory()
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">

                            <CCol md="6">
                                <div className="clearfix">
                                    <h1 className="float-left display-3 mr-4">404</h1>
                                    <h4 className="pt-3">Not Found</h4>
                                    <p
                                        className="text-muted float-left"
                                        style={{ display: "contents" }}
                                    >
                                        1123
                                    </p>
                                </div>
                                <div className="mt-2 float-right">
                                    <button
                                        className=" btn btn-primary"
                                        type="button"
                                        onClick={goBack}
                                    >
                                      123123
                                    </button>
                                    <button
                                        className="ml-3 btn btn-secondary "
                                        type="button"
                                        onClick={() => push(configService.DEFAULT_ROUTER)}
                                    >
                                      12312
                                    </button>
                                </div>
                            </CCol>
   
                </CRow>
                <CRow className="mt-2 justify-content-center">
                    <CCol md="6">
                        <Footer />
                    </CCol>
                </CRow>
            </CContainer>
        </div >
    );
};

export default Page404;
