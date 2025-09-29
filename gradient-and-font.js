// ==UserScript==
// @name         A A A Diep.io Gradient Name, Change Font
// @version      0.1
// @description  Gradient name and font in one script
// @author       shlong#2873, Elijaah & Acc1, Edited and Merged by A-76
// @match        *://diep.io/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// ==/UserScript==

(() => {
    "use strict";
    const color1 = "#51E7CB";
    const color2 = "#D1008B";

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



    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Diphylleia&display=swap";
    document.head.appendChild(fontLink);

    GM_addStyle(`
        body, * {
            font-family: "Diphylleia", serif !important;
        }
    `);

    const { set: originalFontSetter } = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "font");
    Object.defineProperty(CanvasRenderingContext2D.prototype, "font", {
        set(value) {
            const newValue = value.replace(/Ubuntu|sans-serif/g, 'Diphylleia');
            originalFontSetter.call(this, newValue);
        }
    });
})();
