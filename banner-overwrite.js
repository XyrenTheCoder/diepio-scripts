// ==UserScript==
// @name         Diep.io Banner Overwrite
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Replace with my banner on diep.io after the page loads.
// @author       Discord: anuryx. (Github: XyrenTheCoder)
// @match        *://diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const variables = {
        default: "https://diep.io/35cb845c87f7f2a6a9fc.jpg",
        dark3D: 'https://ik.imagekit.io/hxvezoqrx/IMG_6394.png?updatedAt=1744534591325',
        light3D: 'https://ik.imagekit.io/hxvezoqrx/IMG_6395.png?updatedAt=1744534591186',
    };

    const menu = document.createElement('select');

    menu.style.position = 'fixed';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.zIndex = 1000;

    for (const [key] of Object.entries(variables)) {
        const option = document.createElement('option');

        option.value = key;
        option.textContent = key;
        menu.appendChild(option);
    }

    const displayDiv = document.createElement('div');

    displayDiv.style.position = 'fixed';
    displayDiv.style.top = '50px';
    displayDiv.style.right = '10px';
    displayDiv.style.zIndex = 1000;
    displayDiv.style.backgroundColor = 'black';
    displayDiv.style.border = '1px solid black';
    displayDiv.style.padding = '10px';

    function updateDisplay() {
        const selected = menu.value;
        const theme = variables[selected];

        displayDiv.textContent = theme;
        localStorage.setItem("selected", selected);
        replaceBackgroundImage(theme);
    }

    const selected = localStorage.getItem("selected");

    if (selected && variables[selected]) {
        menu.value = selected;
    }

    menu.addEventListener('change', updateDisplay);

    document.body.appendChild(menu);
    document.body.appendChild(displayDiv);

    function replaceBackgroundImage(img) {
        const nodeList = document.querySelectorAll("img");
        if (nodeList[2]) {
            nodeList[2].src = img;
        }
        const backdrop = document.getElementById("backdrop-asset");
        if (backdrop) {
            backdrop.src = img;
        }
    }

    window.addEventListener('load', updateDisplay);
})();
