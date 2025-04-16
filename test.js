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

    // Define your variables
    const variables = {
        default: "https://diep.io/35cb845c87f7f2a6a9fc.jpg",
        dark3D: 'https://ik.imagekit.io/hxvezoqrx/IMG_6394.png?updatedAt=1744534591325s',
        light3D: 'https://ik.imagekit.io/hxvezoqrx/IMG_6395.png?updatedAt=1744534591186',
        // var2: 'Value of Variable 3',
        // var3: 'Value of Variable 4'
    };

    // Create a dropdown menu
    const menu = document.createElement('select');
    menu.style.position = 'fixed';
    menu.style.top = '10px';
    menu.style.right = '10px';
    menu.style.zIndex = 1000;

    // Add options to the menu
    for (const [key, value] of Object.entries(variables)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        menu.appendChild(option);
    }

    // Create a div to display the selected variable
    const displayDiv = document.createElement('div');
    displayDiv.style.position = 'fixed';
    displayDiv.style.top = '50px';
    displayDiv.style.right = '10px';
    displayDiv.style.zIndex = 1000;
    displayDiv.style.backgroundColor = 'white';
    displayDiv.style.border = '1px solid black';
    displayDiv.style.padding = '10px';

    // Function to update the display
    function updateDisplay() {
        const selected = menu.value;
        let theme = variables[selected];
        displayDiv.textContent = theme;
        localStorage.setItem("selected", variables[selected]);
        setTimeout(replaceBackgroundImage(theme), 1000);
    }

    const selected = localStorage.getItem("selected");

    if (selected && variables[selected]) {
        menu.Value = selected;
    }

    // Event listener for menu change
    menu.addEventListener('change', updateDisplay);

    // Append the menu and display to the body
    document.body.appendChild(menu);
    document.body.appendChild(displayDiv);


    function replaceBackgroundImage(img) {
        const nodeList= document.querySelectorAll("img");
        nodeList[2].src = img;
        document.getElementById("backdrop-asset").src = img;
    }

    window.addEventListener('load', function() {
        updateDisplay();
    });
})();
