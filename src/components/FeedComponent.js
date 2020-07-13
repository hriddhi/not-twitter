import React from 'react';
import  { Row, Card, CardText, CardBody, CardTitle, Button, CardFooter, ListGroup, ListGroupItem,
        InputGroupAddon, InputGroup, Navbar, NavbarBrand } from 'reactstrap';
import { OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium'
import "react-perfect-scrollbar/dist/css/styles.css";

const required = (val) => val && val.length;


class Feed extends React.Component {

    constructor(props) {
        super(props);

        console.log('In constructor');
    
        this.state = {
            tweetCharCount: 0,
            errorVisible: false,
            popoverOpen: true
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
        if(this.props.selectedPost === post)
            this.props.selectedPostFunc(null);    
        else
            this.props.selectedPostFunc(post);
    }

    componentWillUnmount(){
        console.log(this.props.feedScrollPos);
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
        this.props.feedScrollFunc(window.pageYOffset);
    }

    handleCommentSubmit(values, user, post){
        this.props.postComment(user.id, post.id, values.comment, user.name, user.username);
        this.props.feedScrollFunc(window.pageYOffset);
    }

    renderComment(post) {
        
        var comments = '';
        if(this.props.comments[post.id] !== undefined){
            comments = this.props.comments[post.id].map((comment) => {
                return (    
                    <ListGroupItem key={comment.id} className="p-2">
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
                );
            });
        }

        return (
            <div className="p-2">
                <LocalForm onSubmit={(values) => this.handleCommentSubmit(values, this.props.user, post)}>
                    <InputGroup className="pt-1">
                        <Control.text model=".comment" name="comment" id="comment" className="form-control" />
                        <InputGroupAddon addonType="append">
                            <Button type="submit" className="pr-3 pl-3" color="secondary" size="sm">Post</Button>
                            
                        </InputGroupAddon>
                    </InputGroup>
                </LocalForm>
                <ListGroup className="pt-1">
                    <StyleRoot>
                        <div style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeInDown, 'fadeInDown')}}>
                            {comments}
                        </div>
                    </StyleRoot>
                </ListGroup>
            </div>
        )
    }

    renderNavbar() {
        return (
            <Navbar color="light" style={{border: "solid", borderBottomWidth: 1, borderTopWidth: 0,
                                                     borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                <NavbarBrand href="/" className="font-weight-bold">Home</NavbarBrand>
            </Navbar>
        )
    }

    

    render() {
        
        const feed = this.props.posts.map((post) => {
            return (
                <div key={post.id} style={{width: 100+"%"}}>
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
                               
                                <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={<Tooltip id="button-tooltip"> 
                                    { 
                                        (() => { 
                                            if(this.props.likes[post.id] == undefined) 
                                                return 'No Likes'; 
                                            else
                                                return this.props.likes[post.id].slice(0,5).map((user) => <p className="p-0 m-0">{"User : " + user}</p>);
                                        })()
                                        
                                        
                                    }
                                    {this.props.likes[post.id] != undefined && this.props.likes[post.id].length > 5 ? <p className="p-0 m-0">and {this.props.likes[post.id].length - 5} more ...</p> : null}
                                    </Tooltip>}>
                                    <Button id="Popover" type="button"  onClick={() => this.handleTweetLike(post, this.props.user)} className="mr-1" color="light" size="sm"><span style={{color: (() =>{ if(this.props.likes[post.id] !== undefined && this.props.likes[post.id].includes(this.props.user.id)) return "red"; 
                                                                                                                                                                                else return "grey"})()}} className="fa fa-heart"></span> {this.props.likes[post.id] === undefined ? 0 : this.props.likes[post.id].length } Likes</Button>
                                </OverlayTrigger>
               

                                <Button color="light" size="sm" onClick={() => this.onPostSelect(post)}><span style={{color: "grey"}} className="fa fa-comment"></span> {this.props.comments[post.id] === undefined ? 0 : this.props.comments[post.id].length } Comments</Button>
                                {            
                                    (() => {
                                        if(this.props.selectedPost != null && this.props.selectedPost.id === post.id){
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

        

        return (
            <React.Fragment>
            {this.renderNavbar()}
            <div scrollTop={this.state.feedScrollPos} style={{width: 100+'%'}}>
                
                    <Card scrollTop={this.state.feedScrollPos} onMouseLeave={() => {this.setState({ errorVisible: '' })}} onMouseEnter={() => {this.setState({ errorVisible: 'Required' })}} style={{margin:10}}>
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
                                    <span className="font-weight-light small m-1" style={{float: "right"}}> { this.state.tweetCharCount ? 'Character Remaining: ' + (256 - this.state.tweetCharCount) : '' } <strong><Errors className="text-danger" model=".tweet" show="touched" messages={{required: this.state.errorVisible}} /></strong> </span>
                                </CardFooter> 
                            </LocalForm>
                        </CardBody>
                    </Card>
                    {feed}
                
            </div>
            </React.Fragment>
        );

        
    }
}

export default Feed;