// src/pages/SplashPage.jsx
import React from 'react';
import { Page, Link } from 'framework7-react';

const SplashPage = () => {
  return (
    <Page
      className="splash-page"
      noToolbar
      noNavbar
      noSwipeback
    >

      <Link
        href="/onboarding/"
        replace
        className="splash-content"
        noLinkClass
      >
        <h1 className="logo">
          Trixy<span className="logo-ai">.ai</span>
        </h1>
        <p className="tagline">
          Spotting early trends<br/>
          before the market moves
        </p>
      </Link>
    </Page>
  );
};

export default SplashPage;
