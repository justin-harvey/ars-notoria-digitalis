// Ars Notoria Digitalis - shared "WORKS" menu
// Adds one WORKS button to the titlebar of every page, with links to all the practice pages,
// and makes the titlebar wrap on phones instead of running off the screen.
// To add a page to the menu, add it to WORKS below; every page picks it up.

(function () {
    'use strict';

    const WORKS = [
        { group: 'The Notory Art of Solomon', items: [
            { href: 'index.html', icon: '✦', name: 'Notes of the Art', desc: 'The figures and orations, from Turner (1657)' },
            { href: 'ars-notoria-practice.html', icon: '☾', name: 'Practice of the Notory Art', desc: 'Moon calendar, guided session, inspection' }
        ] },
        { group: 'John Dee', items: [
            { href: 'monas-hieroglyphica.html', icon: '☿', name: 'Monas Hieroglyphica', desc: 'Build the Hieroglyphic Monad (1564)' },
            { href: 'dee-prayers.html', icon: '✠', name: 'The Prayers of John Dee', desc: 'His prayer for wisdom, as a daily office' },
            { href: 'groundplat.html', icon: '⊕', name: 'The Groundplat', desc: 'His map of the mathematical arts (1570)' },
            { href: 'groundplat.html#oracle', icon: '◇', name: 'Oracle of the Groundplat', desc: 'A TempleOS tribute: F7 word, Shift-F7 passage' }
        ] },
        { group: 'Tools', items: [
            { href: 'grimoire.html', icon: '📖', name: 'Digital Grimoire', desc: 'Journals, moon phase, divination log' },
            { href: 'reference.html', icon: '☉', name: 'Reference Library', desc: 'Planetary hours, meditation, correspondences' }
        ] }
    ];

    const CSS = `
    .works-wrap { position: relative; display: inline-block; }
    .works-btn { cursor: pointer; }
    .works-btn[aria-expanded="true"] { background: #FFFF55 !important; color: #000 !important; }
    .works-menu {
        position: absolute; top: calc(100% + 6px); right: 0; z-index: 1000; width: 330px; max-height: 75vh; overflow-y: auto;
        background: #000; border: 2px solid #55FFFF; box-shadow: 4px 4px 0 #0000AA; font-family: 'Courier New', monospace; text-align: left;
    }
    .works-menu[hidden] { display: none; }
    .works-group { color: #FFFF55; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 8px 12px 3px; border-top: 1px solid #333; }
    .works-group:first-child { border-top: none; }
    .works-item { display: flex; gap: 10px; align-items: flex-start; padding: 7px 12px; color: #FFFFFF; text-decoration: none; }
    .works-item:hover, .works-item:focus { background: #0000AA; outline: none; color: #FFFFFF; text-decoration: none; }
    .works-item.current { border-left: 3px solid #FFFF55; padding-left: 9px; }
    .works-icon { width: 18px; text-align: center; color: #55FFFF; flex: none; }
    .works-name { font-size: 12px; font-weight: bold; display: block; }
    .works-desc { font-size: 10px; color: #AAAAAA; display: block; line-height: 1.35; }
    @media (max-width: 700px) {
        .titlebar { flex-wrap: wrap; gap: 6px; height: auto !important; }
        .titlebar-title { flex: 1 1 100%; font-size: 12px !important; line-height: 1.3; }
        .titlebar-buttons { flex-wrap: wrap; gap: 6px !important; }
        .titlebar .titlebar-btn { padding: 6px 10px !important; font-size: 11px !important; }
        .works-wrap { position: static; }
        .works-menu { position: fixed; left: 8px; right: 8px; top: auto; width: auto; max-height: 70vh; }
        .works-item { padding: 10px 12px; }
        .works-name { font-size: 13px; }
        .works-desc { font-size: 11px; }
    }`;

    function here() {
        const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        return { file: file, hash: location.hash };
    }

    function build() {
        const bar = document.querySelector('.titlebar');
        if (!bar || bar.querySelector('.works-wrap')) return;

        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        const wrap = document.createElement('span');
        wrap.className = 'works-wrap';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'titlebar-btn works-btn';
        btn.textContent = '☰ WORKS ▾';
        btn.setAttribute('aria-haspopup', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'worksMenu');

        const menu = document.createElement('nav');
        menu.className = 'works-menu';
        menu.id = 'worksMenu';
        menu.setAttribute('aria-label', 'All works');
        menu.hidden = true;
        const cur = here();
        menu.innerHTML = WORKS.map(g =>
            '<div class="works-group">' + g.group + '</div>' + g.items.map(it => {
                const [file, hash] = it.href.split('#');
                const isCur = file === cur.file && (hash ? cur.hash === '#' + hash : !WORKS.some(gg => gg.items.some(o => o !== it && o.href.startsWith(file + '#') && cur.hash === '#' + o.href.split('#')[1])));
                return '<a class="works-item' + (isCur ? ' current' : '') + '" href="' + it.href + '"' + (isCur ? ' aria-current="page"' : '') + '>' +
                    '<span class="works-icon">' + it.icon + '</span><span><span class="works-name">' + it.name + '</span>' +
                    '<span class="works-desc">' + it.desc + '</span></span></a>';
            }).join('')).join('');

        wrap.appendChild(btn);
        wrap.appendChild(menu);

        // Put it first among the titlebar's buttons
        const group = bar.querySelector('.titlebar-buttons');
        if (group) {
            group.insertBefore(wrap, group.firstChild);
        } else {
            const holder = document.createElement('div');
            holder.className = 'titlebar-buttons';
            holder.style.cssText = 'display:flex;gap:6px;align-items:center';
            Array.from(bar.children).filter(c => c.classList.contains('titlebar-btn')).forEach(c => holder.appendChild(c));
            holder.insertBefore(wrap, holder.firstChild);
            bar.appendChild(holder);
        }

        function position() {
            if (window.matchMedia('(max-width: 700px)').matches) {
                menu.style.top = Math.round(bar.getBoundingClientRect().bottom + 4) + 'px';
            } else {
                menu.style.top = '';
            }
        }
        function open() {
            position();
            menu.hidden = false;
            btn.setAttribute('aria-expanded', 'true');
            const first = menu.querySelector('.works-item.current') || menu.querySelector('.works-item');
            if (first) first.focus({ preventScroll: true });
        }
        function close(refocus) {
            if (menu.hidden) return;
            menu.hidden = true;
            btn.setAttribute('aria-expanded', 'false');
            if (refocus) btn.focus();
        }
        btn.addEventListener('click', e => { e.stopPropagation(); menu.hidden ? open() : close(false); });
        document.addEventListener('click', e => { if (!wrap.contains(e.target)) close(false); });
        document.addEventListener('keydown', e => {
            if (menu.hidden) return;
            const items = Array.from(menu.querySelectorAll('.works-item'));
            const i = items.indexOf(document.activeElement);
            if (e.key === 'Escape') { e.preventDefault(); close(true); }
            else if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
            else if (e.key === 'Tab' && !menu.contains(document.activeElement)) close(false);
        });
        menu.addEventListener('focusout', e => { if (!wrap.contains(e.relatedTarget)) close(false); });
        window.addEventListener('resize', () => { if (!menu.hidden) position(); });
        // Same-page links (e.g. the Oracle on the Groundplat page): close the menu after jumping
        menu.addEventListener('click', e => { if (e.target.closest('.works-item')) setTimeout(() => close(false), 0); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();
})();
