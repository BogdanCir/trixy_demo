import React, { useEffect, useRef, useState } from 'react';
import { Page, Link, Button, f7 } from 'framework7-react';
import { ArrowLeft, Upload, Mic, Square as Stop, Send } from 'feather-icons-react';
import './DiscoverChatPage.css';

const CHAT_ENDPOINT = '/api/chat';
const STT_ENDPOINT  = '/api/stt';

const mmss = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

async function* callChat(messages, abortSignal) {
  const res = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', Accept:'text/event-stream' },
    body: JSON.stringify({ messages }),
    signal: abortSignal,
  });
  const ct = res.headers.get('content-type') || '';
  if (res.ok && ct.includes('text/event-stream') && res.body) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buf = '';
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      buf += decoder.decode(value, { stream:true });
      let i;
      while ((i = buf.indexOf('\n\n')) !== -1) {
        const chunk = buf.slice(0, i).trim(); buf = buf.slice(i + 2);
        if (chunk.startsWith('data:')) {
          const data = chunk.replace(/^data:\s*/,'').trim();
          if (data === '[DONE]') return;
          yield data;
        }
      }
    }
    return;
  }
  const json = await res.json().catch(() => ({}));
  if (json?.reply) yield json.reply;
}

function pickMime() {
  const c = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
  ];
  return c.find((t) => MediaRecorder.isTypeSupported?.(t)) || '';
}

export default function DiscoverChatPage({ f7route }) {
  const initialQ = (f7route?.query?.q || '').toString();

  const [messages, setMessages] = useState([]);      // fără greeting la start
  const [greeted, setGreeted]   = useState(false);   // apare după primul Enter
  const [input, setInput]       = useState(initialQ);

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds]     = useState(0);

  const recRef    = useRef(null);
  const chunksRef = useRef([]);
  const timerRef  = useRef(null);
  const listRef   = useRef(null);

  useEffect(() => { if (initialQ) setInput(initialQ); }, [initialQ]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const back = () => f7.views.main?.router?.back();

  const share = async () => {
    try {
      const url = window.location.href;
      if (navigator.share) await navigator.share({ title: 'Discover', url });
      else {
        await navigator.clipboard.writeText(url);
        f7.toast.show({ text:'Link copied', closeTimeout:1200, position:'center' });
      }
    } catch {}
  };

  const sendMessage = async (text) => {
    const content = text.trim();
    if (!content) return;

    const userMsg = { id:`u-${Date.now()}`, role:'user', content };
    const asstId  = `a-${Date.now()}`;
    const asstMsg = { id:asstId, role:'assistant', content:'', typing:true };

    setMessages((m) => {
      if (!greeted && m.length === 0) {
        return [
          userMsg,
          { id:'greet-1', role:'assistant', content:'Hi! Ask me anything.' },
          asstMsg,
        ];
      }
      return [...m, userMsg, asstMsg];
    });
    setGreeted(true);
    setInput('');

    const controller = new AbortController();

    try {
      let partial = '';
      for await (const chunk of callChat(
        messages.concat(userMsg).map(({ role, content }) => ({ role, content })),
        controller.signal
      )) {
        partial += chunk;
        setMessages((msgs) =>
          msgs.map((m) => (m.id === asstId ? { ...m, content: partial, typing:true } : m))
        );
      }
      setMessages((msgs) =>
        msgs.map((m) => (m.id === asstId ? { ...m, typing:false } : m))
      );
    } catch {
      setMessages((msgs) =>
        msgs.map((m) =>
          m.id === asstId ? { ...m, typing:false, content:'⚠️ Network error. Try again.' } : m
        )
      );
    }
  };

  const onSubmit = (e) => { e.preventDefault(); if (!recording) sendMessage(input); };

  // Voice (înregistrează și aduce transcript în input)
  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
      const type = pickMime();
      const rec = new MediaRecorder(stream, type ? { mimeType:type } : undefined);
      recRef.current = rec; chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: type || 'audio/webm' });
        const fd   = new FormData(); fd.append('file', blob, 'speech.webm');
        try {
          const stt = await fetch(STT_ENDPOINT, { method:'POST', body:fd }).then(r=>r.json());
          const transcript = stt?.text || '';
          if (transcript) setInput(transcript);
        } catch { f7.toast.show({ text:'STT failed', position:'center' }); }
      };
      rec.start();
      setRecording(true); setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s)=>s+1), 1000);
    } catch { f7.toast.show({ text:'Microphone permission denied', position:'center' }); }
  };
  const stopRec = () => { if (!recRef.current) return; recRef.current.stop(); setRecording(false); clearInterval(timerRef.current); };
  const toggleRec = () => (recording ? stopRec() : startRec());

  return (
    <Page className="chat-page" noNavbar noToolbar noSwipeback>
      {/* background orbits + dots */}
      <div className="orbits" />
      <div className="dot d1" /><div className="dot d2" /><div className="dot d3" /><div className="dot d4" />

      {/* topbar cu mai mult spațiu sus și margini */}
      <div className="chat-topbar">
        <Link className="back-chip" noLinkClass onClick={back} aria-label="Back"><ArrowLeft/></Link>
        <div className="title">Discover</div>
        <Link className="share-btn" noLinkClass onClick={share} aria-label="Share"><Upload/></Link>
      </div>

      {/* listă mesaje */}
      <div className="chat-list" ref={listRef}>
        {messages.length === 0 && (
          <div className="brand-center">
            <h1 className="logo">Trixy<span className="ai">.ai</span></h1>
            <p className="tagline">Spotting early trends<br/>before the market moves</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`msg ${m.role}`}>
            <div className="bubble">
              {m.content}{m.typing && <span className="cursor">▍</span>}
            </div>
          </div>
        ))}
      </div>

      {/* input bar – buton Send (F7) îngust + mic */}
      <form className="chat-input" onSubmit={onSubmit}>
        <input
          placeholder={recording ? `Recording… ${mmss(seconds)}` : 'Ask anything'}
          value={recording ? '' : input}
          onChange={(e) => setInput(e.target.value)}
          disabled={recording}
        />
        <Button type="submit" small round fill className="send-btn" color="orange" aria-label="Send">
          <Send />
        </Button>
        <Link
          className={`button button-round mic-btn ${recording ? 'rec' : ''}`}
          noLinkClass
          onClick={toggleRec}
          aria-label={recording ? 'Stop recording' : 'Record'}
        >
          {recording ? <Stop /> : <Mic />}
        </Link>
      </form>
    </Page>
  );
}
