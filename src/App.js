import React from "react";
import Translate from './Translate'
//import {BrowserRouter as Router} from 'react-router-dom';
import translateMessage from "./TranslateMessage";


function App() {

    let text = translateMessage('TestMessage', 'string_id');



  return (
    <div className="App">
      <header className="App-header">
        Test2

      </header>
        <p>{text}</p>
        <Translate sid="test_string_id">slot</Translate>
    </div>
  );
}

export default App;
