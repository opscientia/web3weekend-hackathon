import React from 'react'
import { Card, Text, Divider } from '@geist-ui/react';

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
        </Card>
    )
};

export default DataCard;