import React from 'react';
import { Button } from 'react-bootstrap';
import { Control, LocalForm } from 'react-redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../redux/ActionCreator';

const mapDispatchToProp = (dispatch) => ({
    registerUser: (user) => dispatch(registerUser(user))
});

class Registration extends React.Component {

    handleRegistration(values){
        //alert(JSON.stringify(values));
        this.props.registerUser(values);
    }

    render() {
        return (
            <div>
                <LocalForm onSubmit={(values) => this.handleRegistration(values)}>
                    <Control.text model=".username" name="username" id="username" className="form-control" placeholder="Username" />
                    <Control.text model=".password" name="password" id="password" className="form-control" placeholder="Password" />
                    <Control.text model=".name" name="name" id="dob" className="form-control" placeholder="name"/>
                    <Control.text model=".dob" name="dob" id="dob" className="form-control"placeholder="dob" />
                    <Button type="submit" size="sm">Post</Button>
                </LocalForm>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProp)(Registration);