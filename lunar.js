// Ars Notoria Digitalis - Lunar calculations
// True new-moon times after Jean Meeus, "Astronomical Algorithms" (2nd ed.), ch. 49.
// Accurate to within a few minutes for dates between 1900 and 2100.
//
// Convention: the "day of the Moon" (lunation day) counts from the moment of the
// astronomical new moon. Day 1 is the first 24 hours after it, day 2 the next, and so on
// up to day 29 or 30. Medieval reckoning often started from first sight of the crescent,
// which could be a day or two later.

(function (global) {
    'use strict';

    const RAD = Math.PI / 180;
    const SYNODIC = 29.530588861;

    function jdeNewMoon(k) {
        const T = k / 1236.85;
        const T2 = T * T, T3 = T2 * T, T4 = T3 * T;
        let jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T2
            - 0.000000150 * T3 + 0.00000000073 * T4;
        const E = 1 - 0.002516 * T - 0.0000074 * T2;
        const M = (2.5534 + 29.10535670 * k - 0.0000014 * T2 - 0.00000011 * T3) * RAD;
        const Mp = (201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3
            - 0.000000058 * T4) * RAD;
        const F = (160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3
            + 0.000000011 * T4) * RAD;
        const Om = (124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3) * RAD;

        jde += -0.40720 * Math.sin(Mp)
            + 0.17241 * E * Math.sin(M)
            + 0.01608 * Math.sin(2 * Mp)
            + 0.01039 * Math.sin(2 * F)
            + 0.00739 * E * Math.sin(Mp - M)
            - 0.00514 * E * Math.sin(Mp + M)
            + 0.00208 * E * E * Math.sin(2 * M)
            - 0.00111 * Math.sin(Mp - 2 * F)
            - 0.00057 * Math.sin(Mp + 2 * F)
            + 0.00056 * E * Math.sin(2 * Mp + M)
            - 0.00042 * Math.sin(3 * Mp)
            + 0.00042 * E * Math.sin(M + 2 * F)
            + 0.00038 * E * Math.sin(M - 2 * F)
            - 0.00024 * E * Math.sin(2 * Mp - M)
            - 0.00017 * Math.sin(Om)
            - 0.00007 * Math.sin(Mp + 2 * M);

        // Planetary arguments
        const A = [
            299.77 + 0.107408 * k - 0.009173 * T2,
            251.88 + 0.016321 * k, 251.83 + 26.651886 * k, 349.42 + 36.412478 * k,
            84.66 + 18.206239 * k, 141.74 + 53.303771 * k, 207.14 + 2.453732 * k,
            154.84 + 7.306860 * k, 34.52 + 27.261239 * k, 207.19 + 0.121824 * k,
            291.34 + 1.844379 * k, 161.72 + 24.198154 * k, 239.56 + 25.513099 * k,
            331.55 + 3.592518 * k
        ];
        const C = [325, 165, 164, 126, 110, 62, 60, 56, 47, 42, 40, 37, 35, 23];
        for (let i = 0; i < A.length; i++) jde += C[i] * 1e-6 * Math.sin(A[i] * RAD);
        return jde;
    }

    function jdToDate(jd) {
        // JDE is Terrestrial Time; the ~70 s offset from UTC is negligible here.
        return new Date((jd - 2440587.5) * 86400000);
    }

    function dateToK(date) {
        const year = date.getUTCFullYear() + (date.getUTCMonth() + 0.5) / 12;
        return Math.floor((year - 2000) * 12.3685);
    }

    // Most recent true new moon at or before `date`.
    function previousNewMoon(date) {
        let k = dateToK(date) + 1;
        let nm = jdToDate(jdeNewMoon(k));
        while (nm > date) { k -= 1; nm = jdToDate(jdeNewMoon(k)); }
        return { k: k, date: nm };
    }

    function lunation(date) {
        date = date || new Date();
        const prev = previousNewMoon(date);
        const next = jdToDate(jdeNewMoon(prev.k + 1));
        const age = (date - prev.date) / 86400000;
        const length = (next - prev.date) / 86400000;
        return {
            newMoon: prev.date,
            nextNewMoon: next,
            age: age,                         // days since new moon (fractional)
            day: Math.floor(age) + 1,         // day of the Moon, 1..30
            length: length,                   // days in this lunation (29.27..29.84)
            illumination: (1 - Math.cos(2 * Math.PI * age / SYNODIC)) / 2
        };
    }

    function phaseName(age) {
        const f = age / SYNODIC;
        if (f < 0.0339 || f > 0.9661) return 'New Moon';
        if (f < 0.2161) return 'Waxing Crescent';
        if (f < 0.2839) return 'First Quarter';
        if (f < 0.4661) return 'Waxing Gibbous';
        if (f < 0.5339) return 'Full Moon';
        if (f < 0.7161) return 'Waning Gibbous';
        if (f < 0.7839) return 'Last Quarter';
        return 'Waning Crescent';
    }

    function toRoman(num) {
        const map = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
            [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
        let out = '';
        for (const [v, s] of map) { while (num >= v) { out += s; num -= v; } }
        return out;
    }

    global.Lunar = {
        lunation: lunation,
        previousNewMoon: previousNewMoon,
        phaseName: phaseName,
        toRoman: toRoman,
        SYNODIC: SYNODIC
    };
})(typeof window !== 'undefined' ? window : globalThis);
