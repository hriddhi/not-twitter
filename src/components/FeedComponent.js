import React from 'react';
import { connect } from 'react-redux';
import  { Row, Card, CardText, CardBody, CardTitle, Button, CardFooter, ListGroup, ListGroupItem,
        InputGroupAddon, InputGroup, Navbar, NavbarBrand } from 'reactstrap';
import { OverlayTrigger, Tooltip, Image, Spinner } from 'react-bootstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { fadeInDown, fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium'
import { fetchComments } from '../redux/ActionCreator';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const required = (val) => val && val.length;

const mapDispatchToProp = (dispatch) => ({
    fetchComments: (id) => dispatch(fetchComments(id))
});

const mapStateToProps = state => {
    return {
        posts: state.posts,
        comments: state.comments,
        likes: state.likes
    }
};

class Feed extends React.Component {

    constructor(props) {
        super(props);

        console.log('Constructor Called');
    
        this.state = {
            tweetCharCount: 0,
            errorVisible: false,
            popoverOpen: true,
            selectedPost: null
            
        }

        this.handleTweetSubmit = this.handleTweetSubmit.bind(this);
        this.countChars = this.countChars.bind(this);
        this.togglePopOver = this.togglePopOver.bind(this);
    }

    togglePopOver(){
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }

    onPostSelect(post){
        if(this.props.comments[post.id] === undefined && !this.props.comments.isLoading)
            this.props.fetchComments(post.id);
        
        if(this.state.selectedPost === post)
            this.setState({ selectedPost: null });
        else
            this.setState({ selectedPost: post });
    }

    countChars(event){
        this.setState({
            tweetCharCount: event.target.value.length
        });
    }

    handleTweetLike(user, post){
        this.props.postLike(post.id, user.id);
    }

    handleTweetSubmit(values, user){
        var tweet = values.tweet;
        this.props.postTweet(tweet.slice(0,256), user.username, user.name);
        //this.props.feedScrollFunc(window.pageYOffset);
    }

    handleCommentSubmit(values, user, post){
        this.props.postComment(user.id, post.id, values.comment, user.name, user.username);
        //this.props.feedScrollFunc(window.pageYOffset);
    }

