import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'
class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <>
        <div className='panel'>
          <div className='panel-header'>
            <label>Vite + React</label>
          </div>
          <div className='panel-body'>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
        </div>
      </>
    );
  }
}
export default Home;