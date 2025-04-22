import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationMenu from './menu/NavigationMenu';
import SectionData from './menu/Sections';
import Home from './Home';

function App() {
  return (
    <>
      <BrowserRouter>
          <NavigationMenu/>
          <Routes>
            <Route path="/" element={<Home/>} /> 
            {
              SectionData.map((section, index) => (
                <Route
                  key={index}
                  path={section.title.toLowerCase()}
                  element={section.content}
                />
              ))
            }
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
