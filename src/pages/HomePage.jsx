import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Page, Navbar, NavLeft, NavRight, Link, Toolbar, Button, f7, Popover, List, ListItem } from 'framework7-react';
import {
  Menu, ChevronRight, Headphones, Play, Mic, Send,
  Home, Globe, Search, Book, Bookmark,
} from 'feather-icons-react';

import './HomePage.css';

async function fetchHomeMock() {
  await new Promise(r => setTimeout(r, 200));
  return {
    chips: [
      { id: 'btc', symbol: 'BTC', name: 'Bitcoin', signal: 'Bullish Divergence' },
      { id: 'kcs', symbol: 'KCS', name: 'KuCoin Coin', signal: 'Exhaustion' },
      { id: 'eth', symbol: 'ETH', name: 'Ethereum', signal: 'Bearish Reversal' },
      { id: 'sol', symbol: 'SOL', name: 'Solana', signal: 'Accumulation' },
    ],
    pulse: {
      id: 'p1',
      title: 'Pulse',
      subtitle: 'Geopolitics hits crypto',
      speedLabel: 'Slipping Fast',
      durationSec: 126,
      imageUrl: '../assets/images/avatar.jpg',
    },
  };
}

const toMinSec = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} min`;
const signalColor = txt => {
  const t = txt.toLowerCase();
  if (t.includes('bull')) return '#8BD17C';
  if (t.includes('bear')) return '#F05454';
  if (t.includes('exhaust')) return '#F7A352';
  if (t.includes('accum')) return '#7BC8F6';
  if (t.includes('diverg')) return '#A6E3A1';
  return '#C9CED6';
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [chips, setChips] = useState([]);
  const [pulse, setPulse] = useState(null);
  const [query, setQuery] = useState('');
  const [isRecording] = useState(false);

  const [menuOpened, setMenuOpened] = useState(false);
  const popRef = useRef(null);

  const go = (path) => f7.views.main.router.navigate(path);
  const goToChat = (q) => {
    const qs = q ? `?q=${encodeURIComponent(q)}` : '';
    f7.views.main.router.navigate(`/chat/${qs}`);
  };
  const onSubmitSearch = (e) => { e.preventDefault(); goToChat(query.trim()); };

  const closePopoverAndGo = (path) => {
    const el = popRef.current?.el;
    if (el) f7.popover.close(el);
    f7.views.main.router.navigate(path);
  };

  useEffect(() => {
    let ok = true;
    fetchHomeMock().then(d => {
      if (!ok) return;
      setChips(d.chips); setPulse(d.pulse); setLoading(false);
    });
    return () => { ok = false; };
  }, []);

  const durationLabel = useMemo(() => pulse ? toMinSec(pulse.durationSec) : '', [pulse]);
  const showSend = query.trim().length > 0 || isRecording;

  return (
    <Page className="home-page" noSwipeback>
      <div className="home-gradient" />

      <Navbar className="home-navbar" large={false} noShadow transparent textColor="white"
              style={{ '--f7-navbar-height': '84px' }}>
        <NavLeft><div className="brand">Trixy<span className="ai">.ai</span></div></NavLeft>
        <NavRight>
          <Link
            className="icon-btn"
            noLinkClass
            onClick={(e) => {
              f7.popover.open(popRef.current.el, e.currentTarget);
            }}
          >
            <Menu color="white" />
          </Link>
        </NavRight>
      </Navbar>

      <Popover className="menu-popover" ref={popRef}>
        <List noHairlines noHairlinesBetween className="menu-list">
          <ListItem
            title="Discover"
            link="#"
            noChevron
            onClick={() => closePopoverAndGo('/discover/')}
          />
          <ListItem
            title="Profile"
            link="#"
            noChevron
            onClick={() => closePopoverAndGo('/profile/')}
          />
        </List>
      </Popover>

      <div className="home-content">
        <div className="signals-header">
          <h1>Signals</h1>
          <Link
            noLinkClass
            className="signals-chevron"
            onClick={() => f7.views.main.router.navigate('/signals/')}
            aria-label="See all signals"
          >
            <ChevronRight />
          </Link>
        </div>

        <div className="chips-row">
          {chips.map(c => (
            <button
              key={c.id}
              className="asset-chip"
              style={{ '--chip-accent': signalColor(c.signal) }}
              onClick={() => go(`/signals/`)}
            >
              <div className="coin">
                {c.iconUrl && (
                  <img
                    src={c.iconUrl}
                    alt={`${c.symbol} logo`}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                <span className="coin-letter">{c.symbol[0]}</span>
              </div>
              <span className="texts">
                <span className="name">{c.name}</span>
                <span className="signal" style={{ color: signalColor(c.signal) }}>{c.signal}</span>
              </span>
            </button>
          ))}
        </div>

        {!loading && pulse && (
          <div className="pulse-card">
            <Link noLinkClass className="pulse-head" onClick={() => go('/pulse/')}>
              <div className="left">
                <div className="ptitle">{pulse.title}</div>
                <div className="psub-row">
                  <Headphones />
                  <span className="psub">{pulse.subtitle}</span>
                </div>
              </div>
              <div className="right">
                <span className="badge">{pulse.speedLabel}</span>
                <span className="duration">{durationLabel}</span>
              </div>
            </Link>

            <div className="pulse-media">
              <div className="swirl" aria-hidden="true" />
              <div className="center-hole" aria-hidden="true" />
              <Link noLinkClass className="play" onClick={() => f7.views.main.router.navigate('/pulse/')} aria-label="Open Pulse">
                <Play />
              </Link>
            </div>

            <form className="pulse-search" onSubmit={onSubmitSearch}>
              <input
                placeholder="Start typing..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {showSend && (
                <Button
                  type="submit"
                  small
                  round
                  fill
                  className="send-btn"
                  color="orange"
                  aria-label="Send"
                >
                  <Send />
                </Button>
              )}
              <button
                type="button"
                className="mic"
                onClick={() => goToChat(query.trim())}
                aria-label="Search"
              >
                <Mic />
              </button>
            </form>
          </div>
        )}
      </div>

      <Toolbar tabbar transparent position="bottom" className="bottom-tabbar-custom">
        <Link noLinkClass tabLink="#home" className="tabbar-link" onClick={() => go('/home/')}>
          <Home color="white" />
        </Link>
        <Link noLinkClass tabLink="#globe" className="tabbar-link" onClick={() => go('/explore/')}>
          <Globe color="white" />
        </Link>
        <Link
          noLinkClass
          className="tabbar-link tabbar-center"
          onClick={() => go('/chat/')}
          aria-label="Search"
        >
          <Search color="white" />
        </Link>
        <Link noLinkClass tabLink="#book" className="tabbar-link" onClick={() => go('/library/')}>
          <Book color="white" />
        </Link>
        <Link noLinkClass tabLink="#bookmark" className="tabbar-link" onClick={() => go('/bookmarks/')}>
          <Bookmark color="white" />
        </Link>
      </Toolbar>
    </Page>
  );
}
