import { useEffect, useRef, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CSidebar,
  CSidebarBrand,
  CToggler,
  CSidebarMinimizer,
  CBadge,
  CSidebarNav,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarFooter,
} from "@coreui/react";
import { layoutRoute, adminRoute } from "./AppRoute";
import { BsList } from "react-icons/bs";

import CIcon from "@coreui/icons-react";
import "../scss/layout/AppNavarBarLayout.scss";
import configService from "src/configService";
import NavCustomMaquree from "./NavCustomMaquree";
import { isNotNullOrEmpty, uuidv4 } from "src/utils/funcUtils";
import { getIcon } from "src/utils/iconUtils";

const handleResize = () => {
  const myDiv = document.getElementsByClassName("ps");
  if (isNotNullOrEmpty(myDiv)) {
    const { innerHeight } = window;
    try {
      [...myDiv].forEach((x) => {
        if (innerHeight < x.scrollHeight) {
          x.scrollTop++;
          x.scrollTop = myDiv.scrollTop - 1;
        }
      });
    } catch {}
  }
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const [navigation, setNavigation] = useState();
  const [onpenDropDownAtKey] = useState();

  const show = useSelector((state) => state.ChangeState.sidebarShow);
  const isMinimize = useSelector((state) => state.ChangeState.sidebarMinimize);
  const _isMounted = useRef(false);
  const [routes] = useState([...layoutRoute, ...adminRoute]);
  /**
   * toggle minimize sidebar
   */
  const toggleSidebarMinimize = () => {
    const minimize = document.getElementsByClassName("c-sidebar-minimizer")[0];
    minimize.click();
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (_isMounted.current) {
      const showBadges = {};
      const handleSideBar = (navigation, key, _, index = 0) => {
        // if (navigation.IsHidden)
        //     return <Fragment key={key} />

        const name = <NavCustomMaquree children={navigation.name} />;
        const badge = showBadges[navigation.Idc];
        const customIcon = (
          <div className="chiba-icon-container">
            {getIcon(navigation.IconName, { className: "icon-menu" })}
            <CBadge
              hidden={!(badge !== undefined && badge !== null)}
              variant="info"
              color="success"
              shape="pill"
              className={"chiba-badge-pill"}
            >
              {isNaN(badge) ? badge : badge > 99 ? "99+" : badge}
            </CBadge>
          </div>
        );
        if (isNotNullOrEmpty(navigation)) {
          return (
            <CSidebarNavDropdown
              key={key}
              name={name}
              id={uuidv4()}
              className={navigation.length > 5 ? "custom-scroll" : ""}
              icon={customIcon}
              route={navigation.Link ?? undefined}
              // show={onpenDropDownAtKey?.startsWith(key) ?? false}
              show={onpenDropDownAtKey?.split("_")[index] === `${key}` ?? false}
              children={navigation.map((x, i) =>
                handleSideBar(x, `${key}_${i}`)
              )}
            />
          );
        }

        return (
          <CSidebarNavItem
            name={name}
            key={key}
            id={uuidv4()}
            to={navigation.path}
            icon={customIcon}
          />
        );
      };

      setNavigation(routes?.map(handleSideBar));
    } else {
      setNavigation();
    }
  }, []);

  return (
    <CSidebar
      className="nava-csidebar"
      show={show}
      onShowChange={(val) => dispatch?.({ type: "set", sidebarShow: val })}
      minimize={isMinimize}
      onMinimizeChange={(val) => {
        dispatch?.({ type: "set", sidebarMinimize: !val });
      }}
    >
      <CSidebarBrand
        className="d-md-down-none"
        to={configService.DEFAULT_ROUTER}
      >
        <div style={{width:"100px"}}>
        {getIcon("LOGO", { className: "icon-menu" })}
        </div>
      </CSidebarBrand>
      <CToggler
        hidden={!show}
        inHeader
        className="d-md-down-none layout-toggler minimizer-header chiba-toggle-sidebar"
        onClick={toggleSidebarMinimize}
      >
        <BsList size="45" color="#fff" />
      </CToggler>
      <CSidebarNav>{navigation}</CSidebarNav>

      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default Sidebar;
