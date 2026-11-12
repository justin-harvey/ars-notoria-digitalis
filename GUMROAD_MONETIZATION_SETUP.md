# Gumroad Monetization Setup Guide

Complete guide to monetizing your Ars Notoria Digitalis grimoire features using Firebase + Gumroad.

---

## Overview

Your grimoire now has **4 premium features** ready for monetization:

| Feature | Price | Unlock Code Prefix |
|---------|-------|-------------------|
| 👻 Digital Servitor Homes | $5 | `servitors` |
| ✨ Book of Mirrors | $7 | `mirrors` |
| 📖 Sacred Library | $5 | `reading` |
| 🔥 Spell Journal | $7 | `spell-journal` |

**How it works:**
1. User clicks locked section → Modal appears
2. User clicks "Purchase on Gumroad" → Redirected to your Gumroad product
3. User completes purchase → Receives license key from Gumroad
4. User enters license key in grimoire → Firebase Cloud Function verifies with Gumroad API
5. If valid → Section unlocks and license key stored in localStorage (persists across sessions)

---

## Step 1: Set Up Firebase Cloud Functions

### 1.1 Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
firebase login
```

### 1.2 Initialize Functions in Your Project

Navigate to your project folder:

```bash
cd "C:\Users\justin.harvey\Ars Notoria Digitalis"
firebase init functions
```

**Select:**
- Use existing project: `ars-notoria-chatroom`
- Language: JavaScript
- ESLint: No (or Yes, your choice)
- Install dependencies: Yes

### 1.3 Install Axios Dependency

```bash
cd functions
npm install axios
```

### 1.4 Replace functions/index.js

Copy the contents of `firebase-functions-index.js` (already created in your folder) to `functions/index.js`:

```bash
# Windows Command Prompt
copy firebase-functions-index.js functions\index.js

# Or manually copy-paste the contents
```

### 1.5 Deploy Cloud Function

```bash
firebase deploy --only functions
```

**Expected output:**
```
✔ functions[verifyGumroadKey(us-central1)] Deployed
```

**Your function URL will be:**
```
https://us-central1-ars-notoria-chatroom.cloudfunctions.net/verifyGumroadKey
```

---

## Step 2: Create Gumroad Products

### 2.1 Create Products on Gumroad

Go to https://gumroad.com/products and create **4 products**:

#### Product 1: Digital Servitor Homes
- **Name:** Digital Servitor Homes - Ars Notoria Digitalis
- **Price:** $5
- **Description:**
  ```
  Create and manage thoughtform entities (servitors) in your digital grimoire.

  🔮 What You Get:
  - Servitor creation interface
  - Track feeding schedules
  - Visual servitor gallery
  - Record manifestations and results
  - Integration with grimoire system

  ✨ Compatible with Ars Notoria Digitalis digital grimoire
  🔒 One-time purchase, lifetime access
  ```
- **Enable License Keys:** YES (click "License keys" section, toggle ON)
- **Max Uses:** 3 (or unlimited, your choice)

#### Product 2: Book of Mirrors
- **Name:** Book of Mirrors - Ars Notoria Digitalis
- **Price:** $7
- **Description:**
  ```
  Your personal magical journal for shadow work and spiritual reflection.

  🪞 What You Get:
  - Date-stamped journal entries
  - Tag system for organization
  - Complete privacy (localStorage)
  - Track rituals, dreams, divination
  - Comprehensive usage guide included

  ✨ Compatible with Ars Notoria Digitalis digital grimoire
  🔒 One-time purchase, lifetime access
  ```
- **Enable License Keys:** YES
- **Max Uses:** 3

#### Product 3: Sacred Library
- **Name:** Sacred Library - Ars Notoria Digitalis
- **Price:** $5
- **Description:**
  ```
  Curated collection of 8 occult texts and grimoires.

  📖 Included Texts:
  - Three Books of Occult Philosophy (Agrippa)
  - The Kybalion
  - The Goetia
  - The Book of Abramelin
  - The Secret Teachings of All Ages
  - And 3 more classical texts

  ✨ Compatible with Ars Notoria Digitalis digital grimoire
  🔒 One-time purchase, lifetime access
  ```
- **Enable License Keys:** YES
- **Max Uses:** 3

#### Product 4: Spell Journal
- **Name:** Spell Journal - Ars Notoria Digitalis
- **Price:** $7
- **Description:**
  ```
  5 authentic occult spells + custom spell creation.

  🔥 Included Spells:
  - Lesser Banishing Ritual of the Pentagram (LBRP)
  - Solomonic Circle of Protection
  - Invocation for Clarity of Mind
  - Purification Bath of Hyssop
  - Sigil Charging Ritual

  ✨ Plus: Create and store unlimited custom spells
  📖 Full guide with moon phases, tools, instructions
  🔒 One-time purchase, lifetime access
  ```
- **Enable License Keys:** YES
- **Max Uses:** 3

### 2.2 Get Product IDs

For **each product**:

1. Click on product to edit
2. Scroll to **"License keys"** section
3. Click to expand
4. Copy the **Product ID** (long base64 string like `p_abc123def456...`)

**Save these!** You'll need them in Step 3.

### 2.3 Set Product URLs

For each product, get the **permalink**:

1. Click "Share" on product page
2. Copy the URL (format: `https://yourname.gumroad.com/l/product-slug`)

