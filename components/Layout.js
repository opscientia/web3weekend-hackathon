import React from 'react';
import Menu from './Menu';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <>
     <Menu connectUser={props.connectUser} provider={props.provider}/>
      <main>
      <div className='container'>{props.children}</div>
     </main>
      <Footer />
    </>
  );
};

export default Layout;
