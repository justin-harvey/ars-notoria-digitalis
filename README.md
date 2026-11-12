# Ars Notoria Digitalis

A digital manifestation of the ancient grimoire "Ars Notoria - The Notory Art of Solomon" in the aesthetic style of TempleOS. This interactive website presents stylized geometric figures and the **orations of the 1657 Robert Turner translation, quoted verbatim with page references**, used for obtaining perfect memory, eloquence, and understanding of the Seven Liberal Arts.

**✨ Source-Checked** - Every oration, sacred name and quoted precept in `sigils.js` is taken word for word from Robert Turner's 1657 translation (Benjamin Rowe's transcription, the PDF in this repository), with page references. Run `python3 tools/verify-orations.py` to check them all against the PDF (needs `pdftotext`). Where Turner gives no oration for a figure (for example Music's Note), the site shows the orations Turner directs you to use instead, and says so. The geometric figures are modern designs: Turner printed no figures.

## About the Ars Notoria

The Ars Notoria (Notory Art) is a medieval grimoire attributed to Solomon that claims to grant the practitioner perfect memory and mastery of the Seven Liberal Arts through contemplation of sacred figures and recitation of specific orations. The Seven Liberal Arts are:

1. **Grammar** - The foundation of language
2. **Logic/Dialectic** - The art of reasoning
3. **Rhetoric** - The art of eloquent speech
4. **Arithmetic** - The science of numbers
5. **Geometry** - The measurement of space
6. **Music** - The harmony of sounds
7. **Astronomy** - The study of celestial bodies (dangerous!)

## Features

- **Interactive Sigils**: Click on any circle, cross, or element within the geometric figures to reveal sacred orations
- **Seven Liberal Arts**: Navigate between the Notes of each art via the menu bar
- **TempleOS Aesthetic**: Inspired by Terry A. Davis's TempleOS, featuring a 16-color palette and retro interface
- **Manuscript Gallery**: View the original manuscript geometric figures
- **Authentic Orations**: Turner's orations and sacred names, quoted verbatim with page references
- **Responsive Design**: Works on desktop and mobile devices
- **📖 Digital Grimoire**: Complete magical journaling system with unlockable premium features

### Monas Hieroglyphica Exercise

Access via the "☿ MONAS" button in the main interface (`monas-hieroglyphica.html`). A guided, self-paced practice built on John Dee's *Monas Hieroglyphica* (1564):

- **Origins & Three Readings** - What the Monad is, and how it can be read as contemplation, "real" Kabbalah, and alchemy
- **The Work** - Seven stages (Point, Sun, Moon, Cross, Fire, Whole, Seal) that build the glyph step by step with an animated figure, a teaching, a drawing instruction, and a contemplation prompt
- **Seven Planets** - Highlights how each classical planetary sign sits within the Monad
- **Trace Canvas** - Draw over a faint guide with mouse, finger, or stylus, then without it
- **Record of the Work** - Reflection prompts saved locally in the browser, with copy-to-clipboard for the Book of Mirrors

Note: Dee left no ritual instructions for the Monas. The exercise is a modern reconstruction that follows the order of his theorems, and the page says so.

### The Prayers of John Dee

Access via the "✠ DEE'S PRAYERS" button (`dee-prayers.html`). A daily office built only from Dee's own words in Sloane MS 3188, with nothing spoken by angels or scryers:

- **The Morning and Evening Prayer for Wisdom** - Dee's most-used prayer (Latin), stepped through in nine parts with an original English translation. Latin, English or both, with your own name in the final petition.
- **The Three Short Prayers** - The ones Dee says he cried out "full oft", plus a study bell that offers one at each interval
- **The Psalms Dee Prayed** - With Vulgate and English numbering and the occasion for each
- **Dee's Closings** - The praises he wrote at the end of his sessions
- **The Faithful Protestation (1582)** - Dee's own account of why he prayed as he did, in his spelling, with glosses
- **A Day in Dee's Manner** and **Record** - A daily rhythm and a local journal

Dee's text is from the transcription in Joseph H. Peterson's *John Dee's Five Books of Mystery* (2003). Translations from the Latin are original to this site, and Peterson's notes and translations are not used.

### Practice of the Notory Art

Access via the "✦ PRACTICE" button in the main interface (`ars-notoria-practice.html`). A guided practice built directly on Turner's 1657 text:

- **Shape of the Art** - Interactive map of the generals and specials, with each art's number of Notes, the angel's reasons for that number, the inspection rules, and the favourable months by sign
- **Moon Calendar** - The true day of the Moon (Meeus new-moon algorithm), with every lunar-day rule in the text marked: Speculum of Wisdom, Grammar's days 1-17, Philosophy's days 7 and 17, Rhetoric's forbidden days 11, 17 and 19, and more
- **The Work** - A seven-stage session (Prepare, Opening Prayer, Hely Scemath, Speculum of Wisdom, Orations before the Note, Inspect, Close), with prayers quoted from Turner
- **Inspection** - Manuscript figures with tally counters set to the text's own counts (for example, 12 inspections and 24 repetitions for Grammar's first Note)
- **Record of the Work** - A session log saved locally, with copy-to-clipboard

