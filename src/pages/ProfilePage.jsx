import React, { useState } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavRight,
  Link,
  List,
  ListItem,
  Toggle,
  Card,
  CardContent,
  Button,
  f7,
} from 'framework7-react';
import {
  X,
  EyeOff,
  Bell,
  HardDrive,
  Trash2,
  Bookmark,
  Book,
  Voicemail,
  MessageCircle,
  Volume1,
} from 'feather-icons-react';
import './ProfilePage.css';

const ProfilePage = () => {
  // mock user – va veni din backend
  const user = {
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    avatar: '../assets/images/avatar.jpg',
  };

  const [settings, setSettings] = useState({
    incognito: true,
    notifications: true,
    dataRetention: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    // exemplu feedback F7
    f7.toast.show({ text: `${key} → ${!settings[key]}` });
  };

  const confirm = (title, text, onOk) => {
    f7.dialog.confirm(text, title, onOk);
  };

  return (
    <Page className="profile-page" noSwipeback>
      {/* HEADER */}
      <Navbar
        large
        className="profile-navbar"
        transparent
        noShadow
        bgColor="transparent"
        textColor="white"
      >
        <NavLeft className="profile-title">
          <span className="profile-span">Profile</span>
        </NavLeft>
        <NavRight className="profile-title">
  <Link back className="close-round text-color-white">
    <X />
  </Link>
</NavRight>

      </Navbar>

      {/* CARD UTILIZATOR */}
      <Card className="profile-card" outlineIos={false} outlineMd={false}>
        <CardContent className="profile-card-content">
          <img
            src={user.avatar}
            alt={user.name}
            className="profile-avatar"
            onError={(e) => { e.currentTarget.src = ''; e.currentTarget.style.background = '#2b2d34'; }}
          />
          <div className="profile-user-info">
            <h3 className="profile-name">{user.name}</h3>
            <p className="profile-email">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* ACCOUNT */}
      <h2 className="section-title">Account</h2>
      <List className="settings-list" mediaList>
        <ListItem
          title="Incognito Mode"
          after={<Toggle color="orange" checked={settings.incognito} onToggle={() => handleToggle('incognito')} />}
          subtitle="Create anonymous threads"
        >
          <div slot="media" className="settings-icon">
            <EyeOff size={28} />
          </div>
        </ListItem>

        <ListItem
          title="Notifications"
          after={<Toggle color="orange" checked={settings.notifications} onToggle={() => handleToggle('notifications')} />}
          subtitle="Daily threads and signals"
        >
          <div slot="media" className="settings-icon">
            <Bell size={28} />
          </div>
        </ListItem>

        <ListItem
          title="Data Retention"
          wrapSubtitle
          after={<Toggle color="orange" checked={settings.dataRetention} onToggle={() => handleToggle('dataRetention')} />}
          subtitle="Allows Trixy to use your searches to improve AI models."
        >
          <div slot="media" className="settings-icon">
            <HardDrive size={28} />
          </div>
        </ListItem>

        <ListItem
          title="Clear history"
          link
          className="danger-item"
          onClick={() =>
            confirm('Clear history', 'Are you sure you want to clear history?', () =>
              f7.toast.show({ text: 'History cleared!' })
            )
          }
          after=""
          chevronCenter
        >
          <div slot="media" className="settings-icon">
            <Book size={28} />
          </div>
        </ListItem>

        <ListItem
          title="Delete Account"
          link
          className="danger-item"
          onClick={() =>
            confirm('Delete account', 'This action is irreversible. Continue?', () =>
              f7.toast.show({ text: 'Account deleted!' })
            )
          }
          after=""
          chevronCenter
        >
          <div slot="media" className="settings-icon">
            <Trash2 size={28} />
          </div>
        </ListItem>
      </List>

      {/* PROFILE */}
      <h2 className="section-title">Profile</h2>
      <List className="settings-list" mediaList>
        <ListItem
          title="Incognito Mode"
          after={<Toggle color="orange" checked={settings.incognito} onToggle={() => handleToggle('incognito')} />}
          subtitle="Create anonymous threads"
        >
          <div slot="media" className="settings-icon">
            <EyeOff size={28} />
          </div>
        </ListItem>

        <ListItem
          title="Notifications"
          after={<Toggle color="orange" checked={settings.notifications} onToggle={() => handleToggle('notifications')} />}
          subtitle="Daily threads and signals"
        >
          <div slot="media" className="settings-icon">
            <Bell size={28} />
          </div>
        </ListItem>

        <ListItem title="Speech Recognition Language" subtitle="English">
          <div slot="media" className="settings-icon">
            <Volume1 size={28} />
          </div>
        </ListItem>

        <ListItem title="AI Language" subtitle="English (UK)">
          <div slot="media" className="settings-icon">
            <MessageCircle size={28} />
          </div>
        </ListItem>

        <ListItem title="Voice Style" subtitle="System Language">
          <div slot="media" className="settings-icon">
            <Voicemail size={28} />
          </div>
        </ListItem>
      </List>

      {/* ABOUT */}
      <h2 className="section-title">About</h2>
      <List className="settings-list" mediaList>
        <ListItem
          title="Privacy Policy"
          link
          className="danger-item"
          onClick={() => f7.toast.show({ text: 'Open Privacy Policy' })}
          chevronCenter
        >
          <div slot="media" className="settings-icon">
            <Bookmark size={28} />
          </div>
        </ListItem>

        <ListItem
          title="Terms of Service"
          link
          className="danger-item"
          onClick={() => f7.toast.show({ text: 'Open Terms of Service' })}
          chevronCenter
        >
          <div slot="media" className="settings-icon">
            <Bookmark size={28} />
          </div>
        </ListItem>
      </List>

      {/* Disconnect */}
      <div className="disconnect-container">
        <Button large round outline className="disconnect-button"
          onClick={() =>
            confirm('Disconnect', 'Are you sure you want to sign out?', () =>
              f7.toast.show({ text: 'Signed out',  closeTimeout: 2000 })
            )
          }
        >
          Disconnect
        </Button>
      </div>
    </Page>
  );
};

export default ProfilePage;
