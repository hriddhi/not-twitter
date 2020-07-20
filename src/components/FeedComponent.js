import React from 'react';
import { connect } from 'react-redux';
import produce from 'immer';
import { NavLink, withRouter } from 'react-router-dom';
import  { Row, Card, CardText, CardBody, CardTitle, Button, CardFooter, ListGroup, ListGroupItem,
        InputGroup, Navbar, NavbarBrand } from 'reactstrap';
import { OverlayTrigger, Tooltip, Image, Spinner } from 'react-bootstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { fadeInDown, fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Moment from 'react-moment';
import 'moment-timezone';
import { fetchPosts, fetchComments, fetchTweet } from '../redux/ActionCreator';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const required = (val) => val && val.length;

const mapDispatchToProp = (dispatch) => ({
    fetchTweet: (id) => dispatch(fetchTweet(id)),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: (id) => dispatch(fetchComments(id))
});

const mapStateToProps = state => {
    return {
        posts: state.posts,
        comments: state.comments,
        user: state.session.user
    }
};

class Post extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            tweetCharCount: 0,
            errorVisible: false,
        }

        this.handleTweetSubmit = this.handleTweetSubmit.bind(this);
        this.countChars = this.countChars.bind(this);
    }

    countChars(event){
        this.setState(
            produce(draft => {
                draft.tweetCharCount = event.target.value.length
            })
        )
    }

    handleTweetSubmit(values, user){
        var tweet = values.tweet;
        this.props.postTweet(tweet.slice(0,256));
        //this.props.feedScrollFunc(window.pageYOffset);
    }

    render() {
        return (
            <Card style={{margin:10, boxShadow: "0 2px 4px 0", border: "none"}}>
                <CardBody className="p-0">
                    <LocalForm model="post" onSubmit={(values) => this.handleTweetSubmit(values, this.props.user)}>
                        <div className="row m-0 pt-2 pl-2 pr-2 pb-0">
                            <div className="d-none d-md-inline d-lg-inline m-0 mt-1 p-0">
                                <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                            </div>
                            <div className="container ml-3" style={{width: 90+"%"}}>
                                <CardTitle style={{marginLeft: -14, marginBottom: 8, display: "inline"}}><strong>{this.props.user.name}</strong> @<span className="font-weight-light">{this.props.user.username}</span></CardTitle>
                                {this.state.tweetCharCount ? <Control.reset style={{backgroundColor: "rgb(255, 255, 255, 0)", color: "#000", position: "absolute", border: "none", padding: 0, marginTop: -4, right: 16}} model="post" type="reset"><i style={{padding: 5}} onClick={()=> {this.setState({tweetCharCount: 0})}} className="fa fa-times-circle"></i></Control.reset> : null }
                                <Row className="form-group">
                                    <Control.textarea onChange={this.countChars} model=".tweet" name="tweet" id="tweet" className="form-control" validators={{required}}/>
                                </Row>
                            </div>
                        </div>
                        
                        <CardFooter style={{backgroundColor: "#78e2ff"}} className="p-1 m-0">
                            <button className="btn btn-sm btton_feed pl-2 pr-2" style={{backgroundColor: "rgb(255, 255, 255, 0.4)"}} onClick={() => {this.setState({ errorVisible: 'Required' })}} type="submit"><strong>Post</strong></button> 
                            <span className="font-weight-light small m-1" style={{float: "right"}}>
                                { this.state.tweetCharCount ? <div style={{height: 25, width: 25}}><CircularProgressbar strokeWidth={16} maxValue={256} value={this.state.tweetCharCount} text={this.state.tweetCharCount} styles={{textSize: '30px'}} /></div> : null} <strong><Errors className="text-danger" model=".tweet" show="touched" messages={{required: this.state.errorVisible}} /></strong> 
                            </span>
                        </CardFooter> 
                    </LocalForm>
                </CardBody>
            </Card>
        )
    }
}

