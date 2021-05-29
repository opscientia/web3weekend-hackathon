import React from 'react'
import { Input, Button, Row, Col, Loading } from '@geist-ui/react';

function Form(props) {
    return (
        <div align="center">
            <div>
                {props.listItems}
            </div>
            <Row gap={.8} style={{ marginTop: '15px', marginBottom: '15px' }}>
            <Col>
                <Input placeholder="Enter here" >
                    Title: 
                </Input>
            </Col>
            <Col>
                <Input placeholder="Enter here" >
                    Authors: 
                </Input>
            </Col>
            <Col>
                <Input placeholder="Enter here" >
                    Tags:
                </Input>
            </Col>
            </Row>
            <Button align="center">Submit</Button>
        </ div>
    )
};

export default Form;