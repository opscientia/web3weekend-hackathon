import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'


import { Card,Image,Button ,Text, Row, Col } from '@geist-ui/react';
import {Upload} from '@geist-ui/react-icons'

import * as Icons from 'react-feather';


function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })

  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>

        <input {...getInputProps()} />
        {/*Input above needs to stay, can use any component below, image, paragraph... */}
        <Card  hoverable width="600px">
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

        </Card>
     
    


    </div>
    
  )
};

export default MyDropzone;
