import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'


import { Card,Image,Button ,Text, Row, Col } from '@geist-ui/react';
import {Upload} from '@geist-ui/react-icons'

import * as Icons from 'react-feather';


function MyDropzone(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
 

  return (
    <div {...getRootProps()}>

        <input {...getInputProps()} />
        {/*Input above needs to stay, can use any component below, image, paragraph... */}
        <Card  hoverable width="1000px">
            <Row gap={0.8} justify="center" style={{ marginBottom: '15px', marginTop: '15px'}}>
                <Col span={4}>
                    <Upload size={40}/>
                </Col>
            </Row>
            <Row gap={0.8} align="center" style={{ marginBottom: '15px' }}>
                <Col span={30}>
                    <Text type="primary" align="center"  medium><b>Drag 'n' Drop files here or Click to select Files</b></Text>
                      <Button iconRight={<Icons.File size={16} />} auto size="small" />
                </Col>
            </Row>
            <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
        </Card>
    </div>
    
  )
};

export default MyDropzone;
