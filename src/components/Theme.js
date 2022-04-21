  import {createGlobalStyle} from "styled-components";

  

  export const darkTheme = {
      body: "linear-gradient(circle at 90% 4%, aqua, darkblue)",
      textColor: "#708090",
      headingColor: "lightblue",
  }
  
  export const lightTheme = {
    body: "linear-gradient(to top left, powderblue, pink)",
    textColor: "#000",
    headingColor: "#465607",
  }
  
  export const GlobalStyles = createGlobalStyle`
   body {
    background: ${props => props.theme.body};
    color: ${props => props.theme.textColor};
    transition: .3s ease;
   }
   h2{
     color: ${props => props.theme.headingColor};
   }
   
  `