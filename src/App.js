import './App.css';
import { BlogPage } from './containers/BlogPage/BlogPage.jsx';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { useState } from 'react';
import NoMatch from './containers/NoMatch/NoMatch';
import { BlogCardPage } from './containers/BlogPage/components/BlogCardPage';

import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./components/Theme";
import CustomizedSwitches from './shared/Switch';




function App() { 
  const [isLoggerId, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggerId') === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem('userName'))
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('userName') === "admin");

  //=======themes========

  const [theme, setTheme] = useState("light");
  
  const switchTheme = () => {
      theme === "light" ? setTheme("dark") : setTheme("light");
    };

  //=====================

  

  

  return ( 
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <div className="App">
        
        <GlobalStyles /> 
        
          <Header 
            userName={userName} 
            isLoggerId={isLoggerId} 
            setIsLoggedIn={setIsLoggedIn}
            setIsAdmin={setIsAdmin}
            CustomizedSwitches={CustomizedSwitches}
            switchTheme={switchTheme}
          />
              <Routes>

                <Route 
                  path="/" 
                  element={
                    <LoginPage 
                    setIsLoggedIn={setIsLoggedIn} 
                    setUserName={setUserName}
                    setIsAdmin={setIsAdmin}
                  />
                }
              />

                <Route 
                  path="/blog/" 
                  element={
                  <BlogPage 
                  isAdmin={isAdmin}
                />
              }
            />

                <Route 
                  path="/blog/:postId" 
                  element={
                  <BlogCardPage 
                  isAdmin={isAdmin}
                />
              }
            />
                
                <Route 
                  path="*" 
                  element={
                  <NoMatch
                  />
                }
              />
  
              </Routes>
          <Footer year={new Date().getFullYear()} />
        </div> 
        </ThemeProvider>
    </> 
  );
}

export default App;
