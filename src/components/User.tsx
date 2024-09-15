import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export function User() {
  const [userDetails, setUserDetails] = useState<Record<string, string>>({});

  const getUserDetails = async (accessToken) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
    );
    const data = await response.json();
    setUserDetails(data);
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    getUserDetails(accessToken);
  }, []);

  return (
    <>
      {/* {JSON.stringify(userDetails)} */}
      {userDetails ? (
        <div className="user-profile">
          <div className="card">
            <p>Welcome</p>
            <h1 className="name">
              <img
                src={userDetails.picture}
                alt={`${userDetails.given_name}'s profile`}
                className="profile-pic"
                width={50}
              />{" "}
              {userDetails.name}
            </h1>
            <p className="email">{userDetails.email}</p>
            <p className="locale">{`Locale: ${userDetails.locale}`}</p>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}
