import React from 'react';
import Main from './components/MainComponent';
import './App.css';
import {BrowserRouter } from 'react-router-dom';

class App extends React.Component {

    constructor(props){
      super(props);
    }

    render() {
        return (
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        )
    }
}

export default App;
