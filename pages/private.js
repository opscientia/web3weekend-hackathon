import Layout from '../components/Layout';
import { JssProvider } from 'react-jss';
import Profile from '../components/Private';

const PrivatePage = (props) => {
  
    return (
        <JssProvider id={{ minify: true }}>
            <Layout>
                <Profile />
            </Layout>
        </JssProvider>
    )
}
    
export default PrivatePage;