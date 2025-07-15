// src/pages/OnboardingPage.jsx

import React from 'react';
import { Page, Link, Button, f7 } from 'framework7-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../css/OnboardingPage.scss';

import tradeImage from '../assets/images/onboarding1.png';
import stackImage from '../assets/images/onboarding2.png';
import strikeImage from '../assets/images/onboarding3.png';
import signalImage from '../assets/images/onboarding4.png';

const OnboardingPage = () => {
  const navigateToHome = () => {
    f7.views.main.router.navigate('/home/', {
      clearPreviousHistory: true,
    });
  };

  return (
    <Page className="onboarding-page" noToolbar noNavbar>
      <div className="onboarding-topbar">
        <Link className="skip-button" onClick={navigateToHome}>
          Skip
        </Link>
        <div className="custom-pagination" />
      </div>

      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ el: '.custom-pagination', clickable: true }}
        navigation={true}
        className="onboarding-swiper h-100"
      >
        {/* Slide 1 */}
        <SwiperSlide className="slide">
          <img src={tradeImage} alt="Trade" className="onboarding-image" />
          <div className="slide-text">
            <h2>Trade <b>like you mean it</b></h2>
            <p>Your edge begins with better timing, cleaner signals, and zero noise.</p>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="slide">
          <img src={stackImage} alt="Stack" className="onboarding-image" />
          <div className="slide-text">
            <h2>Stack <b>smarter not harder</b></h2>
            <p>Find moves that actually pay — and protect your edge.</p>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="slide">
          <img src={strikeImage} alt="Strike" className="onboarding-image" />
          <div className="slide-text">
            <h2>Strike at the <b>right time</b></h2>
            <p>Skip the second guessing with alerts that actually make sense.</p>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide className="slide">
          <img src={signalImage} alt="Signal" className="onboarding-image" />
          <div className="slide-text">
            <h2>More <b>signal</b> less noise</h2>
            <p>No fluff, no chaos — just clean data filtered for how you trade.</p>
          </div>
          <div className="start-block">
            <Button large fill round onClick={navigateToHome}>
              Get started now
            </Button>
          </div>
        </SwiperSlide>
      </Swiper>
    </Page>
  );
};

export default OnboardingPage;
