import { CFooter } from '@coreui/react';
import "../scss/layout/FooterLayout.scss"
import configService from 'src/configService';

const Footer = (props) => (
    <CFooter {...props} fixed={false} className="footer-layout" >
        {/* <span className="ml-auto" >
            <a href={configService.chiba_URL}>chiba </a>
            Copyright &copy; 2020.
        </span> */}
    </CFooter>
)

export default Footer;
