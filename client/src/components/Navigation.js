import React from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";

const Navigation = ({ userId, setUserId }) => {
  const handleClick = () => {
    if (userId) {
      setUserId(null);
    } else {
    }
  };

  return (
    <Navbar color="light" light>
      <NavbarBrand href="/">CS411 Exercise Tracker</NavbarBrand>
      {userId != null && (
        <Button color="secondary" onClick={handleClick}>
          Sign Out
        </Button>
      )}
    </Navbar>
  );
};

export default Navigation;
