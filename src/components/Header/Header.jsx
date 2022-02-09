import "./Header.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export const Header = () => {
  
  return (
    <header>
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      </FormGroup>
      <nav className="header">
        <a href="#first">Home</a>
        <a href="#second">About</a>
        <a href="#third">Contact</a>
      </nav>
    </header>
  );
};
