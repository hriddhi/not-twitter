import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        session: state.session
    }
};

const mapDispatchToProp = (dispatch) => ({
    loginUser: (user) => dispatch(loginUser(user))
});

class Login extends React.Component {

    componentDidMount() {
        if(this.props.session.session)
            this.props.history.replace('/home');
    }

    handleLogin(values){
        //alert(JSON.stringify(values));
        this.props.loginUser(values);
    }

    render() {
        return (
            <div className="container" id="Reserve-card">
                <div className="row justify-content-center row-content">
                    <div className="col-12 col-md-6">
                        <div className="row">
                            <h5 className="text-blue pl-3 pt-4 pb-1" style={{color: "#00acee"}}><i className="fa fa-twitter fa-2x"></i> NOT-Twitter</h5>
                        </div>
                        <div className="card" style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                            <div className="card-body p-0">
                                <LocalForm onSubmit={(values) => this.handleLogin(values)} className="ml-4 mr-4 pt-3 card-text">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label style={{color: "#055f83"}}><b>Username</b></label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" style={{color: "#055f83"}}> <i className="fa fa-at"></i></span>
                                                </div>
                                                <Control.text model=".username" name="username" id="username" className="form-control" placeholder="Enter Username"/>
                                            </div>
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your details with anyone else.</small>
                                        </div>    

                                        <div className="form-group">
                                            <label style={{color: "#055f83"}}><b>Password</b></label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" style={{color: "#055f83"}}> <i className="fa fa-unlock"></i></span>
                                                </div>
                                                <Control.text type="password" model=".password" name="password" id="password" className="form-control" placeholder="Enter Password"/>
                                            </div>    
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-outline-primary btn-sm">Login</button>
                                    </div>
                                    <div className="form-group text-center">
                                        <NavLink style={{fontWeight: "bold"}} to='/register'>Tired of twitter? Join us!</NavLink>
                                    </div>
                                </LocalForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Login));