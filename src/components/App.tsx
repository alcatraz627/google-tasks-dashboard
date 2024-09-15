import Cookies from "js-cookie";
import React, { useState } from "react";
import { Login } from "./Login";
import { Tasks } from "./Tasks";
import { User } from "./User";

const Logout = ({ clearLogin }: { clearLogin: () => void }) => {
  const handleLogOut = () => {
    Cookies.remove("access_token");
    clearLogin();
  };
  return <button onClick={() => handleLogOut()}>Log Out</button>;
};

export function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <div>
      <h3>Google Tasks Client</h3>
      <hr />
      {isLoggedin ? (
        <>
          <User />
          <Logout clearLogin={() => setIsLoggedin(false)} />
          <hr />
          <Tasks />
        </>
      ) : (
        <Login setIsLoggedin={setIsLoggedin} />
      )}
    </div>
  );
}
