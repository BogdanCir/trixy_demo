// src/pages/PulsePage.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Page, Link, f7 } from 'framework7-react';
import {
  X as Close,
  Headphones,
  Share as ShareIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'feather-icons-react';

import './PulsePage.css';

// --------- MOCK (înlocuiești cu API) ----------
async function fetchPulseMock() {
  await new Promise((r) => setTimeout(r, 200));
  return {
    id: 'p1',
    title: 'Pulse',
    subtitle: 'Geopolitics hits crypto',
    quote: 'And then what happened,\nwe gave them so many bombs',
    audioUrl: '/assets/audio/pulse.mp3', // pune un asset local pentru test
    shareUrl: '/pulse/',
  };
}

// util
const fmt = (s) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function PulsePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const audioRef = useRef(null);
  const rafRef = useRef(null);

  const [isPlaying, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchPulseMock().then((d) => {
      if (!alive) return;
      setData(d);
      setLoading(false);
    });
    return () => {
      alive = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // inițializează audio când avem URL
  useEffect(() => {
    if (!data?.audioUrl) return;
    const a = new Audio(data.audioUrl);
    audioRef.current = a;
    const onLoaded = () => setDur(a.duration || 0);
    const onEnd = () => setPlaying(false);
    const onTime = () => setCur(a.currentTime || 0);

    a.addEventListener('loadedmetadata', onLoaded);
    a.addEventListener('ended', onEnd);
    a.addEventListener('timeupdate', onTime);

    return () => {
      a.removeEventListener('loadedmetadata', onLoaded);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('timeupdate', onTime);
    };
  }, [data?.audioUrl]);

  const loop = () => {
    if (!audioRef.current) return;
    setCur(audioRef.current.currentTime || 0);
    rafRef.current = requestAnimationFrame(loop);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
    } else {
      a.play().then(() => {
        setPlaying(true);
        rafRef.current = requestAnimationFrame(loop);
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const progress = useMemo(() => (dur ? cur / dur : 0), [cur, dur]);

  const onScrub = (e) => {
    const bar = e.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - bar.left, 0), bar.width);
    const ratio = x / bar.width;
    if (audioRef.current && Number.isFinite(dur)) {
      audioRef.current.currentTime = ratio * dur;
      setCur(ratio * dur);
    }
  };

  const share = async () => {
    const url =
      data?.shareUrl?.startsWith('http')
        ? data.shareUrl
        : `${window.location.origin}${data?.shareUrl || '/pulse/'}`;
    const text = `${data?.title} — ${data?.subtitle}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Pulse', text, url });
      } else {
        await navigator.clipboard.writeText(url);
        f7.toast.show({ text: 'Link copied', position: 'center', closeTimeout: 1500 });
      }
    } catch (_) {}
  };

  const close = () => {
    if (f7.views.main?.router?.back) f7.views.main.router.back();
    else f7.views.main.router.navigate('/home/');
  };

  return (
    <Page className="pulse-page" noSwipeback noToolbar noNavbar>
      {/* buton X */}
      <Link className="close-btn" noLinkClass onClick={close} aria-label="Close">
        <Close />
      </Link>

      {/* Quote */}
      {!loading && (
        <div className="pulse-quote">
          {String(data?.quote || '')
            .split('\n')
            .map((line, i) => (
              <span key={i}>
                {line}
                {i < String(data?.quote || '').split('\n').length - 1 ? <br /> : null}
              </span>
            ))}
        </div>
      )}

      {/* Hero swirl (CSS only) */}
      <div className="pulse-hero">
        <div className="swirl" aria-hidden="true" />
        <div className="center-hole" aria-hidden="true" />
        <button className="hero-play" onClick={togglePlay} aria-label="Play/Pause">
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>

      {/* Bottom stack: info card + audio bar */}
      {!loading && (
        <div className="pulse-bottom">
          <div className="info-card">
            <div className="left">
              <div className="title">{data.title}</div>
              <div className="sub">
                <Headphones />
                <span>{data.subtitle}</span>
              </div>
            </div>
            <button className="share" onClick={share}>
              <span>Share</span>
            </button>
          </div>

          <div className="audio-card">
            <button className="pp" onClick={togglePlay} aria-label="Play/Pause">
              {isPlaying ? <Pause /> : <Play />}
            </button>

            <div className="bar" onClick={onScrub}>
              <div className="bar-fill" style={{ transform: `scaleX(${progress})` }} />
            </div>

            <div className="time">{fmt(cur)}</div>

            <button className="vol" onClick={toggleMute} aria-label="Mute/Unmute">
              {muted ? <VolumeX /> : <Volume2 />}
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}
