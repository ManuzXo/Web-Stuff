import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationMenu from './menu/NavigationMenu';
import SectionData from './menu/Sections';
import Home from './Home';
import WebStyling from './style/WebStyling';
import { useState } from 'react';

function SectionsRute() {
  return SectionData.map((section, index) => (
    <Route
      key={index}
      path={section.title.toLowerCase()}
      element={section.content}
    />
  ));
}
function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(WebStyling.getTheme() === "dark");

  const toggleTheme = () => {
    WebStyling.changeTheme();
    setIsDarkMode(WebStyling.getTheme() === "dark");
  };

  return (
    <footer>
      <div style={{ margin: ".5rem" }}>
        <button
          className="btn btn-rounded"
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
          <i className={isDarkMode ? "gg-sun" : "gg-moon"}></i>
        </button>
      </div>
    </footer>
  );
}

function App() {
  WebStyling.initializeTheme();
  return (
    <>
      <div className="app-container">
        <BrowserRouter basename={window.location.hostname === "localhost" ? undefined : "/Vite_React"}>
          <NavigationMenu />
          <main>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/" element={<Home />} />
              {SectionsRute()}
            </Routes>
          </main>
        </BrowserRouter>
        <Footer></Footer>
      </div >
    </>
  );
}

export default App;
