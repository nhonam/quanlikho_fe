import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import PropTypes from "prop-types";

const Breadcrumb = ({ routes }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    let isMounted = true;
    /**
     * generate breadcrumbs
     * @param {*} routes layout routes
     * @param {*} pathName current pathName
     * @returns list [] breadcrumbs info
     */
    const getBreadcrumbs = (routes, pathName) => {
      const breadcrumbs = [];
      if (routes?.length > 0)
        pathName.split("/").reduce((prev, curr, index, array) => {
          const currentPathname = `${prev}/${curr}`;
          //const route = routes.find((route) => compareIgnoreCass(currentPathname, route.path))
          const route = routes.find((route) => currentPathname === route.path);
          if (pathName === currentPathname) {
            breadcrumbs.push({
              pathname: currentPathname,
              name: route?.name,
              active: index + 1 === array.length ? true : false,
            });
          }

          return currentPathname;
        });

      return breadcrumbs;
    };

    const newBreadcrumbs = getBreadcrumbs(routes, pathname);
    isMounted && setBreadcrumbs(newBreadcrumbs);

    return () => {
      isMounted = false;
    };
  }, [pathname, routes]);

  return (
    <CBreadcrumb className="pl-0 m-0 ms-2 border-bottom-0">

    </CBreadcrumb>
  );
};

Breadcrumb.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.any,
    })
  ).isRequired,
};

export default memo(Breadcrumb);
