import React from 'react';
import Head from 'next/head';
import Navbar from '@components/navbar';
import Footer from '@components/footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Head>
        <title>TURBO CHAV | VROUM, La vitesse</title>
        <meta
          name="description"
          content="Livraison de sapes | La rue, la vrai ! | Fast and clean delivery"
        />
        {/* <link rel="icon" href={logo.src} /> */}
      </Head>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
