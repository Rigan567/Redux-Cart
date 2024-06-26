import React from "react";
import { NavContent } from "./Home";

const HeaderPhone = ({ menuOpen, setMenuOpen }) => {
  return (
    <div>
      <div className={`navPhone ${menuOpen ? "navPhoneComes" : ""}`}>
        <NavContent />
      </div>
    </div>
  );
};

export default HeaderPhone;
