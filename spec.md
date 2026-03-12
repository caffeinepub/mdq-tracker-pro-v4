# NAMAZ TRACKER -- Part 3A: Dua Mode

## Current State
DuaPage.tsx is a placeholder stub showing 'Part 3 mein add hoga'. No real content.

## Requested Changes (Diff)

### Add
- Full DuaPage component with 6 categories: Subah, Shaam, Namaz ke Baad, Safar, Khana, Sone se Pehle
- 50+ duas with Arabic text, Roman Urdu, Urdu script, Telugu meaning
- Language toggle tabs (Arabic | Roman Urdu | Urdu | Telugu)
- Category filter tabs at top
- User can add their own duas (saved to localStorage)
- Large readable fonts for Arabic text (Amiri)
- Premium luxury card design per dua
- Search/filter by category

### Modify
- DuaPage.tsx -- replace placeholder with full implementation

### Remove
- Placeholder 'Part 3 mein add hoga' message

## Implementation Plan
1. Create duasData.ts with 50+ duas (Arabic + Roman Urdu + Urdu + Telugu)
2. Rebuild DuaPage.tsx with category tabs, language toggle, luxury card design
3. Add localStorage persistence for user-added duas
