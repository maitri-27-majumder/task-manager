import React from "react";

const Header = () => {
  return (
    <div className="header__wrapper">
      <div className="header__bg"></div>
      <div className="header__content-wrapper">
        <div>
          <div>Task Manager</div>
          <div>Manage your Tasks Efficiently</div>
        </div>
        <div>
          User : <span>Maitri Majumder</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
