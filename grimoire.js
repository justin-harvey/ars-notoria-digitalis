// Digital Grimoire - Ars Notoria Digitalis
// Data persistence and unlock system using localStorage

// NOTE: Hardcoded unlock codes are DEPRECATED
// Now using Gumroad license verification via Firebase Cloud Function
// See grimoire.html for the new Firebase-based verification system
/*
const UNLOCK_CODES = {
    'servitors': 'SERVITOR-2026',
    'mirrors': 'MIRRORS-2026',
    'reading': 'READING-2026',
    'spell-journal': 'SPELLJ-2026',
    'reference-bundle': 'REFDB-2026',
    'spell-database': 'SPELLDB-2026',
    'full-access': 'FULLACCESS-2026'
};
*/

// Feature pricing for display
const FEATURE_PRICING = {
    'servitors': { name: 'Digital Servitor Homes', price: '$5' },
    'mirrors': { name: 'Book of Mirrors', price: '$7' },
    'reading': { name: 'Sacred Library - Occult PDF Collection', price: '$5' },
    'spell-journal': { name: 'Spell Journal', price: '$7' },
    'reference-bundle': { name: 'Reference Databases (All 8)', price: '$12' },
    'spell-database': { name: 'Master Spell Database', price: '$10' },
    'full-access': { name: 'Full Grimoire Access (All Features)', price: '$35' }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeGrimoire();
    checkUnlocks();
    renderCalendar();
    updateMoonPhase();
    renderDivinations();
    renderBrainDump();
    renderMirrors();
    renderReading();
    renderSpells();
    renderServitors();
    updateStatus();
});

