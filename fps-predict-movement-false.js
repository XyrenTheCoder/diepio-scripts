// ==UserScript==
// @name         Diep.io FPS Counter and Disable Movement Prediction
// @version      1.0.0
// @description  Script for diep.io
// @author       Discord: anuryx. (Github: XyrenTheCoder)
// @match        *://diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const loadInterval = setInterval(() => {
        if(window.input) {
            window.input.set_convar("ren_fps", true);
            window.input.set_convar("net_predict_movement", false);
            clearInterval(loadInterval);
        }
    }, 5000);
})();