`lunar.js` is shared by this page and the main status bar, which now shows the astronomical day of the Moon instead of an estimate from the calendar date.

### Reference Library Tools

The reference databases (`reference.html`) now include interactive tools (`reference-tools.js`) and a **History & Sources** note in every section:

- **Astrology** - Live planetary hours, using true sunrise and sunset for your location (from your device or entered by hand, stored only in the browser), with a "sky now" summary and a short working by the hours
- **Meditation** - Animated breath pacer (Calm, Box, Even, 4-7-8) and a guided body scan with a highlighted figure
- **Energy Work** - Animated nine-step ground-and-shield visualization, and a clickable chakra figure with a timed walk through the centers
- **Divination** - Daily draw from the Major Arcana or Elder Futhark, with a log. The rune list is now complete (all 24).
- **Plants** - Safety box (toxic herbs, pregnancy, pets, smoke)
- **Shadow Work** - Journaling prompts presented one at a time, and a corrected Jung quotation
- Sections can be linked directly (for example `reference.html#meditation`)

### Digital Grimoire System

Access via the "📖 GRIMOIRE" button in the main interface. The grimoire includes:

**Free Features:**
- Daily Divination tracker (list & calendar views)
- Moon Phase widget with auto-updates
- Calendar with entry markers
- Archive for old entries
- Brain Dump for quick notes

**Premium Features (Unlockable):**
- Digital Servitor Homes ($5) - Manage magical servitors with custom icons
- Book of Mirrors ($7) - Personal magical journal with tags
- Currently Reading Tracker ($5) - Track occult books with progress
- Spell Journal ($7) - Document spells with results & timeline
- Reference Databases ($12) - 8 comprehensive databases
- Master Spell Database ($10) - Searchable catalog of spells
- Full Access Bundle ($35) - All features unlocked

**Data Persistence:**
All entries are saved in browser localStorage. Export/import functionality included for backups.

## Project Structure

```
Ars Notoria Digitalis/
├── index.html                          # Main HTML file
├── sigils.js                           # Figures, interactions, and Turner's orations (source-checked)
├── tools/verify-orations.py            # Checks every oration in sigils.js against the Turner PDF
├── grimoire.html                       # Digital grimoire interface
├── grimoire.js                         # Grimoire functionality and unlock system
├── monas-hieroglyphica.html            # Guided Monas Hieroglyphica exercise
├── ars-notoria-practice.html           # Guided practice of the Notory Art
├── dee-prayers.html                    # John Dee's own prayers as a daily office
├── lunar.js                            # True new-moon / day-of-the-Moon calculation
├── reference-tools.js                  # Interactive tools for the reference library
├── README.md                           # This file
├── Ars Notoria - PDF.pdf              # Source grimoire (not deployed)
├── Screenshot 2026-01-13 165343.jpg   # Manuscript page 1
├── Screenshot 2026-01-13 165415.jpg   # Manuscript page 2
├── Screenshot 2026-01-13 165424.jpg   # Manuscript page 3
├── Screenshot 2026-01-13 165435.jpg   # Manuscript page 4
├── Screenshot 2026-01-13 165444.jpg   # Manuscript page 5
├── Screenshot 2026-01-13 165453.jpg   # Manuscript page 6
├── Screenshot 2026-01-13 165502.jpg   # Manuscript page 7
├── Screenshot 2026-01-13 165510.jpg   # Manuscript page 8
└── OccultOS/                           # Design inspiration images
```

## Monetization Setup (Grimoire Features)

The Digital Grimoire uses a code-based unlock system integrated with Gumroad:

### Setting Up Gumroad Products

1. **Create Products on Gumroad:**
   - Go to https://gumroad.com/products
   - Create a product for each feature (e.g., "Book of Mirrors - $7")
   - In the product description, include the unlock code
   - Set up automated email delivery with the code

2. **Customize Unlock Codes:**
   - Edit `grimoire.js` and update the `UNLOCK_CODES` object
   - Replace default codes (e.g., 'MIRRORS-2026') with your unique codes
   - Use strong, random codes for security

3. **Test the System:**
   - Visit grimoire.html in your browser
   - Click on a locked section
   - Click "Purchase on Gumroad" (update the URL in grimoire.html)
   - Enter your test code to verify unlock works

### Monitoring Sales & Usage

**Gumroad Dashboard:**
- Real-time sales tracking
- Customer emails and codes delivered
- Revenue analytics

**Google Analytics (Optional):**
- Add GA tracking code to grimoire.html
- Track unlock attempts and successful unlocks
- Monitor which features are most popular

### Test Codes (Change These!)

Current test codes in `grimoire.js`:
- Full Access: `FULLACCESS-2026`
- Book of Mirrors: `MIRRORS-2026`
- Servitor Homes: `SERVITOR-2026`
- Reading Tracker: `READING-2026`
- Spell Journal: `SPELLJ-2026`
- Reference Bundle: `REFDB-2026`
- Spell Database: `SPELLDB-2026`

