import {createGlobalStyle} from "styled-components";



export const darkTheme = {
    body: "#191970",
    textColor: "#708090",
    headingColor: "lightblue"
  }
  
  export const lightTheme = {
    body: "#ffd",
    textColor: "#000",
    headingColor: "red",
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