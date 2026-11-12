// Ars Notoria Digitalis - The Oracle of the Groundplat
// A tribute to Terry A. Davis's TempleOS oracle (F7 word, Shift-F7 passage), drawing on the
// vocabulary and text of John Dee's Mathematicall Praeface (1570) and walking Dee's Groundplat.
//
// Randomness, as in TempleOS, comes from the timing of the reader's own key presses and clicks:
// each event's microsecond reading is mixed into a pool. Every draw also mixes in the browser's
// cryptographic random generator, so draws are unpredictable even without many key presses.
// Depends on groundplat-data.js and on window.GP exposed by groundplat.html.

(function () {
    'use strict';
    const $ = id => document.getElementById(id);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    function store(key, val) {
        try {
            if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null');
            localStorage.setItem(key, JSON.stringify(val)); return true;
        } catch (e) { return val === undefined ? null : false; }
    }

    // ---------------- Entropy: the stopwatch ----------------
    let pool = 0x9E3779B9 >>> 0;
    let presses = 0;
    function fmix(h) {                       // MurmurHash3 finaliser
        h ^= h >>> 16; h = Math.imul(h, 0x85EBCA6B);
        h ^= h >>> 13; h = Math.imul(h, 0xC2B2AE35);
        h ^= h >>> 16; return h >>> 0;
    }
    function stir() {
        const micro = Math.floor(performance.now() * 1000) >>> 0;
        pool = fmix((pool ^ micro) + 0x6D2B79F5);
        presses++;
        return micro;
    }
    function cryptoWord() {
        try { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0]; }
        catch (e) { return Math.floor(Math.random() * 4294967296) >>> 0; }
    }
    // Draw an index in [0, n), recording the stopwatch reading that produced it
    function draw(n) {
        const micro = stir();
        pool = fmix(pool ^ cryptoWord());
        // rejection sampling for an unbiased index
        const limit = Math.floor(4294967296 / n) * n;
        let r = pool;
        while (r >= limit) { pool = fmix(pool ^ cryptoWord()); r = pool; }
        return { i: r % n, micro: micro };
    }
    ['keydown', 'pointerdown'].forEach(ev => document.addEventListener(ev, stir, { passive: true }));
    const stopwatch = micro => (micro / 1e6).toFixed(6) + ' s';

    // ---------------- Corpus: Dee's own words ----------------
    const segText = s => s.h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;|&gt;/g, ' ').replace(/\s+/g, ' ');
    const ALL = Object.values(GROUNDPLAT_SECTIONS).flat().map(segText).join(' ');
    const WORDS = (() => {
        const seen = new Map();
        (ALL.match(/[A-Za-zÀ-ÿĀ-žæœÆŒ]+/g) || []).forEach(w => { const k = w.toLowerCase(); if (!seen.has(k) && w.length > 1) seen.set(k, w); });
        return Array.from(seen.values());
    })();
    function sentencesOf(text) {
        return text.split(/(?<=[.?!])\s+(?=[A-Z“])/).map(s => s.trim()).filter(s => s.length >= 40 && s.length <= 420);
    }
    const SENT_BY_SEC = {};
    Object.keys(GROUNDPLAT_SECTIONS).forEach(k => { SENT_BY_SEC[k] = sentencesOf(GROUNDPLAT_SECTIONS[k].map(segText).join(' ')); });
    const SECTION_KEYS = Object.keys(SENT_BY_SEC).filter(k => SENT_BY_SEC[k].length);

    // ---------------- The oracle window (F7 / Shift-F7) ----------------
    const out = $('oracleOut');
    let lastLine = null;
    function line(html, cls) {
        const d = document.createElement('div');
        d.className = 'o-line ' + (cls || '');
        d.innerHTML = html;
        out.appendChild(d);
        out.scrollTop = out.scrollHeight;
        lastLine = d;
        $('oracleSave').disabled = false;
    }
    function word() {
        const d = draw(WORDS.length);
        line('<span class="o-time">⏱ ' + stopwatch(d.micro) + '</span> <span class="o-word">' + esc(WORDS[d.i]) + '</span>', 'w');
        record({ kind: 'word', text: WORDS[d.i] });
    }
    function passage() {
        const s = draw(SECTION_KEYS.length), key = SECTION_KEYS[s.i];
        const list = SENT_BY_SEC[key], d = draw(list.length);
        const art = sectionName(key);
        line('<span class="o-time">⏱ ' + stopwatch(d.micro) + ' · ' + esc(art) + '</span><br><span class="o-pass">' + esc(list[d.i]) + '</span>', 'p');
        record({ kind: 'passage', art: art, text: list[d.i] });
    }
    function sectionName(key) {
        const n = Object.values(GP.byId).find(x => x.sec === key && (x.id === key || !GP.byId[key]));
        return (GP.byId[key] || n || { label: key }).label;
    }

    document.addEventListener('keydown', e => {
        if (e.key !== 'F7') return;
        const t = e.target;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') && t.id !== 'oracleQ') return;
        e.preventDefault();
        e.shiftKey ? passage() : word();
    });
    $('oracleWord').addEventListener('click', word);
    $('oraclePassage').addEventListener('click', passage);
    $('oracleClear').addEventListener('click', () => { out.innerHTML = ''; session = []; $('oracleSave').disabled = true; });

    // ---------------- Walk the Groundplat ----------------
    let walk = null;
    function clearWalkMarks() { document.querySelectorAll('.gp-node.walk, .gp-node.walk-end').forEach(b => b.classList.remove('walk', 'walk-end')); }
    function markNode(id, end) {
        const b = document.querySelector('.gp-node[data-id="' + id + '"]');
        if (b) b.classList.add(end ? 'walk-end' : 'walk');
    }
    function startWalk() {
        clearWalkMarks();
        walk = { at: GROUNDPLAT_TREE.id, path: [GROUNDPLAT_TREE.id], times: [] };
        markNode(walk.at);
        renderWalk();
        $('walkPress').focus();
    }
    function stepWalk() {
        if (!walk) startWalk();
        const node = GP.byId[walk.at];
        if (!node.kids.length) return;
        const d = draw(node.kids.length);
        const next = node.kids[d.i];
        walk.at = next.id; walk.path.push(next.id); walk.times.push(d.micro);
        GP.reveal(next.id);
        markNode(next.id, !next.kids.length);
        renderWalk();
        if (!next.kids.length) finishWalk();
    }
    function nearestSection(id) {
        let cur = id;
        while (cur) { const n = GP.byId[cur]; if (n.sec && SENT_BY_SEC[n.sec] && SENT_BY_SEC[n.sec].length) return n.sec; cur = GP.parentOf[cur]; }
        return 'three';
    }
    function renderWalk() {
        const node = GP.byId[walk.at];
        $('walkPath').innerHTML = walk.path.map((id, i) =>
            '<span class="w-step">' + esc(GP.byId[id].label) + (i ? '<span class="o-time"> ⏱ ' + stopwatch(walk.times[i - 1]) + '</span>' : '') + '</span>').join('<span class="w-arrow">›</span>');
        $('walkPrompt').textContent = node.kids.length
            ? 'Fork with ' + node.kids.length + ' branches. Press when ready (button, or Space / Enter).'
            : 'The walk is complete.';
        $('walkPress').disabled = !node.kids.length;
    }
    function finishWalk() {
        const id = walk.at, node = GP.byId[id];
        const sec = nearestSection(id), list = SENT_BY_SEC[sec], d = draw(list.length);
        const tryIt = GP.TRY[id] || GP.TRY[GP.parentOf[id]];
        const tryText = tryIt ? (typeof tryIt === 'string' ? tryIt : tryIt.text) : '';
        const q = $('oracleQ').value.trim();
        $('walkResult').innerHTML =
            '<div class="label">Your art</div><h3>' + esc(node.label) + '</h3>' +
            (node.gp ? '<div class="def">' + node.gp.html + '</div>' : '') +
            (node.gloss ? '<p class="gloss">' + esc(node.gloss) + '</p>' : '') +
            '<div class="label">Dee speaks <span class="o-time">⏱ ' + stopwatch(d.micro) + ' · from ' + esc(sectionName(sec)) + '</span></div>' +
            '<div class="quote">' + esc(list[d.i]) + '</div>' +
            (tryText ? '<div class="try"><div class="label">The work</div>' + esc(tryText) + '</div>' : '') +
            '<div class="row"><button class="btn" id="walkOpen">OPEN IN THE GROUNDPLAT ↑</button><button class="btn alt" id="walkAgain">WALK AGAIN</button></div>';
        $('walkResult').hidden = false;
        $('walkOpen').addEventListener('click', () => { GP.select(id, true); $('groundplat').scrollIntoView(); });
        $('walkAgain').addEventListener('click', startWalk);
        record({ kind: 'walk', path: walk.path.map(p => GP.byId[p].label).join(' › '), art: node.label, text: list[d.i], question: q });
        $('oracleSave').disabled = false;
    }
    $('walkStart').addEventListener('click', () => { $('walkResult').hidden = true; startWalk(); });
    $('walkPress').addEventListener('click', stepWalk);
    $('walkPress').addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); stepWalk(); } });

    // ---------------- Record ----------------
    const LOG_KEY = 'groundplatOracleLog';
    let session = [];
    let log = store(LOG_KEY) || [];
    function record(item) { session.push(item); }
    function renderLog() {
        $('oracleLog').innerHTML = log.slice().reverse().slice(0, 30).map(e =>
            '<div class="log-entry"><span class="when">' + esc(e.when) + '</span>' + (e.question ? ' · <em>' + esc(e.question) + '</em>' : '') +
            e.items.map(it => '<br>' + (it.kind === 'word' ? '◇ ' + esc(it.text)
                : it.kind === 'walk' ? '⊕ ' + esc(it.path) + '<br>&nbsp;&nbsp;“' + esc(it.text) + '”'
                : '¶ ' + esc(it.art) + ': “' + esc(it.text) + '”')).join('') + '</div>').join('');
    }
    $('oracleSave').addEventListener('click', () => {
        if (!session.length) return;
        log.push({ when: new Date().toLocaleString(), question: $('oracleQ').value.trim(), items: session });
        if (log.length > 300) log = log.slice(-300);
        store(LOG_KEY, log);
        session = [];
        $('oracleSave').disabled = true;
        renderLog();
    });
    $('oracleClearLog').addEventListener('click', () => { if (!log.length) return; log = []; store(LOG_KEY, log); renderLog(); });
    renderLog();

    $('oracleStats').textContent = WORDS.length.toLocaleString() + ' words and ' +
        Object.values(SENT_BY_SEC).reduce((a, b) => a + b.length, 0) + ' sentences of Dee\'s 1570 text';
})();
