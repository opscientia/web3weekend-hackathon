import React from 'react';
import Dropzone from 'react-dropzone';
import { Buckets } from '@textile/hub';
import {getMetamaskIdentity} from '../lib/signerconnect';
import { Card,Text, Row, Col, Loading } from '@geist-ui/react';
import {Upload} from '@geist-ui/react-icons';
import Form from './Form';


class MyDropzone extends React.Component {
    //hack, putting keys here, might have to shift a few components up

    ipfsGateway = 'https://hub.textile.io'
    keyInfo = {
      key: 'bxch3ikjx6yg2m4ewyeussjeuoy'
    }
    keyInfoOptions = {
      debug: true
    }
    state = {
        isLoading: true,
        files: [],
        index: {
          author: '',
          date: 0,
          paths: [],
          loadingMessage: "loading",
        }

    }


    async componentDidMount() {
      const identity = await this.getIdentity()
      this.setState({
        identity: identity
      })

      console.log("got identity:", identity)

      this.setState({loadingMessage: "fetching bucket keys"})
      const {bucketKey, buckets} = await this.getBucketKey()
      this.setState({
        buckets: buckets,
        bucketKey: bucketKey
      })
      console.log("got bucket keys")

      this.setState({loadingMessage: "fetching bucket links"})
      await this.getBucketLinks()
      console.log("got bucket links")


      this.setState({loadingMessage: "fetching index"})
      const index = await this.getFileIndex()
      // console.log("got index")
      if (index) {
        console.log("index found :)")
        await this.filelistFromIndex(index)
        this.setState({
          index,
          isLoading: false
        })
      }
      else {
          console.log("no index, wat?")
      }

      this.setState({loadingMessage: null})
    }

    /////////////////////////////////////
    // Textile Bucket api init stuff

    getIdentity = async () => {
      try {
        return getMetamaskIdentity()
      }
      catch (e) {
        console.log("Couldn't connect to metamask :(((")
      }
    }

    getBucketKey = async () => {
      if (!this.state.identity) {
        throw new Error('Identity not set')
      }
      const buckets = await Buckets.withKeyInfo(this.keyInfo, this.keyInfoOptions)
      // Authorize the user and your insecure keys with getToken
      await buckets.getToken(this.state.identity)

      const buck = await buckets.getOrCreate('io.textile.dropzone')
      if (!buck.root) {
        throw new Error('Failed to open bucket')
      }
      return {buckets: buckets, bucketKey: buck.root.key};
    }

    getBucketLinks = async () => {
      if (!this.state.buckets || !this.state.bucketKey) {
        console.error('No bucket client or root key')
        return
      }
      const links = await this.state.buckets.links(this.state.bucketKey)
      console.log("\n\nLINKS\n")
      console.log(links)
      this.setState({
        ...links
      })
    }

    ///////////////////////////////////////
    //Storing and retrieval from bucket

    //store metadata json into bucket
    storeIndex = async (index) => {
      if (!this.state.buckets || !this.state.bucketKey) {
        console.error('No bucket client or root key')
        return
      }
      const buf = Buffer.from(JSON.stringify(index, null, 2))
      const path = `index.json`
      await this.state.buckets.pushPath(this.state.bucketKey, path, buf)
    }

    initIndex = async () => {
      if (!this.state.identity) {
        console.error('Identity not set')
        return
      }
      //this will be converted to JSON, this is basically author metadata
      const index = {
        author: this.state.identity.public.toString(),
        date: (new Date()).getTime(),
        paths: []
      }

      await this.storeIndex(index)
      return index
    }

    filelistFromIndex = async (index) => {
        this.setState({loadingMessage: "fetching filelist"})
        console.log("fetching filelist")
        if (!this.state.buckets || !this.state.bucketKey) {
            console.error('No bucket client or root key')
            return
        }

        //get file paths from index.paths array
        for (let path of index.paths) {
            console.log(path)
            const metadata = await this.state.buckets.pullPath(this.state.bucketKey, path)
            console.log(await this.state.buckets.links(this.state.bucketKey))
            const { value } = await metadata.next();
            let str = "";
            for (var i = 0; i < value.length; i++) {
                str += String.fromCharCode(parseInt(value[i]));
            }
            const json = JSON.parse(str)
            const file = json.original
            this.setState({
              files: [
                ...this.state.files,
                {
                  src:`${this.ipfsGateway}/ipfs/${file.cid}`,
                  key: file.name,
                }
              ]
            })
        }
    }

