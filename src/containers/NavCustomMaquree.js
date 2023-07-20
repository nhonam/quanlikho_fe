import { CLabel } from "@coreui/react";
import { useState } from "react";
import Marquee from "react-fast-marquee";

const NavCustomMaquree = ({ color, children, ...rest }) => {
  const [start, setStart] = useState(false);

  return (
    <div
      className="chiba-custom-maquree"
      onMouseLeave={() => setStart(false)}
      onMouseEnter={() => setStart(true)}
    >
      <CLabel className={"pr-5"} tag="span">
        {children}
      </CLabel>
    </div>
  );
};

export default NavCustomMaquree;
