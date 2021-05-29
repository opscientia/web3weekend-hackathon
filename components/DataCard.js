import React from 'react'
import { Card, Text, Divider, Button, Spacer } from '@geist-ui/react';

function DataCard(props) {
    return (
        <Card width="400px" hoverable>
        <Card.Content>
            <Text b>{props.data.Name}</Text>
        </Card.Content>
        <Divider y={0} />
        <Card.Content>
            <Text>{props.data.Authors}</Text>
        </Card.Content>
        <Divider y={0} />
        <Card.Content>
            {props.data.Tags.map((e => <div><Button size="mini">{e}</Button> <Spacer y={.5} /></div>))}    
        </Card.Content>
        </Card>
    )
};

export default DataCard;