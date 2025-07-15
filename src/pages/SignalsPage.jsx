// src/pages/SignalsPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  Preloader,
  BlockTitle,
  Block,
} from 'framework7-react';
import axios from '@/services/api';

const SignalsPage = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  // la mount, preia semnalele de la server
  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const { data } = await axios.get('/signals');
        setSignals(data);
      } catch (err) {
        console.error('Eroare la fetch signals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSignals();
  }, []);

  return (
    <Page>
      <Navbar backLink="Înapoi" title="Signals" />
      {loading && (
        <Block>
          <Preloader /> Încarc semnale…
        </Block>
      )}
      {!loading && (
        <>
          <BlockTitle>Suggestions</BlockTitle>
          <List mediaList>
            {signals.map((s) => (
              <ListItem
                key={s.symbol}
                title={s.name}
                text={s.signalType}
                after={s.timeAgo}
                link={`/signals/${s.symbol}/`}
              />
            ))}
          </List>
        </>
      )}
    </Page>
  );
};

export default SignalsPage;
