import React from 'react'
import { Input, Button, Row, Col, Loading } from '@geist-ui/react';

function Form(props) {
    return (
        <div align="center">
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
      {!(props.loading == null) && <div>
                <Row style={{ margin: '10px'}}>
                    <Loading>{props.loading}</Loading>
                </Row>
            </div>
            }
            <div>
                {props.listItems}
            </div>
      <Button align="center">Submit</Button>
        </ div>

    )
};

export default Form;