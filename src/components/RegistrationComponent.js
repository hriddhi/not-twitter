import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../redux/ActionCreator';

const mapDispatchToProp = (dispatch) => ({
    registerUser: (user) => dispatch(registerUser(user))
});

class Registration extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            show: false
        }
    }

    handleRegistration(values){
        this.props.registerUser(values);
    }

    render() {
        return (
            <LocalForm onSubmit={(values) => this.handleRegistration(values)}>
            <div className="container">
                <div className="row justify-content-center row-content">
                    <div className="col-lg-6 col-md-8 col-sm-9">
                        <div className="row">
                            <h5 className="text-blue pl-3 pt-4 pb-1" style={{color: "#00acee"}}><i className="fa fa-twitter fa-2x"></i> NOT-Twitter</h5>
                        </div>
                        <div className="card" style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="container-fluid p-3 d-inline" style={{width: 40+"%"}}>
                                        <div style={{position: "relative"}}>
                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user_profile" className="p-1" style={{width: "100%" , borderRadius: "50%"}}/> 
                                            <div style={{position: "absolute", bottom: "8%", right: "10%"}}>
                                                <button className="btn btn-secondary btn-sm p-0" style={{width: "30px", height: "30px", borderRadius: "50%", paddingTop: -4}}><small><i className="fa fa-edit"></i></small></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container-fluid d-inline pl-0 ml-0" style={{width: 50+"%"}}>
                                        <div className="pt-3 card-text">
                                            <div className="form-group">
                                                <label for="registrationForm" style={{color:  "#055f83"}}><b>Username</b></label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{color: "#055f83"}}> <i className="fa fa-at"></i></span>
                                                    </div>
                                                    <Control.text model=".username" name="username" id="username" className="form-control" placeholder="Username" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="registrationForm" style={{color:  "#055f83"}}><b>Password</b></label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{color: "#055f83"}}> <i className="fa fa-lock"></i></span>
                                                    </div>
                                                    <Control.text model=".password" name="password" id="password" className="form-control" placeholder="Password" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-4 mr-4 pt-1 card-text">
                                    <div className="form-group">
                                        <label for="registrationForm" style={{color: "#055f83"}}><b>Name</b></label>
                                        <div className="form-row">
                                            <div className="col-6">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{color:  "#055f83"}}> <i className="fa fa-user"></i></span>
                                                    </div>
                                                    <Control.text model=".firstname" name="name" id="name" className="form-control" placeholder="First Name" />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <Control.text model=".lastname" name="name" id="name" className="form-control" placeholder="Last Name" />
                                            </div>
                                        </div>
                                    </div>
            
                                    <div className="form-group">
                                        <label for="exampleInputEmail1" style={{color: "#055f83"}}><b>Email address</b></label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" style={{color: "#055f83"}}> <i className="fa fa-envelope"></i></span>
                                            </div>
                                            <Control.text model=".email" name="email" id="email" className="form-control" placeholder="Email" />
                                        </div>
                                    </div>    

                                    <div className="form-group">
                                        <label for="registrationForm" style={{color: "#055f83"}}><b>Date of Birth</b></label>
                                        <div className="form-row">
                                            <div className="col-7">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{color: "#055f83"}}> <i className="fa fa-calendar"></i> </span>
                                                    </div>
                                                    <Control.text model=".dob" name="dob" id="dob" className="form-control"placeholder="dob" />
                                                </div>
                                            </div>
                                        </div>         
                                    </div>
            
                                    <div className="form-group">
                                        <label for="registrationForm" style={{color: "#055f83"}}><b>Location</b></label>
                                        <div className="form-row">
                                            <div className="col-7">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" style={{color: "#055f83"}}> <i className="fa fa-map-marker"></i> </span>
                                                    </div>
                                                    <Control.text model=".location" name="location" id="location" className="form-control" placeholder="Location" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        
                                    <div className="form-group">
                                        <label for="registrationForm" style={{color: "#055f83"}}><b>Bio.</b></label>
                                        <textarea className="form-control" rows="4"></textarea>
                                    </div>
            
                                    <div className="form-group">
                                        <input type="checkbox"/>
                                        <label className="form-check-label">
                                            <p onClick={()=>this.setState({show: true})} style={{marginLeft: 8, color: "#00acee", cursor: "pointer"}}> Agree to terms and conditions</p>
                                        </label>
                                    </div>
            
                                    <div className="form-group text-center">
                                        <Button type="submit" size="sm">Register</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            
            

            <Modal show={this.state.show} onHide={()=>this.setState({show: false})} centered>
                <Modal.Body>
                    <div className="text-center">
                        <div style={{position: "absolute", bottom: "75%"}}>
                            <img src="https://pngimg.com/uploads/twitter/twitter_PNG28.png" alt="twitter_logo" style={{width: "30%", borderStyle: "solid", border: "white", borderRadius: "2px"}}/>
                        </div>
                        <div className="text-center" style={{marginTop: "50px"}}>
                            <h3 style={{color: "#00acee"}}>Surprise Surprise</h3>
                            <h6 style={{marginTop: "6%"}}>We don't have any T&C</h6>
                            <h4 className="" style={{color: "#00acee", marginTop: "20px"}}><i className="far fa-smile-wink"></i></h4>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <div className="container-fluid p-0 m-0" style={{height: 50, textAlign: "center", backgroundColor: "#ededed", border: "solid", borderWidth: "1px 0 0 0", borderColor: "#cfcfcf"}}>
                        <p className='m-2' style={{color: '#7a7a7a'}}>Made with <i className="fa fa-heart"></i> by Adrita.</p>
                    </div>
                </Modal.Footer>
            </Modal>

            </LocalForm>
            
        );
    }
}

export default withRouter(connect(null, mapDispatchToProp)(Registration));