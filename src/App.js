import React from 'react'
import './App.css';
import Test from './components/Test'
import Email from './components/Email'


function App() {

    document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
        
    return (
        <div className="App">
          <header className="App-header">
            <Email />
          </header>
        </div>
    );
}

export default App;
