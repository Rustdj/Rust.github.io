import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const LoginPage = ({ setUserName, setIsLoggedIn, setIsAdmin }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (login === "admin") {
      if (password === "1304") setIsAdmin(true);
      else {
        alert("Please enter a password!");
        return false;
      }
    }

    localStorage.setItem("isLoggerId", true);
    localStorage.setItem("userName", login);

    setUserName(login);
    setIsLoggedIn(true);
    navigate("/blog");
  };

  return (
    <>
      <h1 className="headerLogin">User Login</h1>
      <h2 className="adminLog">
        To edit, use the login and password for the admin <br></br> <br></br>{" "}
        login: "admin" <br></br> pass: "1304"
      </h2>
      <form className="loginForm" onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Login"
            onChange={handleLoginChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button className="btnLogin" type="submit">
            Sing in
          </button>
        </div>
      </form>
    </>
  );
};