function initializeGrimoire() {
    // Initialize localStorage if not exists
    if (!localStorage.getItem('grimoire_data')) {
        const initialData = {
            divinations: [],
            servitors: [],
            mirrors: [],
            reading: [
                {
                    id: 1,
                    title: 'The Kybalion',
                    author: 'Three Initiates',
                    year: 1908,
                    description: 'Hermetic philosophy and the seven principles',
                    pdfUrl: 'FIREBASE_STORAGE_URL_HERE', // Replace with Firebase Storage URL
                    category: 'Hermetic'
                },
                {
                    id: 2,
                    title: 'The Book of Abramelin',
                    author: 'Abraham von Worms',
                    year: 1458,
                    description: 'Sacred magic and the Abramelin operation',
                    pdfUrl: 'FIREBASE_STORAGE_URL_HERE',
                    category: 'Grimoire'
                },
                {
                    id: 3,
                    title: 'The Secret Teachings of All Ages',
                    author: 'Manly P. Hall',
                    year: 1928,
                    description: 'Encyclopedic outline of Masonic and occult symbolism',
                    pdfUrl: 'https://archive.org/details/SecretTeachingsOfAllAgesMPH/mode/2up',
                    category: 'Philosophy'
                },
                {
                    id: 4,
                    title: 'Three Books of Occult Philosophy',
                    author: 'Heinrich Cornelius Agrippa',
                    year: 1531,
                    description: 'Complete system of Western ceremonial magic',
                    pdfUrl: 'FIREBASE_STORAGE_URL_HERE',
                    category: 'Grimoire'
                },
                {
                    id: 5,
                    title: 'The Goetia: Lesser Key of Solomon',
                    author: 'Anonymous',
                    year: 1641,
                    description: 'The 72 demons and their evocations',
                    pdfUrl: 'FIREBASE_STORAGE_URL_HERE',
                    category: 'Grimoire'
                },
                {
                    id: 6,
                    title: 'The Sacred Magic of Ancient Egypt',
                    author: 'Rosemary Clark',
                    year: 2003,
                    description: 'Egyptian magical practices and rituals',
                    pdfUrl: 'FIREBASE_STORAGE_URL_HERE',
                    category: 'Egyptian'
                },
                {
                    id: 7,
                    title: 'The Picatrix',
                    author: 'Anonymous',
                    year: 1256,
                    description: 'Arabic grimoire of astrological magic',
                    pdfUrl: 'FIREBASE_STORAGE_URL_HERE',
                    category: 'Grimoire'
                },
                {
                    id: 8,
                    title: 'The Corpus Hermeticum',
                    author: 'Hermes Trismegistus',
                    year: 200,
                    description: 'Foundation texts of Hermeticism',
                    pdfUrl: 'FIREBASE_STORAGE_URL_HERE',
                    category: 'Hermetic'
                }
            ],
            spells: [
                {
                    id: 1,
                    name: 'The Lesser Banishing Ritual of the Pentagram',
                    category: 'Protection',
                    tradition: 'Hermetic/Golden Dawn',
                    purpose: 'Cleanse space of negative influences and establish sacred boundary',
                    difficulty: 'Beginner',
                    moonPhase: 'Any',
                    tools: ['Athame or finger for tracing', 'Ability to face cardinal directions'],
                    incantation: `
ATAH (Touch forehead)
MALKUTH (Touch breast)
VE-GEBURAH (Touch right shoulder)
VE-GEDULAH (Touch left shoulder)
LE-OLAHM, AMEN (Clasp hands at breast)

Before me, RAPHAEL
Behind me, GABRIEL
On my right hand, MICHAEL
On my left hand, AURIEL
For about me flames the Pentagram
And in the column shines the six-rayed Star
`,
                    instructions: `1. Face East. Perform the Qabalistic Cross (touch forehead "ATAH", breast "MALKUTH", right shoulder "VE-GEBURAH", left shoulder "VE-GEDULAH", clasp hands "LE-OLAHM AMEN")
2. Still facing East, trace a large pentagram. Visualize it blazing in blue flame. Point to center and vibrate "YHVH" (yod-heh-vav-heh)
3. Turn to South, trace pentagram, vibrate "ADONAI"
4. Turn to West, trace pentagram, vibrate "EHEIEH"
5. Turn to North, trace pentagram, vibrate "AGLA"
6. Return to East. Extend arms in cross formation and speak the archangelic invocation
7. Repeat Qabalistic Cross
8. Perform daily for best protection`,
                    notes: 'Foundation ritual of Western ceremonial magic. Clears space before any working.',
                    dateAdded: '2026-01-15'
                },
                {
                    id: 2,
                    name: 'Solomonic Circle of Protection',
                    category: 'Protection',
                    tradition: 'Solomonic/Medieval',
                    purpose: 'Create impenetrable barrier against hostile spirits and negative forces',
                    difficulty: 'Intermediate',
                    moonPhase: 'Waxing to Full',
                    tools: ['White candles (4)', 'Salt', 'Blessed water', 'Incense (frankincense)', 'Chalk or cord'],
                    incantation: `
By the sacred names ELOHIM, ADONAI, EHEIEH, and AGLA,
I consecrate this circle as a rampart and protection
Against all malevolent spirits and negative forces.

By Michael in the East, Raphael in the South,
Gabriel in the West, and Uriel in the North,
Let no entity cross this boundary without my will.

As above, so below. As within, so without.
This circle is cast. So mote it be.
`,
                    instructions: `1. Cleanse the area with salt water
2. Mark a circle 9 feet in diameter using chalk or cord
3. Place white candles at the four cardinal points
4. Light incense in the center
5. Walk the circle clockwise three times while reciting the incantation
6. Visualize a sphere of brilliant white light forming around you
7. When work is complete, walk counterclockwise three times to dismiss`,
                    notes: 'Traditional Solomonic working. Never leave circle during evocation. Dismiss properly when finished.',
                    dateAdded: '2026-01-15'
                },
                {
                    id: 3,
                    name: 'Invocation for Clarity of Mind',
                    category: 'Wisdom',
                    tradition: 'Hermetic',
                    purpose: 'Enhance mental clarity, memory, and intellectual understanding',
                    difficulty: 'Beginner',
                    moonPhase: 'Waxing Moon, Wednesday (Mercury\'s day)',
                    tools: ['Yellow candle', 'Rosemary or sage incense', 'Clear quartz crystal'],
                    incantation: `
O Mercurius, swift messenger and keeper of knowledge,
THOTH, scribe of the gods and lord of wisdom,
HERMES TRISMEGISTUS, thrice-great master of hidden arts,

Open my mind to receive your illumination.
Clear the fog of confusion from my thoughts.
Grant me the gift of understanding and perfect memory.

As Mercury flies between the worlds,
Let knowledge flow freely into my consciousness.
By the Caduceus and the Emerald Tablet,
By the principle "As above, so below,"
I invoke your presence and your blessing.

So it is spoken. So shall it be.
`,
                    instructions: `1. Perform on a Wednesday during the planetary hour of Mercury (use planetary hour calculator)
2. Face East and light yellow candle
3. Hold clear quartz in left hand (receiving hand)
4. Burn rosemary or sage incense
5. Recite incantation three times with intention
6. Meditate for 10-15 minutes while holding crystal
7. Carry the crystal with you when studying or working
8. Repeat weekly for sustained effect`,
                    notes: 'Best performed before exams, important meetings, or when learning new subjects. Aligned with Mercury\'s domain over communication and intellect.',
                    dateAdded: '2026-01-15'
                },
                {
                    id: 4,
                    name: 'Purification Bath of Hyssop',
                    category: 'Purification',
                    tradition: 'Biblical/Traditional',
                    purpose: 'Remove spiritual impurities and negative attachments before ritual work',
                    difficulty: 'Beginner',
                    moonPhase: 'Waning to Dark Moon',
                    tools: ['Hyssop herb (dried)', 'Sea salt', 'White candle', 'Clean white cloth'],
                    incantation: `
Purge me with hyssop, and I shall be clean;
Wash me, and I shall be whiter than snow.

By water and salt, I cleanse this vessel.
By fire and will, I purify my spirit.
All that does not serve my highest purpose,
All attachments that bind me to lower realms,
I release you. I banish you. I am free.

I emerge cleansed, renewed, and protected.
Blessed be.
`,
                    instructions: `1. Prepare bath with warm water
2. Add handful of dried hyssop and 3 tablespoons sea salt
3. Light white candle near bath
4. Enter bath and submerge yourself three times
5. While in water, recite the incantation
6. Visualize all negativity flowing out of your body into the water as dark mist
7. See yourself glowing with pure white light
8. After 15-20 minutes, exit and air dry (don't towel dry)
9. Drain bath and scatter salt at threshold
10. Perform before any major magical working`,
                    notes: 'Traditional purification referenced in Psalm 51. Essential preparation for spirit work. Water should be disposed of at a crossroads or running stream if possible.',
                    dateAdded: '2026-01-15'
                },
                {
                    id: 5,
                    name: 'Sigil Charging Ritual',
                    category: 'Manifestation',
                    tradition: 'Chaos Magic/Modern',
                    purpose: 'Empower a sigil to manifest desired outcome in material world',
                    difficulty: 'Intermediate',
                    moonPhase: 'New Moon (for beginnings) or Full Moon (for completion)',
                    tools: ['Paper', 'Ink or blood (symbolic)', 'Candle matching intention', 'Personal sigil'],
                    incantation: `
This symbol is my will made manifest.
This sigil is the bridge between thought and reality.
By the power of my focused intention,
By the authority of my sovereign will,
I charge this mark with purpose and power.

Let it sink into the depths of the unconscious.
Let it take root in the astral realm.
Let it grow in power until it bursts forth
Into manifestation in the material world.

I release this working to the universe.
It is done. It is done. It is done.
`,
                    instructions: `1. Create your sigil using the word-of-intent method:
   - Write your desire as a statement (e.g., "I WILL OBTAIN KNOWLEDGE")
   - Remove vowels and duplicate letters
   - Combine remaining letters into abstract symbol
2. Meditate on the sigil for several minutes
3. Light candle that matches your intention (green=money, red=passion, blue=peace, etc.)
4. Enter a trance state through rhythmic breathing or meditation
5. Gaze at the sigil while reciting the incantation
6. At peak focus, burn the sigil in the candle flame OR consume it OR hide it somewhere you'll forget
7. Immediately engage in mundane activity to banish the thought
8. Forget about it completely - let the sigil work in your subconscious
9. Results typically manifest within one lunar cycle`,
                    notes: 'The key is to "forget" the sigil after charging - this allows it to bypass the conscious mind and work through the unconscious. Austin Osman Spare method. Very effective for material goals.',
                    dateAdded: '2026-01-15'
                }
            ],
            archive: [],
            brainDump: [],
            unlocked: []
        };
        localStorage.setItem('grimoire_data', JSON.stringify(initialData));
    }
}

