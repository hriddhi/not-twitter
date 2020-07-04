import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

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
                <h1>This is profile component</h1>
            </React.Fragment>
        )
    }
}

export default Profile;