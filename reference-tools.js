// Ars Notoria Digitalis - Reference Library interactive tools
// Planetary hours, sky now, breath pacer, body scan, ground & shield,
// chakra figure, daily draw, shadow prompts.
// Depends on lunar.js (window.Lunar).

(function () {
    'use strict';

    const $ = id => document.getElementById(id);
    const SVGNS = 'http://www.w3.org/2000/svg';
    function svgEl(tag, attrs, parent) {
        const e = document.createElementNS(SVGNS, tag);
        for (const k in attrs) e.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(e);
        return e;
    }
    function store(key, val) {
        try {
            if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null');
            localStorage.setItem(key, JSON.stringify(val));
            return true;
        } catch (e) { return val === undefined ? null : false; }
    }
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const fmtTime = d => d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    // Soft bell using WebAudio (no files needed)
    let audioCtx = null;
    function bell(freq) {
        try {
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            const o = audioCtx.createOscillator(), g = audioCtx.createGain();
            o.type = 'sine';
            o.frequency.value = freq || 528;
            g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 0.02);
            g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);
            o.connect(g); g.connect(audioCtx.destination);
            o.start(); o.stop(audioCtx.currentTime + 2.6);
        } catch (e) { /* audio unavailable */ }
    }

    // =====================================================================
    // SUN: sunrise / sunset (NOAA solar calculator equations)
    // =====================================================================
    const RAD = Math.PI / 180, DEG = 180 / Math.PI;

    function solarEvent(date, lat, lon, rising) {
        // `date`: any time on the local calendar day of interest
        const y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
        const noonUTC = Date.UTC(y, m, d, 12, 0, 0) - lon / 360 * 86400000;
        let t = noonUTC;
        for (let i = 0; i < 3; i++) {
            const jd = t / 86400000 + 2440587.5;
            const T = (jd - 2451545) / 36525;
            const L0 = (280.46646 + T * (36000.76983 + 0.0003032 * T)) % 360;
            const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
            const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
            const C = Math.sin(M * RAD) * (1.914602 - T * (0.004817 + 0.000014 * T))
                + Math.sin(2 * M * RAD) * (0.019993 - 0.000101 * T) + Math.sin(3 * M * RAD) * 0.000289;
            const trueLong = L0 + C;
            const omega = 125.04 - 1934.136 * T;
            const lambda = trueLong - 0.00569 - 0.00478 * Math.sin(omega * RAD);
            const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
            const eps = eps0 + 0.00256 * Math.cos(omega * RAD);
            const decl = Math.asin(Math.sin(eps * RAD) * Math.sin(lambda * RAD));
            const yv = Math.tan(eps / 2 * RAD) ** 2;
            const eqTime = 4 * DEG * (yv * Math.sin(2 * L0 * RAD) - 2 * e * Math.sin(M * RAD)
                + 4 * e * yv * Math.sin(M * RAD) * Math.cos(2 * L0 * RAD)
                - 0.5 * yv * yv * Math.sin(4 * L0 * RAD) - 1.25 * e * e * Math.sin(2 * M * RAD));
            const cosH = (Math.cos(90.833 * RAD) - Math.sin(lat * RAD) * Math.sin(decl)) / (Math.cos(lat * RAD) * Math.cos(decl));
            if (cosH > 1 || cosH < -1) return null; // polar night or midnight sun
            const H = Math.acos(cosH) * DEG;
            const minutesUTC = 720 - 4 * (lon + (rising ? H : -H)) - eqTime;
            t = Date.UTC(y, m, d, 0, 0, 0) + minutesUTC * 60000;
        }
        return new Date(t);
    }

    // =====================================================================
    // PLANETARY HOURS
    // =====================================================================
    const CHALDEAN = [
        { sym: '♄', name: 'Saturn' }, { sym: '♃', name: 'Jupiter' }, { sym: '♂', name: 'Mars' },
        { sym: '☉', name: 'Sun' }, { sym: '♀', name: 'Venus' }, { sym: '☿', name: 'Mercury' }, { sym: '☽', name: 'Moon' }
    ];
    // Index into CHALDEAN of each weekday's ruler (Sunday = 0)
    const DAY_RULER = [3, 6, 2, 5, 1, 4, 0];
    const PLANET_USES = {
        Saturn: 'endings, binding, boundaries, long study',
        Jupiter: 'growth, prosperity, legal matters, higher learning',
        Mars: 'courage, protection, competition, cutting away',
        Sun: 'success, vitality, recognition, leadership',
        Venus: 'love, friendship, beauty, harmony',
        Mercury: 'study, writing, communication, exams, commerce',
        Moon: 'dreams, intuition, divination, the home'
    };

    function planetaryDay(now, lat, lon) {
        // The planetary day runs from sunrise to the next sunrise.
        let base = new Date(now);
        let rise = solarEvent(base, lat, lon, true);
        if (!rise) return null;
        if (now < rise) {
            base = new Date(now.getTime() - 86400000);
            rise = solarEvent(base, lat, lon, true);
        }
        const set = solarEvent(base, lat, lon, false);
        const nextRise = solarEvent(new Date(base.getTime() + 86400000), lat, lon, true);
        if (!rise || !set || !nextRise) return null;
        const ruler = DAY_RULER[base.getDay()];
        const dayLen = (set - rise) / 12, nightLen = (nextRise - set) / 12;
        const hours = [];
        for (let i = 0; i < 24; i++) {
            const start = i < 12 ? new Date(rise.getTime() + i * dayLen) : new Date(set.getTime() + (i - 12) * nightLen);
            const end = i < 12 ? new Date(rise.getTime() + (i + 1) * dayLen) : new Date(set.getTime() + (i - 11) * nightLen);
            hours.push({ n: i + 1, night: i >= 12, start: start, end: end, planet: CHALDEAN[(ruler + i) % 7] });
        }
        return { base: base, rise: rise, set: set, nextRise: nextRise, ruler: CHALDEAN[ruler], hours: hours, dayLen: dayLen, nightLen: nightLen };
    }

    const LOC_KEY = 'refPlanetaryLocation';
    const DEFAULT_LOC = { lat: 51.4682, lon: -0.2703, label: 'Mortlake, London (Dee\'s home)' };

    function initPlanetaryHours() {
        if (!$('phTable')) return;
        let loc = store(LOC_KEY) || DEFAULT_LOC;
        $('phLat').value = loc.lat;
        $('phLon').value = loc.lon;

        function render() {
            const lat = parseFloat($('phLat').value), lon = parseFloat($('phLon').value);
            if (isNaN(lat) || isNaN(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
                $('phSummary').textContent = 'Enter a valid latitude (−90 to 90) and longitude (−180 to 180).';
                return;
            }
            const now = new Date();
            const pd = planetaryDay(now, lat, lon);
            if (!pd) {
                $('phSummary').textContent = 'The Sun does not rise or set here today (polar day or night), so unequal hours cannot be reckoned.';
                $('phTable').innerHTML = '';
                return;
            }
            const cur = pd.hours.find(h => now >= h.start && now < h.end);
            $('phSummary').innerHTML =
                '<strong>Day of ' + pd.ruler.sym + ' ' + pd.ruler.name + '</strong> · sunrise ' + fmtTime(pd.rise) +
                ', sunset ' + fmtTime(pd.set) + ', next sunrise ' + fmtTime(pd.nextRise) + '<br>' +
                'Day hours last ' + Math.round(pd.dayLen / 60000) + ' min, night hours ' + Math.round(pd.nightLen / 60000) + ' min.' +
                (cur ? '<br><span class="ph-now">Now: hour ' + cur.n + ' (' + (cur.night ? 'night' : 'day') + '), ruled by ' +
                    cur.planet.sym + ' ' + cur.planet.name + ' until ' + fmtTime(cur.end) + '. Good for ' + PLANET_USES[cur.planet.name] + '.</span>' : '');
            $('phTable').innerHTML = '<tr><th>#</th><th>Begins</th><th>Ends</th><th>Ruler</th></tr>' + pd.hours.map(h =>
                '<tr class="' + (h === cur ? 'ph-current' : '') + (h.night ? ' ph-night' : '') + '"><td>' + (h.night ? '☾ ' : '☀ ') + (h.night ? h.n - 12 : h.n) +
                '</td><td>' + fmtTime(h.start) + '</td><td>' + fmtTime(h.end) + '</td><td>' + h.planet.sym + ' ' + h.planet.name + '</td></tr>').join('');
        }

        $('phSave').addEventListener('click', () => {
            loc = { lat: parseFloat($('phLat').value), lon: parseFloat($('phLon').value), label: 'Custom' };
            store(LOC_KEY, loc);
            $('phLocLabel').textContent = 'Saved location.';
            render();
        });
        $('phLocate').addEventListener('click', () => {
            if (!navigator.geolocation) { $('phLocLabel').textContent = 'Location is not available in this browser.'; return; }
            $('phLocLabel').textContent = 'Asking for your location…';
            navigator.geolocation.getCurrentPosition(p => {
                $('phLat').value = p.coords.latitude.toFixed(4);
                $('phLon').value = p.coords.longitude.toFixed(4);
                store(LOC_KEY, { lat: p.coords.latitude, lon: p.coords.longitude, label: 'Device location' });
                $('phLocLabel').textContent = 'Using your device location (stored only in this browser).';
                render();
            }, () => { $('phLocLabel').textContent = 'Location was not shared. Enter it by hand.'; });
        });
        $('phLocLabel').textContent = loc.label === DEFAULT_LOC.label ? 'Default: ' + DEFAULT_LOC.label : '';
        render();
        setInterval(render, 60000);
    }

    // =====================================================================
    // SKY NOW
    // =====================================================================
    const ZODIAC = ['♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer', '♌ Leo', '♍ Virgo', '♎ Libra', '♏ Scorpio', '♐ Sagittarius', '♑ Capricorn', '♒ Aquarius', '♓ Pisces'];
    function sunLongitude(date) {
        const jd = date.getTime() / 86400000 + 2440587.5;
        const T = (jd - 2451545) / 36525;
        const L0 = 280.46646 + 36000.76983 * T;
        const M = (357.52911 + 35999.05029 * T) * RAD;
        const C = (1.914602 - 0.004817 * T) * Math.sin(M) + 0.019993 * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
        return ((L0 + C) % 360 + 360) % 360;
    }
    function initSkyNow() {
        if (!$('skyNow') || !window.Lunar) return;
        const now = new Date();
        const lun = Lunar.lunation(now);
        const lon = sunLongitude(now);
        const ruler = CHALDEAN[DAY_RULER[now.getDay()]];
        $('skyNow').innerHTML =
            '<div><span class="sky-k">Sun</span> ' + ZODIAC[Math.floor(lon / 30)] + ' ' + Math.floor(lon % 30) + '°</div>' +
            '<div><span class="sky-k">Moon</span> ' + Lunar.phaseName(lun.age) + ', day ' + lun.day + ' (' + Math.round(lun.illumination * 100) + '% lit)</div>' +
            '<div><span class="sky-k">Calendar day</span> ' + now.toLocaleDateString(undefined, { weekday: 'long' }) + ' (' + ruler.sym + ' ' + ruler.name + '). The planetary day turns over at sunrise.</div>' +
            '<div><span class="sky-k">Next new moon</span> ' + lun.nextNewMoon.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + '</div>';
    }

    // =====================================================================
    // BREATH PACER
    // =====================================================================
    const PATTERNS = {
        calm: { name: 'Calm (in 4, out 6)', steps: [['Inhale', 4], ['Exhale', 6]] },
        box: { name: 'Box (4 · 4 · 4 · 4)', steps: [['Inhale', 4], ['Hold', 4], ['Exhale', 4], ['Hold', 4]] },
        coherent: { name: 'Even (5.5 in, 5.5 out)', steps: [['Inhale', 5.5], ['Exhale', 5.5]] },
        relax: { name: '4 · 7 · 8', steps: [['Inhale', 4], ['Hold', 7], ['Exhale', 8]] }
    };
    function initBreath() {
        const orb = $('breathOrb');
        if (!orb) return;
        const sel = $('breathPattern');
        Object.keys(PATTERNS).forEach(k => {
            const o = document.createElement('option'); o.value = k; o.textContent = PATTERNS[k].name; sel.appendChild(o);
        });
        let timer = null, endAt = 0, step = 0, breaths = 0, tick = null;

        function stop(done) {
            clearTimeout(timer); clearInterval(tick); timer = null;
            orb.style.transition = 'transform 1.5s ease';
            orb.style.transform = 'scale(0.55)';
            $('breathCue').textContent = done ? 'Done. Sit for a moment before you get up.' : 'Ready';
            $('breathStart').textContent = '▶ BEGIN';
            if (done) bell(396);
        }
        function next() {
            const p = PATTERNS[sel.value];
            if (Date.now() >= endAt && step === 0) { stop(true); return; }
            const [cue, secs] = p.steps[step];
            $('breathCue').textContent = cue + '…';
            orb.style.transition = 'transform ' + secs + 's ' + (cue === 'Hold' ? 'linear' : 'ease-in-out');
            if (cue === 'Inhale') orb.style.transform = 'scale(1)';
            if (cue === 'Exhale') orb.style.transform = 'scale(0.55)';
            orb.dataset.phase = cue.toLowerCase();
            step = (step + 1) % p.steps.length;
            if (step === 0) breaths++;
            $('breathCount').textContent = breaths + ' breaths';
            timer = setTimeout(next, secs * 1000);
        }
        $('breathStart').addEventListener('click', () => {
            if (timer) { stop(false); return; }
            endAt = Date.now() + parseFloat($('breathMinutes').value) * 60000;
            step = 0; breaths = 0;
            $('breathStart').textContent = '■ STOP';
            bell(528);
            tick = setInterval(() => {
                const left = Math.max(0, endAt - Date.now());
                $('breathLeft').textContent = Math.floor(left / 60000) + ':' + String(Math.floor(left / 1000) % 60).padStart(2, '0') + ' left';
            }, 250);
            next();
        });
        orb.style.transform = 'scale(0.55)';
    }

    // =====================================================================
    // BODY SCAN
    // =====================================================================
    const SCAN = [
        ['head', 'Crown and scalp', 'Notice the top of your head. Is there warmth, tingling, pressure, or nothing at all? All of these are fine.'],
        ['face', 'Face and jaw', 'Forehead, eyes, cheeks. Let the jaw hang slightly open and the tongue rest.'],
        ['neck', 'Neck and shoulders', 'Shoulders often hold the day. Notice them, and let them drop a little if they want to.'],
        ['arms', 'Arms', 'Upper arms, elbows, forearms. Feel their weight resting.'],
        ['hands', 'Hands', 'Palms, fingers, fingertips. You may feel your pulse here.'],
        ['chest', 'Chest', 'The rise and fall of breathing. You don\'t need to change it.'],
        ['belly', 'Belly', 'Let the belly be soft. Notice any tightness without fixing it.'],
        ['hips', 'Hips and pelvis', 'Feel where the body meets the chair or the floor.'],
        ['legs', 'Legs', 'Thighs, knees, calves: their length and weight.'],
        ['feet', 'Feet', 'Heels, soles, toes. Feel the ground under you.'],
        ['all', 'The whole body', 'Now take in the whole body at once, breathing as one field of sensation.']
    ];
    function initBodyScan() {
        const fig = $('scanFigure');
        if (!fig) return;
        let idx = -1, timer = null;
        function show(i) {
            idx = i;
            const [id, title, text] = SCAN[i];
            fig.querySelectorAll('[data-part]').forEach(p => {
                p.classList.toggle('lit', id === 'all' || p.dataset.part === id);
            });
            $('scanTitle').textContent = (i + 1) + ' / ' + SCAN.length + ' · ' + title;
            $('scanText').textContent = text;
            $('scanPrev').disabled = i <= 0;
            $('scanNext').disabled = i >= SCAN.length - 1;
        }
        function auto() {
            clearTimeout(timer);
            if (!$('scanAuto').checked) return;
            timer = setTimeout(() => {
                if (idx < SCAN.length - 1) { show(idx + 1); bell(440); auto(); } else { bell(396); }
            }, parseInt($('scanSecs').value, 10) * 1000);
        }
        $('scanStart').addEventListener('click', () => { show(0); bell(528); auto(); });
        $('scanNext').addEventListener('click', () => { if (idx < SCAN.length - 1) { show(idx + 1); auto(); } });
        $('scanPrev').addEventListener('click', () => { if (idx > 0) { show(idx - 1); auto(); } });
        $('scanAuto').addEventListener('change', auto);
    }

    // =====================================================================
    // GROUND & SHIELD
    // =====================================================================
    const GS = [
        { show: ['figure'], title: 'Settle', text: 'Sit or stand with your feet flat on the floor. Let your breathing slow. Feel your weight.' },
        { show: ['figure', 'roots'], draw: 'roots', title: 'Roots', text: 'Imagine roots growing down from the soles of your feet, through the floor, deep into the earth.' },
        { show: ['figure', 'roots', 'down'], draw: 'down', title: 'Release', text: 'Let excess, scattered or anxious energy drain down the roots into the earth, which can hold it.' },
        { show: ['figure', 'roots', 'up'], draw: 'up', title: 'Draw up', text: 'Draw steady, cool earth energy back up the roots, into your legs and the base of your spine.' },
        { show: ['figure', 'roots', 'branches'], draw: 'branches', title: 'Branches', text: 'Let branches open from the crown of your head toward the sky. You are connected above and below.' },
        { show: ['figure', 'roots', 'branches', 'core'], title: 'Core light', text: 'Find a point of white light at the center of your chest. Let it brighten with each breath.' },
        { show: ['figure', 'roots', 'branches', 'core', 'sphere'], grow: true, title: 'Sphere', text: 'Let the light expand outward in every direction until it forms a sphere about an arm\'s length around you.' },
        { show: ['figure', 'roots', 'branches', 'core', 'sphere'], title: 'Intention', text: 'Set your intention in your own words, for example: "This shield keeps me clear and protected." Feel the boundary hold.' },
        { show: ['figure', 'roots'], title: 'Close', text: 'Let the branches fold back. Keep the roots and the sphere at the edge of awareness. Wiggle your fingers and toes, then open your eyes.' }
    ];
    function initGroundShield() {
        const svg = $('gsFigure');
        if (!svg) return;
        let i = -1;
        function drawIn(group) {
            svg.querySelectorAll('[data-g="' + group + '"] path').forEach((p, k) => {
                const len = Math.ceil(p.getTotalLength());
                p.style.transition = 'none';
                p.style.strokeDasharray = len;
                p.style.strokeDashoffset = len;
                p.getBoundingClientRect();
                p.style.transition = 'stroke-dashoffset 2.4s ease ' + (k * 120) + 'ms';
                p.style.strokeDashoffset = 0;
            });
        }
        function show(n) {
            i = n;
            const s = GS[n];
            svg.querySelectorAll('[data-g]').forEach(g => g.classList.toggle('on', s.show.includes(g.dataset.g)));
            if (s.draw) drawIn(s.draw);
            const sphere = svg.querySelector('#gsSphere');
            if (s.grow) {
                sphere.style.transition = 'none'; sphere.setAttribute('r', 8);
                sphere.getBoundingClientRect();
                sphere.style.transition = 'r 3s ease';
                requestAnimationFrame(() => sphere.setAttribute('r', 120));
            } else if (s.show.includes('sphere')) {
                sphere.setAttribute('r', 120);
            }
            $('gsTitle').textContent = (n + 1) + ' / ' + GS.length + ' · ' + s.title;
            $('gsText').textContent = s.text;
            $('gsPrev').disabled = n <= 0;
            $('gsNext').disabled = n >= GS.length - 1;
        }
        $('gsNext').addEventListener('click', () => show(Math.min(GS.length - 1, i + 1)));
        $('gsPrev').addEventListener('click', () => show(Math.max(0, i - 1)));
        show(0);
    }

    // =====================================================================
    // CHAKRA FIGURE
    // =====================================================================
    const CHAKRAS = [
        { y: 296, name: 'Root (Muladhara)', place: 'Base of spine', color: '#FF5555', mantra: 'LAM', kw: 'Survival, grounding, stability, security' },
        { y: 256, name: 'Sacral (Svadhisthana)', place: 'Below navel', color: '#FFAA33', mantra: 'VAM', kw: 'Creativity, sexuality, pleasure, emotions' },
        { y: 216, name: 'Solar Plexus (Manipura)', place: 'Stomach', color: '#FFFF55', mantra: 'RAM', kw: 'Power, confidence, willpower, identity' },
        { y: 174, name: 'Heart (Anahata)', place: 'Center of chest', color: '#55FF55', mantra: 'YAM', kw: 'Love, compassion, forgiveness, connection' },
        { y: 125, name: 'Throat (Vishuddha)', place: 'Throat', color: '#55AAFF', mantra: 'HAM', kw: 'Communication, truth, expression, sound' },
        { y: 86, name: 'Third Eye (Ajna)', place: 'Forehead', color: '#7755FF', mantra: 'OM', kw: 'Intuition, vision, wisdom, psychic ability' },
        { y: 56, name: 'Crown (Sahasrara)', place: 'Top of head', color: '#DD99FF', mantra: 'Silence / OM', kw: 'Connection to divine, consciousness, unity' }
    ];
    function initChakras() {
        const svg = $('chakraFigure');
        if (!svg) return;
        const nodes = [];
        CHAKRAS.forEach((c, i) => {
            const g = svgEl('g', { class: 'chakra-node', tabindex: 0, role: 'button', 'aria-label': c.name }, svg);
            svgEl('circle', { cx: 110, cy: c.y, r: 13, fill: c.color, opacity: 0.35 }, g);
            svgEl('circle', { cx: 110, cy: c.y, r: 6, fill: c.color }, g);
            g.addEventListener('click', () => pick(i));
            g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i); } });
            nodes.push(g);
        });
        function pick(i) {
            const c = CHAKRAS[i];
            nodes.forEach((n, j) => n.classList.toggle('active', i === j));
            $('chakraInfo').innerHTML = '<h3 style="margin-top:0;color:' + c.color + '">' + c.name + '</h3>' +
                '<p><strong>Location:</strong> ' + c.place + '<br><strong>Keywords:</strong> ' + c.kw + '<br><strong>Seed mantra:</strong> ' + c.mantra + '</p>' +
                '<p><strong>Try:</strong> rest your attention here for five slow breaths, and on each out-breath sound the seed syllable softly (' + c.mantra + '). Then move to the next center.</p>';
        }
        let run = null;
        $('chakraWalk').addEventListener('click', () => {
            if (run) { clearInterval(run); run = null; $('chakraWalk').textContent = '▶ WALK THE CENTERS'; return; }
            let i = 0; pick(0); bell(256);
            $('chakraWalk').textContent = '■ STOP';
            run = setInterval(() => {
                i++;
                if (i >= CHAKRAS.length) { clearInterval(run); run = null; $('chakraWalk').textContent = '▶ WALK THE CENTERS'; bell(396); return; }
                pick(i); bell(256 * Math.pow(2, i / 7));
            }, parseInt($('chakraSecs').value, 10) * 1000);
        });
        pick(0);
    }

    // =====================================================================
    // DAILY DRAW
    // =====================================================================
    const MAJORS = [
        ['0', 'The Fool', 'New beginnings, innocence, spontaneity, leap of faith'],
        ['I', 'The Magician', 'Manifestation, power, skill, concentration, action'],
        ['II', 'The High Priestess', 'Intuition, sacred knowledge, divine feminine, subconscious'],
        ['III', 'The Empress', 'Fertility, abundance, nature, motherhood, creativity'],
        ['IV', 'The Emperor', 'Authority, structure, control, fatherhood, leadership'],
        ['V', 'The Hierophant', 'Tradition, conformity, education, belief systems'],
        ['VI', 'The Lovers', 'Love, union, choices, values, relationships'],
        ['VII', 'The Chariot', 'Control, willpower, victory, determination, action'],
        ['VIII', 'Strength', 'Courage, inner strength, patience, compassion'],
        ['IX', 'The Hermit', 'Soul searching, introspection, inner guidance, withdrawal'],
        ['X', 'Wheel of Fortune', 'Fate, karma, life cycles, turning point, luck'],
        ['XI', 'Justice', 'Fairness, truth, law, cause and effect'],
        ['XII', 'The Hanged Man', 'Suspension, letting go, sacrifice, new perspective'],
        ['XIII', 'Death', 'Endings, transformation, transition, release'],
        ['XIV', 'Temperance', 'Balance, moderation, patience, purpose, alchemy'],
        ['XV', 'The Devil', 'Bondage, addiction, materialism, playfulness, shadow'],
        ['XVI', 'The Tower', 'Sudden change, upheaval, revelation, awakening'],
        ['XVII', 'The Star', 'Hope, faith, renewal, spirituality, healing'],
        ['XVIII', 'The Moon', 'Illusion, intuition, anxiety, subconscious, dreams'],
        ['XIX', 'The Sun', 'Success, vitality, confidence, joy, positivity'],
        ['XX', 'Judgement', 'Reflection, reckoning, awakening, rebirth'],
        ['XXI', 'The World', 'Completion, accomplishment, travel, fulfillment']
    ];
    const RUNES = [
        ['ᚠ', 'Fehu', 'cattle, wealth', 'Wealth, abundance, fulfillment'],
        ['ᚢ', 'Uruz', 'aurochs', 'Strength, vitality, primal power'],
        ['ᚦ', 'Thurisaz', 'giant (thurs)', 'Protection, conflict, breakthrough'],
        ['ᚨ', 'Ansuz', 'a god (of the Æsir)', 'Communication, wisdom, divine messages'],
        ['ᚱ', 'Raidho', 'riding, journey', 'Journey, travel, movement'],
        ['ᚲ', 'Kenaz', 'torch (or sore)', 'Knowledge, creativity, illumination'],
        ['ᚷ', 'Gebo', 'gift', 'Gift, partnership, exchange'],
        ['ᚹ', 'Wunjo', 'joy', 'Joy, harmony, success'],
        ['ᚺ', 'Hagalaz', 'hail', 'Disruption, uncontrolled forces, testing'],
        ['ᚾ', 'Nauthiz', 'need', 'Constraint, necessity, endurance'],
        ['ᛁ', 'Isa', 'ice', 'Stillness, pause, standstill'],
        ['ᛃ', 'Jera', 'year, harvest', 'Reward for effort, cycles, good timing'],
        ['ᛇ', 'Eihwaz', 'yew', 'Endurance, defence, steadfastness'],
        ['ᛈ', 'Perthro', 'uncertain (perhaps a lot-cup)', 'Chance, mystery, the unknown'],
        ['ᛉ', 'Algiz', 'elk (or protection)', 'Protection, warding, higher self'],
        ['ᛊ', 'Sowilo', 'sun', 'Success, wholeness, guidance'],
        ['ᛏ', 'Tiwaz', 'the god Tyr', 'Justice, honour, sacrifice'],
        ['ᛒ', 'Berkano', 'birch', 'Growth, birth, renewal'],
        ['ᛖ', 'Ehwaz', 'horse', 'Partnership, trust, movement'],
        ['ᛗ', 'Mannaz', 'man, humankind', 'Self, community, humanity'],
        ['ᛚ', 'Laguz', 'water, lake', 'Flow, intuition, the unconscious'],
        ['ᛜ', 'Ingwaz', 'the god Ing', 'Potential, gestation, completion'],
        ['ᛞ', 'Dagaz', 'day', 'Breakthrough, awakening, dawn'],
        ['ᛟ', 'Othala', 'inherited land', 'Heritage, home, ancestry']
    ];
    const DRAW_KEY = 'refDailyDraws';
    function randomIndex(n) {
        try {
            const a = new Uint32Array(1);
            crypto.getRandomValues(a);
            return a[0] % n;
        } catch (e) { return Math.floor(Math.random() * n); }
    }
    function initDraw() {
        const card = $('drawCard');
        if (!card) return;
        let log = store(DRAW_KEY) || [];
        function renderLog() {
            $('drawLog').innerHTML = log.slice(-7).reverse().map(e =>
                '<div class="draw-log-entry"><span>' + esc(e.date) + '</span> ' + esc(e.glyph) + ' ' + esc(e.name) + (e.note ? ': <em>' + esc(e.note) + '</em>' : '') + '</div>').join('');
        }
        function draw() {
            const deck = $('drawDeck').value;
            card.classList.remove('flip');
            card.getBoundingClientRect();
            let glyph, name, sub, kw;
            if (deck === 'runes') {
                const r = RUNES[randomIndex(RUNES.length)];
                glyph = r[0]; name = r[1]; sub = 'Name means: ' + r[2]; kw = r[3];
            } else {
                const m = MAJORS[randomIndex(MAJORS.length)];
                glyph = m[0]; name = m[1]; sub = 'Major Arcana ' + m[0]; kw = m[2];
            }
            $('drawGlyph').textContent = glyph;
            $('drawName').textContent = name;
            $('drawSub').textContent = sub;
            $('drawKw').textContent = kw;
            $('drawNote').value = '';
            card.dataset.name = name;
            card.dataset.glyph = glyph;
            card.classList.add('flip');
            $('drawSave').disabled = false;
        }
        $('drawBtn').addEventListener('click', draw);
        $('drawSave').addEventListener('click', () => {
            log.push({ date: new Date().toLocaleDateString(), name: card.dataset.name, glyph: card.dataset.glyph, note: $('drawNote').value });
            if (log.length > 200) log = log.slice(-200);
            store(DRAW_KEY, log);
            $('drawSave').disabled = true;
            renderLog();
        });
        renderLog();
    }

    // =====================================================================
    // SHADOW PROMPTS
    // =====================================================================
    const PROMPTS = [
        'What do I judge most harshly in others?',
        'What would I do if no one was watching?',
        'What parts of myself do I hide from others?',
        'What am I most ashamed of?',
        'What do I secretly want but won\'t admit?',
        'If I had no fear, I would…',
        'The parts of me I\'ve buried are…',
        'What would my "dark side" say to me right now?'
    ];
    const SHADOW_KEY = 'refShadowAnswers';
    function initShadow() {
        if (!$('shPrompt')) return;
        let answers = store(SHADOW_KEY) || {};
        let i = 0;
        function show(n) {
            i = n;
            $('shPrompt').textContent = PROMPTS[n];
            $('shCount').textContent = 'Prompt ' + (n + 1) + ' of ' + PROMPTS.length;
            $('shAnswer').value = answers[n] || '';
            $('shPrev').disabled = n === 0;
            $('shNext').textContent = n === PROMPTS.length - 1 ? 'FINISH ✓' : 'NEXT ►';
        }
        function keep() {
            answers[i] = $('shAnswer').value;
            store(SHADOW_KEY, answers);
        }
        $('shNext').addEventListener('click', () => {
            keep();
            if (i < PROMPTS.length - 1) show(i + 1);
            else $('shStatus').textContent = 'Saved in this browser. Now ground yourself: feet on the floor, three slow breaths, a glass of water.';
        });
        $('shPrev').addEventListener('click', () => { keep(); if (i > 0) show(i - 1); });
        $('shClear').addEventListener('click', () => {
            answers = {}; store(SHADOW_KEY, answers); show(0);
            $('shStatus').textContent = 'Answers cleared.';
        });
        show(0);
    }

    // =====================================================================
    // SECTION NAVIGATION (with #hash deep links)
    // =====================================================================
    function showSection(id, pill) {
        const target = document.getElementById(id);
        if (!target || !target.classList.contains('section')) return;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-pill').forEach(p => {
            p.classList.toggle('active', pill ? p === pill : p.getAttribute('onclick') === "showSection('" + id + "')");
        });
        target.classList.add('active');
        if (history.replaceState) history.replaceState(null, '', '#' + id);
        window.scrollTo(0, 0);
    }
    window.showSection = function (id) {
        const ev = window.event;
        showSection(id, ev && ev.target && ev.target.classList && ev.target.classList.contains('nav-pill') ? ev.target : null);
    };

    function init() {
        const hash = decodeURIComponent((location.hash || '').slice(1));
        const el = hash && document.getElementById(hash);
        if (el) {
            const sec = el.classList.contains('section') ? el : el.closest('.section');
            if (sec) showSection(sec.id);
            if (el !== sec) setTimeout(() => el.scrollIntoView(), 0);
        }
        [initSkyNow, initPlanetaryHours, initBreath, initBodyScan, initGroundShield, initChakras, initDraw, initShadow]
            .forEach(fn => { try { fn(); } catch (e) { console.error(fn.name, e); } });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
