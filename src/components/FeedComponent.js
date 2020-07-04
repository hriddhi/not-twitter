import React from 'react';
import  { Card, CardImg, CardText, CardBody, CardTitle,
        CardSubtitle, Button, CardHeader, CardFooter,
        ListGroup, ListGroupItem, Form, FormGroup, Input,
        InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap';

class Feed extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            selectedPost: null
        }
    }

    onPostSelect(post){
        if(this.state.selectedPost != null) {
            this.setState({ selectedPost: null });
        } else {
            this.setState({ selectedPost: post });
        }
    }

    renderComment(post) {
        
        const comments = post.comments.map((comment) => {
            return (    
                <ListGroupItem className="p-2">
                    <div className="row m-0">
                        <div className="col-1 m-0 p-0">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-image" className="img-thumbnail" style={{borderRadius: 100 + '%', width: 38, height: 38}} />
                        </div>
                        <div className="col-11">
                            <CardTitle className="mb-1"><strong>{comment.name} </strong><span className="font-weight-light">@{post.username}</span></CardTitle>
                            <CardText>{comment.comment}</CardText>
                        </div>
                    </div>
                </ListGroupItem>    
            );
        });

        return (
            <React.Fragment className="p-2">
                <InputGroup className="pt-1">
                    <Input />
                    <InputGroupAddon addonType="append">
                        <Button className="pr-3 pl-3" color="secondary" size="sm">Post</Button>
                    </InputGroupAddon>
                </InputGroup>
                <ListGroup className="pt-1">
                    {comments}
                </ListGroup>
            </React.Fragment>
        )
    }

    render() {
        const feed = this.props.posts.map((post) => {
            return (
                <div style={{width: 100+"%"}}>
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
                                <Button color="light" size="sm" onClick={() => this.onPostSelect(post)}> {post.comments.length} Comments</Button>
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
            <div className="container">
                <div className="row d-flex justify-content-center" style={{overflowY: "scroll", height: "100vh"}}>
                    <Card style={{width: 100+"%", margin: 10}}>
                        <CardBody className="p-0">
                            <div className="row m-0 pt-2 pl-2 pr-2 pb-0">
                                <div className="col-1 m-0 p-0">
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-image" className="img-thumbnail" style={{borderRadius: 100 + '%', width: 40, height: 40}} />
                                </div>
                                <div className="col-11">
                                    <CardTitle className="mb-1"><strong>Username</strong></CardTitle>
                                    <Form>
                                        <FormGroup>
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </FormGroup>
                                    </Form>
                                </div>
                            </div>
                            
                            <CardFooter className="p-1 m-0 bg-light">
                                <Button className="mr-1" color="light" size="sm">Post</Button>
                            </CardFooter> 
                        </CardBody>
                    </Card>
                    {feed}
                </div>
            </div>
        );
    }
}

export default Feed;