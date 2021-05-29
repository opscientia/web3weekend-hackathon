import React from 'react'
import { Card, Text, Divider, Button, Row, Col } from '@geist-ui/react';
import * as Icons from 'react-feather';

function DataCard(props) {
    return (
        <Card width="100%" hoverable>
        <Card.Content>
            <Text b>{props.data.Name}</Text>
        </Card.Content>
        <Divider y={0} />
        <Card.Content>
            {props.data.Authors.map((e => <Text>{e}</Text>))} 
        </Card.Content>
        <Divider y={0} />
        <Card.Content>
            <Row style={{ marginBottom: '15px' }}>
                <Col span={175}>{props.data.Tags.map((e => <Button margin="5px" size="mini">{e}</Button>))}</Col>
                <Col>
                <Button
                    size='small'
                    auto
                    icon={<Icons.Download />}
                    type='secondary'
                    >
                    Download
                </Button>
                </Col>
            </Row>
        </Card.Content>

        </Card>
    )
};

export default DataCard;