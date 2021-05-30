import React, { useState } from 'react';
import { Modal, Image} from '@geist-ui/react';

const Popup = (props) => {
    return (
      <div>
        <Modal width="32rem" open={props.submitSuccess}>
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
          <Modal.Action passive>Close</Modal.Action>
        </Modal>
      </div>
    )
}
  
export default Popup;
  