function getData() {
    return JSON.parse(localStorage.getItem('grimoire_data') || '{}');
}

function saveData(data) {
    localStorage.setItem('grimoire_data', JSON.stringify(data));
    updateStatus();
}

// UNLOCK SYSTEM
function checkUnlocks() {
    const data = getData();
    const unlocked = data.unlocked || [];

    // Check if full-access is unlocked
    if (unlocked.includes('full-access')) {
        // Unlock everything
        document.querySelectorAll('.section.locked').forEach(section => {
            section.classList.remove('locked');
        });
        return;
    }

    // Individual unlocks
    unlocked.forEach(featureId => {
        const section = document.querySelector(`[data-unlock-id="${featureId}"]`);
        if (section) {
            section.classList.remove('locked');
        }
    });
}

function showUnlockModal(featureId) {
    const feature = FEATURE_PRICING[featureId];
    if (!feature) return;

    document.getElementById('unlockTitle').textContent = `UNLOCK: ${feature.name.toUpperCase()}`;
    document.getElementById('unlockDescription').innerHTML = getFeatureDescription(featureId);
    document.getElementById('unlockPrice').textContent = `Investment: ${feature.price}`;
    document.getElementById('unlockCodeInput').value = '';
    document.getElementById('unlockError').textContent = '';

    // Store current feature for verification
    document.getElementById('unlockModal').dataset.featureId = featureId;

    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById('unlockModal').classList.add('active');
}

