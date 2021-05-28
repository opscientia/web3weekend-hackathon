import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

import { Card,Image,Button ,Text, Row, Col } from '@geist-ui/react';

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
      <p>Drag 'n' drop some files here, or click to select files</p>
      <Button iconRight={<Icons.File size={16} />} auto size="small" />

    </div>
    
  )
};

export default MyDropzone;
