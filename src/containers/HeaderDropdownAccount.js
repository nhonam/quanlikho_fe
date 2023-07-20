import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import "../scss/layout/AppNavarBarLayout.scss";
import { useEffect } from "react";
import { useRef } from "react";
import { getIcon } from "src/utils/iconUtils";
import "../scss/layout/AppNavarBarLayout.scss";
const HeaderDropdownAccount = () => {
  const _isMounted = useRef();

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);
  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CDropdownToggle
        className="c-header-nav-link"
        style={{ color: "white" }}
        caret={false}
      >
        <div style={{ width: "30px" }}>
          {" "}
          {getIcon("user", { className: "icon-menu" })}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#" className="list-group-item-dark content-msg">
          <strong style={{ display: "flex", alignItems:'center' }}>
            <div style={{ fontSize: "10px", padding: "5px" }}>
              <img
                src="/assets/img/functions/tasks.svg"
                style={{ color: "black" }}
                alt="Lịch làm việc"
              />
            </div>
            Lịch làm việc
          </strong>
        </CDropdownItem>

        <CDropdownItem href="#" className="list-group-item-dark content-msg">
        <strong style={{ display: "flex", alignItems:'center' }}>
            <div style={{ fontSize: "10px", padding: "5px" }}>
              <img
                src="/assets/img/iconsMenu/robot.svg"
                style={{ color: "black", width:"20px" }}
                alt="Lịch làm việc"
              />
            </div>
            Quản lý tài khoản
          </strong>
        </CDropdownItem>

        <CDropdownItem className=" list-group-item-dark content-msg">
        <strong style={{ display: "flex", alignItems:'center' }}>
            <div style={{ fontSize: "10px" }}>
              <img
                src="/assets/img/iconsMenu/shutdown-16.svg"
                style={{ color: "black", width:"40px" }}
                alt="Lịch làm việc"
              />
            </div>
            Đăng xuất
          </strong>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default HeaderDropdownAccount;
