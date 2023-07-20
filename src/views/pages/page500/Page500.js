import { CCol, CContainer, CRow } from "@coreui/react";
import { Translation } from "react-i18next";
import { useHistory } from "react-router-dom";
import configService from "src/configService";
import Footer from "src/containers/Footer";

const LanguageResource = {
    GeneralConfiguration_SomethingWhenWrong: "GeneralConfiguration_SomethingWhenWrong",
    GeneralConfiguration_GoBackOrContact: "GeneralConfiguration_GoBackOrContact",
    GeneralConfiguration_GoBack: "GeneralConfiguration_GoBack",
    GeneralConfiguration_ReturnHomePage: "GeneralConfiguration_ReturnHomePage",
}
//The server encountered an unexpected condition which prevented it from fulfilling the request.
const Page500 = () => {
    const { goBack, push } = useHistory()
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <Translation>
                        {(t) => (
                            <CCol md="6">
                                <div className="clearfix">
                                    <h1 className="float-left display-2 mr-4">500</h1>
                                    <h4 className="pt-3">Internal Server Error</h4>
                                    <p
                                        style={{ display: "contents" }}
                                        className="text-muted float-left"
                                    >
                                        {t(LanguageResource.GeneralConfiguration_SomethingWhenWrong)}.{" "}{t(LanguageResource.GeneralConfiguration_GoBackOrContact)}.
                                    </p>
                                </div>
                                <div className="mt-2 float-right">
                                    <button
                                        className=" btn btn-primary"
                                        type="button"
                                        onClick={goBack}
                                    >
                                        {t(LanguageResource.GeneralConfiguration_GoBack)}
                                    </button>
                                    <button
                                        className="ml-3 btn btn-secondary "
                                        type="button"
                                        onClick={() => push(configService.DEFAULT_ROUTER)}
                                    >
                                        {t(LanguageResource.GeneralConfiguration_ReturnHomePage)}
                                    </button>
                                </div>
                            </CCol>
                        )}
                    </Translation>
                </CRow>
                <CRow className="mt-2 justify-content-center">
                    <CCol md="6">
                        <Footer />
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Page500;
