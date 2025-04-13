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
        nodeList[2].src = "https://cdn.discordapp.com/attachments/1353542166789619772/1360537953671188680/IMG_6394.png?ex=67fc23f5&is=67fad275&hm=a4aa873209fa247213b39acab47dd3cd5117a31cdf07856bce14bb38d7a5c871&";
        document.getElementById("backdrop-asset").src = "https://cdn.discordapp.com/attachments/1353542166789619772/1360537953671188680/IMG_6394.png?ex=67fc23f5&is=67fad275&hm=a4aa873209fa247213b39acab47dd3cd5117a31cdf07856bce14bb38d7a5c871&";
    }

    window.addEventListener('load', function() {
        setTimeout(replaceBackgroundImage, 1000);
    });
})();
