import React, { useState } from 'react';
import {
  Popup,
  ActionsButton,
  Page,
  Link,
} from 'framework7-react';
import { X } from 'feather-icons-react';
import './Preferences.css';

const availableTags = [
  'DeFi', 'Ecosystem Buzz', 'Fixed price', 'Live auction',
  'Altcoins', 'Macro & Policy', 'On–Chain Moves',
  'Market Recap',
];

const PreferencesPopup = ({ opened, onClose }) => {
  const [selectedTags, setSelectedTags] = useState(['DeFi', 'Fixed price', 'Market Recap']);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Popup className="preferences-popup" opened={opened} onPopupClosed={onClose} backdrop>
      <div className="preferences-content">
        {/* Close button */}
        <button className="preferences-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="preferences-title">Preferences</h2>
        <p className="preferences-subtitle">
          Choose topics to see stories curated just for you
        </p>

        {/* Tag list */}
        <div className="tag-list">
          {availableTags.map((tag) => (
            <button
              key={tag}
              className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Save Button */}
        <button className="preferences-save-btn" onClick={() => alert('Preferences saved!')}>
          Save
        </button>
      </div>
    </Popup>
  );
};

export default PreferencesPopup;
