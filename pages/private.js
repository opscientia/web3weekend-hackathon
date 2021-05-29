import Layout from '../components/Layout';
import { JssProvider } from 'react-jss';
import Private from '../components/Private';

const PrivatePage = (props) => {
    const mockData = require('./../mockData.json');
    return (
        <JssProvider id={{ minify: true }}>
           <Layout toggleDarkMode={props.toggleDarkMode} connectUser={props.connectUser} provider={props.provider} user={props.user}>
               
                <Private myData={{mockData}} accessData={{mockData}}/>
            </Layout>
        </JssProvider>
    )
}
    
export default PrivatePage;