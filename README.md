# Ars Notoria Digitalis

A digital manifestation of the ancient grimoire "Ars Notoria - The Notory Art of Solomon" in the aesthetic style of TempleOS. This interactive website presents the sacred geometric figures and **historically accurate orations** from the 1657 Robert Turner translation, used for obtaining perfect memory, eloquence, and understanding of the Seven Liberal Arts.

** Historically Accurate Version** - All orations are extracted directly from the original 1657 manuscript translation by Robert Turner, with art-specific sacred names, lunation timings, and instructions faithful to the source text.

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
- **Authentic Orations**: Sacred invocations and Latin names from the historical texts
- **Responsive Design**: Works on desktop and mobile devices
- ** Digital Grimoire**: Complete magical journaling system with unlockable premium features

### Monas Hieroglyphica Exercise

Access via the "☿ MONAS" button in the main interface (`monas-hieroglyphica.html`). A guided, self-paced practice built on John Dee's *Monas Hieroglyphica* (1564):

- **Origins & Three Readings** - What the Monad is, and how it can be read as contemplation, "real" Kabbalah, and alchemy
- **The Work** - Seven stages (Point, Sun, Moon, Cross, Fire, Whole, Seal) that build the glyph step by step with an animated figure, a teaching, a drawing instruction, and a contemplation prompt
- **Seven Planets** - Highlights how each classical planetary sign sits within the Monad
- **Trace Canvas** - Draw over a faint guide with mouse, finger, or stylus, then without it
- **Record of the Work** - Reflection prompts saved locally in the browser, with copy-to-clipboard for the Book of Mirrors

Note: Dee left no ritual instructions for the Monas. The exercise is a modern reconstruction that follows the order of his theorems, and the page says so.

### Digital Grimoire System

Access via the " GRIMOIRE" button in the main interface. The grimoire includes:

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
├── sigils.js                           # JavaScript for sigils and interactions
├── grimoire.html                       # Digital grimoire interface
├── grimoire.js                         # Grimoire functionality and unlock system
├── monas-hieroglyphica.html            # Guided Monas Hieroglyphica exercise
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