// DEPRECATED: These functions are now handled by Firebase/Gumroad integration in grimoire.html
// Keeping commented out for reference/fallback
/*
function closeUnlockModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.getElementById('unlockModal').classList.remove('active');
}

function verifyUnlockCode() {
    const code = document.getElementById('unlockCodeInput').value.trim().toUpperCase();
    const featureId = document.getElementById('unlockModal').dataset.featureId;

    // Check if code matches
    let unlocked = false;
    let unlockedFeature = null;

    for (const [id, validCode] of Object.entries(UNLOCK_CODES)) {
        if (code === validCode) {
            unlocked = true;
            unlockedFeature = id;
            break;
        }
    }

    if (unlocked) {
        const data = getData();
        if (!data.unlocked) data.unlocked = [];

        if (!data.unlocked.includes(unlockedFeature)) {
            data.unlocked.push(unlockedFeature);
            saveData(data);
        }

        checkUnlocks();
        closeUnlockModal();

        document.getElementById('statusText').textContent = `✓ ${FEATURE_PRICING[unlockedFeature].name} unlocked successfully!`;
        setTimeout(() => updateStatus(), 3000);
    } else {
        document.getElementById('unlockError').textContent = '⚠ Invalid code. Please check your Gumroad purchase email.';
    }
}
*/

function getFeatureDescription(featureId) {
    const descriptions = {
        'servitors': 'Create and manage digital servitors with custom names, icons, descriptions, and purposes. Track their activity and maintain relationships with your magical helpers.',
        'mirrors': 'Your personal magical journal for recording insights, experiences, divination results, and spiritual growth. Includes calendar and list views with tagging system.',
        'reading': 'Track your occult reading list with progress monitoring, book statuses (to-read, reading, completed), and author organization. Kanban board view included.',
        'spell-journal': 'Document all spells you perform with dates, types, ingredients, results, and photos. Timeline view shows your magical practice over time.',
        'reference-bundle': 'Access 8 comprehensive databases: Astrology, Color Magic, Deities, Divination Systems, Energy Work, Meditation, Plant Magic, and Shadow Work.',
        'spell-database': 'Master database of spells organized by category (love, protection, banishing, etc.) with full instructions, sources, and customizable tags.',
        'full-access': 'Unlock the complete Digital Grimoire with all premium features, tools, databases, and future updates.'
    };
    return descriptions[featureId] || 'Premium feature for serious practitioners.';
}

// DAILY DIVINATION
function addDivination() {
    const card = prompt('Card/Rune drawn:');
    if (!card) return;

    const interpretation = prompt('Interpretation:');

    const data = getData();
    data.divinations.unshift({
        id: Date.now(),
        date: new Date().toISOString(),
        card: card,
        interpretation: interpretation || '',
        tags: []
    });
    saveData(data);
    renderDivinations();
}

function renderDivinations() {
    const data = getData();
    const container = document.getElementById('divinationContent');

    if (!data.divinations || data.divinations.length === 0) {
        container.innerHTML = '<div style="color: var(--ltgray); font-size: 11px; margin-top: 10px;">No readings yet. Click "+ New Reading" to begin.</div>';
        return;
    }

    container.innerHTML = data.divinations.slice(0, 10).map(div => `
        <div class="entry">
            <div class="entry-header">
                ${div.card}
                <button class="btn btn-small" style="float: right; background: var(--red); padding: 2px 6px;" onclick="deleteDivination(${div.id})">🗑️</button>
            </div>
            <div class="entry-content">${div.interpretation}</div>
            <div class="entry-meta">${formatDate(div.date)}</div>
        </div>
    `).join('');
}

function deleteDivination(id) {
    if (!confirm('Delete this divination reading?')) return;
    const data = getData();
    data.divinations = data.divinations.filter(d => d.id !== id);
    saveData(data);
    renderDivinations();
}

function setDivinationView(view) {
    // Update button states
    const buttons = document.querySelectorAll('#section-divination .view-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (view === 'calendar') {
        alert('Calendar view coming soon - shows readings by date on calendar');
    }
}

// MOON PHASE
function updateMoonPhase() {
    const phases = [
        { icon: '🌑', name: 'New Moon' },
        { icon: '🌒', name: 'Waxing Crescent' },
        { icon: '🌓', name: 'First Quarter' },
        { icon: '🌔', name: 'Waxing Gibbous' },
        { icon: '🌕', name: 'Full Moon' },
        { icon: '🌖', name: 'Waning Gibbous' },
        { icon: '🌗', name: 'Last Quarter' },
        { icon: '🌘', name: 'Waning Crescent' }
    ];

    // Simple calculation based on lunar cycle (29.53 days)
    const now = new Date();
    const knownNewMoon = new Date('2024-01-11'); // A known new moon
    const daysSince = Math.floor((now - knownNewMoon) / (1000 * 60 * 60 * 24));
    const phaseIndex = Math.floor((daysSince % 29.53) / 29.53 * 8);

    const currentPhase = phases[phaseIndex] || phases[0];

    document.getElementById('moonPhase').textContent = currentPhase.icon;
    document.getElementById('moonPhaseName').textContent = currentPhase.name;
    document.getElementById('moonDate').textContent = `As of ${formatDate(now.toISOString())}`;
}

