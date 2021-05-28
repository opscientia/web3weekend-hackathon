import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Card, Image, Text } from '@geist-ui/react';

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
        <Card width="400px">
            <Image src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
            height="200" width="400" style={{ objectFit: 'cover' }} />
            <Text type="primary" medium>Drag 'n' drop some files here, or click to select files</Text>
        </Card>
    </div>
  )
};

export default MyDropzone;
