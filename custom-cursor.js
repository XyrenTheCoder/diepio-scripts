// ==UserScript==
// @name         Diep.io Custom Cursor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A-76 custom cursor!
// @author       Discord: anuryx. (Github: XyrenTheCoder)
// @match        *://diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const customCursor1 = 'https://ik.imagekit.io/as7ksk9qe/IMG_7187.png?updatedAt=1747468072695'; // default
    const customCursor2 = 'https://ik.imagekit.io/as7ksk9qe/IMG_7188.png?updatedAt=1747468072947'; // right click/ repel
    const customCursor3 = 'https://ik.imagekit.io/as7ksk9qe/IMG_7189.png?updatedAt=1747470420946'; // left click/ repel

    const style = document.createElement('style');

    style.innerHTML = `
        body {
            cursor: url('${customCursor1}'), auto;
        }
    `;
    document.head.appendChild(style);


    document.addEventListener('mousedown', function(event) {
        //event.preventDefault(); // Prevent the default context menu

        if (event.button === 0) { // Left mouse button
            style.innerHTML = `
                body {
                    cursor: url('${customCursor3}'), auto;
                }
            `;
            document.head.appendChild(style);
        }

        if (event.button === 2) { // Right mouse button
            style.innerHTML = `
                body {
                    cursor: url('${customCursor2}'), auto;
                }
            `;
            document.head.appendChild(style);
        }
    });

    document.addEventListener('mouseup', function(event) {
        if (event.button === 0 || event.button === 2) {
            style.innerHTML = `
                body {
                    cursor: url('${customCursor1}'), auto;
                }
            `;
            document.head.appendChild(style);
        }
    });
})();
