import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <>
      <div className="mail-container">
        <div className="mail-wrapper">
          <div className="mail-content">
            <div className="profile-wrapper">
              <Header />
              <About />

            </div>
          </div>
        </div>
      </div>
      <div className="bottom-ball-fill"></div>
    </>
  );
}

export default App;