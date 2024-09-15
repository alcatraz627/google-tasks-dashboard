import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { ClientKey } from "../utils/tasks.rest";

export const Login = ({
  setIsLoggedin,
}: {
  setIsLoggedin: (v: boolean) => void;
}) => {
  const handleClick = () => {
    const scope = [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/tasks",
      "https://www.googleapis.com/auth/tasks.readonly",
    ].join(" ");
    const callbackUrl = `${window.location.origin}`;
    const googleClientId = ClientKey;
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${googleClientId}&scope=${encodeURIComponent(
      scope
    )}`;
    window.location.href = targetUrl;
  };

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      // Try loading from the url hash
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken, { expires: 30 });
      setIsLoggedin(true);
      window.location.hash = "";
    } else {
      // Try loading from cookie store
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
        setIsLoggedin(true);
      }
    }
  }, []);

  // u
  return (
    <div className="root">
      <div>
        <h3>Log in with Google</h3>
        <div className="btn-container">
          <button className="btn btn-primary" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 326667 333333"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              width={20}
              height={20}
            >
              <path
                d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                fill="#4285f4"
              />
              <path
                d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                fill="#34a853"
              />
              <path
                d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                fill="#fbbc04"
              />
              <path
                d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                fill="#ea4335"
              />
            </svg>
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