Or use custom domain if you have one.

---

## Step 3: Update grimoire.html with Product IDs

Open `grimoire.html` and find this section (around line 622):

```javascript
// Product IDs mapping (replace with your actual Gumroad product IDs)
const PRODUCT_IDS = {
    'servitors': 'YOUR_SERVITORS_PRODUCT_ID_HERE',
    'mirrors': 'YOUR_MIRRORS_PRODUCT_ID_HERE',
    'reading': 'YOUR_READING_PRODUCT_ID_HERE',
    'spell-journal': 'YOUR_SPELL_JOURNAL_PRODUCT_ID_HERE'
};

// Gumroad product URLs (replace with your actual product URLs)
const GUMROAD_URLS = {
    'servitors': 'https://gumroad.com/l/servitor-homes',
    'mirrors': 'https://gumroad.com/l/book-of-mirrors',
    'reading': 'https://gumroad.com/l/sacred-library',
    'spell-journal': 'https://gumroad.com/l/spell-journal'
};
```

**Replace with your actual values:**

```javascript
const PRODUCT_IDS = {
    'servitors': 'p_abc123def456...', // Your actual Product ID from Gumroad
    'mirrors': 'p_xyz789ghi012...',
    'reading': 'p_jkl345mno678...',
    'spell-journal': 'p_pqr901stu234...'
};

const GUMROAD_URLS = {
    'servitors': 'https://yourname.gumroad.com/l/servitor-homes',
    'mirrors': 'https://yourname.gumroad.com/l/book-of-mirrors',
    'reading': 'https://yourname.gumroad.com/l/sacred-library',
    'spell-journal': 'https://yourname.gumroad.com/l/spell-journal'
};
```

**Save the file and deploy to Netlify.**

---

## Step 4: Test the System

### 4.1 Test Purchase Flow

