import React, { useState, useEffect, useMemo } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavRight,
  Link,
  List,
  ListItem,
  Preloader,
  Popup,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  f7,
} from 'framework7-react';
import {
  ChevronLeft,
  Menu,
  ArrowRight,
  ChevronRight,
  X, // ✅ lipsea
} from 'feather-icons-react';
import './SignalsPage.css';

const SignalsPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // popup + share
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [popupOpened, setPopupOpened] = useState(false);
  const [shareOpened, setShareOpened] = useState(false);

  // search
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // MOCK fetch
    setTimeout(() => {
      const mockSuggestions = [
        { id: 1, name: 'Shiba Inu',  status: 'Overbought RSI',      statusColor: 'red',   icon: '../assets/images/shib.png'  },
        { id: 2, name: 'APE Coin',   status: 'Short Squeeze Setup', statusColor: 'green', icon: '../assets/images/ape1.png' },
        { id: 3, name: 'Litecoin',   status: 'Golden Cross',        statusColor: 'green', icon: '../assets/images/ltc.png'  },
      ];
      const mockHistory = [
        { id: 4, name: 'Dash',  status: 'Bull Flag Formation', statusColor: 'green', icon: '../assets/images/dash.png'  },
        { id: 5, name: 'Matic', status: 'Exhausted Rally',     statusColor: 'red',   icon: '../assets/images/matic.png' },
      ];
      setSuggestions(mockSuggestions);
      setHistory(mockHistory);
      setLoading(false);
    }, 800);
  }, []);

  const openPopup = (item) => {
    setSelectedSignal(item);
    setPopupOpened(true);
  };

  // filtrare locală simplă (mock)
  const filter = (arr) =>
    !searchText
      ? arr
      : arr.filter(
          (it) =>
            it.name.toLowerCase().includes(searchText.toLowerCase()) ||
            it.status.toLowerCase().includes(searchText.toLowerCase())
        );

  const filteredSuggestions = useMemo(() => filter(suggestions), [suggestions, searchText]);
  const filteredHistory     = useMemo(() => filter(history),     [history, searchText]);

  const submitSearch = (e) => {
    e.preventDefault();
    // aici poți naviga spre /discover-chat cu q, dacă vrei:
    // f7.views.main.router.navigate(`/chat/?q=${encodeURIComponent(searchText)}`);
  };

  return (
    <Page className="signals-page" noSwipeback>
      {/* NAVBAR */}
      <Navbar
        className="signals-navbar"
        large
        transparent
        noShadow
        bgColor="transparent"
        textColor="white"
      >
        <NavLeft className="signals-title">
          <Link back className="text-color-white">
            <ChevronLeft />
          </Link>
          <span className="signals-span">Signals</span>
        </NavLeft>
        <NavRight className="signals-title">
          <Link className="text-color-white">
            <Menu />
          </Link>
        </NavRight>
      </Navbar>

      {/* SEARCH */}
      <form className="search-container" onSubmit={submitSearch}>
        <div className="search-box">
          <input
            type="search"
            className="searchbar-input"
            placeholder="Search For Signals"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="search-button" aria-label="Search">
            <ArrowRight size={18} color="white" />
          </button>
        </div>
        <Link className="cancel-button" onClick={() => setSearchText('')}>Cancel</Link>
      </form>

      {/* SUGGESTIONS */}
      <h2 className="section-title">Suggestions</h2>
      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', marginTop:40 }}>
          <Preloader color="white" size={32} />
        </div>
      ) : (
        <>
          <List mediaList className="signals-list">
            {filteredSuggestions.map((item) => (
              <ListItem
                key={item.id}
                title={item.name}
                noChevron
                after={<ChevronRight size={16} color="#777" />}
                subtitle={<span className={`signal-status ${item.statusColor}`}>{item.status}</span>}
                onClick={() => openPopup(item)}
              >
                <div slot="media">
                  <img src={item.icon} alt={item.name} className="signal-icon" />
                </div>
              </ListItem>
            ))}
          </List>

          {/* HISTORY */}
          <h2 className="section-title">Search History</h2>
          <List mediaList className="signals-list">
            {filteredHistory.map((item) => (
              <ListItem
                key={item.id}
                title={item.name}
                noChevron
                after={<ChevronRight size={16} color="#777" />}
                subtitle={<span className={`signal-status ${item.statusColor}`}>{item.status}</span>}
                onClick={() => openPopup(item)}
              >
                <div slot="media">
                  <img src={item.icon} alt={item.name} className="signal-icon" />
                </div>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* POPUP DETALII */}
      <Popup
  className="signal-detail-popup"
  opened={popupOpened}
  transparent
  bgColor='transparent'
  onPopupClosed={() => setPopupOpened(false)}
  backdrop
>
  {selectedSignal && (
    <div className="popup-card">
      <button className="popup-close" onClick={() => setPopupOpened(false)} aria-label="Close">
        <X size={18} />
      </button>

      <div className="detail-icon-wrap">
        <img src={selectedSignal.icon} alt={selectedSignal.name} className="detail-icon" />
      </div>

      <h1 className="detail-title">{selectedSignal.name}</h1>
      <div className="detail-status red">{selectedSignal.status}</div>

      <p className="detail-desc">
        Price pushed up fast, but buying volume is fading<br />
        Momentum looks weak and a pullback may follow.
      </p>

      <div className="detail-box">
        <div className="box-col">
          <div className="box-label">Confidence</div>
          <div className="box-value yellow">High</div>
        </div>
        <div className="box-col">
          <div className="box-label">Conviction</div>
          <div className="box-value red">Building</div>
        </div>
      </div>

      <p className="detail-caption">Time to show-off</p>

      <button className="share-pill" onClick={() => setShareOpened(true)}>
        Share
      </button>
    </div>
  )}
</Popup>


      {/* ACTIONS (Share) */}
      <Actions opened={shareOpened} onActionsClosed={() => setShareOpened(false)}>
        <ActionsGroup>
          <ActionsLabel>Share to</ActionsLabel>
          <ActionsButton onClick={() => f7.toast.show({ text: 'Shared to Twitter' })}>
            Twitter
          </ActionsButton>
          <ActionsButton onClick={() => f7.toast.show({ text: 'Shared to Facebook' })}>
            Facebook
          </ActionsButton>
          <ActionsButton onClick={() => f7.toast.show({ text: 'Link copied' })}>
            Copy Link
          </ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red" bold onClick={() => setShareOpened(false)}>
            Cancel
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </Page>
  );
};

export default SignalsPage;
