import React from 'react';
import { Input, Button, Row, Col } from '@geist-ui/react';

function Form(props) {
    return (
        <div align="center">
            <Row gap={.8} style={{ marginTop: '15px', marginBottom: '15px' }}>
            <Col>
                <Input placeholder="Enter here" onChange={props.titleHandler} value={props.title}>
                    Title:
                </Input>
            </Col>
            <Col>
                <Input placeholder="Enter here" onChange={props.authorsHandler} value={props.authors}>
                    Authors:
                </Input>
            </Col>
            <Col>
                <Input placeholder="Enter here" >
                    Tags:
                </Input>
            </Col>
            </Row>
            <Button align="center" onClick={props.submitHandler}>Submit</Button>
        </ div>
    )
};

export default Form;
