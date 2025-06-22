// ==UserScript==
// @name         Aim Line
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Accurate aim line for Rocketeer/ Glider/ Skimmer. (Inaccurate for bullets since they are affected by movement speed)
// @author       Discord: anuryx. (Github: XyrenTheCoder)
// @match        *://diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const line = document.createElement('div');
    line.style.position = 'fixed';
    line.style.width = '2px';
    line.style.height = '100vh';
    line.style.backgroundColor = 'red';
    line.style.transformOrigin = '50% 50%';
    line.style.left = '50%';
    line.style.top = '50%';
    line.style.pointerEvents = 'none';
    line.style.transform = 'translate(-50%, -50%)';
    line.style.zIndex = '999';
    document.body.appendChild(line);

    document.addEventListener('mousemove', (event) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
        line.style.transform = `translate(-50%, -50%) rotate(${angle+90}deg)`;
    });
})();
