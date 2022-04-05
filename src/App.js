import './App.css';
import { BlogContent } from './containers/BlogPage/BlogPage';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { useState } from 'react';

function App() {

  const [isLoggerId, setIsLoggedIn] = useState((localStorage.getItem('isLoggerId') === 'true'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'))

  return (
    <>
        <div className="App">
          <Header userName={userName} isLoggerId={isLoggerId} setIsLoggedIn={setIsLoggedIn}/>
              <Routes>
                <Route path="/" element={<BlogContent/>}/>
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>}/>
              </Routes>
          <Footer year={new Date().getFullYear()} />
        </div> 
    </>
    
    
    
    
  );
}

export default App;
