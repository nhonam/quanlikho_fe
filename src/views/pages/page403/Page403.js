import { CCol, CContainer, CRow } from "@coreui/react";
import { Translation } from "react-i18next";
import Footer from "src/containers/Footer";

const LanguageResource = {
    GeneralConfiguration_Forbidden: "GeneralConfiguration_Forbidden",
}
//The server understood the request, but is refusing to fulfill
const Page403 = (props) => {
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <Translation>
                        {(t) => (
                            <CCol md="6">
                                <span className="clearfix">
                                    <h1 className="float-left display-2 mr-4">403</h1>
                                    <h4 className="pt-3">Forbidden</h4>
                                    <p
                                        className="text-muted float-left"
                                        style={{ display: "contents" }}
                                    >
                                        {props.unSupportIE
                                            ? <span>End of support for Internet Explorer (IE) 11.</span>
                                            : <span>{t(LanguageResource.GeneralConfiguration_Forbidden)}.{" "}</span>}
                                    </p>
                                </span>
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

export default Page403;
