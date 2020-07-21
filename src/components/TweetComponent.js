import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import  { Card, CardText, CardBody, CardTitle, CardFooter, ListGroup, ListGroupItem,
        InputGroup, Navbar, NavbarBrand } from 'reactstrap';
import { Image, Spinner } from 'react-bootstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { fadeInDown, fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Moment from 'react-moment';
import { __postLike, __postComment, fetchTweet } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        errMess: state.tweet.errMess,
        isLoading: state.tweet.isLoading,
        post: state.tweet.post,
        comments: state.tweet.comments,
        user: state.session.user
    }
};

const mapDispatchToProp = (dispatch) => ({
    fetchTweet: (id) => dispatch(fetchTweet(id)),
    __postComment: (postId, comment) => dispatch(__postComment(postId, comment)),
    __postLike: (postId) => dispatch(__postLike(postId))
});

class Tweet extends React.Component {
    renderComment() {
        var comments = null;
        if(this.props.comments.length !== 0){
            comments = this.props.comments.map((comment) => {
                return (
                    <StyleRoot>
                        <div  key={comment._id} style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeInDown, 'fadeInDown')}}>
                            <ListGroupItem className="comment p-2 mt-1 mb-1" style={{border: "none", borderRadius: 10}}>
                                <div className="row m-0">
                                    <div className="col-1 m-0 p-0">
                                        <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 40}} />
                                    </div>
                                    <div onClick={() =>{ this.props.fetchTweet(comment._id+'$'+comment.user.username)}} className="col-11">
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
            <div className="pl-1 pr-1 pb-1 pt-0">
                <LocalForm model={this.props.post._id+"comment"} onSubmit={(values) => this.props.__postComment(this.props.post._id+'$'+this.props.post.user.username, values.comment.slice(0,256))}>
                    <div class="container commentbar mt-2" style={{border: "none", borderRadius: 30, padding: 0, backgroundColor: "rgb(255, 255, 255, 0.7)"}} >
                        <InputGroup>
                            <Control.text model=".comment" name="comment" id="comment" className="search-query form-control noHover" style={{border: "none", borderRadius: 30, marginLeft: 0, backgroundColor: "rgb(255, 255, 255, 0)"}}/>
                            <div style={{backgroundColor: "rgb(255, 255, 255, 0)", borderTopRightRadius:"30px", borderBottomRightRadius:"30px"}}>
                                <span><Control.reset className="btn bttnx btn-sm block pl-2 pr-2" style={{border: "none", paddingTop: 9, paddingBottom: 9}} model={this.props.post._id+"comment"} type="reset"><i className="fa fa-times-circle"></i></Control.reset></span>
                                <span><button type="submit" class="btn bttn btn-xs pl-2 pr-2 mr-2" style={{border: "none", paddingTop: 6, paddingBottom: 6}}><i class="fa fa-paper-plane"></i></button> </span>
                            </div>
                            </InputGroup>
                    </div>
                </LocalForm>

                <ListGroup className="pt-1"> 
                    {comments}
                </ListGroup>
            </div>
        )
    }

    renderNavbar() {
        return (
            <Navbar color="light" style={{border: "solid", borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                <NavbarBrand href="/" className="font-weight-bold">Tweet</NavbarBrand>
            </Navbar>
        )
    }

    render() {

        if(this.props.isLoading){
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
        } else if(this.props.errMess) {
            return <h4>{this.props.errMess}</h4>;
        } else {
            return (
                <React.Fragment>
                    {this.renderNavbar()}
                    <div style={{width: 100+'%', minHeight: 500}}>
                        <StyleRoot>
                            <div style={{animation: 'x 0.8s', animationName: Radium.keyframes(fadeIn, 'fadeIn')}}>
                                <Card style={{margin: 10, boxShadow: "0 2px 4px 0", border: "none"}}>
                                    <div>{ this.props.post.repliedTo !== null ? <button style={{background: "none", border: "none"}} onClick={() => {this.props.fetchTweet(this.props.post.repliedTo.split('$')[0]); } }><p style={{color: "#737373"}} className="p-0 ml-2 m-0 font-weight-light"><small><span className="fa fa-reply"></span> Replied to <strong>@{this.props.post.repliedTo.split('$')[1]}</strong></small></p></button> : null }</div>
                                    <CardBody className="p-0">
                                        <div className="row m-0 p-2">
                                            <div className="col-1 m-0 p-0">
                                                <Image roundedCircle src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="img-thumbnail" style={{maxWidth: 50}} />
                                            </div>
                                            <div className="col-11">
                                                <NavLink style={{color: "black"}} to={"/profile/" + this.props.post.user.username }><CardTitle className="mb-1 d-inline"><strong>{this.props.post.user.name} </strong></CardTitle></NavLink>
                                                <CardTitle className="font-weight-light mb-1">@{this.props.post.user.username}</CardTitle>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <CardText className="lead pb-2 mb-0" style={{textAlign: "justify", fontSize: 20, border: "solid", borderWidth: "0 0 1px 0", borderColor: "#cfcfcf"}}>{this.props.post.tweet}</CardText>
                                            <div className="mb-2"><small><Moment format="LT D MMM, YYYY">{this.props.post.createdAt}</Moment></small></div>
                                        </div>
                                        
                                        <CardFooter style={{backgroundColor: "#b8f2fc"}} className="p-1 m-0">
                                            <button className="btn btn-sm btton_feed mr-1" style={{backgroundColor: "rgb(255, 255, 255, 0.4)"}}  onClick={() => this.props.__postLike(this.props.post._id)}>
                                                <span style={{paddingRight: 4, color: (() =>{ if(this.props.post['like'].length !== 0 && this.props.post.like.findIndex((user) => user.userId === this.props.user._id) !== -1) return "red"; else return "grey"})()}} className="fa fa-heart"></span>
                                                { this.props.post['like'].length } Likes
                                            </button>

                                            <button className="btn btn-sm btton_feed mr-1" style={{backgroundColor: "rgb(255, 255, 255, 0.4)"}}><span style={{color: "grey"}} className="fa fa-comment"></span> {this.props.comments.length } Comments</button>
                                            {this.renderComment()}
                                        </CardFooter>
                                    </CardBody>
                                </Card>
                            </div>
                        </StyleRoot>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Tweet));