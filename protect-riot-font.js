// ==UserScript==
// @name         [🪐] Font For Diep.io
// @version      1.1.0
// @description  Force Protest Riot font on diep.io
// @author       Elijaah & Acc1, A-76
// @match        https://diep.io/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// ==/UserScript==

(() => {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap";
    document.head.appendChild(fontLink);
    GM_addStyle(`
        body, * {
            font-family: 'Protest Riot', sans-serif !important;
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
