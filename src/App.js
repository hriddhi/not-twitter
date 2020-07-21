import React from 'react';
import Router from './components/Router';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';

class App extends React.Component {

  render() {
      return (
        <Provider store={store}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Provider>
      );
  }
}

export default App;