import React from 'react';
import { Card, CardText, CardBody, CardFooter, CardTitle, Button,  Navbar, NavbarBrand, ListGroupItem } from 'reactstrap';
import { Image, Spinner, Modal } from 'react-bootstrap';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { fetchProfile, fetchProfileLikes, fetchProfileReplies, fetchTweet, followUser, fetchUserDetails } from '../redux/ActionCreator';
import { withRouter, NavLink } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        user: state.profile.user,
        current: state.session.user,
        posts: state.profile.data,
        replies: state.profile.replies,
        likes: state.profile.likes,
        isLoading: state.profile.isLoading,
        errMess: state.profile.errMess,
        following: state.profile.user.following,
        fetchUser: state.profile
    }
};

const mapDispatchToProp = (dispatch) => ({
    fetchTweet: (id) => dispatch(fetchTweet(id)),
    fetchProfile: (user) => dispatch(fetchProfile(user)),
    fetchProfileReplies: (user) => dispatch(fetchProfileReplies(user)),
    fetchProfileLikes: (user) => dispatch(fetchProfileLikes(user)),
    followUser: (id) => dispatch(followUser(id)),
    fetchUserDetails: (user) => dispatch(fetchUserDetails(user))
});

class Feed extends React.Component {

    render(){
        var feed = null;
        if(this.props.isLoading){
            return (
                <React.Fragment>
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
                    <div key={post._id} style={{width: 100+"%"}}>
                        <Card style={{margin: 10, boxShadow: "0 2px 4px 0", border: "none"}}>
                        { post.repliedTo !== null ? <div style={{marginBottom: -4}}><button style={{background: "none", border: "none"}} onClick={() => {this.props.fetchTweet(post.repliedTo.split('$')[0]); } }><p style={{color: "#737373"}} className="p-0 ml-2 m-0 font-weight-light"><small><span className="fa fa-reply"></span> Replied to <strong>@{post.repliedTo.split('$')[1]}</strong></small></p></button></div> : null }
                            <CardBody className="p-0">
                                <div className="row m-0 p-2">
                                    <div className="d-none d-md-inline d-lg-inline s-sm-none m-0 mt-1 p-0">
                                        <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                    </div>
                                    <div className="container ml-3 p-0" style={{width: 90+"%"}}>
                                        <CardTitle color="black" className="mb-1 d-inline"><strong>{this.props.user.name} </strong><span className="font-weight-light">@{this.props.user.username}</span> </CardTitle>
                                        <small className="font-weight-light d-inline" style={{position: "absolute", right: 16}}>{ (new Date().getTime() - new Date(post.createdAt).getTime())/(1000*3600*24) < 1 ? <Moment fromNow>{post.createdAt}</Moment> : <Moment format="LT D, MMM">{post.createdAt}</Moment>}</small>
                                        <CardText style={{textAlign: "justify"}}>{post.tweet}</CardText>
                                    </div>
                                </div>
                                <CardFooter style={{backgroundColor: "#b8f2fc"}} className="p-1 m-0">
                                    <button className="btn btn-sm btton_feed mr-1" style={{backgroundColor: "rgb(255, 255, 255, 0.4)"}} onClick={() => {this.props.fetchTweet(post._id+'$'+post.user.username); this.props.history.push('/tweet') }}><span className="fa fa-info-circle" style={{color: "grey"}}></span> More</button>
                                </CardFooter>
                            </CardBody>
                        </Card>
                    </div>
                );
            });
        }

        return feed;
    }
}

