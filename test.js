// ==UserScript==
// @name         Diep.io Banner Overwrite
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Replace with my banner on diep.io after the page loads.
// @author       Discord: anuryx. (Github: XyrenTheCoder)
// @match        *://diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const variables = {
        default: "https://diep.io/35cb845c87f7f2a6a9fc.jpg",
        dark3D: 'https://ik.imagekit.io/hxvezoqrx/IMG_6394.png?updatedAt=1744534591325',
        light3D: 'https://ik.imagekit.io/hxvezoqrx/IMG_6395.png?updatedAt=1744534591186',
    };

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50px';
    container.style.right = '10px';
    container.style.zIndex = 999;
    container.style.width = "150px";

    const menu = document.createElement('select');
    menu.style.backgroundColor = "black";
    menu.style.border = "1px solid black";
    menu.style.padding = '10px';
    menu.style.color = "white";

    // Populate the dropdown menu
    for (const [key] of Object.entries(variables)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        menu.appendChild(option);
    }

    const displayDiv = document.createElement('div');
    displayDiv.style.backgroundColor = 'black';
    displayDiv.style.border = "1px solid black";
    displayDiv.style.padding = '10px';
    displayDiv.style.color = 'white';

    // Create an image preview element
    const imagePreview = document.createElement('img');
    imagePreview.style.width = '100%'; // Adjust size as needed
    imagePreview.style.border = "1px solid white";
    imagePreview.alt = "Banner Preview";

    function updateDisplay() {
        const selected = menu.value;
        const theme = variables[selected];

        displayDiv.textContent = theme;
        localStorage.setItem("selected", selected);
        replaceBackgroundImage(theme);
        imagePreview.src = theme; // Update preview image
    }

    const selected = localStorage.getItem("selected");
    if (selected && variables[selected]) {
        menu.value = selected;
    }

    menu.addEventListener('change', updateDisplay);

    // Append elements to the container
    container.appendChild(menu);
    container.appendChild(displayDiv);
    container.appendChild(imagePreview); // Add preview to the container

    // Append container to the body
    document.body.appendChild(container);

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
