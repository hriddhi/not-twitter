import React from 'react';
import Main from './components/MainComponent';
import './App.css';
import {BrowserRouter } from 'react-router-dom';
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends React.Component {

    constructor(props){
      super(props);
    }

    render() {
        return (
          <Provider store={store}>
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </Provider>
        )
    }
}

export default App;