class Profile extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            selected: 1,
            show: false,
            setShow: false,
            showing: null
        }
    }

    componentDidUpdate(){
        console.log("componentDidUpdate");
    }

    componentDidMount(){
        this.props.fetchProfile(this.props.match.params.username);
    }

    renderNavbar() {
        return (
            <Navbar color="light" style={{border: "solid", borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                <NavbarBrand href="/" className="font-weight-bold">Profile</NavbarBrand>
            </Navbar>
        )
    }

    renderProfile(){
        return (
            <div style={{boxShadow: "0px 4px 4px grey", marginBottom: 5, backgroundColor: "#fff"}}>
                <div className="container-fluid" style={{height: 120, backgroundSize: "contain", backgroundImage: "url(https://vignette.wikia.nocookie.net/crayonshinchan/images/1/14/-%EB%AA%A8%EC%97%90-Raws-_Crayon_Shin-chan_-SP78_%28KSB_1280x720_x264_AAC%29.mp4_snapshot_09.43_-2017.03.24_21.20.16-.jpg/revision/latest?cb=20170325070000)", position: "relative"}}>
                    <img src="https://f0.pngfuel.com/png/768/766/shin-chan-illustration-png-clip-art.png" alt="profile" className="img-thumbnail" style={{boxShadow: "0px 4px 4px grey", borderRadius: 100 + '%', width: 125, height: 125, position: "absolute", bottom: -50, zIndex: 10}} />
                </div>
                <div className="container-fluid" style={{height: 50, position: "relative"}}>
                    <button className="btn btn-sm btton mt-2" style={{float: "right"}}><strong>Edit Profile</strong></button>
                </div>
                <div className="container-fluid" style={{height: 160, border: "solid", borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                    <div className="mt-2">
                        <h4 className="mb-0 d-inline"><strong>{this.props.user.name}</strong></h4>
                        {
                            (() => {
                                var user = this.props.user._id;
                                var current = this.props.current._id;
                                if(user !== current){
                                    if([].concat(this.props.user.followers).includes(current))
                                        return <button className="btn btn-sm btton" onClick={()=> this.props.followUser(this.props.user._id)} style={{marginLeft: 16, marginTop: -10}}><strong>Unfollow</strong></button>;
                                    else
                                        return <button className="btn btn-sm btton" onClick={()=> this.props.followUser(this.props.user._id)} style={{marginLeft: 16, marginTop: -10}}><strong>Follow</strong></button>;
                                }
                            })()
                        }
                    </div>
                    
                    <p className="font-weight-light mb-2">@{this.props.user.username}</p>
                    <div className="mb-2">
                        <p style={{cursor: "pointer"}} onClick={()=>{this.setState({show: true, showing: 1}); this.props.fetchUserDetails(this.props.user.following)}} className="d-inline">Following <strong>{[].concat(this.props.user.following).length}</strong></p>
                        <p style={{cursor: "pointer"}} onClick={()=>{this.setState({show: true, showing: 2}); this.props.fetchUserDetails(this.props.user.followers)}} className="ml-3 d-inline">Followers <strong>{[].concat(this.props.user.followers).length}</strong></p>
                    </div>
                    <p style={{color: "black"}}><i className="fa fa-map-marker"></i> {this.props.user.location} <i className="fa fa-link ml-2"></i> <a href={this.props.user.name}>{this.props.user.link}</a> <i className="fa fa-birthday-cake ml-2"></i> {this.props.user.dob} <i className="fa fa-calendar ml-2"></i> Joined {this.props.user.joined}</p>                    
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{width: 100+'%', minHeight: 500}}>
                {this.renderNavbar()}
                { this.props.isLoading !== 1 ? this.renderProfile() : null}
                <div className="container-fluid p-0" style={{boxShadow: "0px 4px 4px grey"}} >
                    <ul className="nav nav-fill" style={{backgroundColor: "#78e2ff"}}>
                        <li style={{cursor: "pointer"}} onClick={() => this.setState({selected: 1})} className="nav-item">
                            <p className="nav-link m-0" style={ this.state.selected === 1 ? {border: "solid", borderWidth: "0 0 3px 0", borderColor: "#00189e", color: "#000", fontWeight: "bolder"} : {color: "#2b2b2b"}}>Tweets</p>
                        </li>
                        <li style={{cursor: "pointer"}} onClick={() => { this.setState({selected: 2}); if(this.props.replies === null) this.props.fetchProfileReplies(this.props.match.params.username)}} className="nav-item">
                            <p className="nav-link m-0" style={ this.state.selected === 2 ? {border: "solid", borderWidth: "0 0 3px 0", borderColor: "#00189e", color: "#000", fontWeight: "bolder"} : {color: "#2b2b2b"}}>Replies</p>
                        </li>
                        <li style={{cursor: "pointer"}} onClick={() => {this.setState({selected: 3}); if(this.props.likes === null) this.props.fetchProfileLikes(this.props.match.params.username);}} className="nav-item">
                            <p className="nav-link m-0" style={ this.state.selected === 3 ? {border: "solid", borderWidth: "0 0 3px 0", borderColor: "#00189e", color: "#000", fontWeight: "bolder"} : {color: "#2b2b2b"}}>Likes</p>
                        </li>
                    </ul>
                </div>
                
                <div style={{width: 100+'%'}}>
                    <StyleRoot>
                        <div style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeIn, 'fadeIn')}}>
                            {
                                (() => {
                                    if(this.state.selected === 1 && this.props.posts !== null)
                                        return (
                                            <div style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeIn, 'fadeIn')}}>
                                                <Feed user={this.props.user} posts={this.props.posts} isLoading={this.props.isLoading} fetchTweet={this.props.fetchTweet} history={this.props.history}/>
                                            </div>
                                        )
                                    else if(this.state.selected === 2 && this.props.replies !== null)
                                        return (
                                            <div style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeIn, 'fadeIn')}}>
                                                <Feed user={this.props.user} posts={this.props.replies} isLoading={this.props.isLoading} fetchTweet={this.props.fetchTweet} history={this.props.history}/>
                                            </div>
                                        )
                                        
                                    else if(this.state.selected === 3 && this.props.likes !== null)
                                        return (
                                            <div style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeIn, 'fadeIn')}}>
                                                <Feed user={this.props.user} posts={this.props.likes} isLoading={this.props.isLoading} fetchTweet={this.props.fetchTweet} history={this.props.history}/>
                                            </div>
                                        )
                                })()
                            }
                        </div>
                    </StyleRoot>
                </div>

                <Modal show={this.state.show} onHide={()=> this.setState({show: false})} centered>
                    {
                        (() => {
                            if(this.state.showing === 1 && this.props.fetchUser.fetchUser === false){
                                const user = this.props.fetchUser.fetchedUser.map((user) => {
                                    return (
                                        <ListGroupItem className="p-2" style={{border: "none", boxShadow: "0px 0px 0px white", border: "solid", borderWidth: "0 0 1px 0", borderColor: "#cfcfcf"}}>
                                            <div className="row m-0">
                                                <div className="m-0 mt-1 p-0 d-inline">
                                                    <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                                </div>
                                                <div className="d-inline ml-2">
                                                    <NavLink style={{color: "black"}} to={"/profile/" + user.username }><CardTitle className="mb-1 d-inline"><strong>{user.name} </strong> </CardTitle></NavLink>
                                                    <CardText className="font-weight-light">@{user.username}</CardText>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    );
                                });
                        
                                return (
                                    <React.Fragment>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Following</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{minHeight: 300}}>
                                            {user}
                                        </Modal.Body>
                                    </React.Fragment>
                                )
                            } else if(this.state.showing === 2 && this.props.fetchUser.fetchUser === false){
                                const user = this.props.fetchUser.fetchedUser.map((user) => {
                                    return (
                                        <ListGroupItem className="p-2" style={{border: "none", boxShadow: "0px 0px 0px white", border: "solid", borderWidth: "0 0 1px 0", borderColor: "#cfcfcf"}}>
                                            <div className="row m-0">
                                                <div className="m-0 mt-1 p-0 d-inline">
                                                    <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                                </div>
                                                <div className="d-inline ml-2">
                                                    <NavLink style={{color: "black"}} to={"/profile/" + user.username }><CardTitle className="mb-1 d-inline"><strong>{user.name} </strong> </CardTitle></NavLink>
                                                    <CardText className="font-weight-light">@{user.username}</CardText>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    );
                                });
                        
                                return (
                                    <React.Fragment>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Followers</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{minHeight: 300}}>
                                            {user}
                                        </Modal.Body>
                                    </React.Fragment>
                                )
                            }
                        })()
                    }
                </Modal>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Profile));