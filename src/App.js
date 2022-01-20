import './App.css';
import React from "react";
import Translate from './Translate'
import {BrowserRouter as Router} from 'react-router-dom';

function App() {


  return (
    <div className="App">
        <Router>
      <header className="App-header">
        Test2
      </header>
      <Translate sid="test_string_id">slot</Translate>
        </Router>
    </div>
  );
}

export default App;
