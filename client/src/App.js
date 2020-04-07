import React, { useState } from "react";
import Navigation from "./components/Navigation";
import LoginRegister from "./components/LoginRegister";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <>
      <Navigation userId={userId} setUserId={setUserId} />
      {userId != null ? (
        <>You logged in!</>
      ) : (
        <LoginRegister setUserId={setUserId} />
      )}
    </>
  );
}

export default App;
