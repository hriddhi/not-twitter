import React from 'react';
import { Card, CardText, CardBody, CardTitle, Button,  Navbar, NavbarBrand } from 'reactstrap';
import { Image, Spinner } from 'react-bootstrap';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium'
import { connect } from 'react-redux';
import { fetchProfile } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        user: state.profile.user,
        posts: state.profile.data,
        isLoading: state.profile.isLoading,
        errMess: state.profile.errMess
    }
};

const mapDispatchToProp = (dispatch) => ({
    fetchProfile: (user) => dispatch(fetchProfile(user))
});

class Profile extends React.Component {

    componentDidMount(){
        if(!this.props.isLoading)
            this.props.fetchProfile(this.props.match.params.username);
    }

    renderNavbar() {
        return (
            <Navbar color="light" style={{border: "solid", borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                <NavbarBrand href="/" className="font-weight-bold">Profile</NavbarBrand>
            </Navbar>
        )
    }

    render() {
        var feed = null;
        if(this.props.isLoading){
            return (
                <React.Fragment>
                    {this.renderNavbar()}
                    <div style={{height: 300}}>
                        <div style={{width: 50, height: 50, paddingTop: 150,  margin: "0 auto"}}>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </div>
                </React.Fragment>
            );
        } else if(this.props.errMess) {
            return <h4>{this.props.errMess}</h4>;
        } else {
            feed = this.props.posts.map((post) => {
                return (
                    <div key={post.id + "_post"} style={{width: 100+"%"}}>
                        <Card style={{margin: 10}}>
                            <CardBody className="p-0">
                                <div className="row m-0 p-2">
                                    <div className="col-1 m-0 p-0">
                                        <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                    </div>
                                    <div className="col-11">
                                        <CardTitle color="black" className="mb-1 d-inline"><strong>{this.props.user.name} </strong><span className="font-weight-light">@{this.props.user.username}</span> </CardTitle><small className="font-weight-light d-none d-md-inline d-lg-inline" style={{float: "right"}}>Date</small>
                                        <CardText style={{textAlign: "justify"}}>{post.tweet}</CardText>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                );
            });
        }

        return (
            <div>
                {this.renderNavbar()}
                <div className="container-fluid" style={{height: 120, backgroundColor: "#cfcfcf", position: "relative"}}>
                    <img src="https://f0.pngfuel.com/png/768/766/shin-chan-illustration-png-clip-art.png" alt="profile" className="img-thumbnail" style={{borderRadius: 100 + '%', width: 125, height: 125, position: "absolute", bottom: -50, zIndex: 10}} />
                </div>
                <div className="container-fluid" style={{height: 50, position: "relative"}}>
                    <Button outline className="mt-2" color="dark" size="sm" style={{float: "right"}}><strong>Edit Profile</strong></Button>
                </div>
                <div className="container-fluid" style={{height: 150, border: "solid", borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                    <h4 className="mt-2 mb-0"><strong>{this.props.user.name}</strong></h4>
                    <p className="font-weight-light">@{this.props.user.username}</p>
                    <p style={{color: "grey"}}><i className="fa fa-map-marker"></i> {this.props.user.location} <i className="fa fa-link ml-2"></i> <a href={this.props.user.name}>{this.props.user.link}</a> <i className="fa fa-birthday-cake ml-2"></i> {this.props.user.dob} <br/><i className="fa fa-calendar"></i> Joined {this.props.user.joined}</p>                    
                </div>
                <div className="container-fluid p-0" >
                    <ul className="nav nav-fill" style={{backgroundColor: "#ededed"}}>
                        <li className="nav-item">
                            <a className="nav-link active" style={{border: "solid", borderBottomWidth: 3, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#a6a6a6", color: "#757575"}} href="/"><strong>Tweets</strong></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={{color: "#757575"}} href="/">Replies</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={{color: "#757575"}} href="/">Likes</a>
                        </li>
                    </ul>
                </div>
                <div style={{width: 100+'%'}}>
                    <StyleRoot>
                        <div style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeIn, 'fadeIn')}}>
                            {feed}
                        </div>
                    </StyleRoot>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Profile);