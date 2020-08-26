import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardHeader, ListGroupItem, ListGroup, Button } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { fetchTweet, followUser, getUserSuggestion, postUserSuggestion } from '../redux/ActionCreator';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

const mapDispatchToProp = (dispatch) => ({
    fetchTweet: (id) => dispatch(fetchTweet(id)),
    getUserSuggestion: () => dispatch(getUserSuggestion()),
    followUser: (id) => dispatch(followUser(id)),
    postUserSuggestion: (id) => dispatch(postUserSuggestion(id))
});

const mapStateToProps = state => {
    return {
        session: state.session
    }
};

class Suggest extends React.Component {

    componentDidMount(){
        this.props.getUserSuggestion();
    }

    renderSuggestion(){
        const user = this.props.session.user_suggestion.map((user) => {
            return (
                <ListGroupItem className="p-2" style={{border: "none", boxShadow: "0px 0px 0px white", border: "solid", borderWidth: "0 0 1px 0", borderColor: "#cfcfcf"}}>
                    <div className="row m-0">
                        <div className="m-0 mt-1 p-0 d-inline">
                            <Image roundedCircle src={user.profile_picture} alt="profile" style={{maxWidth: 40}} />
                        </div>
                        <div className="d-inline ml-2">
                            <NavLink style={{color: "black"}} to={"/profile/" + user.username }><CardTitle className="mb-1 d-inline"><strong>{user.name} </strong> </CardTitle></NavLink>
                            <CardText className="font-weight-light">@{user.username}</CardText>
                        </div>
                        <button className="btn btn-sm btton" onClick={()=> this.props.postUserSuggestion(user._id)} style={{position: "absolute", right: 8, top: 8, marginTop: 10}}><strong>Follow</strong></button>
                    </div>
                </ListGroupItem>
            );
        });

        return user;
        
    }

    render() {
        return (
            <Card className="m-2">
                <CardHeader>
                    <CardTitle className="m-0 font-weight-bold">Who to follow</CardTitle>
                </CardHeader>
                <CardBody className="p-2">
                    <ListGroup>
                        { this.props.session.user_suggestion !== null ? this.renderSuggestion() : null }
                    </ListGroup>
                </CardBody>
            </Card>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Suggest));