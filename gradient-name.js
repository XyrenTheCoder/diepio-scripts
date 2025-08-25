// ==UserScript==
// @name         A A A Diep.io Gradient Name
// @version      0.1
// @description  try to take over the world!
// @author       shlong#2873
// @match        *://diep.io/*
// ==/UserScript==

(() => {
    "use strict";
    const color1 = "#1E2A38";
    const color2 = "#4FB0C6";

    const context = CanvasRenderingContext2D.prototype;
    let i,
        text = [
            "Score",
            "Lvl",
            "This is the tale of...",
            "Privacy Policy",
            "Terms of Service",
            "More games",
            "FFA",
            "Survival",
            "Domination",
            "Tag",
            "Maze",
            "Sandbox",
            "Copy party link",
            "Scoreboard",
            "Leader",
            "Game Mode",
            "(press enter to spawn)",
            "Game mode",
            "4 Teams",
            "2 Teams",
            "Changelog",
            "Last updated",
            "diep.io",
            "Connecting...",
            "*",
            "Level",
            "Time Alive",
            "Tank",
            "Copy Party Link",
            "(press enter to continue)",
            "You were killed by:",
        ];

    context.fillText = new Proxy(context.fillText, {
        apply(type, _this, args) {
            const grad = _this.createLinearGradient(0, 0, 200, 0);
            grad.addColorStop(0, color1);
            grad.addColorStop(1, color2);
            _this.fillStyle = grad;
            for (i = 0; i < text.length; i++) {
                if (args[0].startsWith(text[i])) _this.fillStyle = "white";
            }
            return type.apply(_this, args);
        },
    });
})();
