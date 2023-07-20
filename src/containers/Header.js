import { useSelector, useDispatch } from 'react-redux';
import {
    CHeader,
    CToggler,
    CHeaderNav,
} from '@coreui/react';
import '../scss/layout/HeaderLayout.scss';
import { BsList } from "react-icons/bs";
import { getIcon } from 'src/utils/iconUtils';
import HeaderDropdownNotice from './HeaderDropdownNotice';
import HeaderDropdownAccount from './HeaderDropdownAccount';
// import HeaderDropdownNotice from './HeaderDropdownNotice';

const Header = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector(state => state.ChangeState.sidebarShow);
    /**
     * toggle minimize sidebar for mobile
     */
    const toggleSidebarMobile = (sidebarShow) => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
        dispatch({ type: 'set', sidebarShow: val });
    }

    return (
        <>
            <CHeader withSubheader className="m-0">
                <CToggler
                    inHeader
                    className="d-lg-none layout-toggler minimizer-header chiba-toggle-header"
                    onClick={() => toggleSidebarMobile(sidebarShow)}>
                    <BsList size="32" color="#fff" />
                </CToggler>
                <CHeaderNav >
                         {/* {getIcon("logomanager",{className:"icon-menu"})} */}
                    <HeaderDropdownNotice/>
                    <HeaderDropdownAccount />
                </CHeaderNav>
            </CHeader >
        </>
    )
}

export default Header;