**⚠️ IMPORTANT:** Change these codes before deploying to production!

## Deployment to Netlify

### Manual Deployment (Recommended)

1. **Prepare Your Files**:
   - Ensure all files are in the `Ars Notoria Digitalis` folder
   - The PDF file is optional for deployment (it's large and not used by the website)

2. **Sign in to Netlify**:
   - Go to [netlify.com](https://www.netlify.com/)
   - Sign in or create an account

3. **Deploy via Drag & Drop**:
   - On the Netlify dashboard, scroll down to "Want to deploy a new site without connecting to Git?"
   - Drag the entire `Ars Notoria Digitalis` folder into the deployment area
   - OR click "Browse to upload" and select the folder

4. **Wait for Deployment**:
   - Netlify will upload and deploy your files
   - You'll receive a URL like `https://random-name-12345.netlify.app`

5. **Optional - Custom Domain**:
   - In Site settings, you can set a custom domain name
   - Example: `ars-notoria-digitalis.netlify.app`

### Alternative: Deploy via Netlify CLI

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Navigate to the project folder
cd "C:\Users\justin.harvey\Ars Notoria Digitalis"

# Deploy
netlify deploy

# Follow prompts, then deploy to production
netlify deploy --prod
```

### Alternative: Deploy via Git

1. Initialize git repository (if not already done):
   ```bash
   cd "C:\Users\justin.harvey\Ars Notoria Digitalis"
   git init
   git add .
   git commit -m "Initial commit - Ars Notoria Digitalis"
   ```

2. Push to GitHub:
   ```bash
   # Create a repo on GitHub first, then:
   git remote add origin https://github.com/yourusername/ars-notoria-digitalis.git
   git push -u origin main
   ```

3. Connect to Netlify:
   - In Netlify dashboard, click "New site from Git"
   - Connect to GitHub and select your repository
   - Build settings are not needed (static site)
   - Click "Deploy site"

## Usage Instructions

### Navigating the Interface

1. **Menu Bar**: Click on any of the seven arts (GRAMMAR, LOGIC, RHETORIC, etc.)
2. **Sigil Canvas**: The main area displays the geometric figure for the selected art
3. **Interactive Elements**: Click on circles, crosses, and lines to reveal orations
4. **Side Panel**: Displays detailed information about selected elements
5. **Note Selector**: Switch between different notes within an art (when applicable)

### Sacred Practice (According to the Grimoire)

- **Timing**: Observe proper lunar days (shown in status bar)
- **Preparation**: Fast and purify yourself before approaching the Notes
- **Direction**: Face East during contemplation
- **Repetition**: Each oration has specific repetition requirements
- **Warning**: The seventh art (Astronomy) is considered dangerous and requires advanced preparation

## Technical Details

- **No Build Process Required**: Pure HTML, CSS, and vanilla JavaScript
- **No Dependencies**: Self-contained, works offline once loaded
- **Browser Compatibility**: Works in all modern browsers
- **Mobile Responsive**: Adapts to different screen sizes

## Color Palette (TempleOS 16-Color)

- Black (#000000), Blue (#0000AA), Green (#00AA00), Cyan (#00AAAA)
- Red (#AA0000), Purple (#AA00AA), Brown (#AA5500), Light Gray (#AAAAAA)
- Dark Gray (#555555), Light Blue (#5555FF), Light Green (#55FF55), Light Cyan (#55FFFF)
- Light Red (#FF5555), Light Purple (#FF55FF), Yellow (#FFFF55), White (#FFFFFF)
- Plus manuscript colors: Ink (#8B2500), Parchment (#E8DCC4)

## Historical Context

The Ars Notoria is part of the Solomonic grimoire tradition, dating back to the 13th century. It was one of the texts condemned by the Catholic Church but remained popular throughout the medieval and Renaissance periods. Unlike other grimoires focused on summoning spirits, the Ars Notoria focuses on acquiring knowledge and memory through contemplation and prayer.

## Credits

- **Original Text**: Ars Notoria (13th century grimoire)
- **Design Inspiration**: TempleOS by Terry A. Davis
- **Implementation**: 2026 digital adaptation
- **Manuscript Images**: Historical sources

## License

This is an educational and artistic project. The original Ars Notoria texts are in the public domain. The code and design of this digital adaptation are provided as-is for educational purposes.

## Warnings

This project is for historical, educational, and artistic purposes. The original grimoire's claims about supernatural powers and divine knowledge should be understood in their historical context. Modern users should approach this as a meditation on medieval learning systems and sacred geometry.

---

*"Through these sacred figures and holy orations, may knowledge flow from the Divine Source to the receptive mind."*

## Support

For issues with deployment or usage, consult:
- Netlify Documentation: https://docs.netlify.com/
- GitHub Issues: Create an issue if hosted on GitHub

## Updates

To update the deployed site:
1. Make changes to your local files
2. Re-drag the folder to Netlify (overwrites previous deployment)
3. OR commit and push changes if using Git deployment

Enjoy exploring the mysteries of the Ars Notoria Digitalis!
