// DiscoverPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavRight,
  Link,
  Card,
  CardContent,
  Toolbar,
  Popup,
  Button,
  f7,
} from 'framework7-react';
import {
  ChevronLeft, Radio, X,
  Home, Globe, Search, Book, Bookmark,
} from 'feather-icons-react';

import './DiscoverPage.css';

const LS_KEY = 'trixy_prefs_topics';

const mockArticles = {
  'For You': [
    {
      id: 1,
      title: 'XRP surges above $2.20 as bulls target $2.30 breakout',
      excerpt:
        'XRP surged past the $2.20 mark on July 2, gaining more than 4% in 24 hours, according to market data from NewsBTC. The rally come...',
      author: 'The troll',
      image: '../assets/images/xrp_background.png',
      avatar: '../assets/images/avatar.jpg',
    },
    {
      id: 2,
      title: 'Ethereum gains momentum above $2,600',
      excerpt:
        'ETH is showing strong bullish signals and testing resistance at $2,650 with potential to break...',
      author: 'Crypto Owl',
      image: '../assets/images/xrp_background.png',
      avatar: '../assets/images/avatar.jpg',
    },
    {
      id: 4,
      title: 'XRP surges above $2.20 as bulls target $2.30 breakout',
      excerpt:
        'XRP surged past the $2.20 mark on July 2, gaining more than 4% in 24 hours, according to market data from NewsBTC. The rally come...',
      author: 'The troll',
      image: '../assets/images/xrp_background.png',
      avatar: '../assets/images/avatar.jpg',
    },
    {
      id: 5,
      title: 'Ethereum gains momentum above $2,600',
      excerpt:
        'ETH is showing strong bullish signals and testing resistance at $2,650 with potential to break...',
      author: 'Crypto Owl',
      image: '../assets/images/xrp_background.png',
      avatar: '../assets/images/avatar.jpg',
    },
  ],
  Altcoins: [
    {
      id: 3,
      title: 'Solana rises 7% on volume surge',
      excerpt:
        'Solana has seen an impressive rise in trading volume as interest in DeFi protocols increases...',
      author: 'Altcoin Insider',
      image: '../assets/images/xrp_background.png',
      avatar: '../assets/images/avatar.jpg',
    },
  ],
  Signals: [],
  'On Chain': [],
  NFTs: [],
  DeFi: [],
  Memecoins: [],
};

const ALL_TOPICS = [
  'For You', 'Altcoins', 'Signals', 'On Chain', 'NFTs', 'DeFi', 'Memecoins',
  'Ecosystem Buzz', 'Macro & Policy', 'On-Chain Moves', 'Market Recap', 'Live auction',
];

export default function DiscoverPage() {
  const [selectedTab, setSelectedTab] = useState('For You');
  const [articles, setArticles] = useState([]);

  const [prefsOpen, setPrefsOpen] = useState(false);
  const [topics, setTopics] = useState([]);

  const tabOptions = ['For You','Altcoins','Signals','On Chain','NFTs','DeFi','Memecoins'];

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    const initial = stored ? JSON.parse(stored) : ['For You','Altcoins','Signals'];
    setTopics(initial);
  }, []);

  useEffect(() => {
    const list = mockArticles[selectedTab] || [];
    setArticles(list);
  }, [selectedTab, topics]);

  const toggleTopic = (t) => {
    setTopics((arr) => (arr.includes(t) ? arr.filter(x => x !== t) : [...arr, t]));
  };

  const savePrefs = () => {
    localStorage.setItem(LS_KEY, JSON.stringify(topics));
    setPrefsOpen(false);
    f7.toast.show({
      text: 'Preferences saved',
      closeTimeout: 1200,
    });
  };

  return (
    <Page className="discover-page" noSwipeback>
      <Navbar
        className="signals-navbar"
        large
        transparent
        noShadow
        bgColor="transparent"
        textColor="white"
      >
        <NavLeft className="signals-title">
          <Link back className="text-color-white"><ChevronLeft /></Link>
          <span className="signals-span">Discover</span>
        </NavLeft>
        <NavRight className="signals-title">
          <Link className="text-color-white" onClick={() => setPrefsOpen(true)}>
            <Radio />
          </Link>
        </NavRight>
      </Navbar>

      <div className="discover-tabs">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            className={`discover-tab ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="discover-card">
        {articles.map((item) => (
          <Card className="discover-article-card" key={item.id}>
            <Link href={`/article/${item.id}/`} className="discover-article-card">
              <div className="card-image-wrapper">
                <img src={item.image} alt={item.title} className="card-image" />
                <CardContent className="card-overlay-content">
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <div className="card-author">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="card-avatar"
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/19x19'; }}
                    />
                    <span className="author-name">{item.author}</span>
                  </div>
                </CardContent>
              </div>
            </Link>
          </Card>
        ))}
        {!articles.length && (
          <div style={{ color:'#b1b5c3', padding:'8px 16px' }}>No stories for this tab (yet).</div>
        )}
      </div>

      <Toolbar tabbar transparent position="bottom" className="bottom-tabbar-custom">
        <Link tabLink="#home" className="tabbar-link"><Home color="white" /></Link>
        <Link tabLink="#globe" className="tabbar-link"><Globe color="white" /></Link>
        <Link tabLink="#search" className="tabbar-link active"><Search color="white" /></Link>
        <Link tabLink="#book" className="tabbar-link"><Book color="white" /></Link>
        <Link tabLink="#bookmark" className="tabbar-link"><Bookmark color="white" /></Link>
      </Toolbar>

      <Popup
        className="prefs-popup"
        opened={prefsOpen}
        onPopupClosed={() => setPrefsOpen(false)}
        closeByBackdropClick
        bgColor='transparent'
      >
        <div className="prefs-card">
          <div className="prefs-header">
            <h3>Preferences</h3>
            <Link className="close-pill" onClick={() => setPrefsOpen(false)}>
              <X />
            </Link>
          </div>

          <p className="prefs-sub">Choose topics to see stories curated just for you</p>

          <div className="prefs-chips">
            {ALL_TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                className={`pref-chip ${topics.includes(t) ? 'active' : ''}`}
                onClick={() => toggleTopic(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <Button large round fill className="prefs-save" onClick={savePrefs}>
            Save
          </Button>
        </div>
      </Popup>
    </Page>
  );
}
