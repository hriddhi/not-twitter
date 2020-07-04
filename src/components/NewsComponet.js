import React from 'react';
import  { Card, CardImg, CardText, CardBody, CardTitle,
        CardSubtitle, Button, CardHeader, CardFooter,
        ListGroup, ListGroupItem, Form, FormGroup, Input,
        InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap';

class News extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="m-2">
                <CardHeader>
                    <CardTitle className="m-0 font-weight-bold">What's Happening</CardTitle>
                </CardHeader>
                <CardBody style={{height: 500}}>

                </CardBody>
            </Card>
        );
    }
}

export default News;