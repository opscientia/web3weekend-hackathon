import React from 'react'
import {useDropzone} from 'react-dropzone'


import { Card,Text, Row, Col } from '@geist-ui/react';
import {Upload} from '@geist-ui/react-icons'


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
        <Card hoverable width="100%">
            <Row gap={0.8} justify="center" style={{ marginBottom: '15px', marginTop: '15px'}}>
                <Col span={1.5}>
                    <Upload size={40}/>
                </Col>
            </Row>
            <Row gap={0.8} align="center" style={{ marginBottom: '15px' }}>
                <Col span={30}>
                    <Text type="primary" align="center"  medium><b>Drag and Drop</b></Text>
                    <Text type="primary" align="center"  medium><b>or</b></Text>
                    <Text type="primary" align="center"  medium><b>Click to Select Files</b></Text>
                </Col>
            </Row>
            <aside>
        <ul>{files}</ul>
      </aside>
        </Card>
    </div>
    
  )
};

export default MyDropzone;
