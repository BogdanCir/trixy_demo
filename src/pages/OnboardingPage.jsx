// src/pages/OnboardingPage.jsx
import React, { useRef, useState } from 'react';
import { Page, Navbar, NavLeft, NavRight, Link, f7 } from 'framework7-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import '../css/OnboardingPage.scss';

import tradeImage from '../assets/images/onboarding1.png';
import stackImage from '../assets/images/onboarding2.png';
import strikeImage from '../assets/images/onboarding3.png';
import signalImage from '../assets/images/onboarding4.png';

const OnboardingPage = () => {
  const swiperRef = useRef(null);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const navigateToHome = () => {
    f7?.views?.main?.router?.navigate('/home/', { clearPreviousHistory: true });
  };

  return (
    <Page className="onboarding-page" noToolbar noSwipeback>
      <Navbar
        className="onboarding-navbar"
        transparent
        large={false}
        noShadow
        textColor="white"
        bgColor="transparent"
        style={{ '--f7-navbar-height': '80px' }}
      >
        <NavLeft>
          <Link
            className="skip-chip"
            textColor="white"
            onClick={navigateToHome}
            noLinkClass
          >
            Skip
          </Link>
        </NavLeft>
        <NavRight>
          <div className="onboarding-pagination" />
        </NavRight>
      </Navbar>

      <Swiper
        modules={[Pagination]}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setIsLastSlide(s.activeIndex === s.slides.length - 1)}
        className="onboarding-swiper"
        slidesPerView={1}
        spaceBetween={0}
        resistanceRatio={0.25}
        pagination={{
          el: '.onboarding-pagination',
          clickable: true,
          bulletClass: 'onb-bullet',
          bulletActiveClass: 'onb-bullet onb-bullet--active',
          renderBullet: (_i, className) => `<span class="${className}"></span>`,
        }}
      >
        <SwiperSlide className="slide">
          <img src={tradeImage} alt="Trade" className="onboarding-image" />
          <div className="slide-text">
            <h2>
              Trade <b className="accent">like</b> you mean it
            </h2>
            <p>Your edge begins with better timing, cleaner signals, and zero noise.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide">
          <img src={stackImage} alt="Stack" className="onboarding-image" />
          <div className="slide-text">
            <h2>
              Stack <b className="accent">smarter</b> not harder
            </h2>
            <p>Find moves that actually pay — and protect your edge.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide">
          <img src={strikeImage} alt="Strike" className="onboarding-image" />
          <div className="slide-text">
            <h2>
              Strike at the <b className="accent">right</b> time
            </h2>
            <p>Skip the second guessing with alerts that actually make sense.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide">
          <img src={signalImage} alt="Signal" className="onboarding-image" />
          <div className="slide-text">
            <h2>
              More <b className="accent">signal</b> less noise
            </h2>
            <p>No fluff, no chaos — just clean data filtered for how you trade.</p>
          </div>
        </SwiperSlide>
      </Swiper>

      {isLastSlide && (
        <div className="start-block">
          <Link
            className="button button-fill button-large button-round start-link"
            onClick={navigateToHome}
            noLinkClass
          >
            Get started now
          </Link>
        </div>
      )}
    </Page>
  );
};

export default OnboardingPage;
