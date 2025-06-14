// ==UserScript==
// @name         Diep.io multibox
// @namespace    http://tampermonkey.net/
// @version      2025-03-16
// @description  G to enable menu
// @author       ARARAR
// @match        https://diep.io/*
// @match        https://diep-io.rivet.game/*
// @match        https://diep.io/?p=*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
// ==/UserScript==

(function() {
  unsafeWindow.frozenHasFocus = {
    hasFocus: () => true
  };
  document.hasFocus = () => true;
})();

(function() {

  let tankData;
  let core;
  let statBuild;
  let classUpgrade;
  let canvasHook;
  let externHook;
  let ui;
  let fov;
  let user;
  let bot;

  class TankData {
    constructor() {
      this.level = 1;
      this.score = 0;
      this.tank = "Tank";
      this.upgradesPath = ["Tank"];
    }
    init() {
      tankData.hookText();
    }
    getLevel() {
      return this.level;
    }
    getScore() {
      return this.score;
    }
    getTank() {
      return this.tank;
    }
    getUpgradesPath() {
      return this.upgradesPath;
    }
    hookText() {
      canvasHook.addHook("strokeText", function(_context, text, x, y, ...blah) {
        if (text.startsWith("Lvl ")) {
          tankData.level = Number(text.slice(4, text[5] === " " ? 5 : 6));
          if (core.tanks.includes(text.slice(text[5] === " " ? 6 : 7))) tankData.tank = text.slice(text[5] === " " ? 6 : 7);
          if (!tankData.upgradesPath.includes(tankData.tank)) tankData.upgradesPath.push(tankData.tank);
        } else if (text.startsWith("Score: ")) tankData.score = text.slice(7);
        return [_context, [text, x, y, ...blah]];
      });
    }
  }

  class StatBuild {
    constructor() {
      this.buildStatLevels = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 33, 36, 39, 42, 45];
      this.statNames = {
        1: "healthRegen",
        2: "maxHealth",
        3: "bodyDamage",
        4: "bulletSpeed",
        5: "bulletPenetration",
        6: "bulletDamage",
        7: "reload",
        8: "movementSpeed"
      };
      this.forcingU = false;
    }
    init() {
      statBuild.hookKeys();
      setInterval(statBuild.forceUpgrades, 20);
    }
    forceUpgrades() {
      if (statBuild.canUpgrade()) {
        statBuild.forcingU = true;
        extern.onKeyDown(core.keyCodeTable["KeyU"], 1);
      } else if (statBuild.forcingU) {
        statBuild.forcingU = false;
        extern.onKeyUp(core.keyCodeTable["KeyU"], 1);
      }
    }
    getStats() {
      const rawStats = extern.get_convar("game_stats_build");
      let stats = {
        healthRegen: 0,
        maxHealth: 0,
        bodyDamage: 0,
        bulletSpeed: 0,
        bulletPenetration: 0,
        bulletDamage: 0,
        reload: 0,
        movementSpeed: 0,
      }
      for (let i = 0; i < rawStats.length; ++i) {
        ++stats[statBuild.statNames[rawStats[i]]];
      }
      return stats;
    }
    getUpgrades() {
      let upgrades = 0;
      for (let i = 0; i < statBuild.buildStatLevels.length; ++i) {
        upgrades++;
        if (tankData.getLevel() < statBuild.buildStatLevels[i]) break
      }
      return upgrades;
    }
    truncateStats() {
      return extern.get_convar("game_stats_build").slice(0, statBuild.getUpgrades())
    }
    canUpgrade() {
      const rawStats = extern.get_convar("game_stats_build");
      return statBuild.getUpgrades() - 1 > rawStats.length;
    }
    hookKeys() {
      externHook.addHook("onKeyDown", function(...args) {
        if (args[0] === 21 && !args[1]) return;
        return args;
      });
      externHook.addHook("onKeyUp", function(...args) {
        if (args[0] === 21 && !args[1]) return;
        return args;
      });
    }
  }

  class Core {
    constructor() {
      this.ARENA_SIZE = 26000;
      this.keyCodeTable = {
        "KeyA": 1,
        "KeyB": 2,
        "KeyC": 3,
        "KeyD": 4,
        "KeyE": 5,
        "KeyF": 6,
        "KeyG": 7,
        "KeyH": 8,
        "KeyI": 9,
        "KeyJ": 10,
        "KeyK": 11,
        "KeyL": 12,
        "KeyM": 13,
        "KeyN": 14,
        "KeyO": 15,
        "KeyP": 16,
        "KeyQ": 17,
        "KeyR": 18,
        "KeyS": 19,
        "KeyT": 20,
        "KeyU": 21,
        "KeyV": 22,
        "KeyW": 23,
        "KeyX": 24,
        "KeyY": 25,
        "KeyZ": 26,
        "ArrowUp": 27,
        "ArrowLeft": 28,
        "ArrowDown": 29,
        "ArrowRight": 30,
        "Tab": 31,
        "Enter": 32,
        "NumpadEnter": 33,
        "ShiftLeft": 34,
        "ShiftRight": 35,
        "Space": 36,
        "Numpad0": 37,
        "Numpad1": 38,
        "Numpad2": 39,
        "Numpad3": 40,
        "Numpad4": 41,
        "Numpad5": 42,
        "Numpad6": 43,
        "Numpad7": 44,
        "Numpad8": 45,
        "Numpad9": 46,
        "Digit0": 47,
        "Digit1": 48,
        "Digit2": 49,
        "Digit3": 50,
        "Digit4": 51,
        "Digit5": 52,
        "Digit6": 53,
        "Digit7": 54,
        "Digit8": 55,
        "Digit9": 56,
        "F2": 57,
        "End": 58,
        "Home": 59,
        "Semicolon": 60,
        "Comma": 61,
        "NumpadComma": 62,
        "Period": 63,
        "Backslash": 64
      }
      this.movementKeys = ['KeyA', 'KeyS', 'KeyW', 'KeyD', 'KeyB', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      this.tanks = ["Tank", "Auto Tank", "Glider", "Rocketeer", "Skimmer", "Factory", "Spike", "Auto Smasher", "Annihilator", "Battleship", "Auto Trapper", "Streamliner", "Spread Shot", "Auto 3", "Auto 5", "Auto Gunner", "Landmine", "Smasher", "Tri-Trapper", "Mega Trapper", "Overtrapper", "Gunner Trapper", "Trapper", "Sprayer", "Predator", "Mothership", "Manager", "Hybrid", "Fighter", "Booster", "Ranger", "Stalker", "Gunner", "Hunter", "Triple Twin", "Necromancer", "Assassin", "Penta Shot", "Twin Flank", "Overlord", "Overseer", "Destroyer", "Tri-Angle", "Flank Guard", "Machine Gun", "Sniper", "Octo Tank", "Quad Tank", "Triple Shot", "Triplet", "Twin"];
      this.teamFlags = {
        "active blue": "0x0",
        "active red": "0x1",
        "active purple": "0x2",
        "active green": "0x3",
      }
    }
    mean2d(arr) {
      let tx = 0,
        ty = 0;
      arr.forEach(point => {
        tx += point[0];
        ty += point[1];
      });
      return [tx / arr.length, ty / arr.length]
    }
    inBounds(x, y) {
      return x > -2000 && x < 28000 && y > -2000 && y < 28000;
    }
    canvasToScreen(x, y) {
      const mainCanvas = document.getElementById("canvas");
      return [
        x * (unsafeWindow.innerWidth / mainCanvas.width),
        y * (unsafeWindow.innerHeight / mainCanvas.height)
      ]
    }
  }

  class Upgrade {
    constructor() {
      this.currentTransform = undefined;
      this.upgradesRendered = false;
      this.tempButtons = [];
      this.upgradeButtons = [];
    }
    getUpgrades() {
      return this.upgradeButtons;
    }
    init() {
      classUpgrade.hookMethods();
      unsafeWindow.requestAnimationFrame(classUpgrade.onFrame);
    }
    onFrame() {
      unsafeWindow.requestAnimationFrame(classUpgrade.onFrame);
      classUpgrade.upgradesRendered = true;
      classUpgrade.upgradeButtons = classUpgrade.tempButtons;
      classUpgrade.tempButtons = [];
    }
    hookMethods() {
      canvasHook.addHook("setTransform", function(_context, ...args) {
        classUpgrade.currentTransform = args;
        return [_context, args];
      });
      canvasHook.addHook("strokeText", function(_context, text, x, y, ...blah) {
        if (_context.canvas.id !== "canvas") {
          _context.canvas._text = text;
        }
        return [_context, [text, x, y, ...blah]]
      });
      canvasHook.addHook("drawImage", function(_context, img, x, y, ...blah) {
        const midpointX = (classUpgrade.currentTransform[4] + x + img.width / 2);
        const midpointY = (classUpgrade.currentTransform[5] + y + img.height / 2);

        const startX = (classUpgrade.currentTransform[4] + x);
        const endX = (classUpgrade.currentTransform[4] + x + img.width);

        if (img._text && midpointX > 0 && midpointY > 0) {
          if (img._text === "Achievements") {
            classUpgrade.upgradesRendered = false;
          }
          if (core.tanks.includes(img._text)) {
            classUpgrade.tempButtons.push({
              text: img._text,
              x: midpointX,
              y: midpointY,
              sx: startX,
              ex: endX,
              ty: (classUpgrade.currentTransform[5] + y + img.height),
            })
          }
        }
        return [_context, [img, x, y, ...blah]];
      });
    }
  }

  class CtxHook {
    constructor() {
      this.hookedMethods = {};
      this.hasInit = false;
      document.addEventListener("DOMContentLoaded", () => {
        this.init()
      });
    }
    init() {
      if (this.hasInit) return;
      this.hasInit = true;
      const _getElementById = HTMLDocument.prototype.getElementById;
      HTMLDocument.prototype.getElementById = function(id) {
        const element = _getElementById.call(document, id);

        if (id === "canvas") return hookCanvas(element);
        return element
      }

      const _createElement = HTMLDocument.prototype.createElement;
      HTMLDocument.prototype.createElement = function(kind) {
        const element = _createElement.call(document, kind);

        if (kind === "canvas") return hookCanvas(element);
        return element
      }

      function hookCanvas(_canvas) {
        class HTMLCanvasElement {}
        let ret = new HTMLCanvasElement();
        // >>> ret instanceof HTMLCanvasElement == true

        ret.width = _canvas.width;
        ret.height = _canvas.height;

        ret.transferControlToOffscreen = _canvas.transferControlToOffscreen.bind(_canvas);
        ret.toDataURL = _canvas.toDataURL.bind(_canvas);
        ret.toBlob = _canvas.toBlob.bind(_canvas);
        ret.captureStream = _canvas.captureStream.bind(_canvas);

        ret.getContext = function(...args) {
          let _context = _canvas.getContext(...args);
          if (args[0] !== "2d") return _context;

          return new Proxy(_context, {

            get: function(obj, key) {
              const value = obj[key];
              if (typeof value !== "function") return value;
              if (Object.keys(canvasHook.hookedMethods).includes(key)) {
                return function(...args) {
                  let shouldRet = false;
                  canvasHook.hookedMethods[key].forEach(callee => {
                    const resp = callee(_context, ...args);
                    if (!resp) {
                      shouldRet = true;
                    } else {
                      [_context, args] = resp;
                    }
                  });
                  if (shouldRet) return;
                  return value.apply(obj, args);
                }
              }
              return value.bind(obj);
            },

            set: function(obj, key, value) {
              obj[key] = value;
              return true;
            },
          });
        }
        return ret;
      }
    }
    addHook(prop, callee) {
      if (Object.keys(canvasHook.hookedMethods).includes(prop)) {
        canvasHook.hookedMethods[prop].push(callee);
      } else {
        canvasHook.hookedMethods[prop] = [callee];
      }
    }
  }

  class ExternHook {
    constructor() {
      this.hookedMethods = new Map();
      this.hasInit = false;

      this.awaitExtern = setInterval(function() {
        if (typeof extern === "undefined") return;
        clearInterval(externHook.awaitExtern);
        externHook.init();
      }, 100);
    }
    init() {
      if (this.hasInit) return;
      this.hasInit = true;

      extern = new Proxy(extern, {
        get(obj, key) {
          const value = obj[key];
          if (typeof value !== "function") return value;
          if (externHook.hookedMethods.has(key)) {
            return function(...args) {
              const resp = externHook.hookedMethods.get(key)(...args);
              if (!resp) return;
              return value.apply(obj, resp);
            }
          }
          return value.bind(obj);
        },
        set: function(obj, key, value) {
          obj[key] = value;
          return true;
        },
      });

    }
    addHook(prop, callee) {
      this.hookedMethods.set(prop, callee);
    }
  }

  class Ui {
    constructor() {
      this.panel = null;
      this.cats = [];
      this.uiVisible = 0;
      this.keyToToggle = "KeyG";
      this.settingData = {};
    }
    createInterface() {
      const style = document.createElement("style");
      style.textContent = `
        .m_bg { position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; background: hsla(0, 0%, 10%, 0.7); backdrop-filter: blur(7px); -webkit-backdrop-filter: blur(7px); display: none; }
        .m_container { position: absolute; display: flex; max-width: 800px; max-height: 500px; width: 100%; height: 100%; left: 50%; top: 50%; background: hsla(0, 0%, 5%, 0.95); border: 1px solid hsla(0, 0%, 100%, 0.1); border-radius: 15px; transform: translate(-50%, -50%); }
        .tabs { position: absolute; display: flex; flex-direction: column; width: 100px; height: 94%; top: 50%; border-right: 1px solid #ccc; transform: translate(0%, -50%) }
        .tab { position: relative; margin-bottom: 6px; cursor: pointer; text-align: center; width: 80px; height: 50px; left: 50%; border-radius: 8px; background: hsla(220, 50%, 30%, 0.85); color: white; font-weight: bold; display: flex; align-items: center; justify-content: center; transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); transform: translate(-50%, 0%); }
        .tab.active { background-color: hsla(220, 70%, 40%, 0.9); }
        .tab:hover { filter: brightness(125%); }
        .m_content { position: absolute; left: 120px; top: 10px; width: 660px; height: 380px; border-radius: 12px; display: none; padding: 10px; box-sizing: border-box; background-color: hsla(0, 0%, 15%, 0.9); }
        .m_content.active { display: block; }
        .setting { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; background-color: hsla(0, 0%, 25%, 0.8); border-radius: 4px; margin-bottom: 8px; padding: 8px; cursor: pointer; }
        .setting:hover { filter: brightness(125%); }
        .m_title { color: white; text-decoration: underline; font-family: 'Inter', sans-serif; font-size: 20px; margin-bottom: 12px; text-align: center; }
        .m_text { color: white; padding: 5px 10px; border-radius: 4px; font-family: 'Inter', sans-serif; font-size: 23px; }
        .m_slider, .m_checkbox { -webkit-appearance: none; width: 150px; height: 8px; background: #888; outline: none; border-radius: 4px; transition: background 0.3s ease; }
        .m_checkbox { position: relative; width: 50px; height: 24px; background: #555; border-radius: 12px; }
        .m_checkbox::before { content: ''; position: absolute; width: 20px; height: 20px; border-radius: 50%; background: #fff; top: 2px; left: 2px; transition: 0.3s; }
        .m_checkbox.checked { background: #4CAF50; }
        .m_checkbox.checked::before { transform: translateX(26px); }
        `;
      document.head.appendChild(style);

      this.cats = [];
      this.uiVisible = 0;

      const bg = document.createElement("div");
      bg.className = "m_bg";
      bg.style.zIndex = "999";
      document.body.appendChild(bg);

      this.panel = document.createElement("div");
      this.panel.className = "m_container";
      bg.appendChild(this.panel);

      this.tabs = document.createElement("div");
      this.tabs.className = "tabs";
      this.panel.appendChild(this.tabs);

      let keydown = false;

      document.addEventListener("keydown", event => {
        if (event.code === this.keyToToggle && !keydown) {
          this.uiVisible ^= 1;
          bg.style.display = this.uiVisible ? "flex" : "none";
          keydown = true;
        }
      });
      document.addEventListener("keyup", event => {
        if (event.code === this.keyToToggle && keydown) {
          keydown = false;
        }
      });

      //this.addOption("insert title", { text: "h", type: "slider" }, function(){});
      //this.addOption("insert title", { text: "a", type: "bool" }, function(){});
      //this.addOption("insert title", { text: "n", type: "toggle", values: ["setting 1", "setting 2"] }, function(){});
      //this.addOption("insert title", { text: "g", type: "bool" }, function(){});
      //this.addOption("yee", { text: "se", type: "bool" }, function(){});
    }

    addOption(catName, optionData, callee = () => {}) {
      const isFirst = !this.cats.length;
      let cat = this.cats.find(c => c.name === catName);

      if (!cat) {
        const tabButton = document.createElement("div");
        tabButton.className = isFirst ? "tab active" : "tab";
        tabButton.textContent = catName;
        this.tabs.appendChild(tabButton);

        const contentContainer = document.createElement("div");
        contentContainer.className = isFirst ? "m_content active" : "m_content";
        this.panel.appendChild(contentContainer);

        const title = document.createElement("div");
        title.className = "m_title";
        title.textContent = catName;
        contentContainer.appendChild(title);

        tabButton.addEventListener('click', () => {
          this.cats.forEach(c => {
            c.tabButton.classList.remove("active");
            c.contentContainer.classList.remove("active");
          });
          tabButton.classList.add("active");
          contentContainer.classList.add("active");
          title.textContent = catName;
        });

        this.cats.push({
          name: catName,
          tabButton,
          contentContainer
        });

        cat = this.cats[this.cats.length - 1];
      }

      const optionContainer = document.createElement("div");
      optionContainer.className = "setting";

      const textContainer = document.createElement("span");
      textContainer.className = "m_text";
      textContainer.textContent = optionData.text;
      optionContainer.appendChild(textContainer);

      if (optionData.type === "slider") {
        const slider = document.createElement("input");
        slider.type = "range";
        slider.className = "m_slider";
        slider.min = "0";
        slider.max = "100";
        slider.value = this.readLocalStorage(optionData.text) || 50;
        optionContainer.appendChild(slider);

        textContainer.textContent = optionData.text + " - " + slider.value;
        slider.onchange = () => {
          callee(this.value);
          textContainer.textContent = optionData.text + " - " + slider.value;
          this.writeLocalStorage(optionData.text, slider.value);
        }
      } else if (optionData.type === "bool") {
        const checkbox = document.createElement("div");
        checkbox.className = "m_checkbox";
        if (this.readLocalStorage(optionData.text)) {
          checkbox.classList.toggle("checked");
        }
        optionContainer.appendChild(checkbox);

        checkbox.onclick = () => {
          checkbox.classList.toggle("checked");
          callee(checkbox.classList.contains("checked"));
          this.writeLocalStorage(optionData.text, checkbox.classList.contains("checked"));
        }
      } else if (optionData.type === "toggle") {
        let currentIndex = this.readLocalStorage(optionData.text) || 0;
        textContainer.textContent = optionData.text + " - " + optionData.values[currentIndex];

        optionContainer.onclick = () => {
          currentIndex = (currentIndex + 1) % optionData.values.length;
          textContainer.textContent = optionData.text + " - " + optionData.values[currentIndex];
          callee(optionData.values[currentIndex]);
          this.writeLocalStorage(optionData.text, currentIndex);
        }
      }

      cat.contentContainer.appendChild(optionContainer);
    }
    readLocalStorage(key) {
      const data = JSON.parse(localStorage.getItem("m_gui") || "{}");
      this.settingData = data;
      return data[key];
    }
    writeLocalStorage(key, value) {
      const data = JSON.parse(localStorage.getItem("m_gui") || "{}");
      data[key] = value;
      this.settingData = data;
      localStorage.setItem("m_gui", JSON.stringify(data));
    }
    getSetting(key) {
      return this.settingData[key];
    }
  }

  class Fov {
    constructor() {
      this.FOV_UPDATE_INTERVAL = 20;
      this.FOV_INTERPOLATE = 0.1;
      this.defaultFov = 0.8;
      this.setFov = 0.8;
      this.fov = 0.8;
      this.keyStates = new Map();
    }
    init() {
      const onWheelEvent = event => {
        this.setFov += -Math.sign(event.deltaY) * 0.02 * Math.log10(this.setFov / 0.55 + 1)
      }
      const onKeyDown = event => {
        this.keyStates.set(event.keyCode, 1)
      }
      const onKeyUp = event => {
        this.keyStates.set(event.keyCode, 0)
      }

      document.addEventListener("wheel", onWheelEvent);
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("keyup", onKeyUp);
      setInterval(() => {
        this.updateFov();
      }, this.FOV_UPDATE_INTERVAL);

      ui.addOption("Main", {
        text: "FOV",
        type: "bool"
      });

    }
    updateFov() {
      if (typeof unsafeWindow.extern === 'undefined') return;
      if (!unsafeWindow.extern.doesHaveTank()) return;
      if (this.keyStates.get(187)) this.setFov += 0.01 * Math.log10(this.setFov / 0.55 + 1);
      if (this.keyStates.get(189)) this.setFov -= 0.01 * Math.log10(this.setFov / 0.55 + 1);

      if (!ui.getSetting("FOV")) this.setFov = this.defaultFov;

      this.fov += (this.setFov - this.fov) * this.FOV_INTERPOLATE;
      unsafeWindow.extern.setScreensizeZoom(1, this.fov);
    }
  }

  class User {
    constructor() {
      this.UPDATE_INTERVAL = 10; //ms
      this.COPY_MOVEMENT_RADIUS = 255;
      this.BOT_RECOIL_RADIUS = 355;
      this.shapeRenderingPosition = 0;
      this.shapeVertices = new Array(0);
      this.arrowPos = [0, 0];
      this.minimapPos = [0, 0];
      this.minimapDim = [0, 0];
      this.posX = 0;
      this.posY = 0;
      this.keyStates = {
        "KeyA": 0,
        "KeyS": 0,
        "KeyW": 0,
        "KeyD": 0,
        "KeyB": 0,
        "ArrowUp": 0,
        "ArrowDown": 0,
        "ArrowLeft": 0,
        "ArrowRight": 0,
        "Space": 0,
        "ShiftLeft": 0,
        "KeyE": 0,
        "KeyC": 0
      }
      this.mouseSX = 0;
      this.mouseSY = 0;
      this.mouseWX = 0;
      this.mouseWY = 0;
      this.fov = 0.5;
      this.botConnected = false;
      this.lobbyData = {};
    }
    onTick() {
      unsafeWindow.extern.set_convar("net_predict_movement", 0);
      user.writeData();
      user.handleBot();
      user.getTeam();

      user.botData = JSON.parse(localStorage.getItem("botData") || "{}");
      if (user.botData && user.botConnected && ui.getSetting("Enable Multibox")) {
        user.handleBotKeys();
        user.handleBotMovement();
        user.handleBotMouse();
      }
    }
    init() {
      user.applyHooks();
      user.applyListeners();
      setInterval(user.onTick, user.UPDATE_INTERVAL);

      this.setupGui();

    }
    applyHooks() {
      canvasHook.addHook("stroke", function(_context, ...args) {
        if (["#cccccc", "#cdcdcd"].includes(_context.fillStyle) && _context.strokeStyle == "#000000") {
          user.fov = (_context.globalAlpha / 0.05);
        }
        return [_context, args];
      });
      canvasHook.addHook("strokeRect", function(_context, ...args) {
        const t = _context.getTransform();
        user.minimapPos = [t.e, t.f];
        user.minimapDim = [t.a, t.d];
        return [_context, args];
      });
      canvasHook.addHook("beginPath", function(_context, ...args) {
        user.shapeRenderingPosition = 0;
        user.shapeVertices = new Array(0);
        return [_context, args];
      });
      canvasHook.addHook("moveTo", function(_context, ...args) {
        user.shapeRenderingPosition = 1;
        user.shapeVertices.push(args);
        return [_context, args];
      });
      canvasHook.addHook("lineTo", function(_context, ...args) {
        user.shapeRenderingPosition++;
        user.shapeVertices.push(args);
        return [_context, args];
      });
      canvasHook.addHook("fill", function(_context, ...args) {
        if (_context.fillStyle == "#000000" && _context.globalAlpha > 0.949 && user.shapeRenderingPosition === 3) {
          user.arrowPos = core.mean2d(user.shapeVertices);
          const dx = user.arrowPos[0] - user.minimapPos[0];
          const dy = user.arrowPos[1] - user.minimapPos[1];
          const x = (dx / user.minimapDim[0]) * core.ARENA_SIZE;
          const y = (dy / user.minimapDim[1]) * core.ARENA_SIZE;

          if (core.inBounds(x, y)) {
            [user.posX, user.posY] = [x, y];
            [user.mouseWX, user.mouseWY] = [x + (user.mouseSX - window.innerWidth / 2) / (user.fov / 2.8), y + (user.mouseSY - window.innerHeight / 2) / (user.fov / 2.8)];
          }
        }
        return [_context, args];
      });

      externHook.addHook("connectLobby", function(teamFlag, region, address, arg3, arg4, cToken) {
        user.lobbyData = {
          teamFlag,
          region,
          address
        };
        return [teamFlag, region, address, arg3, arg4, cToken];
      });
    }
    applyListeners() {
      document.addEventListener("keydown", function(event) {
        if (Object.keys(user.keyStates).includes(event.code)) {
          user.keyStates[event.code] = 1;
        }
      });
      document.addEventListener("keyup", function(event) {
        if (Object.keys(user.keyStates).includes(event.code)) {
          user.keyStates[event.code] = 0;
        }
      });
      document.addEventListener("mousedown", function(event) {
        user.keyStates[(event.button === 0 ? "Space" : "ShiftLeft")] = 1;
      });
      document.addEventListener("mouseup", function(event) {
        user.keyStates[(event.button === 0 ? "Space" : "ShiftLeft")] = 0;
      });
      document.addEventListener("mousemove", function(event) {
        [user.mouseSX, user.mouseSY] = [event.clientX, event.clientY];
      });
    }
    getTeam() {
      const party = document.getElementById("copy-party-link");
      if (party) {
        user.lobbyData.teamFlag = core.teamFlags[party.className] || user.lobbyData.teamFlag;
      }
    }
    writeData() {
      const dataToSend = {
        wx: user.posX,
        wy: user.posY,
        mx: user.mouseWX,
        my: user.mouseWY,
        keyStates: user.keyStates,
        timestamp: Date.now(),
        lobbyData: user.lobbyData,
        statBuild: statBuild.truncateStats(),
        upgradesPath: tankData.getUpgradesPath(),
      }
      const encoded = JSON.stringify(dataToSend);
      localStorage.setItem("userData", encoded);
    }
    handleBot() {
      if (!user.botConnected && ui.getSetting("Auto Spawn Bot")) {
        if (unsafeWindow.extern.doesHaveTank()) {
          user.createBot();
        }
      }
    }
    createBot() {
      user.botConnected = true;
      if (user.botElement) {
        user.botElement.remove();
      }
      user.botElement = document.createElement("iframe");
      user.botElement.src = "https://diep.io/";
      user.botElement.id = "multiboxBot";
      user.botElement.style.zIndex = "999";
      user.botElement.style.display = "block";
      user.botElement.style.position = "absolute";
      user.botElement.style.width = "20%";
      user.botElement.style.height = "20%";

      user.botElement.style.right = "0px";
      user.botElement.style.bottom = "0px";

      document.body.appendChild(user.botElement)
    }
    botKeyDown(code) {
      user.botElement.contentWindow.extern && user.botElement.contentWindow.extern.onKeyDown(core.keyCodeTable[code]);
    }
    botKeyUp(code) {
      user.botElement.contentWindow.extern && user.botElement.contentWindow.extern.onKeyUp(core.keyCodeTable[code]);
    }
    botMouseTo(x, y) {
      user.botElement.contentWindow.extern && user.botElement.contentWindow.extern.onTouchMove(-1, x, y);
    }
    handleBotKeys() {
      for (const [key, state] of Object.entries(user.keyStates)) {
        if (core.movementKeys.includes(key)) continue;
        if (state) user.botKeyDown(key);
        else user.botKeyUp(key);
      }
    }
    handleBotMovement() {
      const movementType = ui.getSetting("Movement Type");
      const deltaX = user.posX - user.botData.wx;
      const deltaY = user.posY - user.botData.wy;
      const dir = Math.atan2(deltaY, deltaX);
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > (movementType === 1 ? user.COPY_MOVEMENT_RADIUS * 1.8 : user.COPY_MOVEMENT_RADIUS)) {
        core.movementKeys.forEach(key => user.botKeyUp(key));
        if (dir > -Math.PI * 2 / 6 && dir < Math.PI * 2 / 6) user.botKeyDown("KeyD");
        else if (dir < -Math.PI * 4 / 6 || dir > Math.PI * 4 / 6) user.botKeyDown("KeyA");
        if (dir > Math.PI * 1 / 6 && dir < Math.PI * 5 / 6) user.botKeyDown("KeyS");
        else if (dir > -Math.PI * 5 / 6 && dir < -Math.PI * 1 / 6) user.botKeyDown("KeyW");
      } else {
        if (movementType === 0) {
          core.movementKeys.forEach(key => user[user.keyStates[key] ? "botKeyDown" : "botKeyUp"](key));
        } else if (movementType === 1) {
          core.movementKeys.forEach(key => user.botKeyUp(key));
        }
      }
    }
    handleBotMouse() {
      const aimType = ui.getSetting("Aim Type");
      console.log(aimType)
      let mouseX = 0;
      let mouseY = 0;

      if (aimType === 0) {
        mouseX = user.botData.innerWidth / 2 + (user.mouseWX - user.botData.wx) * (user.botData.fov / 2.8);
        mouseY = user.botData.innerHeight / 2 + (user.mouseWY - user.botData.wy) * (user.botData.fov / 2.8);
      } else if (aimType === 1) {
        mouseX = (user.mouseSX / window.innerWidth) * user.botData.innerWidth;
        mouseY = (user.mouseSY / window.innerHeight) * user.botData.innerHeight;
      } else if (aimType === 2) {
        mouseX = user.botData.innerWidth / 2 - (user.mouseWX - user.botData.wx) * (user.botData.fov / 2.8);
        mouseY = user.botData.innerHeight / 2 - (user.mouseWY - user.botData.wy) * (user.botData.fov / 2.8);
      }
      user.botMouseTo(mouseX, mouseY);
    }
    setupGui() {
      ui.addOption("Multibox", {
        text: "Auto Spawn Bot",
        type: "bool"
      });
      ui.addOption("Multibox", {
        text: "Enable Multibox",
        type: "bool"
      }, (value) => {
        if (!value) {
          setTimeout(() => {
            this.botKeyUp("KeyW");
            this.botKeyUp("KeyA");
            this.botKeyUp("KeyS");
            this.botKeyUp("KeyD");
            this.botKeyUp("Space");
          }, 100);
        }
      });
      ui.addOption("Multibox", {
        text: "Aim Type",
        type: "toggle",
        values: ["Precise", "Copy", "Reverse"]
      });
      ui.addOption("Multibox", {
        text: "Movement Type",
        type: "toggle",
        values: ["Normal", "Follow"]
      });

    }
  }

  class Bot {
    constructor() {
      this.UPDATE_INTERVAL = 50; //ms
      this.shapeRenderingPosition = 0;
      this.shapeVertices = new Array(0);
      this.arrowPos = [0, 0];
      this.minimapPos = [0, 0];
      this.minimapDim = [0, 0];
      this.fov = 0.5;
      this.posX = 0;
      this.posY = 0;
      this.userData = {};
      this.lobbyData = {};
      this.hasSpawned = false;
      this.lastSpawnTimestamp = Date.now();
      this.MAX_SPAWN_INTERVAL = 1500;
      this.name = "";
      this.lastUpgradeTimestamp = Date.now();
      this.MAX_UPGRADE_INTERVAL = 2000;
    }
    onTick() {
      extern.set_convar("net_predict_movement", 0);
      bot.userData = JSON.parse(localStorage.getItem("userData") || "{}");
      bot.setBotData();
      bot.handleLobby();
      bot.handleStatBuild();
      bot.handleClassUpgrade();
      bot.handleSpawning();

    }
    init() {
      bot.applyHooks();
      setInterval(bot.onTick, bot.UPDATE_INTERVAL);

    }
    applyHooks() {
      canvasHook.addHook("stroke", function(_context, ...args) {
        if (["#cccccc", "#cdcdcd"].includes(_context.fillStyle) && _context.strokeStyle == "#000000") {
          bot.fov = (_context.globalAlpha / 0.05);
        }
        return [_context, args];
      });
      canvasHook.addHook("strokeRect", function(_context, ...args) {
        const t = _context.getTransform();
        bot.minimapPos = [t.e, t.f];
        bot.minimapDim = [t.a, t.d];
        return [_context, args];
      });
      canvasHook.addHook("beginPath", function(_context, ...args) {
        bot.shapeRenderingPosition = 0;
        bot.shapeVertices = new Array(0);
        return [_context, args];
      });
      canvasHook.addHook("moveTo", function(_context, ...args) {
        bot.shapeRenderingPosition = 1;
        bot.shapeVertices.push(args);
        return [_context, args];
      });
      canvasHook.addHook("lineTo", function(_context, ...args) {
        bot.shapeRenderingPosition++;
        bot.shapeVertices.push(args);
        return [_context, args];
      });
      canvasHook.addHook("fill", function(_context, ...args) {
        if (_context.fillStyle == "#000000" && _context.globalAlpha > 0.949 && bot.shapeRenderingPosition === 3) {
          bot.arrowPos = core.mean2d(bot.shapeVertices);
          const dx = bot.arrowPos[0] - bot.minimapPos[0];
          const dy = bot.arrowPos[1] - bot.minimapPos[1];
          const x = (dx / bot.minimapDim[0]) * core.ARENA_SIZE;
          const y = (dy / bot.minimapDim[1]) * core.ARENA_SIZE;

          if (core.inBounds(x, y)) {
            [bot.posX, bot.posY] = [x, y];
            [bot.mouseWX, bot.mouseWY] = [x + (bot.mouseSX - window.innerWidth / 2) / (bot.fov / 2.8), y + (bot.mouseSY - window.innerHeight / 2) / (bot.fov / 2.8)];
          }
        }
        return [_context, args];
      });

      externHook.addHook("connectLobby", function(teamFlag, region, address, arg3, arg4, cToken) {
        teamFlag = bot.userData.lobbyData.teamFlag;
        region = bot.userData.lobbyData.region;
        address = bot.userData.lobbyData.address;
        arg4 = bot.userData.lobbyData.teamFlag;

        bot.lobbyData = {
          teamFlag,
          region,
          address
        };
        return [teamFlag, region, address, arg3, arg4, cToken];
      });

    }
    setBotData() {
      const dataToSend = {
        wx: bot.posX,
        wy: bot.posY,
        fov: bot.fov,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      }
      localStorage.setItem("botData", JSON.stringify(dataToSend));
    }
    handleLobby() {
      if (bot.lobbyData?.address !== bot.userData.lobbyData.address ||
        bot.lobbyData?.region !== bot.userData.lobbyData.region ||
        bot.lobbyData?.teamFlag !== bot.userData.lobbyData.teamFlag) {
        document.getElementById("exit-yes") && document.getElementById("exit-yes").click();
      }
    }
    handleStatBuild() {
      if (!extern.doesHaveTank()) return;
      const stats = bot?.userData?.statBuild || "";
      extern.set_convar("game_stats_build", stats);
    }
    handleClassUpgrade() {
      if (!bot?.userData?.upgradesPath) return;
      const path = bot.userData.upgradesPath;
      const tank = tankData.getTank();
      const upgrades = classUpgrade.getUpgrades();
      const ind = path.indexOf(tank);

      if (![-1, path.length - 1].includes(ind)) {
        const nextUpgrade = upgrades.find(button => button.text === path[ind + 1]);

        if (nextUpgrade && Date.now() - bot.lastUpgradeTimestamp >= bot.MAX_UPGRADE_INTERVAL) {
          bot.lastUpgradeTimestamp = Date.now();
          const [sx, sy] = core.canvasToScreen(nextUpgrade.x, nextUpgrade.y);
          extern.onTouchStart(-2, sx, sy);
          extern.onTouchEnd(-2, sx, sy);
        }
      }

    }
    handleSpawning() {
      if (extern.doesHaveTank()) {
        bot.hasSpawned = true;
      } else {
        if (Date.now() - bot.lastSpawnTimestamp >= bot.MAX_SPAWN_INTERVAL) {
          extern.try_spawn(bot.name);
        }
      }
    }
  }

  bot = new Bot();
  user = new User();
  fov = new Fov();
  ui = new Ui();
  externHook = new ExternHook();
  canvasHook = new CtxHook();
  classUpgrade = new Upgrade();
  core = new Core;
  statBuild = new StatBuild();
  tankData = new TankData();

  const inIframe = unsafeWindow.self !== unsafeWindow.top;

  function awaitGameInit() {
    if (typeof extern === 'undefined') return;
    clearInterval(awaitGameInitInt);

    tankData.init();
    classUpgrade.init();

    if (inIframe) {
      bot.init();
    } else {
      ui.createInterface();
      statBuild.init();

      fov.init();
      user.init();
    }
  }
  let awaitGameInitInt = setInterval(awaitGameInit, 400);

})();
