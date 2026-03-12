# NAMAZ TRACKER -- Final Polish Update

## Current State
App is at Version 22 with all core features working. Toast/notification pill is too narrow and tall. Introduction page has app info but no PWA install guide. App uses mixed colors (not strictly 4-color system).

## Requested Changes (Diff)

### Add
- PWA step-by-step install guide in IntroductionPage (how to install from Chrome: 3 dots → Add to Home Screen → Install → Settings for timings)
- 4-color system CSS variables applied globally

### Modify
- Toast.tsx: Make pill wider (90vw, max 400px), compact height, 2-line text support, auto-dismiss at 3.5s
- IntroductionPage.tsx: Add full PWA install guide section with numbered steps (3 languages)
- Global color system: Replace all ad-hoc colors with strict 4-color palette:
  - Navy #0D1B2A (headers, navs, dark surfaces)
  - Gold #C9A84C (accents, highlights, CTAs)
  - Cream #F5F0E8 (main backgrounds, card fills)
  - White #FFFFFF (text on dark, inner card text)
- All components must use only these 4 colors consistently

### Remove
- Mixed background colors (gray tones, blue-gray tones not in the 4-color palette)

## Implementation Plan
1. Fix Toast.tsx -- wider pill (90vw), auto-dismiss 3.5s, 2-line compact design
2. Update IntroductionPage.tsx -- add PWA install guide section (3 languages), premium step design
3. Apply 4-color system to index.css with CSS variables
4. Update App.tsx backgrounds to use cream #F5F0E8
5. Update Header.tsx, BottomNav.tsx, SplashScreen.tsx to use strict 4-color palette
6. Update all mdq components (Home, PrayerCard, Settings, etc.) to use 4-color palette
