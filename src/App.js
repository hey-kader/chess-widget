import React from 'react'
import './App.css';
import Test from './components/Test'


function App() {

    document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
        
    return (
        <div className="App">
          <header className="App-header">
			<Test />
          </header>
        </div>
    );
}

export default App;
