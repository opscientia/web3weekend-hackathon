import Layout from '../components/Layout';
import Public from '../components/Public';
import { JssProvider } from 'react-jss';

const PublicPage = () => {
    const mockData = require('./../mockData.json');
    return (
        <JssProvider id={{ minify: true }}>
            <Layout>
                <Public data={{mockData}}/>
            </Layout>
        </JssProvider>
    )
}

export default PublicPage;