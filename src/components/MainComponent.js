import React from 'react';
import Feed from './FeedComponent';
import News from './NewsComponet';
import Profile from './ProfileComponent';
import Registration from './RegistrationComponent';
import Login from './LoginComponent';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postTweet, postComment, postLike } from '../redux/ActionCreator';
import "react-perfect-scrollbar/dist/css/styles.css";

const mapDispatchToProp = (dispatch) => ({
    postTweet: (tweet, username, name) => dispatch(postTweet(tweet, username, name)),
    postComment: (userID, postID, comment, name, username) => dispatch(postComment(userID, postID, comment, name, username)),
    postLike: (userID, postID) => dispatch(postLike(userID, postID))
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
                {
                    (() => {
                        if(this.props.session.session){
                            return (
                                <React.Fragment>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 p-0 d-none d-md-block d-lg-block" style={{}}> 
                                            {this.renderSidebar()}
                                        </div>
                                        <div className="col-md-11 col-lg-7 p-0" style={{border: "solid", borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#cfcfcf"}}>
                                            <Switch>
                                                <Route path="/home" component={() => <Feed postTweet={this.props.postTweet} postComment={this.props.postComment} postLike={this.props.postLike} />}/>
                                                <Route exact path="/profile/:username" component={(props) => <Profile {...props}/>}/>  
                                            </Switch>
                                        </div>
                                        <div className="col-lg-4 p-0 d-none d-lg-block ">
                                            <News />
                                        </div>
                                    </div>
                                </div>
                                {this.renderFooter()}
                                <Redirect to='/home' />
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <React.Fragment>
                                    <Switch>
                                        <Route exact path="/login" component={() => <Login />}/>
                                        <Route exact path="/register" component={() => <Registration />}/>
                                    </Switch>
                                    <Redirect to="/login"/>
                                </React.Fragment>
                            );
                        }
                    })()
                }
            </React.Fragment>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Main));