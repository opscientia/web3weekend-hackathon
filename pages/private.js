import Layout from '../components/Layout';
import { JssProvider } from 'react-jss';
import Private from '../components/Private';

const PrivatePage = () => {
    const mockData = require('./../mockData.json');
    return (
        <JssProvider id={{ minify: true }}>
            <Layout>
                <Private myData={{mockData}} accessData={{mockData}}/>
            </Layout>
        </JssProvider>
    )
}
    
export default PrivatePage;