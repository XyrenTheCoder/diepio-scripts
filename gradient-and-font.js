// ==UserScript==
// @name         A A A Diep.io Gradient Name, Change Font
// @version      0.1
// @description  Gradient name and font in one script
// @author       shlong#2873, Elijaah & Acc1, Edited and Merged by A-76, Solar
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

    let a;
    class _a {
        constructor() {
            this.p = {};
            this.v = false;
            document.addEventListener("DOMContentLoaded", this.tu.bind(this));
        }
        tu() {
            if (this.v) return;
            this.v = true;
            const ogGetElementById = HTMLDocument.prototype.getElementById;
            HTMLDocument.prototype.getElementById = function (id) {
                const elem = ogGetElementById.call(document, id);
                if (id === "canvas") return wrapCanvas(elem);
                return elem;
            };
            const ogCreateElement = HTMLDocument.prototype.createElement;
            HTMLDocument.prototype.createElement = function (tag) {
                const elem = ogCreateElement.call(document, tag);
                if (tag === "canvas") return wrapCanvas(elem);
                return elem;
            };
            function wrapCanvas(origCanvas) {
                class HTMLCanvasElementProxy {}
                let proxyCanvas = new HTMLCanvasElementProxy();
                proxyCanvas.width = origCanvas.width;
                proxyCanvas.height = origCanvas.height;
                proxyCanvas.transferControlToOffscreen = origCanvas.transferControlToOffscreen?.bind(origCanvas);
                proxyCanvas.toDataURL = origCanvas.toDataURL?.bind(origCanvas);
                proxyCanvas.toBlob = origCanvas.toBlob?.bind(origCanvas);
                proxyCanvas.captureStream = origCanvas.captureStream?.bind(origCanvas);
                proxyCanvas.getContext = function (...args) {
                    let ctx = origCanvas.getContext(...args);
                    if (args[0] !== "2d") return ctx;
                    return new Proxy(ctx, {
                        get(target, prop) {
                            const original = target[prop];
                            if (typeof original !== "function") return original;
                            if (Object.keys(a.p).includes(prop)) {
                                return function (...pArgs) {
                                    let skip = false;
                                    a.p[prop].forEach((hook) => {
                                        const result = hook(ctx, ...pArgs);
                                        if (!result) skip = true;
                                        else [ctx, pArgs] = result;
                                    });
                                    if (skip) return;
                                    return original.apply(target, pArgs);
                                };
                            }
                            return original.bind(target);
                        },
                        set(target, prop, value) {
                            if (prop === "font" && typeof value === "string") {
                                value = value.replace(/Ubuntu|sans-serif/gi, "'Protest Riot'");
                            }
                            target[prop] = value;
                            return true;
                        },
                    });
                };
                return proxyCanvas;
            }
        }
        _(methodName, hookFn) {
            if (Object.keys(this.p).includes(methodName)) this.p[methodName].push(hookFn);
            else this.p[methodName] = [hookFn];
        }
    }
    a = new _a();
})();
