# Paint Your Own - Shopify Theme

Custom Shopify 2.0 theme for **Paint Your Own** (formerly Assemble-Me) - a paint-your-own character figurine store.

## Theme Structure

```
paintyourown/
├── assets/
│   ├── theme.css          # Complete stylesheet with responsive design
│   └── theme.js           # Cart drawer, hero slider, accordions, AJAX cart
├── config/
│   ├── settings_schema.json   # Theme settings (colors, fonts, announcement bar, etc.)
│   └── settings_data.json     # Default settings values
├── layout/
│   └── theme.liquid       # Base layout with SEO meta, CSS vars, header/footer
├── locales/
│   └── en.default.json    # English translations
├── sections/
│   ├── announcement-bar.liquid    # Rotating announcement messages
│   ├── header.liquid              # Sticky header with nav + mobile hamburger
│   ├── hero.liquid                # Hero slideshow (3 slides)
│   ├── trust-bar.liquid           # 4-item trust strip (reviews, shipping, etc.)
│   ├── collection-tiles.liquid    # 3 featured collection cards
│   ├── how-it-works.liquid        # 3-step process (homepage version)
│   ├── featured-products.liquid   # Product grid from collection
│   ├── value-props.liquid         # Image+text value propositions
│   ├── customer-gallery.liquid    # Instagram-style photo grid
│   ├── email-signup.liquid        # Newsletter signup with gradient bg
│   ├── footer.liquid              # 4-column footer
│   ├── cart-drawer.liquid         # Slide-out cart with free shipping bar
│   ├── main-product.liquid        # Full product page (gallery, variants, accordion)
│   ├── related-products.liquid    # "You May Also Like" recommendations
│   ├── main-collection.liquid     # Collection page with sidebar filters
│   ├── main-cart.liquid           # Full cart page
│   ├── main-page.liquid           # Generic page template
│   ├── how-it-works-page.liquid   # Dedicated How It Works page with FAQ
│   ├── main-404.liquid            # 404 error page
│   ├── main-search.liquid         # Search results page
│   └── main-list-collections.liquid  # All collections page
├── snippets/
│   ├── product-card.liquid    # Reusable product card (badges, hover image, quick-add)
│   └── price.liquid           # Price display helper
└── templates/
    ├── index.json                 # Homepage layout
    ├── product.json               # Product page layout
    ├── collection.json            # Collection page layout
    ├── cart.json                  # Cart page layout
    ├── page.json                  # Generic page layout
    ├── page.how-it-works.json     # How It Works page layout
    ├── 404.json                   # 404 page layout
    ├── search.json                # Search results layout
    ├── list-collections.json      # Collections list layout
    └── gift_card.liquid           # Gift card template
```

## Deployment to Shopify

### Option 1: Shopify CLI (Recommended)
```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Connect to your store
shopify theme dev --store paintyourown.myshopify.com

# Push theme to store
shopify theme push --store paintyourown.myshopify.com
```

### Option 2: Zip Upload
1. Zip the entire theme directory (assets/, config/, layout/, locales/, sections/, snippets/, templates/)
2. Go to Shopify Admin > Online Store > Themes
3. Click "Add theme" > "Upload zip file"

## Post-Upload Setup

### 1. Create Products (Shopify Admin > Products)

| Product | SKU | Mini (6") | Regular (12") | Large (24") |
|---------|-----|-----------|---------------|-------------|
| Paint-Your-Own Simpsons | PYO-SIMPSONS | C$25 | C$30 | - |
| Paint-Your-Own Bubbles | PYO-BUBBLES | C$25 | C$30 | - |
| Paint-Your-Own Mario | PYO-MARIO | C$25 | C$30 | - |
| Paint-Your-Own SpongeBob | PYO-SPONGEBOB | C$25 | C$30 | - |
| Paint-Your-Own Muscle Man | PYO-MUSCLEMAN | - | - | C$100 |
| Complete Paint Kit | PYO-PAINTKIT | - | C$30 | - |

### 2. Create Collections
- **All Products** (`/collections/all`)
- **Twin Sets** (`/collections/twin-sets`) - Date Night & Galentine sets
- **Party Packs** (`/collections/party-packs`) - Family & Group packs
- **Best Sellers** (`/collections/best-sellers`)
- **Paint Kits** (`/collections/paint-kits`)

### 3. Create Bundle Products
- **Date Night Twin Set** - C$99 (compare at C$120)
- **Galentine Twin Set** - C$99 (compare at C$120)
- **Family Activity Pack (4)** - C$180 (compare at C$220)
- **Group Activity Pack (6)** - C$250 (compare at C$330)

### 4. Create Pages
- **How It Works** - Use template `page.how-it-works`
- **Events** - Use default page template
- **FAQ** - Use default page template

### 5. Set Up Navigation
Go to Online Store > Navigation and create:
- **Main menu**: Shop All, Twin Sets, Party Packs, Paint Kits, How It Works, Events
- **Footer menu**: All Products, Twin Sets, Party Packs, Best Sellers, How It Works, Shipping Info, Return Policy, FAQs

### 6. Install Recommended Apps (All Free Tier)
1. **Shopify Search & Discovery** - Product filtering
2. **Selleasy** - Upsell & cross-sell widgets
3. **Judge.me** - Product reviews with photo uploads
4. **Bundler** - Product bundles with discounts

### 7. Configure Theme Settings
Go to Online Store > Themes > Customize to:
- Upload logo image
- Set social media URLs
- Add hero slideshow images
- Upload collection tile images
- Add customer gallery photos
- Configure announcement bar messages

## Key Features

- **Responsive design** - Mobile-first, works on all devices
- **AJAX cart drawer** - Slide-out cart with free shipping progress bar
- **Hero slideshow** - Auto-rotating with dot navigation
- **Product page** - Image gallery, size variants, accordion FAQ, sticky mobile CTA
- **Collection filters** - Sidebar filtering by price, size, occasion
- **Announcement bar** - Rotating messages
- **Sticky header** - With scroll shadow effect
- **Quick add to cart** - On product cards (hover)
- **SEO optimized** - Meta tags, Open Graph, semantic HTML
- **Accessibility** - ARIA labels, keyboard navigation, skip-to-content

## Brand Colors
- Primary: `#FF6B35` (Orange)
- Secondary: `#4ECDC4` (Teal)
- Accent: `#FFE66D` (Yellow)
- Text: `#2D3436` (Dark)
- Light Text: `#636E72` (Gray)
