import type { Register, ThemeMessageRule, ThemeSetArgs, ThemeSound } from 'claude-code'

import { makeColors } from './make-colors.js'

// Alpine Snow: bright glacier light by day, moonlit snowfields by night.
const { theme, problems } = makeColors({
  label: 'Alpine Snow',
  roles: { accent: '#2f6fa8', danger: '#b8433f', success: '#3f7f5f', warning: '#b07a1e', pro: '#6a5aa8' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e6edf3',
        'surface-1': '#eef3f7',
        'surface-2': '#f6f9fb',
        'text-primary': '#16212d',
        'text-secondary': '#3a4a5c',
        'text-muted': '#536376',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0f1621',
        'surface-1': '#151e2b',
        'surface-2': '#1b2635',
        'surface-3': '#222e3f',
        'text-primary': '#eaf1f8',
        'text-secondary': '#c3d0de',
        'text-muted': '#9aabbe',
      },
    },
  },
})

// Message colors that follow the mode: frosted white by day, deep ice by night.
const inputs = theme.inputs as { light?: Record<string, `#${string}`>, dark?: Record<string, `#${string}`> } | undefined
if (inputs?.light !== undefined) {
  inputs.light['bg-user-message'] = '#dbe7f2'
  inputs.light['text-user-message'] = '#16212d'
  inputs.light['bg-assistant-message'] = '#f6f9fb'
  inputs.light['text-assistant-message'] = '#16212d'
}
if (inputs?.dark !== undefined) {
  inputs.dark['bg-user-message'] = '#1f3047'
  inputs.dark['text-user-message'] = '#eaf1f8'
  inputs.dark['bg-assistant-message'] = '#151e2b'
  inputs.dark['text-assistant-message'] = '#eaf1f8'
}

