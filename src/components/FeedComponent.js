import React from 'react';
import  { Row, Card, CardText, CardBody, CardTitle, Button, CardFooter, ListGroup, ListGroupItem,
        InputGroupAddon, InputGroup, Navbar, NavbarBrand } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import ScrollBar from 'react-perfect-scrollbar';
import "react-perfect-scrollbar/dist/css/styles.css";

const required = (val) => val && val.length;

class Feed extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            selectedPost: null,
            tweetCharCount: 0,
            errorVisible: false
        }

        this.handleTweetSubmit = this.handleTweetSubmit.bind(this);
        this.countChars = this.countChars.bind(this);
        
    }

    onPostSelect(post){
        if(this.state.selectedPost != null) {
            this.setState({ selectedPost: null });
        } else {
            this.setState({ selectedPost: post });
        }
    }

    countChars(event){
        this.setState({
            tweetCharCount: event.target.value.length
        });
    }

    handleTweetSubmit(values, user){
        //alert(JSON.stringify(values.tweet.slice(0,150)));
        this.props.postTweet(values.tweet, user.username, user.name);
    }

    handleCommentSubmit(values, user, post){
        this.props.postComment(user.id, post.id, values.comment, user.name, user.username)
    }

    renderComment(post) {
        
        var comments = '';
        if(this.props.comments[post.id] !== undefined){
            comments = this.props.comments[post.id].map((comment) => {
                return (    
                    <ListGroupItem key={comment.id} className="p-2">
                        <div className="row m-0">
                            <div className="col-1 m-0 p-0">
                                <img src="https://f0.pngfuel.com/png/768/766/shin-chan-illustration-png-clip-art.png" alt="profile-image" className="img-thumbnail" style={{borderRadius: 100 + '%', width: 38, height: 38}} />
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
                    {comments}
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
            var id = post.id;
            return (
                <div key={post.id} style={{width: 100+"%"}}>
                    <Card style={{margin: 10}}>
                        <CardBody className="p-0">
                            <div className="row m-0 p-2">
                                <div className="col-1 m-0 p-0">
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-image" className="img-thumbnail" style={{borderRadius: 100 + '%', width: 40, height: 40}} />
                                </div>
                                <div className="col-11">
                                    <CardTitle className="mb-1"><strong>{post.name} </strong><span className="font-weight-light">@{post.username}</span></CardTitle>
                                    <CardText>{post.tweet}</CardText>
                                </div>
                            </div>
                            
                            <CardFooter className="p-1 m-0 bg-light">
                                <Button className="mr-1" color="light" size="sm"> {post.like} Likes</Button>
                                <Button color="light" size="sm" onClick={() => this.onPostSelect(post)}> {this.props.comments[post.id] == undefined ? 0 : this.props.comments[post.id].length } Comments</Button>
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

        return (
            <React.Fragment>
            {this.renderNavbar()}
            <div className="container">
                <ScrollBar className="row d-flex justify-content-center" style={{overflowY: "scroll", height: "100vh", position: "relative"}}>
                    <Card onMouseLeave={() => {this.setState({ errorVisible: '' })}} onMouseEnter={() => {this.setState({ errorVisible: 'Required' })}} style={{width: 100+"%", margin: 10}}>
                        <CardBody className="p-0">
                            <LocalForm onSubmit={(values) => this.handleTweetSubmit(values, this.props.user)}>
                                <div className="row m-0 pt-2 pl-2 pr-2 pb-0">
                                    <div className="col-1 m-0 p-0">
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-image" className="img-thumbnail" style={{borderRadius: 100 + '%', width: 40, height: 40}} />
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
                                   
                                    
                                    <span className="font-weight-light small m-1" style={{float: "right"}}> { this.state.tweetCharCount ? 'Character Remaining: ' + (150 - this.state.tweetCharCount) : '' } <strong><Errors className="text-danger" model=".tweet" show="touched" messages={{required: this.state.errorVisible}} /></strong> </span>
                                </CardFooter> 
                            </LocalForm>
                        </CardBody>
                    </Card>
                    {feed}
                </ScrollBar>
            </div>
            </React.Fragment>
        );
    }
}

export default Feed;