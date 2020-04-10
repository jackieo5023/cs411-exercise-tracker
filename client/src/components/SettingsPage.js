import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import PersonIcon from "@material-ui/icons/Person";

// Stylesheet
import "../css/Settings.css";

import { getPerson, deletePerson } from "../utils/api";

function SettingsPage({ userId, setUserId }) {
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await getPerson({ id: userId });
      if (response.status === 200) {
        setName(`${response.person.firstName} ${response.person.lastName}`);
      }
    }
    fetchData();
  }, [userId]);

  const handleDelete = useCallback(async () => {
    const response = await deletePerson({ id: userId });
    if (response.status === 204) {
      setUserId(null);
    }
  }, [userId, setUserId]);

  return (
    <div className="main">
      <h1>{name}</h1>
      <h2>ID: {userId}</h2>
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
