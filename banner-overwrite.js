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

    function replaceBackgroundImage() {
        const nodeList= document.querySelectorAll("img");
        nodeList[2].src = "https://ik.imagekit.io/hxvezoqrx/IMG_6394.png?updatedAt=1744534591325s";
        document.getElementById("backdrop-asset").src = "https://ik.imagekit.io/hxvezoqrx/IMG_6394.png?updatedAt=1744534591325";
    }

    window.addEventListener('load', function() {
        setTimeout(replaceBackgroundImage, 1000);
    });
})();
