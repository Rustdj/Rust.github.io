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
  const [isLoggerId, setIsLoggedIn] = useState(localStorage.getItem('isLoggerId'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'))

  return (
    <>
        <div className="App">
          <Header userName={userName} isLoggerId={isLoggerId} setIsLoggedIn={setIsLoggedIn}/>
              <Routes>

                <Route path="/" element={<BlogPage/>}/>
                
                {/* <Route exact path="/*" element={() => { 
                  if(isLoggerId) return <Navigate replace to="/blog"/>
                  return <Navigate replace to="/login"/>
                  }}/> */}

                <Route 
                  path="/login" 
                  element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>}/>

                <Route path="*" element={<NoMatch/>}/>
  
              </Routes>
          <Footer year={new Date().getFullYear()} />
        </div> 
    </>
    
    
    
    
  );
}

export default App;
