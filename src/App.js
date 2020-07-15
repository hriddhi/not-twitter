import React from 'react';
import Main from './components/MainComponent';
import Registration from './components/RegistrationComponent';
import Login from './components/LoginComponent';
import './App.css';
import { BrowserRouter, Redirect } from 'react-router-dom';
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: false
    }
  }

 

  render() {
      return (
        <Provider store={store}>
          <BrowserRouter>
            {
              (() => {
                if(this.state.isLoggedIn){
                  return (
                    <React.Fragment>
                      <Main />
                      <Redirect to="/home" />
                    </React.Fragment>
                  );
                } else {
                  return (
                    <React.Fragment>
                      <Login />
                      <Redirect to="/register" />
                    </React.Fragment>
                  );
                }
              })()
            }
          
          </BrowserRouter>
        </Provider>
      );
  }
}

export default App;