class Feed extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            popoverOpen: true,
            selectedPost: null
            
        }
    }

    
    componentDidMount() {
        if(!this.props.posts.isLoading)
            this.props.fetchPosts();
    }

    onPostSelect(post){
        if(this.props.comments.comments[post._id] === undefined && !this.props.comments.isLoading)
            this.props.fetchComments(post._id + '$' + post.user.username);
        
        if(this.state.selectedPost === post._id)
            this.setState({ selectedPost: null });
        else
            this.setState({ selectedPost: post._id });
    }

    handleTweetLike(post, user){
        this.props.postLike(post._id);
    }

    handleCommentSubmit(values, post){
        this.props.postComment(post._id, post.user.username, values.comment.slice(0,256));
        //this.props.feedScrollFunc(window.pageYOffset);
    }

    renderComment(post) {
            var comments = null;
            if(this.props.comments.comments[post._id] !== undefined){
                comments = this.props.comments.comments[post._id].map((comment) => {
                    return (    
                        <StyleRoot>
                            <div key={comment._id} style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeInDown, 'fadeInDown')}}>
                                <ListGroupItem className="comment p-2 mb-1 mt-1" style={{border: "none", borderRadius: 10, boxShadow: "0px 0px 0px white"}}>
                                    <div onClick={() => {this.props.fetchTweet(comment._id+'$'+comment.user.username); this.props.history.push('/tweet') }} className="row m-0">
                                        <div className="d-none d-xs-inline d-md-inline d-lg-inline m-0 mt-1 p-0">
                                            <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                        </div>
                                        <div className="container ml-3 p-0" style={{width: 90+"%"}}>
                                            <CardTitle className="mb-1 d-inline"><strong>{comment.user.name} </strong><span className="font-weight-light">@{comment.user.username}</span></CardTitle>
                                            <small className="font-weight-light d-inline" style={{position: "absolute", right: 16}}>{ (new Date().getTime() - new Date(comment.createdAt).getTime())/(1000*3600*24) < 1 ? <Moment fromNow>{comment.createdAt}</Moment> : <Moment format="LT D, MMM">{comment.createdAt}</Moment>}</small>
                                            <CardText>{comment.tweet}</CardText>
                                        </div>
                                    </div>
                                </ListGroupItem>    
                            </div>
                        </StyleRoot>
                    );
                });
            }
        
        return (
            <div key={post._id+"_comment_section"} className="pl-1 pr-1 pb-1 pt-0">
                <LocalForm model={post._id+"comment"} onSubmit={(values) => this.handleCommentSubmit(values, post)}>
                    <div class="container commentbar mt-2" style={{border: "none", borderRadius: 30, padding: 0, backgroundColor: "rgb(255, 255, 255, 0.7)"}} >
                        <InputGroup>
                            <Control.text model=".comment" name="comment" id="comment" className="search-query form-control noHover" style={{border: "none", borderRadius: 30, marginLeft: 0, backgroundColor: "rgb(255, 255, 255, 0)"}}/>
                            <div style={{backgroundColor: "rgb(255, 255, 255, 0)", borderTopRightRadius:"30px", borderBottomRightRadius:"30px"}}>
                                <span><Control.reset className="btn bttnx btn-sm block pl-2 pr-2" style={{border: "none", paddingTop: 9, paddingBottom: 9}} model={post._id+"comment"} type="reset"><i className="fa fa-times-circle"></i></Control.reset></span>
                                <span><button type="submit" class="btn bttn btn-xs pl-2 pr-2 mr-2" style={{border: "none", paddingTop: 6, paddingBottom: 6}}><i class="fa fa-paper-plane"></i></button> </span>
                            </div>
                        </InputGroup>
                    </div>
                </LocalForm>
                <ListGroup className="pt-1"> 
                {   
                    (() => {
                        if(this.props.comments[post._id] === undefined && this.props.comments.isLoading){
                            return (
                                <React.Fragment>
                                    <div style={{height: 100}}>
                                        <div style={{width: 50, height: 50, paddingTop: 32,  margin: "0 auto"}}>
                                            <Spinner animation="border" variant="dark" />
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        } else if(this.props.comments[post._id] === undefined && this.props.comments.errMess){
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
            return (
                <div key={post._id} style={{width: 100+"%"}}>
                    <Card style={{margin: 10, boxShadow: "0 2px 4px 0", border: "none"}}>
                        { post.repliedTo !== null ? <div style={{marginBottom: -4}}><p style={{color: "#737373"}} className="p-0 ml-2 m-0 font-weight-light"><small><span className="fa fa-reply"></span> Replied to <strong>@{post.repliedTo.split('$')[1]}</strong></small></p></div> : null }
                        <CardBody className="p-0">
                            <div className="row m-0 p-2">
                                <div className="d-none d-md-inline d-lg-inline m-0 p-0">
                                    <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail mt-1" style={{maxWidth: 40}} />
                                </div>
                                <div className="container ml-3 p-0" style={{width: 90+"%"}}>
                                    <NavLink style={{color: "black"}} to={"/profile/" + post.user.username }><CardTitle className="mb-1 d-inline"><strong>{post.user.name} </strong><span className="font-weight-light">@{post.user.username}</span> </CardTitle></NavLink>
                                    <small className="font-weight-light d-inline" style={{position: "absolute", right: 16}}>{ (new Date().getTime() - new Date(post.createdAt).getTime())/(1000*3600*24) < 1 ? <Moment fromNow>{post.createdAt}</Moment> : <Moment format="LT D, MMM">{post.createdAt}</Moment>}</small>
                                    <CardText style={{textAlign: "justify"}}>{post.tweet}</CardText>
                                </div>
                            </div>
                            
                            <CardFooter style={{backgroundColor: "#b8f2fc"}} className="p-1 m-0">
                                <OverlayTrigger placementweett="top" delay={{ show: 100, hide: 100 }} overlay={
                                    <Tooltip id="button-tooltip"> 
                                    { 
                                        (() => { 
                                            if(post['like'].length === 0) 
                                                return 'No Likes'; 
                                            else
                                                return post['like'].slice(0,5).map((user) => <p className="p-0 m-0">{user.username}</p>);
                                        })()
                                    }
                                    {post['like'].length !== 0 && post['like'].length > 5 ? <p className="p-0 m-0">and {post['like'].length - 5} more ...</p> : null}
                                    </Tooltip>}>
                                    <button className="btn btn-sm btton_feed mr-1" style={{backgroundColor: "rgb(255, 255, 255, 0.4)"}} type="button"  onClick={() => this.handleTweetLike(post, this.props.user)}>
                                        <span style={{paddingRight: 4, color: (() =>{ if(post['like'].length !== 0 && post.like.findIndex((user) => user.userId === this.props.user._id) !== -1) return "red"; else return "grey"})()}} className="fa fa-heart"></span>
                                        { post['like'].length } Likes
                                    </button>
                                </OverlayTrigger>

                                <button className="btn btn-sm btton_feed mr-1" style={{backgroundColor: "rgb(255, 255, 255, 0.4)"}} onClick={() => this.onPostSelect(post)}><span style={{color: "grey"}} className="fa fa-comment"></span> {this.props.comments.comments[post._id] === undefined ? ' ' : this.props.comments.comments[post._id].length } Comments</button>
                                <button className="btn btn-sm btton_feed mr-1" style={{backgroundColor: "rgb(255, 255, 255, 0.4)"}} onClick={() => {this.props.fetchTweet(post._id+'$'+post.user.username); this.props.history.push('/tweet') }}><span className="fa fa-info-circle" style={{color: "grey"}}></span> More</button>
                                {            
                                    (() => {
                                        if(this.state.selectedPost !== null && this.state.selectedPost === post._id){
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
                    <div style={{height: 600}}>
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
                    <div style={{width: 100+'%', minHeight: 500}}>
                        <Post user={this.props.user} postTweet={this.props.postTweet} />
                        <StyleRoot>
                            <div onClick={() => { if(this.state.errorVisible) this.setState({errorVisible: false}) }} style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeIn, 'fadeIn')}}>
                                {
                                    (()=>{
                                        if(this.props.posts.isPosting === true){
                                            return (
                                                <div style={{position: "relative"}}>
                                                    <div style={{position: "absolute", left: 48+"%", top: 40+"%"}}>
                                                        <Spinner animation="border" variant="dark" />
                                                    </div>
                                                    <Card style={{margin: 10, opacity: 0.3}}>
                                                        <CardBody className="p-0">
                                                            <div className="row m-0 p-2">
                                                                <div className="d-inline m-0 p-0">
                                                                    <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                                                </div>
                                                                <div className="container ml-3" style={{width: 90+"%"}}>
                                                                    <CardTitle className="mb-1 d-inline"><strong>{this.props.user.name} </strong><span className="font-weight-light">@{this.props.user.username}</span> </CardTitle><small className="font-weight-light d-none d-md-inline d-lg-inline" style={{float: "right"}}> Date</small>
                                                                    <CardText style={{textAlign: "justify"}}>Posting...</CardText>
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
                                        }
                                    })()
                                }
                                {feed}
                            </div>
                        </StyleRoot>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Feed));