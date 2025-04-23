import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/icon.css';
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
      element={
        <>
          <main>
            {section.content}
          </main>
        </>
      }
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
      <button
        className="btn btn-rounded"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
        <i className={isDarkMode ? "gg-sun" : "gg-moon"}></i>
      </button>
    </footer>
  );
}

function App() {
  WebStyling.initializeTheme();
  return (
    <>
      <div className="app-container">
        <BrowserRouter>
          <NavigationMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            {SectionsRute()}
          </Routes>
        </BrowserRouter>
        {Footer()}
      </div >
    </>
  );
}

export default App;
