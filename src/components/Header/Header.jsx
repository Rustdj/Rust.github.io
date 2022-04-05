import "./Header.css";
import { NavLink } from "react-router-dom";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export const Header = ({ isLoggerId, setIsLoggedIn, userName }) => {
  const handleLogOut = () => {
    localStorage.setItem('isLoggerId', false);
    setIsLoggedIn(false);
  };
  return (
    <header className="headerMain">
      {isLoggerId ? (
        <nav>
          <div className="top">Welcome dear user, <strong>{userName}</strong></div>
          <NavLink onClick={handleLogOut} to="/login">
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
