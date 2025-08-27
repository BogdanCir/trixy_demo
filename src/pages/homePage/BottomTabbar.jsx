import React from 'react';
import { Toolbar, Link } from 'framework7-react';
import { Home, Globe, Search, Book, Bookmark } from 'feather-icons-react';

export default function BottomTabbar() {
  return (
    <Toolbar bottom className="bottom-tabbar">
      <Link href="#"><Home size={24} /></Link>
      <Link href="#"><Globe size={24} /></Link>
      <Link href="#"><Search size={24} /></Link>
      <Link href="#"><Book size={24} /></Link>
      <Link href="#"><Bookmark size={24} /></Link>
    </Toolbar>
  );
}
