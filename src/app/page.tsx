'use client'

import { useState, useEffect } from 'react'

// ─── Intro config ────────────────────────────────────────────────────────────
const INTRO_TEXT = "Hi, I'm Cole."
const TYPE_SPEED   = 80  // ms between each character
const PAUSE_AFTER  = 900 // ms to sit still after typing finishes
const FADE_DURATION = 500 // ms for the fade-out

// ─── Terminal lines ───────────────────────────────────────────────────────────
type LineType = 'prompt' | 'highlight' | 'output' | 'dim' | 'nav' | 'spacer' | 'idle'
interface Line { id: string; type: LineType; text?: string }

const LINES: Line[] = [
  { id: 'cmd1', type: 'prompt',    text: 'whoami' },
  { id: 'name', type: 'highlight', text: 'Cole Murray' },
  { id: 'info', type: 'output',    text: 'Computer Engineering @ UIUC' },
  { id: 'sub',  type: 'dim',       text: 'Class of 2028  ·  Aspiring software engineer' },
  { id: 'sp1',  type: 'spacer' },
  { id: 'cmd2', type: 'prompt',    text: 'ls' },
  { id: 'nav',  type: 'nav' },
  { id: 'sp2',  type: 'spacer' },
  { id: 'idle', type: 'idle' },
]

const LINE_DELAY = 200 // ms between each terminal line appearing

// ─── Phase type ───────────────────────────────────────────────────────────────
// The page moves through these phases in order
type Phase = 'typing' | 'pausing' | 'fading' | 'done'

// ─── Page component ───────────────────────────────────────────────────────────
export default function Home() {
  const [phase, setPhase]             = useState<Phase>('typing')
  const [typedChars, setTypedChars]   = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)

  // Phase: typing — add one character at a time
  useEffect(() => {
    if (phase !== 'typing') return
    if (typedChars >= INTRO_TEXT.length) { setPhase('pausing'); return }
    const t = setTimeout(() => setTypedChars(c => c + 1), TYPE_SPEED)
    return () => clearTimeout(t)
  }, [phase, typedChars])

  // Phase: pausing — wait, then start fading
  useEffect(() => {
    if (phase !== 'pausing') return
    const t = setTimeout(() => setPhase('fading'), PAUSE_AFTER)
    return () => clearTimeout(t)
  }, [phase])

  // Phase: fading — wait for the CSS transition to finish, then mark done
  useEffect(() => {
    if (phase !== 'fading') return
    const t = setTimeout(() => setPhase('done'), FADE_DURATION)
    return () => clearTimeout(t)
  }, [phase])

  // Phase: done — reveal terminal lines one by one
  useEffect(() => {
    if (phase !== 'done') return
    if (visibleLines >= LINES.length) return
    const t = setTimeout(() => setVisibleLines(v => v + 1), LINE_DELAY)
    return () => clearTimeout(t)
  }, [phase, visibleLines])

  return (
    <main className="min-h-screen flex items-center justify-center px-8">

      {/* ── Splash overlay ──────────────────────────────────────────────────
          Fixed over the whole screen. When phase becomes 'fading' we set
          opacity to 0 — the CSS transition on the element makes it smooth.
          Once phase is 'done' we remove it from the DOM entirely.        */}
      {phase !== 'done' && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-[#0f1117] transition-opacity duration-500"
          style={{ opacity: phase === 'fading' ? 0 : 1 }}
        >
          <p className="font-mono text-3xl text-[#abb2bf] tracking-wide">
            {INTRO_TEXT.slice(0, typedChars)}
            {/* Cursor only shows while typing or pausing, not during fade */}
            {phase !== 'fading' && (
              <span className={phase === 'pausing' ? 'cursor-blink' : ''}>█</span>
            )}
          </p>
        </div>
      )}

      {/* ── Terminal content ─────────────────────────────────────────────── */}
      <div className="w-full max-w-lg font-mono text-sm">
        {LINES.slice(0, visibleLines).map(line => (
          <div key={line.id} className="fade-in">
            <Line line={line} />
          </div>
        ))}
      </div>

    </main>
  )
}

// ─── Line renderer ────────────────────────────────────────────────────────────
function Line({ line }: { line: Line }) {
  switch (line.type) {
    case 'prompt':
      return (
        <p className="leading-8">
          <span className="text-[#98c379]">~</span>
          <span className="text-[#4b5263]"> $ </span>
          <span className="text-[#abb2bf]">{line.text}</span>
        </p>
      )
    case 'highlight':
      return <p className="text-[#e5c07b] text-2xl font-semibold leading-10 pl-4">{line.text}</p>
    case 'output':
      return <p className="text-[#abb2bf] leading-7 pl-4">{line.text}</p>
    case 'dim':
      return <p className="text-[#4b5263] leading-7 pl-4">{line.text}</p>
    case 'nav':
      return (
        <div className="flex flex-wrap gap-5 pl-4 leading-7">
          <NavLink href="#about"    label="about/"    />
          <NavLink href="#projects" label="projects/" />
          <NavLink href="#skills"   label="skills/"   />
          <NavLink href="#contact"  label="contact/"  />
        </div>
      )
    case 'spacer':
      return <div className="h-2" />
    case 'idle':
      return (
        <p className="leading-8">
          <span className="text-[#98c379]">~</span>
          <span className="text-[#4b5263]"> $ </span>
          <span className="cursor-blink text-[#abb2bf]">█</span>
        </p>
      )
  }
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="text-[#61afef] hover:text-[#88c0fc] hover:underline transition-colors">
      {label}
    </a>
  )
}