    getFileIndex = async () => {
      if (!this.state.buckets || !this.state.bucketKey) {
        console.error('No bucket client or root key')
        return
      }
      try {
        const metadata = this.state.buckets.pullPath(this.state.bucketKey, 'index.json')
        const { value } = await metadata.next();
        let str = "";
        for (var i = 0; i < value.length; i++) {
          str += String.fromCharCode(parseInt(value[i]));
        }
        const index = JSON.parse(str)
        return index
      } catch (error) {
        const index = await this.initIndex()
        // await this.initPublicGallery()
        return index
      }
    }


    ///////////////////////////////////////
    //File handling, on drop and setting metadata, uploading to bucket etc.

    insertFile = async (file, path) => {
      if (!this.state.buckets || !this.state.bucketKey) {
        throw new Error('No bucket client or root key')
      }
      const buckets = this.state.buckets
      return await buckets.pushPath(this.state.bucketKey, path, file.stream())
    }

    processAndStore = async (file, path, name) => {
        console.log("processAndStore")
        console.log(file, path, name)
      // const finalImage = limits ? await readAndCompressImage(image, limits) : image
      // const size = await browserImageSize(finalImage)
      const location = `${path}${name}`
      const raw = await this.insertFile(file, location)
      const metadata = {
        cid: raw.path.cid.toString(),
        name: name,
        path: location,
      }
      console.log(metadata)
      return metadata
    }

    handleNewFile = async (file) => {
        this.setState({loadingMessage: "handling file"})
        console.log("handleNewFile()")
        if (!this.state.buckets || !this.state.bucketKey) {
            console.error('No bucket client or root key')
            return
        }
        const fileSchema = {}
        const now = new Date().getTime()

        fileSchema['date'] = now
        fileSchema['name'] = `${file.name}`
        //TODO: this
        const filename = `${now}_${file.name}`
        this.setState({loadingMessage: "pushing file to bucket"})
        fileSchema['original'] = await this.processAndStore(file, 'originals/', filename)


        const metadata = Buffer.from(JSON.stringify(fileSchema, null, 2))
        const metaname = `${now}_${file.name}.json`
        const path = `metadata/${metaname}`
        console.log()
        this.setState({loadingMessage: "pushing metadata"})
        await this.state.buckets.pushPath(this.state.bucketKey, path, metadata)
        const fileOnBucket = fileSchema['original']

        this.setState({
            index: {
                ...this.state.index,
                paths: [...this.state.index.paths, path]
            },
            files: [
                ...this.state.files,
                {
                    src: `${this.ipfsGateway}/ipfs/${fileOnBucket.cid}`,
                    key: fileOnBucket.name,
                }
            ]
        })

        this.setState({loadingMessage: null})
    }


    onDrop = async (acceptedFiles) => {
        const now = new Date().getTime()
        for (const file of acceptedFiles) {
          //setting a simple format date_filename
          const filename = `${now}_${file.name}`
          console.log(filename)
          await this.handleNewFile(file)
        }
      this.storeIndex(this.state.index)
    }

    render(){
      const listItems = this.state.files.map((f) => <p>{f.key} | {f.src}</p>)
      return (
          <>
            <Dropzone
              onDrop={this.onDrop}
              maxSize={20000000}
              multiple={true}
              disabled={!(this.state.loadingMessage === null)}
              >
              {({getRootProps, getInputProps}) => (
                <div className="dropzone" {...getRootProps()}>
                  <input {...getInputProps()} />
                      <Card hoverable width="100%">
<<<<<<< HEAD
                        {(this.state.loadingMessage === null) &&
                        <>
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
                        </>}
                        {!(this.state.loadingMessage === null) &&
                        <>
                        <Row gap={0.8} justify="center" style={{ marginBottom: '15px', marginTop: '15px'}}>
                          <Col span={1.5}>
                              <Meh size={40} color="grey"/>
                          </Col>
                        </Row>
                        <Row gap={0.8} align="center" style={{ marginBottom: '15px' }}>
                          <Col span={30}>
                              <Text type="primary" align="center"  medium><b>Please Wait</b></Text>
                          </Col>
                        </Row>
                        <Row gap={0.8} align="center" style={{ marginBottom: '15px' }}>
                          <Col span={30}>
                                <div>
                                    <Row style={{ padding: '10px'}}>
                                        <Loading>{this.state.loadingMessage}</Loading>
                                    </Row>
                                </div>
                          </Col>
                        </Row>
                        </>}
=======
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
                    </aside>
>>>>>>> add form
                      </Card>
                </div>
              )}
            </Dropzone>
            <Form loading={this.state.loadingMessage} listItems={listItems}/>
        </>
      )
  }
}

<<<<<<< HEAD
export default MyDropzone;
=======
export default MyDropzone;
>>>>>>> add form
