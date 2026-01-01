import React from 'react';
import Topbar from './Topbar';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from '../ui/sonner';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar />
      <Header />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default Layout;
