import React from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';

class Profile extends React.Component {

    renderNavbar() {
        return (
            <Navbar color="light" style={{border: "solid", borderBottomWidth: 1, borderTopWidth: 0,
                                                     borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                <NavbarBrand href="/" className="font-weight-bold">Profile</NavbarBrand>
            </Navbar>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.renderNavbar()}
                <div className="container-fluid" style={{height: 30+"%", backgroundColor: "#cfcfcf", position: "relative"}}>
                    <img src="https://f0.pngfuel.com/png/768/766/shin-chan-illustration-png-clip-art.png" alt="profile-image" className="img-thumbnail" style={{borderRadius: 100 + '%', width: 125, height: 125, position: "absolute", bottom: -50, zIndex: 10}} />
                </div>
                <div className="container-fluid" style={{height: 50, position: "relative"}}>
                    <Button outline className="mt-2" color="dark" size="sm" style={{float: "right"}}><strong>Edit Profile</strong></Button>
                </div>
                <div className="container-fluid" style={{height: 150, border: "solid", borderBottomWidth: 1, borderTopWidth: 0,
                                                     borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                    <h4 className="mt-2 mb-0"><strong>{this.props.user.name}</strong></h4>
                    <p className="font-weight-light">@{this.props.user.username}</p>
                    <p style={{color: "grey"}}><i className="fa fa-map-marker"></i> {this.props.user.location} <i className="fa fa-link ml-2"></i> <a href={this.props.user.name}>{this.props.user.link}</a> <i className="fa fa-birthday-cake ml-2"></i> {this.props.user.dob} <br/><i className="fa fa-calendar"></i> Joined {this.props.user.joined}</p>

                    
                </div>
                <div className="container-fluid p-0" >
                    <ul class="nav nav-fill" style={{backgroundColor: "#ededed"}}>
                        <li class="nav-item">
                            <a class="nav-link active" style={{border: "solid", borderBottomWidth: 3, borderTopWidth: 0,
                                                    borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#a6a6a6", color: "#757575"}} href="#"><strong>Tweets</strong></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style={{color: "#757575"}} href="#">Replies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style={{color: "#757575"}} href="#">Likes</a>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default Profile;