import './App.css';
import { BlogContent } from './components/BlogContent/BlogContent';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <BlogContent />
      <Footer />
    </div>
  );
}

export default App;
