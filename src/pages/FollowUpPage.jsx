import React, { useState } from 'react';
import {
  Page,
  Block,
  BlockTitle,
  List,
  ListItem,
  AccordionContent,
  Actions,
  ActionsGroup,
  ActionsButton,
  f7,
  Link,
} from 'framework7-react';
import { X, Share, Bookmark, Headphones, Layers, ThumbsUp, Copy, Mic} from 'feather-icons-react';
import './FollowUpPage.css';

const relatedQuestions = [
  'What is going to happen if Iran loses its cool and goes kaboom in the world',
  'What will happen if you suddenly become a millionaire',
  'What if figma disappears of night and I run out of random shit to write here',
];

const FollowUpPage = (props) => {
  const { id } = props.f7route.params;
  const routeProps = props.f7route?.props || {};
  const mini = routeProps.mini || { id, title: 'XRP Surges as bull target', source: 'Cointelegraph' };
  const parentArticle = routeProps.parentArticle || {
    id: 1,
    title: 'XRP surges above $2.20 as bulls target $2.30 breakout',
  };

  const [shareOpen, setShareOpen] = useState(false);

  return (
    <Page className="followup-page" noNavbar>
      <div className="fu-floating-header">
        <Link className="fu-icon-btn" onClick={() => props.f7router.back()}>
          <X />
        </Link>
        <div className="fu-right-actions">
          <Link className="fu-icon-btn" onClick={() => setShareOpen(true)}><Share /></Link>
          <Link className="fu-icon-btn"><Bookmark /></Link>
          <Link className="fu-icon-btn"><Headphones /></Link>
        </div>
      </div>

      <div className="fu-content">
        <div className="fu-followup-card">
          <div className="fu-followup-label">
            <Layers size={14} className="fu-followup-icon" />
            Follow up to
          </div>
          <div className="fu-parent-title">{parentArticle.title}</div>
        </div>

        <div className="fu-sources-chip">
          <Layers size={16} />
          <span>2 Sources</span>
        </div>

        <h1 className="fu-title">{parentArticle.title}</h1>

        <div className="fu-section">
          <h3 className="fu-section-title">Ripple’s OpenPayd partnership boosts sentiment</h3>
          <p className="fu-paragraph">
            XRP’s bullish momentum is further supported by Ripple’s recent partnership with fintech platform
            OpenPayd. The deal will enable real-time EUR and GBP payments, reinforcing XRP’s role in cross-border
            financial infrastructure and enhancing investor confidence.
          </p>
          <div className="fu-actions-row">
            <Share size={16} />
            <Copy size={16} />
            <ThumbsUp size={16} />
          </div>
        </div>

        <BlockTitle className="fu-related-title">
  <span className="fu-related-spark">✦</span> Related Questions
</BlockTitle>

<List
  className="fu-related-list"
  accordionList
  dividersIos
>
  {relatedQuestions.map((q, idx) => (
    <ListItem key={idx} title={q} accordionItem>
      <AccordionContent>
        <Block className="fu-related-answer">
          (Add your generated answer here…)
        </Block>
      </AccordionContent>
    </ListItem>
  ))}
</List>


      </div>
      <div className="fu-followup-input">
        <input placeholder="Ask follow-up..." />
        <button className="fu-mic-btn"><Mic/></button>
      </div>

      {/* Share sheet */}
      <Actions opened={shareOpen} onActionsClosed={() => setShareOpen(false)}>
        <ActionsGroup>
          <ActionsButton onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank')}>Share on Facebook</ActionsButton>
          <ActionsButton onClick={() => window.open('https://twitter.com/intent/tweet?url=' + window.location.href, '_blank')}>Share on Twitter</ActionsButton>
          <ActionsButton onClick={() => window.open('https://api.whatsapp.com/send?text=' + window.location.href, '_blank')}>Share on WhatsApp</ActionsButton>
          <ActionsButton onClick={() => { navigator.clipboard.writeText(window.location.href); f7.dialog.alert('Link copied to clipboard!'); }}>Copy Link</ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red" onClick={() => setShareOpen(false)}>Cancel</ActionsButton>
        </ActionsGroup>
      </Actions>
    </Page>
  );
};

export default FollowUpPage;
