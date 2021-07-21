import React from 'react'
import './App.css';
import Begin from './components/Begin'

function App() {

    document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
        
    return (
        <div className="App">
          <header className="App-header">
            <Begin />
          </header>
          <footer className="App-Header">
            <a href="https://startrightchess.com/evaluation-redirect">© 2021 START RIGHT CHESS, INC</a>
            <img style={{margin: '0.2rem'}} width="28" height="28" src="https://kaderarnold.com/chess/chess-logo.png" alt="Start Right Chess Logo" />
          </footer>
        </div>
    );
}

export default App;
