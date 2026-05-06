# Developer Quick Reference

## Quick Start Guide

### CSS Variables (Easy Customization)

Located at the top of `/public/css/main.css`:

```css
:root {
    /* Change these to update the entire site */
    --primary: #1e3a8a;           /* Navy Blue */
    --primary-light: #3b82f6;     /* Bright Blue */
    --accent: #059669;            /* Green - Call-to-action color */
    --text-primary: #1e293b;      /* Dark Text */
    --text-secondary: #475569;    /* Medium Gray Text */
}
```

### Useful Classes

| Class | Purpose |
|-------|---------|
| `.categories-grid` | Responsive grid (3-4 columns on desktop, 1 on mobile) |
| `.org-list` | Same grid as above |
| `.project-list` | Same grid as above |
| `.button` | Primary action button (green) |
| `.button.secondary` | Secondary button (blue) |
| `.cta` | Call-to-action section (gradient background) |
| `.intro`, `.about`, `.hero` | Highlighted section boxes |
| `.text-muted` | Lighter gray text |
| `.sr-only` | Screen-reader only (hidden from view) |
| `.skip-link` | Skip-to-content link |

### Responsive Breakpoints

```css
/* Tablet and below */
@media (max-width: 768px) { }

/* Small mobile */
@media (max-width: 480px) { }
```

---

## HTML Structure Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
    <%- include('partials/header') %>
    
    <main id="main-content" role="main">
        <h1>Page Title</h1>
        
        <!-- Content goes here -->
        
    </main>
    
    <%- include('partials/footer') %>
</body>
</html>
```

---

## Adding Content Sections

### Grid Section (Cards/Articles)
```html
<section class="categories-grid">
    <article>
        <h3>Title</h3>
        <p>Description text here</p>
    </article>
    
    <article>
        <h3>Another Title</h3>
        <p>More description text</p>
    </article>
</section>
```

### Highlighted Section
```html
<section class="intro">
    <h2>Section Title</h2>
    <p>Your content with a highlighted background</p>
</section>
```

### Call-to-Action Section
```html
<section class="cta">
    <h2>Get Involved</h2>
    <p>Description text</p>
    <a href="/page" class="button">Click Me</a>
</section>
```

---

## Common Tasks

### Change Primary Color
Open `/public/css/main.css`, find `:root`, change `--primary` value:
```css
:root {
    --primary: #YOUR_NEW_COLOR; /* Change this */
}
```

### Add New Button Style
```html
<a href="#" class="button secondary">Secondary Button</a>
```

### Make Text Smaller on Mobile
```html
<p style="font-size: 14px;">
    Automatically inherits mobile-friendly sizing
</p>
```

### Create a Centered Section
```html
<section style="text-align: center; margin: 2rem 0;">
    <h2>Centered Content</h2>
</section>
```

### Add Screen Reader Only Text
```html
<p class="sr-only">This is only for screen readers</p>
<p>This appears for everyone</p>
```

---

## Accessibility Checklist

When adding new content:

- [ ] Headings use proper hierarchy (h1 → h2 → h3, never skip)
- [ ] All links have descriptive text (not "click here")
- [ ] All images have alt text
- [ ] Form inputs have associated labels
- [ ] Color contrast ratio meets 4.5:1 for normal text
- [ ] Focus states are visible on all interactive elements
- [ ] Content is keyboard navigable
- [ ] No content relies on color alone to convey information

---

## Typography

### For Headings
- Page title (h1): Only one per page, 40px
- Section titles (h2): 32px
- Card titles (h3): 24px

### For Body Text
- Normal paragraph: 16px
- Small text: 14px
- Extra small: 12px
- Line height: 1.6-1.7

---

## Responsive Design Tips

### Mobile-First Approach
1. Code for mobile first (smallest screen)
2. Enhance with `@media (max-width: 768px)` for larger screens
3. Test at actual breakpoints: 480px, 768px, 1024px

### Making Content Responsive
```html
<!-- Automatic responsive grid -->
<div class="categories-grid">
    <!-- Items automatically stack on mobile -->
</div>
```

### Responsive Images
```html
<!-- Always include max-width: 100% in CSS for images -->
<img src="image.jpg" alt="Description" style="max-width: 100%; height: auto;">
```

---

## Common Issues & Solutions

### Issue: Text too small on mobile
**Solution**: Make sure `<meta name="viewport">` is in head, and don't set font-size below 16px

### Issue: Grid not stacking on mobile
**Solution**: Use `.categories-grid`, `.org-list`, or `.project-list` class for automatic responsiveness

### Issue: Button text getting cut off
**Solution**: Add `.button` class, which includes proper padding: `padding: 1rem 2rem;`

### Issue: Focus outline not visible
**Solution**: All interactive elements have focus states built-in via CSS

### Issue: Colors don't meet accessibility standards
**Solution**: Check color contrast with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), ensure 4.5:1 ratio

---

## Testing

### Keyboard Navigation
1. Open site
2. Press Tab repeatedly
3. All interactive elements should be focusable
4. Focus outline should be visible

### Screen Reader (NVDA - Free)
1. Download NVDA from NV Access
2. Turn on NVDA (Ctrl+Alt+N)
3. Navigate with arrow keys and heading shortcuts (H for next heading)
4. Verify all text is readable and logical

### Mobile Responsiveness
1. Open Chrome DevTools (F12)
2. Click device icon (mobile emulation)
3. Test at 480px, 768px, and 1024px
4. Verify layout, text size, button size

### Color Contrast
1. Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
2. Input foreground and background colors
3. Verify ratio is at least 4.5:1 for normal text

---

## Browser Support

Tested and supported on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Android

---

## Resources

- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantic_HTML)
- [Media Queries (Responsive)](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)

---

## Support Files

- **ACCESSIBILITY.md** - Full accessibility documentation
- **DESIGN_STANDARDS.md** - Complete design system and guidelines
- **main.css** - All styles with extensive comments

---

**Last Updated**: 2026
**Maintained By**: [Your Name]
