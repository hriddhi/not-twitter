import React from 'react';
import Feed from './FeedComponent';
import News from './NewsComponet';
import Profile from './ProfileComponent';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, postTweet, postComment, postLike } from '../redux/ActionCreator';
import "react-perfect-scrollbar/dist/css/styles.css";

const mapStateToProps = state => {
    return {
        posts: state.posts,
        comments: state.comments,
        likes: state.likes
    }
}

const mapDispatchToProp = (dispatch) => ({
    fetchPosts: () => dispatch(fetchPosts()),
    postTweet: (tweet, username, name) => dispatch(postTweet(tweet, username, name)),
    postComment: (userID, postID, comment, name, username) => dispatch(postComment(userID, postID, comment, name, username)),
    postLike: (userID, postID) => dispatch(postLike(userID, postID))
})

class Main extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            auth: true,
            user: {
                id: '69',
                name: 'Hriddhi Mondal',
                username: 'hriddhi1990',
                profile_picture: null,
                location: 'Howrah, India',
                dob: 'July 23, 1999',
                joined: 'August 2013',
                link: 'https://youtube.com/c/TechFreak01',
                tweet_id: ['1','2'],
                commented_id: ['3'],
                liked_id: ['76','98','34','1','2']
            },
            feedScrollPos: 0,
            feedScrollFunc: (val) => {this.setState({ feedScrollPos: val})},
            selectedPost: null,
            selectedPostFunc: (val) => {this.setState({ selectedPost: val})}
        };
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderSidebar() {
        return (
            <div style={{position: "fixed"}}>
                <div className="p-2 pb-4">
                    <i className="fa fa-twitter fa-3x" style={{color: "#03b1fc"}}></i>
                </div>
                <div className="p-3">
                    <Link to="/home" ><i className="fa fa-home fa-2x"></i></Link>
                </div>
                <div className="p-3">
                    <Link to="/profile"><i className="fa fa-user-circle fa-2x"></i></Link>
                </div>
                <div className="p-3">
                    <a href="/"><i className="fa fa-rocket fa-2x"></i></a>
                </div>
            </div>
        )
    }

    renderFooter(){
        return (
            <div className="container-fluid" style={{height: 50, textAlign: "center", backgroundColor: "#ededed", border: "solid", borderBottomWidth: 0, borderTopWidth: 1,
                                        borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                <p className='m-2' style={{color: '#7a7a7a'}}>Made with <i className="fa fa-heart"></i> by <i> Hriddhi.</i></p>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Redirect to="/home" />
                </Switch>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1 col-md-1 p-0 d-none d-md-block d-lg-block" style={{}}> 
                            {this.renderSidebar()}
                        </div>
                        <div className="col-md-11 col-lg-7 p-0" style={{border: "solid", borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#cfcfcf"}}>
                            <Switch>
                                <Route path="/home" component={() => <Feed posts={this.props.posts} comments={this.props.comments} likes={this.props.likes} postTweet={this.props.postTweet} postComment={this.props.postComment} postLike={this.props.postLike} user={this.state.user}
                                                                        feedScrollPos={this.state.feedScrollPos} feedScrollFunc={this.state.feedScrollFunc} selectedPost={this.state.selectedPost} selectedPostFunc={this.state.selectedPostFunc} />}/>
                                <Route exact path="/profile" component={() => <Profile user={this.state.user}/>}/>
                            </Switch>
                        </div>
                        <div className="col-lg-4 p-0 d-none d-lg-block ">
                            <News />
                        </div>
                    </div>
                </div>
                {this.renderFooter()}
            </React.Fragment>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Main));