// SERVITORS (PREMIUM)
function addServitor() {
    const name = prompt('Servitor Name:');
    if (!name) return;

    const icon = prompt('Icon/Emoji (e.g., 🔮, 👁️, ⚡):') || '🔮';
    const purpose = prompt('Purpose/Description:');

    const data = getData();
    if (!data.servitors) data.servitors = [];

    data.servitors.push({
        id: Date.now(),
        name: name,
        icon: icon,
        purpose: purpose || '',
        created: new Date().toISOString()
    });
    saveData(data);
    renderServitors();
}

function renderServitors() {
    const data = getData();
    const container = document.getElementById('servitorGallery');

    if (!data.servitors || data.servitors.length === 0) {
        container.innerHTML = '<div class="servitor-card"><div class="servitor-icon">🔮</div><div style="font-size: 9px;">Example</div></div>';
        return;
    }

    container.innerHTML = data.servitors.map(s => `
        <div class="servitor-card">
            <div style="text-align: right; margin: -8px -8px 0 0;">
                <button class="btn btn-small" style="background: var(--red); padding: 2px 4px; font-size: 8px;" onclick="deleteServitor(${s.id}); event.stopPropagation();">X</button>
            </div>
            <div class="servitor-icon" onclick="viewServitor(${s.id})">${s.icon}</div>
            <div style="font-size: 9px;" onclick="viewServitor(${s.id})">${s.name}</div>
        </div>
    `).join('');
}

function viewServitor(id) {
    const data = getData();
    const servitor = data.servitors.find(s => s.id === id);
    if (!servitor) return;

    alert(`${servitor.icon} ${servitor.name}\n\nPurpose: ${servitor.purpose}\n\nCreated: ${formatDate(servitor.created)}`);
}

function deleteServitor(id) {
    if (!confirm('Dismiss this servitor?')) return;
    const data = getData();
    data.servitors = data.servitors.filter(s => s.id !== id);
    saveData(data);
    renderServitors();
}

// CALENDAR
function renderCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    document.getElementById('calendarMonth').textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    // Day headers
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day';
        header.style.fontWeight = 'bold';
        header.style.background = 'var(--blue)';
        header.textContent = day;
        calendar.appendChild(header);
    });

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day';
        empty.style.opacity = '0.3';
        calendar.appendChild(empty);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;

        if (day === now.getDate()) {
            dayCell.classList.add('today');
        }

        calendar.appendChild(dayCell);
    }
}

// BOOK OF MIRRORS (PREMIUM)
function addMirrorEntry() {
    const entry = prompt('Journal Entry:');
    if (!entry) return;

    const tags = prompt('Tags (comma-separated):') || '';

    const data = getData();
    if (!data.mirrors) data.mirrors = [];

    data.mirrors.unshift({
        id: Date.now(),
        date: new Date().toISOString(),
        content: entry,
        tags: tags.split(',').map(t => t.trim()).filter(t => t)
    });
    saveData(data);
    renderMirrors();
}

