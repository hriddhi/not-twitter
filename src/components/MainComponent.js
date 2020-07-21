import React from 'react';
import Feed from './FeedComponent';
import Suggest from './SuggestionComponet';
import Profile from './ProfileComponent';
import Tweet from './TweetComponent';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postTweet, postComment, postLike, getUserSuggestion, logoutUser } from '../redux/ActionCreator';
import "react-perfect-scrollbar/dist/css/styles.css";

const mapDispatchToProp = (dispatch) => ({
    postTweet: (tweet, username, name) => dispatch(postTweet(tweet, username, name)),
    postComment: (postID, name, comment) => dispatch(postComment(postID, name, comment)),
    postLike: (postID) => dispatch(postLike(postID)),
    getUserSuggestion: () => dispatch(getUserSuggestion()),
    logoutUser: () => dispatch(logoutUser())
});

const mapStateToProps = state => {
    return {
        login: state.login,
        session: state.session
    }
};

class Main extends React.Component {

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
                    <Link to={"/profile/" + this.props.session.user.username }><i className="fa fa-user-circle fa-2x"></i></Link>
                </div>
                <div className="p-3">
                    <div onClick={()=> this.props.logoutUser()}><i className="fa fa-sign-out fa-2x" style={{cursor: "pointer", color: "blue"}}></i></div>
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
                
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1 col-md-1 p-0 d-none d-md-block d-lg-block" style={{}}> 
                            {this.renderSidebar()}
                        </div>
                        <div className="col-md-11 col-lg-7 p-0" style={{backgroundColor: "#defaff", border: "solid", borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#cfcfcf"}}>
                            <Switch>
                                <Route exact path="/home" component={() => <Feed postTweet={this.props.postTweet} postComment={this.props.postComment} postLike={this.props.postLike} />}/>
                                <Route exact path="/profile/:username" component={(props) => <Profile {...props}/>}/>  
                                <Route exact path="/tweet" component={() => <Tweet/>}/>
                            </Switch>
                        </div>
                        <div className="col-lg-4 p-0 d-none d-lg-block ">
                            <Suggest />
                        </div>
                    </div>
                </div>
                {this.renderFooter()}
                <Redirect to='/home' />
            </React.Fragment>
        );

    }
}

//<Redirect to="/login"/>

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Main));