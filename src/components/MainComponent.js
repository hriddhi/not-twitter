import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Feed from './FeedComponent';
import News from './NewsComponet';
import Profile from './ProfileComponent';
import { POSTS } from '../shared/posts';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

class Main extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            posts: POSTS
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
                    <div className="col-md-1 p-0"> 
                        {this.renderSidebar()}
                    </div>
                    <div className="col-md-7 p-0" style={{border: "solid", borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#cfcfcf"}}>
                        <Switch>
                            <Route path="/home" component={() => <Feed posts={this.state.posts}/>}/>
                            <Route exact path="/profile" component={() => <Profile/>}/>
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

export default Main;
