// src/pages/NewsDetailPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  Link,
  Block,
  BlockTitle,
  List,
  ListItem,
  Icon,
  Card,
  CardContent,
  f7,
  Actions,
  ActionsGroup,
  ActionsButton,
  AccordionContent,
} from 'framework7-react';
import { X, Share, Bookmark, Headphones, Layers, ThumbsUp, Loader, Mic, BookOpen } from 'feather-icons-react';
import './NewsDetailPage.css';

const allArticles = [
  {
    id: 1,
    title: 'XRP surges above $2.20 as bulls target $2.30 breakout',
    excerpt: 'XRP surged past $2.20 with renewed bullish momentum...',
    content: 'Full content for XRP article...',
    image: '../assets/images/xrp_background.png',
    author: 'The Troll',
    avatar: '../assets/images/avatar.jpg',
    sources: ['NewsBTC', 'Cointelegraph'],
    sections: [
      {
        title: 'Technical indicators point to uptrend continuation',
        text: 'After rebounding from a low of $2.10 at the end of May, XRP has shown consistent strength. The price is now holding well above the $2.20 support zone, supported by a bullish trend line forming near $2.18. The Relative Strength Index (RSI) remains above 50, and the MACD has flipped bullish—both confirming upward pressure.',
      },
      {
        title: 'Ripple’s OpenPayd partnership boosts sentiment',
        text: 'XRP’s bullish momentum is further supported by Ripple’s recent partnership with fintech platform OpenPayd. The deal will enable real-time EUR and GBP payments, reinforcing XRP’s role in cross-border financial infrastructure and enhancing investor confidence.',
      },
    ],
  },
];

const followupQuestions = [
  {
    question: 'What is going to happen if Iran loses its cool and goes kaboom in the world',
    answer: 'This is a speculative geopolitical scenario with wide-ranging impacts...',
  },
  {
    question: 'What will happen if you suddenly become a millionaire',
    answer: 'Sudden wealth can lead to both opportunities and challenges, such as...',
  },
  {
    question: 'What if figma disappears of night and I run out of random shit to write here',
    answer: 'In that case, designers might switch to alternative tools like Adobe XD or Pen & Paper...',
  },
];

