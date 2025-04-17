import '../styles/global.css';

import React, { useEffect, useState } from 'react';
import GenericMetadata from './GenericMetadata';
import MainNav from './elements/MainNav/MainNav';
import Footer from './elements/Atoms/Footer';
import { GlobalStyles } from 'twin.macro';

const Layout = ({ isMenuLight, children }) => {
  const [lang, setLang] = useState('it');

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const location = window.location.href;
      if (
        location.includes('00/en') ||
        location.includes('app/en') ||
        location.includes('com/en')
      ) {
        setLang('en');
      }
    }
  }, [lang]);

  return (
    <>
      <GlobalStyles />
      <GenericMetadata lang={lang} />
      <MainNav lang={lang} isMenuLight={isMenuLight} />
      <main className="max-w-6xl px-4 mx-auto">{children}</main>
      <Footer lang={lang} />
      <script
        type="text/javascript"
        charSet="UTF-8"
        src="//cdn.cookie-script.com/s/7991ee83e5ce42619638cf7bb4398e2e.js"
      />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Layout;