// A drawn mountain scene: three ranges with snow caps, a pale sun or moon, and slow snowfall.
const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
  .sky-top { stop-color: #b9d3ea; }
  .sky-mid { stop-color: #dce9f4; }
  .sky-low { stop-color: #f3f7fb; }
  .orb { fill: #fffaf0; opacity: 0.85; }
  .glow { fill: #fff6e0; opacity: 0.35; }
  .far { fill: #a9bfd6; }
  .far-snow { fill: #eef4fa; }
  .mid { fill: #7f9bb8; }
  .mid-snow { fill: #f7fafd; }
  .near { fill: #5b7896; }
  .near-snow { fill: #ffffff; }
  .pine { fill: #3c5670; }
  .field { fill: #f4f8fc; }
  .flake { fill: #ffffff; }
  .mist { fill: #ffffff; opacity: 0.35; }
  @media (prefers-color-scheme: dark) {
    .sky-top { stop-color: #070c16; }
    .sky-mid { stop-color: #111c2e; }
    .sky-low { stop-color: #1f2f47; }
    .orb { fill: #e9f0fa; opacity: 0.9; }
    .glow { fill: #b8cce6; opacity: 0.18; }
    .far { fill: #2a3a52; }
    .far-snow { fill: #7f93ad; }
    .mid { fill: #1f2d42; }
    .mid-snow { fill: #a8bad0; }
    .near { fill: #152133; }
    .near-snow { fill: #c9d6e6; }
    .pine { fill: #0b131e; }
    .field { fill: #b4c3d6; }
    .flake { fill: #dfe9f5; }
    .mist { fill: #9fb3cc; opacity: 0.12; }
  }
  .snow-a { animation: fall-a 26s linear infinite; }
  .snow-b { animation: fall-b 40s linear infinite; opacity: 0.7; }
  .sway { animation: sway 11s ease-in-out infinite alternate; }
  .drift { animation: drift 90s ease-in-out infinite alternate; }
  @keyframes fall-a { from { transform: translate(0px, -240px); } to { transform: translate(0px, 0px); } }
  @keyframes fall-b { from { transform: translate(0px, -160px); } to { transform: translate(0px, 0px); } }
  @keyframes sway { from { transform: translateX(-12px); } to { transform: translateX(12px); } }
  @keyframes drift { from { transform: translateX(-40px); } to { transform: translateX(40px); } }
</style>
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" class="sky-top"/>
    <stop offset="0.55" class="sky-mid"/>
    <stop offset="1" class="sky-low"/>
  </linearGradient>
  <pattern id="flakes-a" width="240" height="240" patternUnits="userSpaceOnUse">
    <circle class="flake" cx="20" cy="30" r="2.4"/>
    <circle class="flake" cx="95" cy="12" r="1.8"/>
    <circle class="flake" cx="170" cy="60" r="2.8"/>
    <circle class="flake" cx="60" cy="110" r="1.6"/>
    <circle class="flake" cx="210" cy="140" r="2.2"/>
    <circle class="flake" cx="130" cy="170" r="1.9"/>
    <circle class="flake" cx="35" cy="200" r="2.6"/>
    <circle class="flake" cx="190" cy="220" r="1.5"/>
  </pattern>
  <pattern id="flakes-b" width="160" height="160" patternUnits="userSpaceOnUse">
    <circle class="flake" cx="15" cy="20" r="1.1"/>
    <circle class="flake" cx="80" cy="55" r="1.3"/>
    <circle class="flake" cx="140" cy="30" r="1"/>
    <circle class="flake" cx="45" cy="100" r="1.2"/>
    <circle class="flake" cx="120" cy="125" r="1"/>
    <circle class="flake" cx="70" cy="150" r="1.4"/>
  </pattern>
</defs>
<!-- sky -->
<rect width="1600" height="1000" fill="url(#sky)"/>
<circle class="glow" cx="1280" cy="170" r="120"/>
<circle class="orb" cx="1280" cy="170" r="46"/>
<!-- far range -->
<path class="far" d="M0 560 L120 470 L210 520 L330 400 L450 500 L560 430 L690 520 L820 380 L960 490 L1080 420 L1210 510 L1330 410 L1460 480 L1600 430 L1600 1000 L0 1000 Z"/>
<path class="far-snow" d="M300 425 L330 400 L362 430 L345 426 L330 438 L315 428 Z M790 405 L820 380 L855 412 L836 408 L820 420 L804 410 Z M1300 435 L1330 410 L1362 438 L1344 434 L1330 446 L1314 437 Z"/>
<g class="drift"><ellipse class="mist" cx="500" cy="560" rx="420" ry="34"/><ellipse class="mist" cx="1250" cy="575" rx="380" ry="30"/></g>
<!-- middle range -->
<path class="mid" d="M0 690 L150 560 L260 620 L420 450 L560 600 L700 520 L850 640 L1010 470 L1160 610 L1300 540 L1450 640 L1600 560 L1600 1000 L0 1000 Z"/>
<path class="mid-snow" d="M370 503 L420 450 L472 508 L450 500 L432 520 L414 502 L395 516 Z M960 523 L1010 470 L1063 527 L1040 519 L1022 538 L1004 520 L985 534 Z M110 595 L150 560 L190 594 L172 590 L156 604 L140 592 L126 600 Z M1265 572 L1300 540 L1336 572 L1318 568 L1302 581 L1286 570 Z"/>
<!-- near range -->
<path class="near" d="M0 820 L180 690 L330 780 L520 650 L700 790 L900 700 L1080 800 L1260 680 L1440 790 L1600 720 L1600 1000 L0 1000 Z"/>
<path class="near-snow" d="M460 693 L520 650 L582 697 L556 690 L538 710 L518 693 L496 708 L478 694 Z M1200 723 L1260 680 L1322 727 L1296 720 L1276 740 L1256 722 L1234 737 L1216 724 Z M140 718 L180 690 L222 720 L202 716 L186 730 L168 717 Z"/>
<!-- pines -->
<g class="pine">
  <path d="M90 905 L110 850 L130 905 Z M118 915 L140 845 L162 915 Z M150 910 L168 862 L186 910 Z"/>
  <path d="M1390 900 L1412 840 L1434 900 Z M1425 912 L1450 832 L1475 912 Z M1462 905 L1482 852 L1502 905 Z"/>
</g>
<!-- snowfield -->
<path class="field" d="M0 900 Q400 860 800 895 T1600 885 L1600 1000 L0 1000 Z"/>
<!-- snowfall -->
<g class="sway"><g class="snow-b"><rect x="-40" y="-160" width="1680" height="1320" fill="url(#flakes-b)"/></g></g>
<g class="sway"><g class="snow-a"><rect x="-40" y="-240" width="1680" height="1480" fill="url(#flakes-a)"/></g></g>
</svg>`

// Soft wind over snow, with a distant low hum; cues are small and glassy, like ice.
const SOUND: ThemeSound = {
  ambience: {
    reverb: 0.5,
    layers: [
      { wave: 'pink', drone: true, gain: 0.12, filter: { type: 'bandpass', hz: 500, to: 1100 }, tremolo: { hz: 0.08, depth: 0.6 } },
      { wave: 'brown', drone: true, gain: 0.08, filter: { type: 'lowpass', hz: 220 } },
      { wave: 'bell', scatter: 0.04, notes: ['E6', 'B5', 'G#6'], gain: 0.05, release: 3 },
    ],
  },
  cues: {
    send: { layers: [{ wave: 'bell', notes: ['B5'], gain: 0.25, release: 1 }], reverb: 0.4 },
    tool: { layers: [{ wave: 'white', gain: 0.06, attack: 0.01, release: 0.12, filter: { type: 'highpass', hz: 4000 } }] },
    done: { layers: [{ wave: 'bell', notes: ['E5', 'B5', 'E6'], step: 0.12, gain: 0.25, release: 1.6 }], reverb: 0.5 },
    ask: { layers: [{ wave: 'bell', notes: ['G#5', 'E5'], step: 0.15, gain: 0.25, release: 1 }], reverb: 0.4 },
    error: { layers: [{ wave: 'triangle', notes: ['E3', 'C3'], step: 0.18, gain: 0.25, release: 0.6 }] },
    compact: { layers: [{ wave: 'pink', gain: 0.12, attack: 0.3, release: 1.2, filter: { type: 'bandpass', hz: 800, to: 300 } }] },
    click: { layers: [{ wave: 'bell', notes: ['E5', 'G#5', 'B5', 'E6'], gain: 0.2, release: 1.2 }], reverb: 0.5 },
  },
}

const message: ThemeMessageRule = {
  radius: 14,
  padding: 14,
  shadow: { y: 2, blur: 10, color: '#1b2a3d22' },
}

const BASE: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'alpine-snow', glass: { blur: 18, opacity: 0.55 } },
}

const FULL: ThemeSetArgs = {
  ...BASE,
  sound: SOUND,
  style: {
    UserMessage: { ...message, backgroundColor: 'bg-user-message', color: 'text-user-message', borderColor: 'border-accent', borderWidth: 1 },
    AssistantMessage: { ...message, backgroundColor: 'bg-assistant-message', color: 'text-assistant-message' },
    ToolUse: { backgroundColor: 'surface-1', color: 'text-secondary', radius: 10, paddingX: 10 },
  },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }

    let set
    try {
      set = await $.theme.set(FULL)
    } catch (error) {
      $.ui.log(String(error))
      set = await $.theme.set(BASE)
    }
    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    return <Svg source={SCENE} alt="Snow-covered mountains under falling snow" />
  })
}
