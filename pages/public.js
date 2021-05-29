import Layout from '../components/Layout';
import Public from '../components/Public';
import { JssProvider } from 'react-jss';

const PublicPage = (props) => {
    const mockData = require('./../mockData.json');
    return (
        <JssProvider id={{ minify: true }}>
           <Layout toggleDarkMode={props.toggleDarkMode} connectUser={props.connectUser} provider={props.provider} user={props.user}>
                <Public data={{mockData}}/>
            </Layout>
        </JssProvider>
    )
}

export default PublicPage;