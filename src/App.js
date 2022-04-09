import './App.css';
import { BlogPage } from './containers/BlogPage/BlogPage.jsx';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Navigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './containers/LoginPage/LoginPage';
import { useState } from 'react';
import NoMatch from './containers/NoMatch/NoMatch';

function App() { 
  const [isLoggerId, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggerId') === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem('userName'))
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('userName') === "admin");
  

  return (
    <>
        <div className="App">
          <Header 
            userName={userName} 
            isLoggerId={isLoggerId} 
            setIsLoggedIn={setIsLoggedIn}
            setIsAdmin={setIsAdmin}
          />
              <Routes>

                <Route path="/blog" element={<BlogPage isAdmin={isAdmin}/>}/>
                


                <Route 
                  path="/login" 
                  element={
                    <LoginPage 
                    setIsLoggedIn={setIsLoggedIn} 
                    setUserName={setUserName}
                    setIsAdmin={setIsAdmin}
                  />
                }
              />

                <Route path="*" element={<NoMatch/>}/>
  
              </Routes>
          <Footer year={new Date().getFullYear()} />
        </div> 
    </>
    
    
    
    
  );
}

export default App;
