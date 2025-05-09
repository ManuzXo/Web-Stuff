import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, useState } from 'react';
import NavigationMenu from './pages/menu/NavigationMenu';
import SectionData from './pages/menu/Sections';
import WebStyling from './style/WebStyling';
import './App.css';
import Spinner from './utils/ui/Spinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

function SectionsRute() {
  return SectionData.map((section, index) => (
    <Route
      key={index}
      path={section.title.toLowerCase()}
      element={
        // <Suspense fallback={<div>Caricamento {section.title}...</div>}>
        <Suspense fallback={<Spinner absolute={true} ></Spinner>}>
          {
            (
              <QueryClientProvider client={queryClient}>
                {section.content}
              </QueryClientProvider>
            )
          }
        </Suspense>
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
        {/* <BrowserRouter basename={window.location.hostname === "localhost" ? undefined : "/Vite_React"}> */}
        <BrowserRouter>
          <NavigationMenu />
          <main>
            <Routes>
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
