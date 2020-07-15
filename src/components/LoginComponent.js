import React from 'react';
import { Button } from 'react-bootstrap';
import { Control, LocalForm } from 'react-redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../redux/ActionCreator';

const mapDispatchToProp = (dispatch) => ({
    loginUser: (user) => dispatch(loginUser(user))
});

class Login extends React.Component {

    handleLogin(values){
        //alert(JSON.stringify(values));
        this.props.loginUser(values);
    }

    render() {
        return (
            <div>
                <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                    <Control.text model=".username" name="username" id="username" className="form-control" placeholder="Username" />
                    <Control.text model=".password" name="password" id="password" className="form-control" placeholder="Password" />
                    <Button type="submit" size="sm">Post</Button>
                </LocalForm>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProp)(Login);