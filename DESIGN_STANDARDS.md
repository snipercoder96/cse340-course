# Design Standards & Professional Guidelines

## Design Philosophy

This site follows a **modern, minimalist professional design** approach emphasizing:
- **Clarity**: Clear information hierarchy and navigation
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsiveness**: Seamless experience across all devices
- **Professional Appearance**: Corporate-grade design language

---

## Color System

### Primary Palette
- **Navy Blue (#1e3a8a)**: Primary branding color, headings, navigation
- **Bright Blue (#3b82f6)**: Links, hover states, interactive elements
- **Sustainable Green (#059669)**: Action buttons, highlights, calls-to-action

### Supporting Colors
- **White (#ffffff)**: Primary background
- **Light Gray-Blue (#f8fafc)**: Secondary backgrounds, card backgrounds
- **Dark Text (#1e293b)**: Primary text, maximum contrast
- **Medium Gray (#475569)**: Secondary text, descriptions
- **Light Gray (#64748b)**: Tertiary text, labels

### Semantic Colors
- **Success**: #059669 (Sustainable Green)
- **Error**: #dc2626 (Red)
- **Warning**: #ea580c (Orange)
- **Info**: #3b82f6 (Bright Blue)

---

## Typography System

### Font Stack
```css
Primary (Sans-serif): 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Serif (Optional): 'Merriweather', serif
```

**Why these fonts?**
- **Inter**: Modern, highly legible sans-serif by Rasmus Andersson
- **Merriweather**: Classic serif, excellent for readability
- System fonts as fallback for maximum compatibility

### Font Sizes
| Usage | Size | Line Height |
|-------|------|-------------|
| H1 (Page Title) | 40px | 1.2 |
| H2 (Section) | 32px | 1.2 |
| H3 (Subsection) | 24px | 1.2 |
| H4-H6 | 18px | 1.2 |
| Body Text | 16px | 1.6 |
| Small Text | 14px | 1.6 |
| Extra Small | 12px | 1.4 |

### Font Weights
- **300**: Light (rarely used)
- **400**: Regular (default body text)
- **500**: Medium (secondary headings)
- **600**: Semi-Bold (navigation, labels, buttons)
- **700**: Bold (primary headings, strong emphasis)

---

## Spacing & Layout

### Spacing Scale
```css
--space-xs: 0.25rem    (4px)
--space-sm: 0.5rem    (8px)
--space-md: 1rem      (16px)    ← Default padding
--space-lg: 1.5rem    (24px)    ← Section padding
--space-xl: 2rem      (32px)    ← Major spacing
--space-2xl: 3rem     (48px)    ← Large sections
--space-3xl: 4rem     (64px)    ← Page margins
```

### Grid System
- **Max Content Width**: 1200px (desktop)
- **Card Grid**: 3-4 columns (auto-fit)
- **Mobile Grid**: Single column (responsive)
- **Gap**: 1.5rem-3rem depending on context

### Responsive Padding
- **Desktop**: 2rem sides
- **Tablet**: 1.5rem sides
- **Mobile**: 1rem sides
- **Small Mobile**: 0.5rem sides

---

## Components

### Buttons
```
Primary Button (Call-to-Action)
├─ Background: #059669 (Sustainable Green)
├─ Text: White
├─ Padding: 1rem 2rem
├─ Hover: #10b981 (lighter green)
└─ Focus: 2px navy outline

Secondary Button
├─ Background: #3b82f6 (Bright Blue)
├─ Text: White
├─ Same sizing/focus as primary
└─ Hover: #1e40af (darker blue)
```

### Cards/Articles
```
Card Component
├─ Background: #f8fafc (light gray-blue)
├─ Border: 1px #e2e8f0
├─ Padding: 1.5rem
├─ Border Radius: 0.75rem
├─ Box Shadow: 0 1px 2px rgba(0,0,0,0.05)
└─ Hover Effect: Lift 4px + stronger shadow
```

### Navigation
```
Navigation Bar
├─ Background: #1e3a8a (Navy)
├─ Position: Sticky (stays visible)
├─ Text: White (#ffffff)
├─ Padding: 1rem top/bottom
├─ Link Styling: 600 weight, padding
└─ Active State: #059669 background
```

### Form Inputs
```
Input Fields
├─ Font: 16px (prevents mobile zoom)
├─ Padding: 1rem
├─ Border: 2px #e2e8f0
├─ Border Radius: 0.5rem
├─ Focus: #3b82f6 border + shadow
└─ Width: 100% (responsive)
```

---

## Visual Effects

### Shadows
- **Small**: `0 1px 2px rgba(0, 0, 0, 0.05)` - Subtle depth
- **Medium**: `0 4px 6px rgba(0, 0, 0, 0.1)` - Standard depth
- **Large**: `0 10px 15px rgba(0, 0, 0, 0.1)` - Prominent elevation
- **XL**: `0 20px 25px rgba(0, 0, 0, 0.1)` - Major elements

### Border Radius
- **Small**: 0.375rem (6px) - Input fields
- **Medium**: 0.5rem (8px) - Buttons, small cards
- **Large**: 0.75rem (12px) - Standard cards
- **XL**: 1rem (16px) - Large sections

### Transitions
- **Default**: 0.3s ease-in-out (most animations)
- **Fast**: 0.15s ease-in-out (hover states)
- **Reduced Motion**: 0.01ms (accessibility preference)

---

## Responsive Design

### Mobile-First Approach
Start with mobile styles, enhance for larger screens:

```css
/* Mobile first (default) */
/* Tablet enhancement */
@media (min-width: 769px) { }

/* Desktop enhancement */
@media (min-width: 1024px) { }
```

### Key Breakpoints
- **768px**: Tablet/Mobile boundary
- **1024px**: Desktop threshold
- **480px**: Small mobile optimization

### Responsive Grid Behavior
```
Desktop: grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
Mobile:  grid-template-columns: 1fr
```

---

## Navigation & Information Architecture

### Information Hierarchy
1. **Home** - Gateway, hero section, category overview
2. **Organizations** - Partner listing, detailed descriptions
3. **Projects** - Projects grouped by category
4. **Categories** - Category cards with descriptions

### Navigation Pattern
- Sticky header for always-accessible navigation
- Current page highlighted with accent color
- Clear visual feedback on hover/focus
- Logical flow: Home → Categories → Projects/Orgs

---

## Accessibility Color Usage

### Contrast Requirements (WCAG AA)
- **Level AA**: Minimum 4.5:1 for normal text, 3:1 for large text
- **All text combinations**: Meet or exceed AA standards
- **Color not only indicator**: Important info also uses text/icons

### Color-Blind Friendly
- Avoid red/green only distinction
- Use combinations of color + icons + text
- Test palettes with color-blind simulators

---

## Image & Icon Guidelines

### Icons Used
- Emoji icons for visual interest (semantic meanings)
- 🏠 Home
- 🤝 Organizations  
- 📋 Projects
- 📂 Categories

### Future Icon Implementation
Consider adding custom icon system for:
- Category indicators
- Status badges
- Call-to-action arrows
- Success/error indicators

---

## Performance Considerations

### Font Loading
- Google Fonts CDN (optimized delivery)
- System font fallbacks for instant rendering
- `font-display: swap` for better UX

### CSS Optimization
- CSS variables for maintainability
- Mobile-first for smaller initial payload
- Minimal media queries for responsive design

### Accessibility Performance
- Keyboard navigation fully supported
- No JavaScript required for core functionality
- Skip links for faster navigation

---

## Maintenance & Updates

### Adding New Pages
1. Use semantic HTML structure (header, nav, main, footer)
2. Apply grid classes (`.categories-grid`, `.org-list`, `.project-list`)
3. Use CSS variables for colors and spacing
4. Include `id="main-content"` on main element
5. Test keyboard navigation and screen readers

### Updating Colors
1. Change CSS variables in `:root`
2. All components automatically update
3. Verify new colors meet contrast requirements

### Adding New Components
1. Use existing spacing variables
2. Follow button/card styling patterns
3. Test focus states and keyboard navigation
4. Ensure mobile responsiveness

---

## Tools & Testing

### Recommended Testing Tools
- **Color Contrast**: WebAIM Contrast Checker
- **Accessibility**: WAVE Web Accessibility Evaluation Tool
- **Responsive**: Chrome DevTools Device Emulation
- **Screen Readers**: NVDA (Windows), JAWS (Windows), VoiceOver (Mac)

### Browser Testing
- Chrome/Edge, Firefox, Safari (latest versions)
- iOS Safari, Chrome Android
- Test at actual breakpoints (768px, 1024px)

---

## Design Tokens Summary

```css
Colors:
  Primary: #1e3a8a (Navy)
  Primary Light: #3b82f6 (Bright Blue)
  Accent: #059669 (Green)
  
Typography:
  Primary Font: Inter
  Font Size: 16px base
  Line Height: 1.6-1.7

Spacing:
  Base Unit: 1rem (16px)
  Multiple scales: xs, sm, md, lg, xl, 2xl, 3xl

Layout:
  Max Width: 1200px
  Mobile: < 768px
  Desktop: ≥ 1024px

Effects:
  Shadows: 4 levels (sm, md, lg, xl)
  Radius: 4 levels (sm, md, lg, xl)
  Transitions: 0.3s default, 0.15s fast
```

---

## Conclusion

This design system provides a professional, accessible, and responsive foundation for the CSE 340 Service Network website. All components follow WCAG 2.1 AA standards while maintaining modern aesthetics and excellent user experience across all devices.