1. Open your grimoire at https://your-domain.com/grimoire.html
2. Click on a locked section (e.g., "Digital Servitor Homes")
3. Modal should appear with title, description, price
4. Click "Purchase on Gumroad"
5. Should redirect to your Gumroad product page
6. Complete test purchase (use Gumroad's test mode or buy your own product)
7. Gumroad will email you a license key

### 4.2 Test License Verification

1. Back in grimoire, click locked section again
2. Enter the license key in the input field
3. Click "Unlock"
4. Should show "Verifying..." in yellow
5. If valid: "✨ Access granted, seeker. The veil is lifted. ✨"
6. Section should unlock and become accessible
7. Refresh page → Section should remain unlocked (persisted in localStorage)

### 4.3 Test Invalid Key

1. Click a different locked section
2. Enter random text: `INVALID-KEY-12345`
3. Click "Unlock"
4. Should show error: "Invalid unlock code. Please check and try again."

### 4.4 Test Expired/Used Key

If you set max uses to 3:
1. Use the same key on 4 different devices/browsers
2. On the 4th attempt, Gumroad should reject it
3. Error message should appear

---

## Step 5: Go Live

### 5.1 Final Checklist

- ✅ All 4 Gumroad products created with license keys enabled
- ✅ Product IDs and URLs updated in grimoire.html
- ✅ Firebase Cloud Function deployed and working
- ✅ Tested purchase flow end-to-end
- ✅ Tested license verification
- ✅ grimoire.html deployed to Netlify
- ✅ All guide pages have correct unlock codes in documentation

### 5.2 Update Documentation

The guide pages already have unlock codes listed:
- `servitor-homes-guide.html` shows `SERVITORS-2026`
- `book-of-mirrors-guide.html` shows `MIRRORS-2026`
- `spell-library-guide.html` shows `SPELLJ-2026`

**These are just example codes for display.** Users will get **real license keys** from Gumroad after purchase.

You can keep these as "demo codes" in the guides or remove them - the actual unlock system uses Gumroad license keys.

---

## Step 6: Marketing Your Products

### 6.1 Promote on Main Site

Add to your `index.html`:

```html
<div style="margin: 20px 0; padding: 15px; border: 2px solid var(--yellow); background: var(--purple);">
    <strong style="color: var(--yellow);">✨ Premium Grimoire Features Available</strong>
    <p style="color: var(--ltcyan); font-size: 11px; margin-top: 5px;">
        Unlock powerful features: Digital Servitor Homes, Book of Mirrors, Sacred Library, and Spell Journal.
        <a href="grimoire.html" style="color: var(--ltgreen);">View Premium Features →</a>
    </p>
</div>
```

### 6.2 Social Media

Share your grimoire with hashtags:
- #DigitalGrimoire
- #OccultTools
- #ChaosManifesto
- #DigitalMagick
- #Witchblr
- #OccultTwitter

### 6.3 Create Demo Videos

Show the features in action:
- Screen recording of creating a servitor
- Demonstrating the spell library
- Writing in Book of Mirrors

Post on:
- YouTube
- TikTok (short clips)
- Twitter/X
- Instagram Reels

---

## Troubleshooting

### Problem: "Product not configured yet" error

**Solution:** You forgot to update PRODUCT_IDS in grimoire.html. Replace `YOUR_SERVITORS_PRODUCT_ID_HERE` with actual Gumroad Product ID.

### Problem: "Connection error. Please try again."

**Solutions:**
1. Check Firebase Cloud Function deployed correctly: `firebase functions:log`
2. Check browser console for errors (F12 → Console)
3. Verify Firebase config is correct in grimoire.html
4. Check if CORS is enabled (already set in Cloud Function)

### Problem: "Invalid unlock code" for valid key

**Solutions:**
1. Make sure you're using the correct Product ID
2. Check that license key doesn't have extra spaces
3. Verify the product has license keys enabled in Gumroad
4. Check Firebase function logs: `firebase functions:log`

### Problem: Unlocks don't persist after refresh

**Solution:** localStorage is working but section isn't unlocking. Check browser console for errors. Make sure `data-unlock-id` attributes match in HTML.

### Problem: Gumroad button doesn't work

**Solution:** Check that GUMROAD_URLS are correctly set and are valid URLs.

---

## Revenue Projections

### Conservative Estimate (10 sales/month):

| Feature | Price | Sales | Monthly |
|---------|-------|-------|---------|
| Servitor Homes | $5 | 3 | $15 |
| Book of Mirrors | $7 | 3 | $21 |
| Sacred Library | $5 | 2 | $10 |
| Spell Journal | $7 | 2 | $14 |
| **TOTAL** | - | **10** | **$60/month** |

### Moderate Estimate (50 sales/month):

| Feature | Price | Sales | Monthly |
|---------|-------|-------|---------|
| Servitor Homes | $5 | 15 | $75 |
| Book of Mirrors | $7 | 15 | $105 |
| Sacred Library | $5 | 10 | $50 |
| Spell Journal | $7 | 10 | $70 |
| **TOTAL** | - | **50** | **$300/month** |

### Optimistic Estimate (200 sales/month):

| Feature | Price | Sales | Monthly |
|---------|-------|-------|---------|
| Servitor Homes | $5 | 60 | $300 |
| Book of Mirrors | $7 | 60 | $420 |
| Sacred Library | $5 | 40 | $200 |
| Spell Journal | $7 | 40 | $280 |
| **TOTAL** | - | **200** | **$1,200/month** |

**Gumroad takes 10% + $0.30 per transaction**

Actual revenue = Listed revenue × 0.90 - ($0.30 × number of sales)

---

## Optional Enhancements

### 1. Bundle Pricing

Create a 5th product: **"Complete Grimoire Bundle - $20"** (save $4)

Includes all 4 features with single license key that unlocks everything.

### 2. Affiliate Program

Gumroad has built-in affiliates - offer 20-30% commission to occult bloggers/YouTubers who promote your grimoire.

### 3. Email Capture

Add newsletter signup: "Get free grimoire updates and occult knowledge"

Use Gumroad's audience feature or MailChimp integration.

### 4. Lifetime Updates

Promise: "All future features included free with purchase"

Builds trust and increases perceived value.

### 5. Limited-Time Discounts

Create urgency:
- "Launch Special: 25% off for first 100 buyers"
- "Full Moon Sale: 15% off tonight only"
- "Samhain Special: All features $15 (normally $24)"

---

## Support & Maintenance

### Customer Support

**Common questions:**
1. "I lost my license key" → Direct to Gumroad library
2. "Key won't unlock" → Check they're using correct product
3. "Can I use on multiple devices?" → Yes, up to max uses (3)
4. "Do I need internet?" → Only for initial unlock verification

### Refund Policy

Gumroad handles refunds automatically. Recommended policy:

"14-day money-back guarantee if feature doesn't work as described. Contact support@your-email.com"

### Updates

When you add new features:
1. Update grimoire
2. Email existing customers via Gumroad
3. Announce on social media
4. Optional: Create new paid addon

---

## Legal & Terms

### Terms of Service

Add to your site:

```
Digital products are delivered instantly via license key.
No refunds after 14 days or if license key has been used.
License keys are for personal use only - no reselling.
Maximum 3 device activations per license.
```

### Privacy Policy

Your grimoire uses:
- localStorage (stored locally, never sent to servers)
- Firebase (only for license verification)
- Gumroad (handles payment processing)

Include standard privacy policy from generator like TermsFeed.

---

## Next Steps

1. ✅ Deploy Firebase Cloud Function
2. ✅ Create 4 Gumroad products
3. ✅ Update grimoire.html with Product IDs and URLs
4. ✅ Test entire flow
5. ✅ Deploy to Netlify
6. ✅ Start marketing!

**Questions or Issues?**

Check Firebase logs:
```bash
firebase functions:log
```

Test Cloud Function directly:
```bash
firebase functions:shell
```

---

**May your grimoire prosper and your will be manifest.** 🔥✨
