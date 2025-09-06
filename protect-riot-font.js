// ==UserScript==
// @name         protest riot font
// @version      1.0.3
// @description  best font
// @author       Elijaah & Acc1
// @match        https://diep.io/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// ==/UserScript==

(() => {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap";
    document.head.appendChild(fontLink);

    GM_addStyle(`
        body, * {
            font-family: 'Protest Riot', sans-serif !important;
        }
    `);

    const { set: originalFontSetter } = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "font");
    Object.defineProperty(CanvasRenderingContext2D.prototype, "font", {
        set(value) {
            const newValue = value.replace(/Ubuntu|sans-serif/g, 'Protest Riot');
            originalFontSetter.call(this, newValue);
        }
    });
})();