function renderMirrors() {
    const data = getData();
    const container = document.getElementById('mirrorsContent');
    if (!container) return;

    if (!data.mirrors || data.mirrors.length === 0) {
        container.innerHTML = '<div style="color: var(--ltgray); font-size: 11px; margin-top: 10px;">No journal entries yet. Click "+ New Entry" to begin.</div>';
        return;
    }

    container.innerHTML = data.mirrors.map(entry => `
        <div class="entry">
            <div class="entry-header">
                ${formatDate(entry.date)}
                <button class="btn btn-small" style="float: right; background: var(--red); padding: 2px 6px;" onclick="deleteMirror(${entry.id})">🗑️</button>
            </div>
            <div class="entry-content">${entry.content}</div>
            ${entry.tags.length > 0 ? `<div class="entry-meta">${entry.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
        </div>
    `).join('');
}

function deleteMirror(id) {
    if (!confirm('Delete this journal entry?')) return;
    const data = getData();
    data.mirrors = data.mirrors.filter(m => m.id !== id);
    saveData(data);
    renderMirrors();
}

// CURRENTLY READING (PREMIUM)
function addBook() {
    const title = prompt('Book Title:');
    if (!title) return;

    const author = prompt('Author:');
    const year = prompt('Year (optional):');
    const link = prompt('Link to PDF/Website (optional):');

    const data = getData();
    if (!data.reading) data.reading = [];

    data.reading.push({
        id: Date.now(),
        title: title,
        author: author || '',
        status: 'to-read',
        progress: 0,
        year: year || '',
        link: link || '',
        added: new Date().toISOString()
    });
    saveData(data);
    renderReading();
}

function renderReading() {
    const data = getData();
    const container = document.getElementById('readingContent');
    if (!container) return;

    if (!data.reading || data.reading.length === 0) {
        container.innerHTML = '<div style="color: var(--ltgray); font-size: 11px; margin-top: 10px;">Library is empty.</div>';
        return;
    }

    const categoryColors = {
        'Grimoire': 'var(--purple)',
        'Hermetic': 'var(--ltcyan)',
        'Philosophy': 'var(--yellow)',
        'Egyptian': 'var(--ltgreen)',
        'Kabbalah': 'var(--ltpurple)',
        'Alchemy': 'var(--ltred)'
    };

    container.innerHTML = data.reading.map(book => {
        const hasPDF = book.pdfUrl && book.pdfUrl !== 'FIREBASE_STORAGE_URL_HERE';

        return `
        <div class="entry" style="margin-bottom: 12px;">
            <div class="entry-header" style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <div style="color: var(--white); font-weight: bold; font-size: 12px;">${book.title}</div>
                    <div style="color: var(--ltgray); font-size: 10px; margin-top: 2px;">
                        by ${book.author}${book.year ? ` (${book.year})` : ''}
                    </div>
                </div>
                ${hasPDF ? `
                    <a href="${book.pdfUrl}" target="_blank"
                       style="background: var(--blue); color: var(--yellow); padding: 4px 12px;
                              text-decoration: none; font-size: 10px; font-weight: bold;
                              border: 2px solid var(--ltblue); margin-left: 10px;"
                       onclick="event.stopPropagation();">
                        📖 READ PDF
                    </a>
                ` : `
                    <span style="color: var(--red); font-size: 10px; font-style: italic; margin-left: 10px;">
                        PDF Not Available
                    </span>
                `}
            </div>
            ${book.description ? `
                <div style="color: var(--ltgray); font-size: 10px; margin-top: 6px; font-style: italic;">
                    ${book.description}
                </div>
            ` : ''}
            <div class="entry-meta" style="margin-top: 6px;">
                ${book.category ? `
                    <span class="tag" style="background: ${categoryColors[book.category] || 'var(--blue)'}; font-size: 9px; padding: 2px 8px;">
                        ${book.category}
                    </span>
                ` : ''}
            </div>
        </div>
    `}).join('');
}

function deleteBook(id) {
    if (!confirm('Remove this book from your list?')) return;
    const data = getData();
    data.reading = data.reading.filter(b => b.id !== id);
    saveData(data);
    renderReading();
}

function updateBookStatus(id) {
    const data = getData();
    const book = data.reading.find(b => b.id === id);
    if (!book) return;

    const newStatus = prompt(`Current status: ${book.status}\n\nChange to:\n1 = to-read\n2 = reading\n3 = completed\n4 = dnf (did not finish)\n\nEnter 1-4:`);

    const statusMap = {
        '1': 'to-read',
        '2': 'reading',
        '3': 'completed',
        '4': 'dnf'
    };

    if (statusMap[newStatus]) {
        book.status = statusMap[newStatus];

        if (newStatus === '2') {
            const progress = prompt('Progress (0-100%):');
            if (progress) {
                book.progress = parseInt(progress) || 0;
            }
        }

        saveData(data);
        renderReading();
    }
}

// SPELL JOURNAL (PREMIUM)
function addSpellEntry() {
    const name = prompt('Spell Name:');
    if (!name) return;

    const type = prompt('Type (e.g., protection, love, banishing):');
    const notes = prompt('Notes/Results:');

    const data = getData();
    if (!data.spells) data.spells = [];

    data.spells.unshift({
        id: Date.now(),
        date: new Date().toISOString(),
        name: name,
        type: type || '',
        notes: notes || ''
    });
    saveData(data);
    renderSpells();
}

function renderSpells() {
    const data = getData();
    const container = document.getElementById('spellJournalContent');
    if (!container) return;

    if (!data.spells || data.spells.length === 0) {
        container.innerHTML = '<div style="color: var(--ltgray); font-size: 11px; margin-top: 10px;">No spells recorded yet. Click "+ New Spell" to begin.</div>';
        return;
    }

    const categoryColors = {
        'Protection': 'var(--blue)',
        'Wisdom': 'var(--yellow)',
        'Purification': 'var(--ltcyan)',
        'Manifestation': 'var(--purple)',
        'Healing': 'var(--ltgreen)',
        'Divination': 'var(--ltpurple)',
        'Banishing': 'var(--red)'
    };

    container.innerHTML = data.spells.map(spell => {
        const isExpanded = spell.expanded || false;

        return `
        <div class="entry" style="margin-bottom: 15px; border: 2px solid ${categoryColors[spell.category] || 'var(--blue)'};">
            <div class="entry-header" style="cursor: pointer; background: ${categoryColors[spell.category] || 'var(--blue)'}; color: var(--white); padding: 8px;" onclick="toggleSpell(${spell.id})">
                <strong>${spell.name}</strong>
                <button class="btn btn-small" style="float: right; background: var(--red); padding: 2px 6px;" onclick="event.stopPropagation(); deleteSpell(${spell.id})">🗑️</button>
            </div>
            <div style="padding: 10px;">
                <div style="margin-bottom: 8px;">
                    <span class="tag" style="background: ${categoryColors[spell.category] || 'var(--blue)'}">${spell.category}</span>
                    <span class="tag" style="background: var(--dkgray)">${spell.tradition}</span>
                    <span class="tag" style="background: var(--ltblue)">${spell.difficulty}</span>
                </div>

                <div style="color: var(--ltgray); font-size: 11px; margin-bottom: 8px;">
                    <strong>Purpose:</strong> ${spell.purpose}
                </div>

                <div id="spell-details-${spell.id}" style="display: ${isExpanded ? 'block' : 'none'};">
                    <div style="margin: 10px 0; padding: 10px; background: var(--black); border-left: 3px solid var(--yellow);">
                        <div style="color: var(--yellow); font-size: 10px; margin-bottom: 5px;"><strong>🌙 MOON PHASE:</strong> ${spell.moonPhase}</div>
                    </div>

                    <div style="margin: 10px 0;">
                        <div style="color: var(--ltcyan); font-size: 11px; font-weight: bold; margin-bottom: 5px;">🔮 TOOLS REQUIRED:</div>
                        <ul style="margin-left: 15px; color: var(--ltgray); font-size: 10px;">
                            ${spell.tools.map(tool => `<li>${tool}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="margin: 15px 0; padding: 10px; background: var(--black); border: 1px solid var(--purple);">
                        <div style="color: var(--ltpurple); font-size: 11px; font-weight: bold; margin-bottom: 8px;">📜 INCANTATION:</div>
                        <pre style="color: var(--white); font-size: 10px; line-height: 1.4; font-family: 'Courier New', monospace; white-space: pre-wrap;">${spell.incantation}</pre>
                    </div>

                    <div style="margin: 15px 0;">
                        <div style="color: var(--ltgreen); font-size: 11px; font-weight: bold; margin-bottom: 5px;">📋 INSTRUCTIONS:</div>
                        <pre style="color: var(--ltgray); font-size: 10px; line-height: 1.5; white-space: pre-wrap;">${spell.instructions}</pre>
                    </div>

                    ${spell.notes ? `
                    <div style="margin: 10px 0; padding: 8px; background: rgba(255,255,85,0.1); border-left: 3px solid var(--yellow);">
                        <div style="color: var(--yellow); font-size: 10px; font-weight: bold;">⚠️ NOTES:</div>
                        <div style="color: var(--ltgray); font-size: 10px; margin-top: 3px;">${spell.notes}</div>
                    </div>
                    ` : ''}
                </div>

                <div style="text-align: center; margin-top: 10px;">
                    <button onclick="toggleSpell(${spell.id})" class="btn btn-small" style="font-size: 10px;">
                        ${isExpanded ? '▲ Collapse' : '▼ View Full Spell'}
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

function toggleSpell(id) {
    const data = getData();
    const spell = data.spells.find(s => s.id === id);
    if (!spell) return;

    spell.expanded = !spell.expanded;
    saveData(data);
    renderSpells();
}

function deleteSpell(id) {
    if (!confirm('Delete this spell entry?')) return;
    const data = getData();
    data.spells = data.spells.filter(s => s.id !== id);
    saveData(data);
    renderSpells();
}

// BRAIN DUMP
function addBrainDump() {
    const note = prompt('Quick Note:');
    if (!note) return;

    const data = getData();
    if (!data.brainDump) data.brainDump = [];

    data.brainDump.unshift({
        id: Date.now(),
        date: new Date().toISOString(),
        content: note
    });
    saveData(data);
    renderBrainDump();
}

function renderBrainDump() {
    const data = getData();
    const container = document.getElementById('brainDumpContent');

    if (!data.brainDump || data.brainDump.length === 0) {
        container.innerHTML = '<div style="color: var(--ltgray); font-size: 11px; margin-top: 10px;">No notes yet. Click "+ Quick Note" to add one.</div>';
        return;
    }

    container.innerHTML = data.brainDump.slice(0, 5).map(note => `
        <div class="entry">
            <div class="entry-content">
                ${note.content}
                <button class="btn btn-small" style="float: right; background: var(--red); padding: 2px 6px; margin-top: -3px;" onclick="deleteBrainDump(${note.id})">🗑️</button>
            </div>
            <div class="entry-meta">${formatDate(note.date)}</div>
        </div>
    `).join('');
}

function deleteBrainDump(id) {
    if (!confirm('Delete this note?')) return;
    const data = getData();
    data.brainDump = data.brainDump.filter(n => n.id !== id);
    saveData(data);
    renderBrainDump();
}

// VIEW SWITCHING
function showView(view) {
    // Update menu
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');

    const leftCol = document.getElementById('leftColumn');
    const rightCol = document.getElementById('rightColumn');

    // Show/hide sections based on view
    if (view === 'daily') {
        leftCol.style.display = 'block';
        rightCol.style.display = 'block';
        document.querySelectorAll('.section').forEach(s => {
            const id = s.id;
            if (id.includes('divination') || id.includes('moon') || id.includes('servitors') || id.includes('calendar')) {
                s.style.display = 'block';
            } else {
                s.style.display = 'none';
            }
        });
        // Re-render daily sections
        renderDivinations();
        renderServitors();
        renderCalendar();
    } else if (view === 'journals') {
        leftCol.style.display = 'none';
        rightCol.style.display = 'block';
        document.querySelectorAll('.section').forEach(s => {
            const id = s.id;
            if (id.includes('mirrors') || id.includes('reading') || id.includes('spell-journal') || id.includes('archive') || id.includes('braindump')) {
                s.style.display = 'block';
            } else {
                s.style.display = 'none';
            }
        });
        // Re-render journal sections
        renderMirrors();
        renderReading();
        renderSpells();
        renderBrainDump();
    } else if (view === 'reference') {
        alert('Reference databases coming in next update! Will include: Astrology, Color Magic, Deities, Divination, Energy Work, Meditation, Plants, Shadow Work');
    } else if (view === 'spells') {
        alert('Master Spell Database coming in next update! Full searchable catalog with categories, instructions, and sources.');
    } else if (view === 'unlock') {
        showUnlockFeatures();
    }
}

function showUnlockFeatures() {
    const data = getData();
    const unlocked = data.unlocked || [];

    let html = '<div style="padding: 20px; color: var(--white);">';
    html += '<div style="font-size: 16px; color: var(--yellow); font-weight: bold; margin-bottom: 20px;">AVAILABLE FEATURES</div>';

    for (const [id, info] of Object.entries(FEATURE_PRICING)) {
        const isUnlocked = unlocked.includes(id) || unlocked.includes('full-access');
        html += `
            <div style="background: var(--dkgray); border: 2px solid ${isUnlocked ? 'var(--green)' : 'var(--red)'}; padding: 15px; margin-bottom: 15px;">
                <div style="color: ${isUnlocked ? 'var(--ltgreen)' : 'var(--yellow)'}; font-weight: bold; margin-bottom: 5px;">
                    ${isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'} - ${info.name}
                </div>
                <div style="color: var(--ltgray); font-size: 11px; margin-bottom: 10px;">
                    ${getFeatureDescription(id)}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="color: var(--ltgreen); font-weight: bold;">${info.price}</div>
                    ${!isUnlocked ? `<button class="btn btn-small" onclick="showUnlockModal('${id}')">Unlock Now</button>` : '<div style="color: var(--ltgreen); font-size: 10px;">Active</div>'}
                </div>
            </div>
        `;
    }

    html += '</div>';

    document.getElementById('leftColumn').innerHTML = html;
    document.getElementById('rightColumn').style.display = 'none';
}

// DATA EXPORT/IMPORT
function exportData() {
    const data = getData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grimoire-backup-${Date.now()}.json`;
    a.click();
    document.getElementById('statusText').textContent = '✓ Data exported successfully';
    setTimeout(() => updateStatus(), 3000);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                localStorage.setItem('grimoire_data', JSON.stringify(data));
                location.reload();
            } catch (err) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// UTILITIES
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function updateStatus() {
    const data = getData();
    const unlocked = data.unlocked || [];
    const freeCount = 5;
    const premiumCount = 7;
    const unlockedCount = unlocked.includes('full-access') ? premiumCount : unlocked.length;

    document.getElementById('statusText').textContent =
        `Digital Grimoire Loaded | Free: ${freeCount} sections | Premium: ${unlockedCount}/${premiumCount} unlocked`;
}

// Add click handlers to locked sections
document.addEventListener('click', function(e) {
    const section = e.target.closest('.section.locked');
    if (section && !e.target.classList.contains('btn')) {
        const featureId = section.dataset.unlockId;
        if (featureId) {
            showUnlockModal(featureId);
        }
    }
});
