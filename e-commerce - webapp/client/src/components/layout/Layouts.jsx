import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const Layouts = ({
  children,
  title = 'E-commerce - Shop now',
  description = 'An e-commerce website with different types of products',
  keywords = 'e-commerce, products, shopping',
  author = 'Keshav Kumar Choudhary',
}) => {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layouts;
