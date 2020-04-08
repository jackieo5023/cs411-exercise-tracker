import React, { useState } from "react";
import { Button } from "reactstrap";
import Sidebar from "react-sidebar";
import NavBar from "./NavBar";

const Navigation = ({ userId, setUserId }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleClick = () => {
    if (userId) {
      setUserId(null);
    } else {
    }
  };

  return (
    <Sidebar
      sidebar={<NavBar />}
      open={sidebarOpen}
      transitions={false}
      docked={false}
      onSetOpen={setSidebarOpen}
      touch={false}
    >
      {userId != null && (
        <Button color="secondary" onClick={handleClick}>
          Sign Out
        </Button>
      )}
    </Sidebar>
  );
};

export default Navigation;

// <Button onClick={() => {setSidebarOpen(true)}}>
//           Open sidebar
//         </Button>
