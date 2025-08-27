import { Page, Navbar, NavLeft, Link, BlockTitle } from 'framework7-react';
import { useEffect, useState } from 'react';
import { ChevronLeft, Clock, Plus } from 'feather-icons-react';
import './HistoryPage.css';

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    setHistoryItems([
      { id: '1', title: 'Why?', description: "The rally comes amid heightened activity in Ethereum’s ecosystem, particularly in decentralized finance (DeFi) and layer-2 scaling solutions.", date: 'Two days ago' },
      { id: '2', title: 'Why?', description: "The rally comes amid heightened activity in Ethereum’s ecosystem, particularly in decentralized finance (DeFi) and layer-2 scaling solutions.", date: 'Two days ago' },
      { id: '3', title: 'Why?', description: "The rally comes amid heightened activity in Ethereum’s ecosystem, particularly in decentralized finance (DeFi) and layer-2 scaling solutions.", date: 'Two days ago' },
      { id: '1', title: 'Why?', description: "The rally comes amid heightened activity in Ethereum’s ecosystem, particularly in decentralized finance (DeFi) and layer-2 scaling solutions.", date: 'Two days ago' },
      { id: '2', title: 'Why?', description: "The rally comes amid heightened activity in Ethereum’s ecosystem, particularly in decentralized finance (DeFi) and layer-2 scaling solutions.", date: 'Two days ago' },
      { id: '3', title: 'Why?', description: "The rally comes amid heightened activity in Ethereum’s ecosystem, particularly in decentralized finance (DeFi) and layer-2 scaling solutions.", date: 'Two days ago' },
    ]);
  }, []);

  return (
    <Page className="history-page">
      <Navbar className="signals-navbar" large transparent noShadow bgColor="transparent" textColor="white">
        <NavLeft className="signals-title">
          <Link back className="text-color-white">
            <ChevronLeft />
          </Link>
          <span className="signals-span">History</span>
        </NavLeft>
      </Navbar>

      <BlockTitle className="history-subtitle">Revisit what you've explored</BlockTitle>

      <div className="history-list">
        {historyItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="history-entry">
            <div className="history-title">{item.title}</div>
            <div className="history-description">{item.description}</div>
            <div className="history-date">
              <Clock className="history-clock-icon" />
              <span>{item.date}</span>
              <button className="history-add-button" aria-label="Add new item">
                <Plus color="orange" />
              </button>
            </div>
            <div className="history-divider" />
          </div>
        ))}
      </div>
    </Page>
  );
}
