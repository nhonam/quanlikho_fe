import {
    CBadge,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import "../scss/layout/AppNavarBarLayout.scss";
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
// import { AuthenticateActions } from 'src/actions';

const HeaderDropdownNotice = () => {
    const _isMounted = useRef()
    const [unreadNotificationsCount ] = useState(0)
    // const [arrNotification, setArrNotification] = useState(null)
    // const authData = useSelector(    state => state.User.userInfor)

    useEffect(() => {
        _isMounted.current = true
        return () => {
            _isMounted.current = false
        }
    }, [])
    return (
        <CDropdown
            inNav
            className="c-header-nav-item mx-2"
            direction="down"
        >
            <CDropdownToggle className="c-header-nav-link" style={{ color: "white" }} caret={false}>
                <CIcon name="cil-bell" size="lg" /><CBadge shape="pill" color="danger">{unreadNotificationsCount}</CBadge>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem
                    header
                    tag="div"
                    color="light"
                >
                    <strong className="noti-read">Bạn có <span style={{ color: "red" }}>{unreadNotificationsCount}</span> thông báo chưa đọc</strong>
                </CDropdownItem>
                <CDropdownItem href="#" className="list-group-item-light content-msg">
                    <div className="message">
                        <div>
                            <small className="text-muted chiba-unread-notifi">Nguyễn Văn A </small>
                            <small className="text-muted float-right mt-1 cancel-x">
                                <CIcon name="cil-x" />
                            </small>
                            <small className="text-muted float-right mt-1 chiba-unread-notifi" >
                                22/03/2021 &nbsp;</small>
                        </div>
                        {/* <div className="text-truncate font-weight-bold">
                    <span className="fa fa-exclamation text-danger"></span> Important message
                </div> */}
                        <div className="conent-notification small text-muted text-truncate chiba-unread-notifi">
                            Nguyễn Văn A gửi một văn bản cần xử lý ABCXYZ
                        </div>
                    </div>
                </CDropdownItem>

                <CDropdownItem href="#" className="list-group-item-light content-msg">
                    <div className="message">
                        <div>
                            <small className="text-muted chiba-unread-notifi">Huỳnh Văn B </small>
                            <small className="text-muted float-right mt-1 cancel-x">
                                <CIcon name="cil-x" />
                            </small>
                            <small className="text-muted float-right mt-1 chiba-unread-notifi">
                                22/03/2021 &nbsp;</small>
                        </div>
                        {/* <div className="text-truncate font-weight-bold">
                    <span className="fa fa-exclamation text-danger"></span> Important message
                </div> */}
                        <div className="conent-notification small text-muted text-truncate chiba-unread-notifi">
                            Huỳnh Văn B gửi một văn bản
                        </div>
                    </div>
                </CDropdownItem>

                <CDropdownItem href="#" className="list-group-item-dark content-msg">
                    <div className="message">
                        <div>
                            <small className="text-muted">Nguyễn Xuân An </small>
                            <small className="text-muted float-right mt-1 cancel-x">
                                <CIcon name="cil-x" />
                            </small>
                            <small className="text-muted float-right mt-1">
                                22/03/2021 &nbsp;</small>
                        </div>
                        {/* <div className="text-truncate font-weight-bold">
                    <span className="fa fa-exclamation text-danger"></span> Important message
                </div> */}
                        <div className="conent-notification small text-muted text-truncate">
                            Nguyễn Xuân An gửi một văn bản
                        </div>
                    </div>
                </CDropdownItem>

                <CDropdownItem href="#" className="list-group-item-dark content-msg">
                    <div className="message">
                        <div>
                            <small className="text-muted">Bùi Anh Tuấn </small>
                            <small className="text-muted float-right mt-1 cancel-x">
                                <CIcon name="cil-x" />
                            </small>
                            <small className="text-muted float-right mt-1">
                                22/03/2021 &nbsp;</small>
                        </div>
                        {/* <div className="text-truncate font-weight-bold">
                    <span className="fa fa-exclamation text-danger"></span> Important message
                </div> */}
                        <div className="conent-notification small text-muted text-truncate">
                            Bùi Anh Tuấn gửi một văn bản cần xử lý ABCXYZ
                        </div>
                    </div>
                </CDropdownItem>

                {/* <CDropdownItem onClick={this.sendNotification.bind(this)} className="text-center border-top"><strong>Xem tất cả thông báo</strong></CDropdownItem> */}
                <CDropdownItem className="text-center chiba-xem-tat-ca border-top"><strong>Xem tất cả thông báo</strong></CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default HeaderDropdownNotice