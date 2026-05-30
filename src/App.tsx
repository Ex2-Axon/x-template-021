import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

/* ── Technical Overlay ── */
function HUD() {
  return (
    <div className="hud-frame" aria-hidden="true">
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />
      <div className="scanline" />
    </div>
  )
}

/* ── Animated counter number (Kept from rules) ── */
function CounterNum({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'scale(1.4)'
    el.style.color = '#007AFF'
    el.style.textShadow = '0 0 20px #007AFF'
    const t = setTimeout(() => {
      el.style.transform = 'scale(1)'
      el.style.color = ''
      el.style.textShadow = ''
    }, 200)
    return () => clearTimeout(t)
  }, [value])

  return (
    <span
      ref={ref}
      className="counter-num"
      style={{ transition: 'all 0.2s ease' }}
    >
      {value.toString().padStart(2, '0')}
    </span>
  )
}

/* ── Status Bar ── */
function StatusBar() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] text-text-muted">
      <div className="flex items-center gap-2">
        <div className="status-indicator" />
        SYSTEM_ACTIVE
      </div>
      <div className="hidden md:block">|</div>
      <div className="hidden md:block">LOC: 13.7563° N, 100.5018° E</div>
      <div className="hidden md:block">|</div>
      <div>TIME: {time.toLocaleTimeString()}</div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="dashboard-container">
      {/* ── Background ── */}
      <div className="dashboard-bg">
        <div className="bg-layer-1" />
        <div className="bg-layer-2" />
        <div className="bg-vignette" />
      </div>

      <HUD />

      <main className="main-content">
        {/* ── Header ── */}
        <header className="dashboard-header animate-fade-in">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <img src={viteLogo} className="w-8 h-8 animate-float" alt="Vite" />
              <div className="w-px h-6 bg-border-line" />
              <img src={reactLogo} className="w-8 h-8 animate-float delay-200" alt="React" />
            </div>
            <div className="font-mono text-[10px] tracking-[0.4em] text-primary">PROJECT_X_TEMPL_021</div>
          </div>
          <StatusBar />
        </header>

        {/* ── Dashboard Grid ── */}
        <div className="dashboard-grid">
          
          {/* Hero Section */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center animate-fade-in delay-100">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-2 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-widest uppercase">
                New Release v1.21.0
              </span>
              <div className="data-line flex-grow" />
            </div>
            
            <h1 className="hero-title">
              GRID<br />
              <span className="text-primary text-glow">PRECISION</span>
            </h1>
            
            <p className="hero-subtitle mb-12">
              Structured interfaces for high-density information systems. 
              Built with precision, clarity, and the power of modern web technologies.
            </p>

            <div className="flex flex-wrap gap-6">
              <button 
                type="button"
                className="btn-spectacular group"
                onClick={() => setCount(c => c + 1)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm">EXPLORE_GRIDS</span>
                  <CounterNum value={count} />
                </div>
              </button>
              
              <div className="flex flex-col justify-center">
                <div className="text-[10px] font-mono text-text-muted mb-1">DATA_SOURCE</div>
                <div className="text-xs font-mono text-white">GEMINI_K1_SYSTEM</div>
              </div>
            </div>
          </div>

          {/* Right Column / Panels */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 animate-fade-in delay-200">
            
            {/* Documentation Panel */}
            <section id="docs" className="panel group">
              <header className="panel-header">
                <div className="p-2 bg-primary/10 border border-primary/20">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="panel-title">System_Documentation</h2>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="https://vite.dev/" target="_blank" rel="noreferrer" className="flex flex-col p-4 border border-border-line hover:border-primary/50 hover:bg-primary/5 transition-all group">
                  <span className="text-[10px] font-mono text-text-muted mb-2">VITE_CORE</span>
                  <span className="text-xs font-bold group-hover:text-primary">EXPLORE VITE</span>
                </a>
                <a href="https://react.dev/" target="_blank" rel="noreferrer" className="flex flex-col p-4 border border-border-line hover:border-primary/50 hover:bg-primary/5 transition-all group">
                  <span className="text-[10px] font-mono text-text-muted mb-2">REACT_UI</span>
                  <span className="text-xs font-bold group-hover:text-primary">LEARN REACT</span>
                </a>
              </div>
            </section>

            {/* Social Panel */}
            <section id="social" className="panel flex-grow">
              <header className="panel-header">
                <div className="p-2 bg-accent/10 border border-accent/20">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="panel-title">Network_Nodes</h2>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://github.com/Ex2-Axon/x-template" target="_blank" rel="noreferrer" className="social-link">
                  <div className="social-icon-wrapper">
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">GitHub</span>
                </a>
                <a href="https://discord.gg/8Zeq8VCU" target="_blank" rel="noreferrer" className="social-link">
                  <div className="social-icon-wrapper">
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">Discord</span>
                </a>
                <a href="https://x.com/Microtronic2" target="_blank" rel="noreferrer" className="social-link">
                  <div className="social-icon-wrapper">
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">X.com</span>
                </a>
                <a href="https://bsky.app/profile/microtronic.bsky.social" target="_blank" rel="noreferrer" className="social-link">
                  <div className="social-icon-wrapper">
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10.8c-1.32-2.4-3.96-5.4-6-5.4c-1.2 0-2.4.6-2.4 2.4c0 1.8 1.8 3.6 3.6 3.6c.6 0 1.2-.12 1.8-.3c-.12.3-.18.6-.18.9c0 2.4 2.4 4.2 4.2 4.2s4.2-1.8 4.2-4.2c0-.3-.06-.6-.18-.9c.6.18 1.2.3 1.8.3c1.8 0 3.6-1.8 3.6-3.6c0-1.8-1.2-2.4-2.4-2.4c-2.04 0-4.68 3-6 5.4z"/></svg>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">Bluesky</span>
                </a>
              </div>
            </section>

          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-auto pt-12 flex justify-between items-end animate-fade-in delay-300">
          <div className="flex flex-col gap-1">
            <div className="text-[8px] font-mono text-text-muted tracking-[0.5em] uppercase">Security_Protocol_Active</div>
            <div className="text-[10px] font-mono text-white tracking-widest uppercase">© 2026 AXON_CORP // GENESIS_V0.0.0</div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-px bg-border-line self-center" />
            <img src={heroImg} className="w-12 h-12 mix-blend-screen opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair" alt="Axon" />
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
