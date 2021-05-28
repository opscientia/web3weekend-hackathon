import Head from 'next/head'

export default function Header() {
    return (
        <div>
            <Head>
            <title>My page title</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <p>Open Science Data Wallet</p>
        </div>
    )
}