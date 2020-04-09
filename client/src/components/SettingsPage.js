import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import PersonIcon from "@material-ui/icons/Person";

// Stylesheet
import "../css/Settings.css";

function SettingsPage() {
  // TODO: Populate name with data from api

  const handleDelete = useCallback(() => {
    // TODO: call api to delete user
  }, []);

  return (
    <div className="main">
      <h1>Jackie Osborn</h1>
      <div>
        <Link
          className="link"
          to={{ pathname: "/profile", state: { isEditing: true } }}
        >
          <Button startIcon={<PersonIcon />}>Edit Profile</Button>
        </Link>
      </div>
      <div>
        <Button
          color="secondary"
          onClick={handleDelete}
          startIcon={<ClearIcon />}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default SettingsPage;
