import React, { useState } from 'react';
import { Button, Modal, Image, Icon } from '@geist-ui/react';

const Popup = () => {
    const [state, setState] = useState(false)
    const handler = () => setState(true)
    const closeHandler = (event) => {
      setState(false)
      console.log('closed')
    }
    return (
      <div>
        <Button auto onClick={handler}>Submit</Button>
        <Modal width="32rem" open={state} onClose={closeHandler}>
          <Image src="/assets/poap.png" width={90}/>
          <Modal.Title>POAP Alert</Modal.Title>
          <Modal.Content>
            <p>Thank you for contributing to open science this month!</p>
            <p>Instructions are in the rules tab in Discord to claim your POAP</p>
            <p>The secret codeword is <b>MonthOfMay</b></p>
            <a  href="https://discord.gg/5Pr9c5Nj7Z">
                <Image src="/assets/discord.png" width={30}/>
            </a>
          </Modal.Content>
          <Modal.Action passive onClick={() => setState(false)}>Close</Modal.Action>
        </Modal>
      </div>
    )
}
  
export default Popup;
  