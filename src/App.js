import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Feed from './components/FeedComponent';
import News from './components/NewsComponet';
import './App.css';
import { POSTS } from './shared/posts';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      posts: POSTS
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-1 p-0">
            
              <span className="m-2 float-right fa fa-twitter fa-3x" style={{color: "#03b1fc"}}></span>
            
          
              <span className="mt-4 m-3 float-right fa fa-home fa-2x" style={{clear: "right"}}></span>
            
            
              <span className="m-3 float-right fa fa-user-circle fa-2x" style={{clear: "right"}}></span>
              <span className="m-3 float-right fa fa-rocket fa-2x" style={{clear: "right"}}></span>
            
          
          </div>
          <div className="col-md-7 p-0" style={{border: "solid", borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#cfcfcf"}}>
            <Navbar color="light" style={{border: "solid", borderBottomWidth: 1,
                                          borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: "#cfcfcf"}}>
                <NavbarBrand href="/" className="font-weight-bold">Home</NavbarBrand>
            </Navbar>
            <Feed posts={this.state.posts}/>
          </div>
          <div className="col-md-4 p-0">
            <News />
          </div>
        </div>

      </div>
    )
  }
}

export default App;
