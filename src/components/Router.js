import React from 'react';
import Main from './MainComponent';
import Login from './LoginComponent';
import Registration from './RegistrationComponent';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import "react-perfect-scrollbar/dist/css/styles.css";

const mapStateToProps = state => {
  return {
      session: state.session
  }
};

class Router extends React.Component {

  render() {
      return (
        <React.Fragment>
            {
                (() => {
                if(this.props.session.session)
                    return (
                        <React.Fragment>
                            <Main/>
                        </React.Fragment>
                    );
                else {
                    return <Redirect to="/register"/>;
                } 
                })()
            }
            <Switch>
                <Route exact path="/login" component={()=> <Login />} />
                <Route exact path="/register" component={() => <Registration />}/>
            </Switch>
        </React.Fragment>   
      );
    }
}

export default connect(mapStateToProps)(Router);