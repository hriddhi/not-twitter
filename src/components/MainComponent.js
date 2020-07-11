import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Feed from './FeedComponent';
import News from './NewsComponet';
import Profile from './ProfileComponent';
import { POSTS } from '../shared/posts';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import "react-perfect-scrollbar/dist/css/styles.css";

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

class Main extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            auth: true,
            user: {
                name: 'Hriddhi Mondal',
                username: 'hriddhi1990',
                profile_picture: null,
                location: 'Howrah, India',
                dob: 'July 23, 1999',
                joined: 'August 2013',
                link: 'https://youtube.com/c/TechFreak01',
                tweet_id: [1,2,3,4,5],
                commented_id: [3,45,6],
                liked_id: [76,98,34,1,2]
            }
        };
    }

    renderSidebar() {
        return (
            <React.Fragment>
                <span className="m-2 mb-4 float-right fa fa-twitter fa-3x" style={{color: "#03b1fc"}}></span>
                <Link to="/home" className="m-3 float-right" style={{clear: "right"}}><span className="fa fa-home fa-2x"></span></Link>
                <Link to="/profile" className="m-3 float-right" style={{clear: "right"}}><span className="fa fa-user-circle fa-2x"></span></Link>
                <a href="/" className="m-3 float-right" style={{clear: "right"}}><span className="fa fa-rocket fa-2x"></span></a>
            </React.Fragment>
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
                    <div className="col-md-1 p-0 d-none d-lg-block "> 
                        {this.renderSidebar()}
                    </div>
                    <div className="col-md-7 p-0" style={{border: "solid", borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#cfcfcf"}}>
                        <Switch>
                            <Route path="/home" component={() => <Feed posts={this.props.posts}/>}/>
                            <Route exact path="/profile" component={() => <Profile user={this.state.user}/>}/>
                        </Switch>
                    </div>
                    <div className="col-md-4 p-0">
                        <News />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Main));
