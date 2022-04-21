import "./Header.css";
import { NavLink } from "react-router-dom";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export const Header = ({ isLoggerId, setIsLoggedIn, userName, setIsAdmin, CustomizedSwitches, switchTheme }) => {
  const handleLogOut = () => {
    localStorage.removeItem('isLoggerId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <header className="headerMain">
      {isLoggerId ? (
        <nav>
          
          <button className="toggleTheme" onClick={switchTheme}><CustomizedSwitches /></button>
          <div className="top">Welcome dear user, <strong>{userName}</strong></div>
          <NavLink onClick={handleLogOut} to="/">
            LogOut
            <MeetingRoomIcon/>
          </NavLink>
        </nav>
      ) : (
        <h2>Welcome dear user!</h2>
      )}
    </header>
  );
};
