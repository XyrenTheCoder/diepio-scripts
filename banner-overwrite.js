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
    "use strict";

    const allthemes = {
        Default: "https://diep.io/35cb845c87f7f2a6a9fc.jpg",
        Dark3D: "https://ik.imagekit.io/hxvezoqrx/IMG_6394.png?updatedAt=1744534591325",
        Light3D: "https://ik.imagekit.io/hxvezoqrx/IMG_6395.png?updatedAt=1744534591186",
    };

    const colors = {
        DarkGrey: "#1C1C1C",
        Grey: "#303030",
        LightGrey: "#606060",
        DimmedWhite: "#C6C6C6",
        White: "#DDDDDD"
    }


    // User interface container
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "5px";
    container.style.right = "150px";
    container.style.zIndex = 999;
    container.style.width = "300px";
    container.style.borderRadius = "0.5rem";
    container.style.backgroundColor = colors.DarkGrey;
    container.style.padding = "0px 20px";


    // Label
    const label = document.createElement("div");
    label.style.margin = "15px 0px 15px 0px";
    label.style.color = colors.White;
    label.innerText = "Banner Themes";
    label.style.font = "500 16px Inter";

    // HR
    const hr = document.createElement("hr");
    hr.style.border = `1px solid ${colors.LightGrey}`;
    hr.style.margin = "10px -20px 10px -20px";


    // Dropdown menu
    const menu = document.createElement("select");
    menu.style.backgroundColor = colors.Grey;
    menu.style.border = `1px solid ${colors.LightGrey}`;
    menu.style.borderRadius = "0.5rem";
    menu.style.padding = "10px";
    menu.style.margin = "5px 0px";
    menu.style.color = colors.White;
    menu.style.font = "500 16px Ubuntu";
    menu.style.cursor = "pointer";


    // Mount options
    for (const [key] of Object.entries(allthemes)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        menu.appendChild(option);
    }


    // Show link (debug)
    const debug = document.createElement("div");
    debug.style.backgroundColor = colors.Grey;
    debug.style.padding = "10px";
    debug.style.color = "white";
    debug.style.font = "500 12px Ubuntu";


    // Image preview
    const imagePreview = document.createElement("img");
    imagePreview.style.width = "100%";
    imagePreview.style.margin = "20px 0px";
    imagePreview.style.border = "1px solid white";
    imagePreview.alt = "Banner Preview";


    // Update UI & overwrite banner
    function updateDisplay() {
        const selected = menu.value;
        const theme = allthemes[selected];

        debug.textContent = `(!Debug) Link: ${theme}`;
        localStorage.setItem("selected", selected);
        replaceBackgroundImage(theme);
        imagePreview.src = theme;
    }


    const selected = localStorage.getItem("selected");
    if (selected && allthemes[selected]) {
        menu.value = selected;
    }

    menu.addEventListener("change", updateDisplay);

    container.appendChild(label);
    container.appendChild(hr);
    container.appendChild(menu);
    container.appendChild(imagePreview);
    // container.appendChild(debug);


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

    window.addEventListener("load", updateDisplay);
})();