    renderComment(post) {
            
            var comments = null;
            console.log(this.props.comments[post.id] !== undefined);
            if(this.props.comments[post.id] !== undefined){
                comments = this.props.comments[post.id].map((comment) => {
                    return (    
                        <StyleRoot>
                            <div  key={post.id + "_" + comment.id + "_comment"} style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeInDown, 'fadeInDown')}}>
                                <ListGroupItem className="p-2">
                                    <div className="row m-0">
                                        <div className="col-1 m-0 p-0">
                                            <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                        </div>
                                        <div className="col-11">
                                            <CardTitle className="mb-1"><strong>{comment.name} </strong><span className="font-weight-light">@{post.username}</span></CardTitle>
                                            <CardText>{comment.comment}</CardText>
                                        </div>
                                    </div>
                                </ListGroupItem>    
                            </div>
                        </StyleRoot>
                    );
                });
            }
        
        return (
            <div key={post.id+"_comment_section"} className="pl-1 pr-1 pb-1 pt-0">
                <LocalForm onSubmit={(values) => this.handleCommentSubmit(values, this.props.user, post)}>
                    <InputGroup className="pt-1">
                        <Control.text model=".comment" name="comment" id="comment" className="form-control" />
                        <InputGroupAddon addonType="append">
                            <Button type="submit" className="pr-3 pl-3" color="secondary" size="sm">Post</Button>
                            
                        </InputGroupAddon>
                    </InputGroup>
                </LocalForm>
                <ListGroup className="pt-1"> 
                {   
                    (() => {
                        console.log(this.props.comments[post.id] + " " + post.id);
                        if(this.props.comments[post.id] === undefined && this.props.comments.isLoading){
                            return (
                                <React.Fragment>
                                    <div style={{height: 100}}>
                                        <div style={{width: 50, height: 50, paddingTop: 32,  margin: "0 auto"}}>
                                            <Spinner animation="border" variant="dark" />
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        } else if(this.props.comments[post.id] === undefined && this.props.comments.errMess){
                            return <h4>{this.props.posts.errMess}</h4>;
                        } else {
                            return comments;
                        }
                    })()
                }
                </ListGroup>
            </div>
        )
    }

    renderNavbar() {
        return (
            <Navbar color="light" style={{border: "solid", borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                <NavbarBrand href="/" className="font-weight-bold">Home</NavbarBrand>
            </Navbar>
        )
    }

    render() {
        const feed = this.props.posts.posts.map((post) => {
            if(this.props.posts.isPosting === post.id){
                return (
                    <div style={{position: "relative"}}>
                        <div style={{position: "absolute", left: 48+"%", top: 40+"%"}}>
                            <Spinner animation="border" variant="dark" />
                        </div>
                        <Card style={{margin: 10, opacity: 0.3}}>
                            <CardBody className="p-0">
                                <div className="row m-0 p-2">
                                    <div className="col-1 m-0 p-0">
                                        <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                    </div>
                                    <div className="col-11">
                                        <CardTitle className="mb-1 d-inline"><strong>{post.name} </strong><span className="font-weight-light">@{post.username}</span> </CardTitle><small className="font-weight-light d-none d-md-inline d-lg-inline" style={{float: "right"}}>Date</small>
                                        <CardText style={{textAlign: "justify"}}>{post.tweet}</CardText>
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter className="p-1 m-0 bg-light">
                            <Button type="button" className="mr-1" color="light" size="sm"><span className="fa fa-heart" style={{color: "grey"}}></span> 0 Likes</Button>
                            <Button type="button" className="mr-1" color="light" size="sm"><span className="fa fa-comment" style={{color: "grey"}}></span> Comments</Button>
                            </CardFooter>
                        </Card>
                    </div>
                );
            } else
            return (
                <div key={post.id + "-post"} style={{width: 100+"%"}}>
                    <Card style={{margin: 10}}>
                        <CardBody className="p-0">
                            <div className="row m-0 p-2">
                                <div className="col-1 m-0 p-0">
                                    <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                </div>
                                <div className="col-11">
                                    <CardTitle className="mb-1 d-inline"><strong>{post.name} </strong><span className="font-weight-light">@{post.username}</span> </CardTitle><small className="font-weight-light d-none d-md-inline d-lg-inline" style={{float: "right"}}>Date</small>
                                    <CardText style={{textAlign: "justify"}}>{post.tweet}</CardText>
                                </div>
                            </div>
                            
                            <CardFooter className="p-1 m-0 bg-light">
                                <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={
                                    <Tooltip id="button-tooltip"> 
                                    { 
                                        (() => { 
                                            if(this.props.likes[post.id] === undefined) 
                                                return 'No Likes'; 
                                            else
                                                return this.props.likes[post.id].slice(0,5).map((user) => <p className="p-0 m-0">{"User : " + user}</p>);
                                        })()
                                    }
                                    {this.props.likes[post.id] !== undefined && this.props.likes[post.id].length > 5 ? <p className="p-0 m-0">and {this.props.likes[post.id].length - 5} more ...</p> : null}
                                    </Tooltip>}>
                                    <Button type="button"  onClick={() => this.handleTweetLike(post, this.props.user)} className="mr-1" color="light" size="sm">
                                        <span style={{paddingRight: 4, color: (() =>{ if(this.props.likes[post.id] !== undefined && this.props.likes[post.id].includes(this.props.user.id)) return "red"; else return "grey"})()}} className="fa fa-heart"></span>
                                        { this.props.likes[post.id] === undefined ? 0 : this.props.likes[post.id].length } Likes
                                    </Button>
                                </OverlayTrigger>

                                <Button color="light" size="sm" onClick={() => this.onPostSelect(post)}><span style={{color: "grey"}} className="fa fa-comment"></span> {this.props.comments[post.id] === undefined ? ' ' : this.props.comments[post.id].length } Comments</Button>
                                {            
                                    (() => {
                                        if(this.state.selectedPost != null && this.state.selectedPost.id === post.id){
                                            return this.renderComment(post);
                                        }
                                    })()
                                }
                            </CardFooter> 
                        </CardBody>
                    </Card>
                </div>
            );
        });

        if(this.props.posts.isLoading){
            return (
                <React.Fragment>
                    {this.renderNavbar()}
                    <div style={{height: 500}}>
                        <div style={{width: 50, height: 50, paddingTop: 150,  margin: "0 auto"}}>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </div>
                </React.Fragment>
            )
        } else if(this.props.posts.errMess) {
            return <h4>{this.props.posts.errMess}</h4>;
        } else {
            return (
                <React.Fragment>
                    {this.renderNavbar()}
                    <div style={{width: 100+'%'}}>
                        <Card style={{margin:10}}>
                            <CardBody className="p-0">
                                <LocalForm onSubmit={(values) => this.handleTweetSubmit(values, this.props.user)}>
                                    <div className="row m-0 pt-2 pl-2 pr-2 pb-0">
                                        <div className="col-1 m-0 p-0">
                                            <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                        </div>
                                        <div className="col-11">
                                            <CardTitle className="mb-1"><strong>Username</strong></CardTitle>
                                            <Row className="form-group">
                                                <Control.textarea onChange={this.countChars} model=".tweet" name="tweet" id="tweet" className="form-control" validators={{required}} />
                                            </Row>
                                        </div>
                                    </div>
                                    
                                    <CardFooter className="p-1 m-0 bg-light">
                                        <Button onClick={() => {this.setState({ errorVisible: 'Required' })}} type="submit" className="mr-1" color="light" size="sm">Post</Button> 
                                        <span className="font-weight-light small m-1" style={{float: "right"}}>
                                            { this.state.tweetCharCount ? <div style={{height: 25, width: 25}}><CircularProgressbar strokeWidth={16} maxValue={256} value={this.state.tweetCharCount} text={this.state.tweetCharCount} styles={{textSize: '30px'}} /></div> : null} <strong><Errors className="text-danger" model=".tweet" show="touched" messages={{required: this.state.errorVisible}} /></strong> </span>
                                    </CardFooter> 
                                </LocalForm>
                            </CardBody>
                        </Card>
                        <StyleRoot>
                            <div onClick={() => { if(this.state.errorVisible) this.setState({errorVisible: false}) }} style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeIn, 'fadeIn')}}>
                                {feed}
                            </div>
                        </StyleRoot>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Feed);