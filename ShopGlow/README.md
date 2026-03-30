# ✨ ShopGlow — GlowingInCoach Shopify Theme

A custom Shopify theme built for **GlowingInCoach** — curated vintage Coach bags, designer handbags & fashion finds.

## 🎨 Brand Colors
| Name | Hex |
|------|-----|
| Hot Pink (Primary) | `#E91E8C` |
| Purple (Secondary) | `#7B1FA2` |
| Deep Purple | `#4A148C` |
| Soft Pink (BG) | `#FCE4EC` |
| Lavender (Accent) | `#EDE7F6` |
| Gold (Sparkle) | `#FFD700` |
| Deep Plum (Text) | `#2D1B35` |

## 📁 Theme Structure
```
ShopGlow/
├── layout/
│   └── theme.liquid          ← Main layout wrapper
├── templates/
│   ├── index.liquid          ← Homepage
│   ├── product.liquid        ← Product page
│   ├── collection.liquid     ← Collection page
│   ├── cart.liquid           ← Cart page
│   ├── page.liquid           ← Static pages
│   └── 404.liquid            ← 404 page
├── sections/
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── hero.liquid
│   ├── marquee.liquid
│   ├── collection-grid.liquid
│   ├── featured-products.liquid
│   ├── ambassador.liquid
│   ├── glo-edit.liquid
│   ├── email-signup.liquid
│   ├── product-main.liquid
│   ├── collection-main.liquid
│   ├── cart-main.liquid
│   └── footer.liquid
├── assets/
│   ├── glowingincoach.css    ← All styles
│   └── glowingincoach.js     ← All JavaScript
├── config/
│   ├── settings_schema.json  ← Theme settings
│   └── settings_data.json    ← Default values
└── locales/
    └── en.default.json       ← English strings
```

## 🚀 How to Push to Shopify

### Option A — Shopify GitHub Integration (Recommended)
1. In Shopify Admin → `Online Store → Themes`
2. Click `Add theme → Connect from GitHub`
3. Select `EazieBe/ShopGlow` → branch `main`
4. Click `Connect` — done! Auto-deploys on every push.

### Option B — Shopify CLI
```bash
npm install -g @shopify/cli @shopify/theme
shopify theme push --store=glowingincoach.myshopify.com
```

## 📝 Customization
All content is editable in `Online Store → Themes → Customize`:
- **Header**: Upload logo, set navigation menu
- **Hero**: Edit headline, stats, buttons, hero image
- **Marquee**: Add/remove scrolling text items
- **Collections**: Link real Shopify collections
- **Products**: Choose which collection to feature
- **Ambassador**: Edit your stats and customer reviews
- **Footer**: Add social media links

## 🛍️ Product Tags
Tag your products to control badges:
- `vintage` or `resale` → pink "Vintage" badge
- `glo-pick` → gold "Glo's Pick ✨" badge
- (no tag) → purple "New" badge

---
Built with 💜 for GlowingInCoach