const NewsDetailPage = (props) => {
  const { articleId } = props.f7route.params;
  const [shareSheetOpened, setShareSheetOpened] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [articles, setArticles] = useState([]);

  const miniCards = [
    { id: 'mc1', title: 'XRP Surges as bull target', source: 'Cointelegraph', avatar: '../assets/images/avatar.jpg' },
    { id: 'mc2', title: 'XRP Goes Down because', source: 'The Block', avatar: '../assets/images/avatar2.jpg' },
    { id: 'mc3', title: 'Whales move XRP to exchanges', source: 'NewsBTC', avatar: '../assets/images/avatar3.jpg' },
    { id: 'mc4', title: 'SEC update may impact XRP', source: 'Decrypt', avatar: '../assets/images/avatar4.jpg' },
  ];

  const article = allArticles.find((item) => item.id === parseInt(articleId, 10));

  if (!article) {
    return (
      <Page>
        <Navbar title="Not Found">
          <NavLeft>
            <Link color="white" back>
              Back
            </Link>
          </NavLeft>
        </Navbar>
        <Block strong>
          <p>Articolul nu a fost găsit.</p>
        </Block>
      </Page>
    );
  }

  useEffect(() => {
    setArticles([
      { id: '1', title: 'Ethereum breaks $2,600 mark signaling robust market momentum', image: '../assets/images/ape1.png' },
      { id: '2', title: 'Crypto markets rebound as Bitcoin tops $109K and Ethereum nears $2.6K', image: '../assets/images/ape1.png' },
      { id: '3', title: 'XRP gains momentum amid forces that are at play in iran', image: '../assets/images/ape1.png' },
      { id: '4', title: 'Ethereum breaks $2,600 mark signaling robust market momentum', image: '../assets/images/ape1.png' },
      { id: '5', title: 'Crypto markets rebound as Bitcoin tops $109K and Ethereum nears $2.6K', image: '../assets/images/ape1.png' },
      { id: '6', title: 'XRP gains momentum amid forces that are at play in iran', image: '../assets/images/ape1.png' },
    ]);
  }, []);

  const goToMini = (mc) => {
    props.f7router.navigate(`/mini/${mc.id}/`, { props: { mini: mc } });
  };

  return (
    <Page className="news-detail-page">
      <div className="news-hero-wrapper">
        <img
          src={article.image}
          alt={article.title}
          className="news-hero-image"
          style={{ width: '100%', height: '450px', objectFit: 'cover', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}
        />
        <div className="floating-header">
          <Link back color="white" className="icon-button dark-bg">
            <X />
          </Link>
          <div className="right-actions">
            <Link className="icon-button" onClick={() => setShareSheetOpened(true)}>
              <Share color="white" />
            </Link>
            <Link className="icon-button">
              <Bookmark color="white" />
            </Link>
            <Link className="icon-button">
              <Headphones color="white" />
            </Link>
          </div>
        </div>
      </div>

      <Block className="news-block">
        <h1 className="news-title">{article.title}</h1>
        <p className="news-excerpt">{article.excerpt}</p>

        <p className="curated-by-label">Curated by</p>
        <div className="news-author">
          <img src={article.avatar} alt="avatar" className="author-avatar" />
          <span className="author-name">{article.author}</span>
        </div>

        <div className="horizontal-scroll-container mini">
          {miniCards.map((mc) => (
            <Link
              href={`/newarticle/${mc.id}/`}
              key={mc.id}
              className="discover-article-card horizontal-mini-card"
              routeProps={{ mini: mc, parentArticle: article }}
            >
              <Card className="mini-card">
                <CardContent className="mini-card-content" padding={false}>
                  <div className="mini-card-title">{mc.title}</div>
                  <div className="mini-card-footer">
                    <img src={mc.avatar} alt={mc.source} className="mini-card-avatar" />
                    <span className="mini-card-subtitle">{mc.source}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {article.sections.map((section, idx) => (
          <div key={idx} className="news-section">
            <h3>{section.title}</h3>
            <p>{section.text}</p>
            <div className="news-actions">
              <span className="source-tag">
                <Layers size={14} style={{ marginRight: '4px' }} />
                {article.sources.length} Sources
              </span>
              <div className="action-icons">
                <Share color="#777E90" size={16} />
                <Bookmark color="#777E90" size={16} />
                <ThumbsUp color="#777E90" size={16} />
              </div>
            </div>
          </div>
        ))}
      </Block>

      <BlockTitle style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Loader size={16} color="white" /> Ask Followup Questions
      </BlockTitle>
      <List accordionList dividersIos>
        {followupQuestions.map((q, idx) => (
          <ListItem key={idx} title={q.question} accordionItem color="black">
            <AccordionContent>
              <Block style={{ color: '#B1B5C3', fontSize: '14px' }}>{q.answer}</Block>
            </AccordionContent>
          </ListItem>
        ))}
      </List>

      <BlockTitle style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BookOpen size={16} color="white" /> Keep Reading
      </BlockTitle>

      <div className="horizontal-scroll-container">
        {articles.map((item) => (
          <Link href={`/followup/${item.id}/`} key={item.id} className="discover-article-card horizontal-bookmark-card">
            <Card className="bookmark-card" style={{ minWidth: '180px', width: '280px' }}>
              <CardContent className="bookmark-card-content" padding={false}>
                <img src={item.image} alt={item.title} className="bookmark-image" />
                <div className="bookmark-text">
                  <div className="bookmark-title">{item.title}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="fu-followup-input">
        <input placeholder="Ask follow-up..." />
        <button className="fu-mic-btn">
          <Mic />
        </button>
      </div>

      <Actions opened={shareSheetOpened} onActionsClosed={() => setShareSheetOpened(false)}>
        <ActionsGroup>
          <ActionsButton onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank')}>
            Share on Facebook
          </ActionsButton>
          <ActionsButton onClick={() => window.open('https://twitter.com/intent/tweet?url=' + window.location.href, '_blank')}>
            Share on Twitter
          </ActionsButton>
          <ActionsButton onClick={() => window.open('https://api.whatsapp.com/send?text=' + window.location.href, '_blank')}>
            Share on WhatsApp
          </ActionsButton>
          <ActionsButton
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              f7.dialog.alert('Link copied to clipboard!');
            }}
          >
            Copy Link
          </ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red" onClick={() => setShareSheetOpened(false)}>
            Cancel
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </Page>
  );
};

export default NewsDetailPage;
