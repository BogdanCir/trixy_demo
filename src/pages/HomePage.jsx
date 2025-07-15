import React, { useState, useEffect } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  Link,
  Card,
  Toolbar,
} from 'framework7-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// --- Pictogramele solicitate ---
import { Home, Globe, Search, Book, Bookmark, Menu, Headphones, Play, Mic, ChevronRight } from 'feather-icons-react';

// --- Fișierul de stiluri custom ---
import '../css/HomePage.scss';

// --- Imagini (asigură-te că aceste căi sunt corecte în proiectul tău) ---
// import BtcIcon from '../assets/images/btc.png'; // DECOMENTAT
// import KcsIcon from '../assets/images/kcs.png'; // DECOMENTAT
import PulseVisualizer from '../assets/images/pulse-visualizer.png';

const HomePage = () => {
  const [signals, setSignals] = useState([]);

  // useEffect(() => {
  //   const mockSignals = [
  //     { id: 1, name: 'Bitcoin', tag: 'Bullish Divergence', icon: BtcIcon, tagColor: 'green' },
  //     { id: 2, name: 'Kucoin Coin', tag: 'Exhausted Rally', icon: KcsIcon, tagColor: 'red' },
  //     { id: 3, name: 'Ethereum', tag: 'Golden Cross', icon: BtcIcon, tagColor: 'green' },
  //   ];
  //   setSignals(mockSignals);
  // }, []);
  // =========================================

  return (
    <Page className="home-page">
      {/* ===== BARA DE NAVIGARE SUPERIOARĂ ===== */}
      <Navbar>
        <div className="navbar-title">
          Trixy<span>.ai</span>
        </div>
        <div className="right">
          <Link>
            <Menu size="24" />
          </Link>
        </div>
      </Navbar>

      {/* ===== SECȚIUNEA DE SEMNALE ===== */}
      <BlockTitle className="signals-title">
        <span>Signals</span>
        <Link href="/signals/">
          <ChevronRight size="24" />
        </Link>
      </BlockTitle>
      
      <Swiper spaceBetween={12} slidesPerView={'auto'} className="signals-swiper">
        {signals.map(signal => (
          <SwiperSlide key={signal.id} className="signal-card">
            <img src={signal.icon} alt={signal.name} className="coin-icon" />
            <div className="coin-info">
              <div className="coin-name">{signal.name}</div>
              <div className={`coin-tag ${signal.tagColor}`}>{signal.tag}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ===== CARDUL "PULSE" ===== */}
      <Card className="pulse-card" style={{backgroundImage: `url(${PulseVisualizer})`}}>
          <div className="pulse-overlay">
            <div className="pulse-header">
                <div className="pulse-title-section">
                    <div className="pulse-title">Pulse</div>
                    <div className="pulse-subtitle">
                        <Headphones size="14" />
                        <span>Geopolitics hits crypto</span>
                    </div>
                </div>
                <div className="pulse-status-section">
                    <div className="pulse-status">Slipping Fast</div>
                    <div className="pulse-time">2:06 min</div>
                </div>
            </div>

            <div className="pulse-play-button">
                <Play size="28" />
            </div>

            <div className="pulse-input-field">
                <input type="text" placeholder="Start typing..." />
                <Mic size="20" />
            </div>
        </div>
      </Card>

      {/* ===== BARA DE NAVIGARE INFERIOARĂ ===== */}
      <Toolbar bottom className="bottom-toolbar">
        <Link><Home /></Link>
        <Link><Globe /></Link>
        <Link className="search-button-wrapper">
          <div className="search-button">
            <Search color="white" />
          </div>
        </Link>
        <Link><Book /></Link>
        <Link><Bookmark /></Link>
      </Toolbar>
    </Page>
  );
};

export default HomePage;