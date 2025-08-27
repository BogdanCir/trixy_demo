import React from 'react';
import { Navbar, Link } from 'framework7-react';
import { Menu } from 'feather-icons-react';

export default function Header() {
  return (
    <Navbar className="home-header">
      <div className="home-header__left">
        <Link href="#"><span className="logo">Trixy.ai</span></Link>
      </div>
      <div className="home-header__right">
        <Menu size={24} />
      </div>
    </Navbar>
  );
}
