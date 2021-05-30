import { BigNumber, providers, utils } from 'ethers'
import { hashSync } from 'bcryptjs'
import { PrivateKey } from '@textile/hub'

const generateMessageForEntropy = (ethereum_address, application_name) => {
    return (
      'The Ethereum address used by this application is: \n' +
      '\n' +
      ethereum_address
    );
}

const getSigner = async () => {
    if (!window.ethereum) {
        throw new Error(
            'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html'
        );
    }

    console.debug('Initializing web3 provider...');
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer
}

export const getProvider = async () => {
    if (!window.ethereum) {
        throw new Error(
            'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html'
        );
    }

    console.debug('Initializing web3 provider...');
    window.ethereum.enable()
    const provider = new providers.Web3Provider(window.ethereum);
    return provider
}

const getAddressAndSigner = async() => {
    const signer = await getSigner()
    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) {
        throw new Error('No account is provided. Please provide an account to this application.');
    }
    const address = accounts[0];
    return {address, signer}
}

export const generateSignature = async () => {
    const metamask = await getAddressAndSigner()
    // avoid sending the raw secret by hashing it first
    const secret = hashSync("Password", 10)
    const message = generateMessageForEntropy(metamask.address, 'cermaic demo')
    const signedText = await metamask.signer.signMessage(message);
    const hash = utils.keccak256(signedText);
    const seed = hash
        // @ts-ignore
        .replace('0x', '')
        // @ts-ignore
        .match(/.{2}/g)
        .map((hexNoPrefix) => BigNumber.from('0x' + hexNoPrefix).toNumber())
    return {seed, metamask}
}

export const getMetamaskIdentity = async () => {
    const metamask = await getAddressAndSigner()
    // avoid sending the raw secret by hashing it first
    const secret = hashSync("Password", 10)
    const message = generateMessageForEntropy(metamask.address, 'cermaic demo')
    const signedText = await metamask.signer.signMessage(message);
    const hash = utils.keccak256(signedText);
    const array = hash
        // @ts-ignore
        .replace('0x', '')
        // @ts-ignore
        .match(/.{2}/g)
        .map((hexNoPrefix) => BigNumber.from('0x' + hexNoPrefix).toNumber())

    if (array.length !== 32) {
        throw new Error('Hash of signature is not the correct size! Something went wrong!');
    }
    const identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(array))
    console.log(identity.toString())

    // Your app can now use this identity for generating a user Mailbox, Threads, Buckets, etc
    return identity
  }
