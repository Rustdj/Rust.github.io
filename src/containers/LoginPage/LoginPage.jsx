import "../../App.css";
import { useNavigate} from 'react-router-dom';
import {useState} from 'react';


export const LoginPage = ({setUserName, setIsLoggedIn}) => {
  const navigate = useNavigate()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const handleLoginChange = (e) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  localStorage.setItem('isLoggerId', true);
  localStorage.setItem('userName', login);


  const handleLogin = (e) => {
    e.preventDefault();
    setUserName(login);
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <>
      <h1 className="headerLogin">Authorization</h1>
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
