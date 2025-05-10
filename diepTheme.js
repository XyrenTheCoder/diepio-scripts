// ==UserScript==
// @name         Diep Themes
// @version      1.0
// @author       Clever Yeti
// @description  alt + T to open settings
// @match        https://diep.io/*
// @run-at       document-start
// ==/UserScript==

const sbUrl = "https://ieidkvuimvqagidmxefk.supabase.co"
const sbAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaWRrdnVpbXZxYWdpZG14ZWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTgwNjAsImV4cCI6MjA1MzA3NDA2MH0.tF-wnl1XaT6dsuaBzoGH3q5gjWIA-uCzKzQa1r_IE88"
const diepThemes = {
    window: typeof unsafeWindow != "undefined" ? unsafeWindow : window,

    themeVariables: {
        "ffaFriendlyColor": {
            name: "FFA Friendly Tank Color",
            command: "net_replace_color 2",
            type: "color",
            defaultValue: "00B1DE",
            category: "Tanks",
        },
        "ffaEnemyColor": {
            name: "FFA Enemy Tank Color",
            command: "net_replace_color 15",
            type: "color",
            defaultValue: "F14E54",
            category: "Tanks",
        },
        "blueTeamColor": {
            name: "Blue Team Color",
            command: "net_replace_color 3",
            type: "color",
            defaultValue: "00B1DE",
            category: "Tanks",
        },
        "redTeamColor": {
            name: "Red Team Color",
            command: "net_replace_color 4",
            type: "color",
            defaultValue: "F14E54",
            category: "Tanks",
        },
        "purpleTeamColor": {
            name: "Purple Team Color",
            command: "net_replace_color 5",
            type: "color",
            defaultValue: "BF7FF5",
            category: "Tanks",
        },
        "greenTeamColor": {
            name: "Green Team Color",
            command: "net_replace_color 6",
            type: "color",
            defaultValue: "00E16E",
            category: "Tanks",
        },
        "fallenBossColor": {
            name: "Fallen Boss Color",
            command: "net_replace_color 17",
            type: "color",
            defaultValue: "C6C6C6",
            category: "Tanks",
        },
        "arenaCloserColor": {
            name: "Arena Closer Color",
            command: "net_replace_color 12",
            type: "color",
            defaultValue: "FFE869",
            category: "Tanks",
        },
        "cannonColor": {
            name: "Tank Cannon Color",
            command: "net_replace_color 1",
            type: "color",
            defaultValue: "999999",
            category: "Tanks",
        },
        "smasherColor": {
            name: "Smasher Color",
            command: "net_replace_color 0",
            type: "color",
            defaultValue: "4F4F4F",
            category: "Tanks",
        },
    
    
    
    
    
        "squareColor": {
            name: "Square Color",
            command: "net_replace_color 8",
            type: "color",
            defaultValue: "FFE869",
            category: "Shapes",
        },
        "triangleColor": {
            name: "Triangle Color",
            command: "net_replace_color 9",
            type: "color",
            defaultValue: "FC7677",
            category: "Shapes",
        },
        "pentagonColor": {
            name: "Pentagon Color",
            command: "net_replace_color 10",
            type: "color",
            defaultValue: "768DFC",
            category: "Shapes",
        },
        "shinyShapeColor": {
            name: "Shiny Shape Color",
            command: "net_replace_color 7",
            type: "color",
            defaultValue: "89FF69",
            category: "Shapes",
        },
        "crasherColor": {
            name: "Crasher Color",
            command: "net_replace_color 11",
            type: "color",
            defaultValue: "F177DD",
            category: "Shapes",
        },
        "necroDroneColor": {
            name: "Necromancer Drone Color",
            command: "net_replace_color 16",
            type: "color",
            defaultValue: "FCC376",
            category: "Shapes",
        },
    
    
    
        "backgroundColor": {
            name: "Background Color",
            command: "ren_background_color",
            type: "color",
            defaultValue: "CDCDCD",
            category: "World",
        },
        "gridColor": {
            name: "Grid Color",
            command: "ren_grid_color",
            type: "color",
            defaultValue: "000000",
            category: "World",
        },
        "gridOpacity": {
            name: "Grid Opacity",
            command: "ren_grid_base_alpha",
            type: "opacity",
            defaultValue: 0.1,
            category: "World",
        },
        "worldBorderColor": {
            name: "World Border Color",
            command: "ren_border_color",
            type: "color",
            defaultValue: "797979",
            category: "World",
        },
        "worldBorderOpacity": {
            name: "World Border Opacity",
            command: "ren_border_color_alpha",
            type: "opacity",
            defaultValue: 0.1,
            category: "World",
        },
        "mazeWallColor": {
            name: "Maze Wall Color",
            command: "net_replace_color 14",
            type: "color",
            defaultValue: "BBBBBB",
            category: "World",
        },
    
    
    
    
    
        "newOutlines": {
            name: "Use New Outlines",
            command: "ren_stroke_soft_color",
            type: "boolean",
            defaultValue: true,
            category: "Outlines",
        },
        "outlineOpacity": {
            name: "Outline Opacity (new outlines)",
            command: "ren_stroke_soft_color_intensity",
            type: "opacity",
            defaultValue: 0.25,
            category: "Outlines",
        },
        "oldOutlineColor": {
            name: "Outline Color (old outlines)",
            command: "ren_stroke_solid_color",
            type: "color",
            defaultValue: "555555",
            category: "Outlines",
        },
    
    
        
        "uiColors": {
            name: "UI Rainbow Colors",
            command: "ui_replace_colors",
            type: "uiColors",
            defaultValue: ["43fff9", "82ff43", "ff4343", "ffde43", "437fff", "8543ff", "f943ff", "fcad76"],
            category: "UI Rainbow Colors",
        },
      
      
      
    
        "minimapBackgroundColor": {
            name: "Minimap Background Color",
            command: "ren_minimap_background_color",
            type: "color",
            defaultValue: "CDCDCD",
            category: "Interface",
        },
        "minimapBorderColor": {
            name: "Minimap Border Color",
            command: "ren_minimap_border_color",
            type: "color",
            defaultValue: "797979",
            category: "Interface",
        },
        "barBackground": {
            name: "Bar Background Color",
            command: "ren_bar_background_color",
            type: "color",
            defaultValue: "000000",
            category: "Interface",
        },
        "scoreBarFillColor": {
            name: "Score Bar Fill Color",
            command: "ren_score_bar_fill_color",
            type: "color",
            defaultValue: "43FF91",
            category: "Interface",
        },
        "xpBarFillColor": {
            name: "XP Bar Fill Color",
            command: "ren_xp_bar_fill_color",
            type: "color",
            defaultValue: "FFDE43",
            category: "Interface",
        },
        "leaderboardBarFill": {
            name: "Leaderboard Bar Fill Color",
            command: "net_replace_color 13",
            type: "color",
            defaultValue: "64FF8C",
            category: "Interface",
        },
        "healthBarBackground": {
            name: "Health Bar Background Color",
            command: "ren_health_background_color",
            type: "color",
            defaultValue: "555555",
            category: "Interface",
        },
        "healthBarFill": {
            name: "Health Bar Fill Color",
            command: "ren_health_fill_color",
            type: "color",
            defaultValue: "A9FFAA",
            category: "Interface",
        },
    },

    otherVariables: {
        "showHealthValues": {
            name: "Show Health Numbers",
            command: "ren_raw_health_values",
            type: "boolean",
            defaultValue: false,
            category: "Extra Interface",
        },
        "showFPS": {
            name: "Show FPS Number",
            command: "ren_fps",
            type: "boolean",
            defaultValue: false,
            category: "Extra Interface",
        },


        "showDebugHitboxes": {
            name: "Show Debug Boxes",
            command: "ren_debug_collisions",
            type: "boolean",
            defaultValue: false,
            category: "Debug Interface",
        },
        "showDebugInfo": {
            name: "Show Debug Info",
            command: "ren_debug_info",
            type: "boolean",
            defaultValue: false,
            category: "Debug Interface",
        },
        
        
        "showUI": {
            name: "Show Interface",
            command: "ren_ui",
            type: "boolean",
            defaultValue: true,
            category: "Interface Elements",
        },
        "showHealthBars": {
            name: "Show Health Bars",
            command: "ren_health_bars",
            type: "boolean",
            defaultValue: true,
            category: "Interface Elements",
        },
        "showNames": {
            name: "Show Names",
            command: "ren_names",
            type: "boolean",
            defaultValue: true,
            category: "Interface Elements",
        },
        "showScoreboard": {
            name: "Show Scoreboard",
            command: "ren_scoreboard",
            type: "boolean",
            defaultValue: true,
            category: "Interface Elements",
        },
        "showScoreboardNames": {
            name: "Show Scoreboard Names",
            command: "ren_scoreboard_names",
            type: "boolean",
            defaultValue: true,
            category: "Interface Elements",
        },
        "showStatUpgrades": {
            name: "Show Stat Upgrades",
            command: "ren_stats",
            type: "boolean",
            defaultValue: true,
            category: "Interface Elements",
        },
        "showTankUpgrades": {
            name: "Show Tank Upgrades",
            command: "ren_upgrades",
            type: "boolean",
            defaultValue: true,
            category: "Interface Elements",
        },
    },

    shadowVariables: {
        "enableShadow": {
            name: "Enable Shadows (performance hit)",
            type: "boolean",
            defaultValue: false,
            category: "Shadows",
        },
        "shadowRadius": {
            name: "Blur Radius",
            type: "opacity",
            defaultValue: 10,
            category: "Shadows",
        },
        "shadowX": {
            name: "X Offset",
            type: "opacity",
            defaultValue: 4,
            category: "Shadows",
        },
        "shadowY": {
            name: "Y Offset",
            type: "opacity",
            defaultValue: 4,
            category: "Shadows",
        },
        "shadowColor": {
            name: "Shadow Color",
            type: "color",
            defaultValue: "000000",
            category: "Shadows",
        },
        "shadowOpacity": {
            name: "Shadow Opacity",
            type: "opacity",
            defaultValue: 0.14,
            category: "Shadows",
        }
    },

    settings: {
        currentTheme: null, // uuid
        savedThemes: {
            
        },
        otherSettings: {

        },
        shadowSettings: {

        }
    },

    getSettingsDefaultValues: function(info) {
        return Object.fromEntries(Object.entries(info).map(([key, info]) => {
            if (info.type == "uiColors") return [key, [...info.defaultValue]]
            return [key, info.defaultValue]
        }))
    },

    init: function() {
        diepThemes.window.diepThemes = diepThemes

        // cloning default settings
        diepThemes.settings.shadowSettings = this.getSettingsDefaultValues(diepThemes.shadowVariables);
        diepThemes.settings.otherSettings = this.getSettingsDefaultValues(diepThemes.otherVariables);
        diepThemes.settings.shadowSettings = this.getSettingsDefaultValues(diepThemes.shadowVariables);

		// load settings
		try {
            const savedSettings = diepThemes.window.localStorage.getItem("diep_themes_settings") ? JSON.parse(window.localStorage.getItem("diep_themes_settings")) : {}
            if (savedSettings.currentTheme) diepThemes.settings.currentTheme = savedSettings.currentTheme
            if (savedSettings.savedThemes) {
                for (let themeId in savedSettings.savedThemes) {
                    const validated = diepThemes.validateTheme(savedSettings.savedThemes[themeId])
                    if (validated) diepThemes.settings.savedThemes[themeId] = validated
                }
            }
            if (savedSettings.otherSettings) {
                const validated = diepThemes.validateOtherSettings(savedSettings.otherSettings)
                if (validated) diepThemes.settings.otherSettings = validated
            }
            if (savedSettings.shadowSettings) {
                const validated = diepThemes.validateShadowSettings(savedSettings.shadowSettings)
                if (validated) diepThemes.settings.shadowSettings = validated
            }
		} catch(err) {
            console.warn(err)
            alert("failed to load diep themes settings")
		}
        
        // default theme
        diepThemes.settings.savedThemes["DEFAULT"] = {
            "name": "Default Theme",
            "values": this.getSettingsDefaultValues(diepThemes.themeVariables)
        }
        if (!diepThemes.settings.savedThemes[diepThemes.settings.currentTheme]) diepThemes.settings.currentTheme = "DEFAULT"

        // detecting when ready
        const interval = diepThemes.window.setInterval(function() {
            if(diepThemes.window.input != null) {
                diepThemes.window.clearInterval(interval);
                diepThemes.onready();
            }
        }, 100)
    },

    onready: function() {
        // adding the ionicons module
		;(()=>{
            const scriptModule = document.createElement("script");
            scriptModule.type = "module";
            scriptModule.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
            diepThemes.window.document.body.appendChild(scriptModule);
            const scriptNoModule = document.createElement("script");
            scriptNoModule.setAttribute("nomodule", "");
            scriptNoModule.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
            diepThemes.window.document.body.appendChild(scriptNoModule);
        })();

        // styling
        ;(()=>{
            // global styling
            diepThemes.injectCSS(`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                :root {
                    --diep-themes-text-1: #dddddd;
                    --diep-themes-text-2: #cccccc;
                    --diep-themes-text-3: #aaaaaa;
                    --diep-themes-section-bg: #303030;
                    --diep-themes-dark-section-bg: #1c1c1c;
                    --diep-themes-main-bg: #171718;
                    --diep-themes-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                }

                .diep-themes-menu *, .diep-themes-menu *:before, .diep-themes-menu *:after {
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    flex-shrink: 0;
                    font-family: "Inter" !important;
                }
            `)

            // styling for all menus
            diepThemes.injectCSS(`
                .diep-themes-menu {
                    position: fixed;
                    inset: 0 auto 0 0;
                    margin: 0.5rem;
                    background: var(--diep-themes-dark-section-bg);
                    border-radius: 0.5rem;
                    display: grid;
                    grid-template-rows: auto 1fr;
                    overflow: hidden;
                    z-index: 10000000;
                    color: var(--diep-themes-text-1);
                }
                .diep-themes-menu > .topbar {
                    height: 3rem;
                    border-bottom: 1px solid #ffffff33;
                    display: flex;
                    margin: 0;
                }

                .diep-themes-menu > .topbar > .backbutton {
                    height: 100%;
                    aspect-ratio: 1 / 1;
                    display: grid;
                    place-content: center;
                    font-size: 1.25rem;
                    --ionicon-stroke-width: 48px;
                    cursor: pointer;
                }
                .diep-themes-menu > .topbar > .header {
                    display: flex;
                    align-items: center;
                    color: var(--diep-themes-text-1);
                    font-weight: 500;
                    flex-grow: 1;
                }
                .diep-themes-menu > .topbar > .button {
                    height: 100%;
                    aspect-ratio: 1 / 1;
                    display: grid;
                    place-content: center;
                    font-size: 1.125rem;
                    --ionicon-stroke-width: 48px;
                    cursor: pointer;
                }

                
                .diep-themes-menu > .content > .action-buttons {
                    display: flex;
                    padding: 0.75rem;
                    gap: 0.75rem;
                }

                .diep-themes-menu > .content > .action-buttons > .button {
                    height: 1.75rem;
                    display: flex;
                    background: var(--diep-themes-section-bg);
                    box-shadow: inset 0 0 0 1px #ffffff22;
                    border-radius: 0.5rem;
                    align-items: center;
                    justify-content: center;
                    padding-bottom: 0.125rem;
                    flex-grow: 1;
                    cursor: pointer;
                }
                .diep-themes-menu > .content > .action-buttons > .button:hover {
                    background: #505050;
                    box-shadow: inset 0 0 0 1px #ffffff44;
                }
                .diep-themes-menu > .content > .action-buttons > .icon-button {
                    height: 1.75rem;
                    width: 1.75rem;
                    display: grid;
                    place-content: center;
                    background: var(--diep-themes-section-bg);
                    box-shadow: inset 0 0 0 1px #ffffff22;
                    border-radius: 0.5rem;
                    padding-bottom: 0.125rem;
                    --ionicon-stroke-width: 48px;
                    cursor: pointer;
                }
                .diep-themes-menu > .content > .action-buttons > .icon-button:hover {
                    background: #505050;
                    box-shadow: inset 0 0 0 1px #ffffff44;
                }
                .diep-themes-menu > .content > .action-buttons > .icon-button.red {
                    background: #4f2828;
                    color:rgb(207, 127, 127);
                }
                .diep-themes-menu > .content > .action-buttons > .icon-button.red:hover {
                    background: #804141;
                    color:rgb(255, 190, 190);
                }



                .diep-themes-menu > .content > .action-buttons > .button > .icon {
                    height: 1.625rem;
                    width: 1.625rem;
                    display: grid;
                    place-content: center;
                    --ionicon-stroke-width: 48px;
                    margin-left: 0.125rem;
                }
               .diep-themes-menu > .content > .action-buttons > .button > .text {
                    padding-right: 0.5rem;
                }


                .diep-themes-menu *::-webkit-scrollbar {
                    width: 12px;
                }

                .diep-themes-menu *::-webkit-scrollbar-track {
                    background: var(--diep-themes-dark-section-bg);
                }

                .diep-themes-menu *::-webkit-scrollbar-thumb {
                    background-color: var(--diep-themes-section-bg);
                    border-radius: 1rem;
                    border: 0.1875rem solid var(--diep-themes-dark-section-bg);
                }`)
            
            // home menu
            diepThemes.injectCSS(`
                #diep-themes-home-menu {
                    width: 30rem;
                }

                #diep-themes-home-menu > .content {
                    overflow-y: scroll;
                    height: 100%;
                }

                #diep-themes-home-menu > .content > .theme-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    margin: 0.5rem 0.75rem 0.75rem 0.75rem;
                    gap: 0.75rem;
                }

                #diep-themes-home-menu > .content > .theme-grid > .theme {
                    background: var(--diep-themes-section-bg);
                    box-shadow: inset 0 0 0 1px #ffffff22;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    color: var(--diep-themes-text-3);
                    cursor: pointer;
                }
                #diep-themes-home-menu > .content > .theme-grid > .theme[data-active="true"] {
                    background: #707070;
                    box-shadow: inset 0 0 0 1px #ffffff55;
                    color: white !important;
                }

                #diep-themes-home-menu > .content > .theme-grid > .theme > .theme-preview {
                    width: 100%;
                    aspect-ratio: 7/5;
                    position: relative;
                }

                #diep-themes-home-menu > .content > .theme-grid > .theme > .theme-preview > svg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                }

                #diep-themes-home-menu > .content > .theme-grid > .theme > .info {
                    padding: 0.25rem 0.375rem;
                }
            `)

            // edit menu an other settings
            diepThemes.injectCSS(`
                #diep-themes-edit-menu {
                    width: 23rem;
                }

                #diep-themes-edit-menu > .content {
                    overflow-y: scroll;
                    height: 100%;
                    padding: 0.125rem 0.25rem 0.5rem 0.25rem;
                }

                #diep-themes-edit-menu *::-webkit-scrollbar {
                    width: 12px;
                }

                #diep-themes-edit-menu *::-webkit-scrollbar-track {
                    background: var(--diep-themes-dark-section-bg);
                }

                #diep-themes-edit-menu *::-webkit-scrollbar-thumb {
                    background-color: var(--diep-themes-section-bg);
                    border-radius: 1rem;
                    border: 0.1875rem solid var(--diep-themes-dark-section-bg);
                }



                #diep-themes-edit-menu > .content > .category-title {
                    margin: 0.5rem 0.5rem 0.375rem 0.5rem;
                    font-weight: 500;
                    font-size: 1.125rem;
                }
                #diep-themes-edit-menu > .content > .category-title:not(:first-child) {
                    margin-top: 1.5rem;
                }

                #diep-themes-edit-menu > .content > .setting-row {
                    height: 1.75rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 0.25rem 0.5rem;
                }
                #diep-themes-edit-menu > .content > .setting-row.ui-colors {
                    display: grid;
                    height: auto;
                    grid-template-columns: auto auto auto;
                    gap: 0.25rem;
                    place-content: start;
                    padding-left: 0.5rem;
                }


                #diep-themes-edit-menu > .content > .setting-row > .setting-name {
                    font-size: 1rem;
                    color: var(--diep-themes-text-2);
                    padding-left: 0.5rem;
                }
                #diep-themes-edit-menu > .content > .setting-row > .setting-color-input {
                    height: 1.75rem;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    background: var(--diep-themes-section-bg);
                    display: flex;
                    box-shadow: inset 0 0 0 1px #ffffff22;
                }
                #diep-themes-edit-menu > .content > .setting-row > .setting-color-input > .preview {
                    position: relative;
                    height: 100%;
                    aspect-ratio: 1 / 1;
                    background: var(--value);
                    box-shadow: inset 0 0 0 1px #aaaaaa44;
                    border-radius: 0.5rem 0 0 0.5rem
                }
                #diep-themes-edit-menu > .content > .setting-row > .setting-color-input > .preview > input {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
                #diep-themes-edit-menu > .content > .setting-row > .setting-color-input > input {
                    background: none;
                    border: none;
                    color: var(--diep-themes-text-2);
                    width: 4rem;
                    font-family: monospace !important;
                    font-size: 1rem;
                    padding-left: 0.25rem;
                    padding-bottom: 0.125rem;
                    outline: none;
                    border-radius: 0 0.5rem 0.5rem 0;
                }
                #diep-themes-edit-menu > .content > .setting-row > .setting-color-input > input:focus {
                    box-shadow: inset 0 0 0 1px #ffffff22;
                    background: #ffffff22;
                }

                #diep-themes-edit-menu > .content > .setting-row > .setting-toggle-input {
                    margin: 0 0.25rem;
                    height: 1.25rem;
                    width: 1.25rem;
                    border-radius: 0.375rem;
                    overflow: hidden;
                    background: var(--diep-themes-section-bg);
                    box-shadow: inset 0 0 0 1px #ffffff22;
                    display: grid;
                    place-content: center;
                    color: transparent;
                    cursor: pointer;
                }

                #diep-themes-edit-menu > .content > .setting-row > .setting-toggle-input.on {
                    background: #aaaaaa;
                    box-shadow: inset 0 0 0 1px #ffffffaa;
                    color: black;
                    --ionicon-stroke-width: 48px;
                }

                #diep-themes-edit-menu > .content > .setting-row > .setting-number-input {
                    height: 1.75rem;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    background: var(--diep-themes-section-bg);
                    display: flex;
                    box-shadow: inset 0 0 0 1px #ffffff22;
                }
                #diep-themes-edit-menu > .content > .setting-row > .setting-number-input > input {
                    background: none;
                    border: none;
                    color: var(--diep-themes-text-2);
                    width: 4rem;
                    font-family: monospace;
                    font-size: 1rem;
                    padding-left: 0.5rem;
                    padding-bottom: 0.125rem;
                    outline: none;
                    border-radius: 0 0.5rem 0.5rem 0;
                }
                #diep-themes-edit-menu > .content > .setting-row > .setting-number-input > input:focus {
                    box-shadow: inset 0 0 0 1px #ffffff22;
                    background: #ffffff22;
                }

                #diep-themes-edit-menu > .content > .setting-row > .setting-number-input > input::-webkit-outer-spin-button,
                #diep-themes-edit-menu > .content > .setting-row > .setting-number-input > input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }



                #diep-themes-edit-menu > .content > .setting-row > .setting-text-input {
                    height: 1.75rem;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    background: var(--diep-themes-section-bg);
                    display: flex;
                    box-shadow: inset 0 0 0 1px #ffffff22;
                }
                #diep-themes-edit-menu > .content > .setting-row > .setting-text-input > input {
                    background: none;
                    border: none;
                    width: 14rem;
                    color: var(--diep-themes-text-2);
                    font-size: 1rem;
                    padding-left: 0.5rem;
                    padding-bottom: 0.125rem;
                    outline: none;
                    border-radius: 0.5rem;
                }
                #diep-themes-edit-menu > .content > .setting-row > .setting-number-input > input:focus {
                    box-shadow: inset 0 0 0 1px #ffffff22;
                    background: #ffffff22;
                }
            `)

            // import menu
            diepThemes.injectCSS(`
                #diep-themes-import-menu {
                    width: 25rem;
                }

                #diep-themes-import-menu > .content {
                    height: 100%;
                    display: grid;
                    grid-template-rows: auto 1fr;
                }

                #diep-themes-import-menu > .content > textarea {
                    margin: 0.75rem;
                    width: calc(100% - 1.5rem);
                    height: calc(100% - 1.5rem);
                    padding: 0.25rem 0.5rem;
                    resize: none;
                    border: none;
                    background: var(--diep-themes-section-bg);
                    box-shadow: inset 0 0 0 1px #ffffff22;
                    border-radius: 0.5rem;
                    border: none;
                    outline: none;
                    font-family: monospace !important;
                    color: var(--diep-themes-text-1);
                }

                #diep-themes-import-menu > .content > textarea:focus {
                    background: #505050;
                    box-shadow: inset 0 0 0 1px #ffffff44;
                }


            `)

            // browse menu
            diepThemes.injectCSS(`
                #diep-themes-browse-menu {
                    width: 30rem;
                }

                #diep-themes-browse-menu > .content {
                    overflow-y: scroll;
                    height: 100%;
                }

                #diep-themes-browse-menu > .content > .theme-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    margin: 0.75rem 0.75rem 0.75rem 0.75rem;
                    gap: 0.75rem;
                }

                #diep-themes-browse-menu > .content > .theme-grid > .theme {
                    background: var(--diep-themes-section-bg);
                    box-shadow: inset 0 0 0 1px #ffffff22;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    color: var(--diep-themes-text-3);
                    cursor: pointer;
                    display: grid;
                }
                #diep-themes-browse-menu > .content > .theme-grid > .theme[data-active="true"] {
                    background: #707070;
                    box-shadow: inset 0 0 0 1px #ffffff55;
                    color: white !important;
                }

                #diep-themes-browse-menu > .content > .theme-grid > .theme > .theme-preview {
                    width: 100%;
                    aspect-ratio: 7/5;
                    position: relative;
                }

                #diep-themes-browse-menu > .content > .theme-grid > .theme > .theme-preview > svg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                }

                #diep-themes-browse-menu > .content > .theme-grid > .theme > .bottom-bar {
                    display: grid;
                    grid-template-columns: 1fr auto
                }
                
                
                #diep-themes-browse-menu > .content > .theme-grid > .theme > .bottom-bar > .info {
                    padding: 0.25rem 0.375rem;
                }
                #diep-themes-browse-menu > .content > .theme-grid > .theme > .bottom-bar > .info > .name {
                    color: var(--diep-themes-text-1);
                }
                #diep-themes-browse-menu > .content > .theme-grid > .theme > .bottom-bar > .info[data-active="true"] > .name {
                    color: white !important;
                }
                #diep-themes-browse-menu > .content > .theme-grid > .theme > .bottom-bar > .info > .author {
                    font-size: 0.75rem;
                    display: flex;
                    align-items: center
                    margin-bottom: 0.125rem;
                    transform: translateY(-0.0625rem);
                    gap: 0.125rem;
                }
                #diep-themes-browse-menu > .content > .theme-grid > .theme > .bottom-bar > .info > .author > .icon {
                    display: flex;
                    align-items: center    
                    font-size: 0.75rem;
                    transform: translateY(0.06rem)
                }
                

                #diep-themes-browse-menu > .content > .theme-grid > .theme > .bottom-bar > .download {
                    display: grid;
                    place-content: center;
                    margin: 0 0.5rem;
                }

                #diep-themes-browse-menu > .content > .theme-grid > .theme > .bottom-bar > .download > .button {
                    height: 1.75rem;
                    width: 1.75rem;
                    display: grid;
                    place-content: center;
                    background: #ffffff44;
                    box-shadow: inset 0 0 0 1px #ffffff44;
                    border-radius: 0.5rem;
                    padding-bottom: 0.125rem;
                    --ionicon-stroke-width: 48px;
                    cursor: pointer;
                    color: #ffffff;
                }
                #diep-themes-browse-menu > .content > .theme-grid > .theme > .bottom-bar > .download > .button:hover {
                    background:#ffffff88;
                    box-shadow: inset 0 0 0 1px #ffffff66;
                    color: #ffffff;
                }

            `)


        })();

        // listening to the keybind
        ;(()=>{
            diepThemes.window.document.addEventListener("keydown", (event) => {
                if ((event.altKey) && event.which === 84) {
                    event.preventDefault();
                    diepThemes.toggleMenu()
                }
            })
        })();

        // apply the selected theme
        diepThemes.applyTheme(diepThemes.settings.savedThemes[diepThemes.settings.currentTheme])
        
        // auto-applying shadows constantly
        setInterval(() => {
            this.applyShadowSettings();
        }, 1000)
    },

    injectCSS: function(css) {
		let el = document.createElement("style")
		el.innerHTML = css
		diepThemes.window.document.body.appendChild(el)
	},

    isEditMenuOpen: false,
    currentMenu: null,
    currentMenuEl: null,
    downloadedThemes: [],
    sbAdminKey: null,

    setMenu: async function(newMenu) {
        if (newMenu == "edit" && this.settings.currentTheme == "DEFAULT") return
        if (diepThemes.currentMenu === newMenu) return
        
        diepThemes.window.document.querySelectorAll(":focus").forEach(el => el.blur())
        if (diepThemes.currentMenuEl) {
            diepThemes.currentMenuEl.remove()
            diepThemes.currentMenuEl = null
        }
        
        diepThemes.currentMenu = newMenu
        
        diepThemes.applyTheme(diepThemes.settings.savedThemes[diepThemes.settings.currentTheme])
        
        // render menu 
        if (diepThemes.currentMenu == "home") {
            const homeMenuEl = diepThemes.window.document.createElement("div")
            homeMenuEl.addEventListener("click", (event) => event.stopPropagation())
            this.window.document.body.appendChild(homeMenuEl)
            this.currentMenuEl = homeMenuEl
            homeMenuEl.classList.add("diep-themes-menu")
            homeMenuEl.id = "diep-themes-home-menu"
            homeMenuEl.innerHTML = `
                <div class="topbar">
                    <div class="backbutton" onclick="diepThemes.setMenu(null)">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <div class="header">Installed Themes</div>
                    <div class="button" onclick="diepThemes.setMenu('shadow')">
                        <ion-icon name="copy" style="transform: rotate(180deg);"></ion-icon>
                    </div>
                    <div class="button" onclick="diepThemes.setMenu('settings')">
                        <ion-icon name="settings-outline"></ion-icon>
                    </div>
                </div>
                <div class="content">
                    <div class="action-buttons">
                        <div class="button" onclick="diepThemes.setMenu('import')">
                            <div class="icon">
                            <ion-icon name="document-outline"></ion-icon>
                            </div>
                            <div class="text">
                            Import
                            </div>
                        </div>
                        <div class="button" onclick="diepThemes.createNewTheme()">
                            <div class="icon">
                            <ion-icon name="brush-outline"></ion-icon>
                            </div>
                            <div class="text">
                            Create
                            </div>
                        </div>
                        <div class="button" onclick="diepThemes.setMenu('browse')">
                            <div class="icon">
                            <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <div class="text">
                            Browse Themes
                            </div>
                        </div>
                    </div>
                </div>
            `
            const contentEl = homeMenuEl.querySelector(".content")

            const gridEl = document.createElement("div")
            gridEl.classList.add("theme-grid")
            contentEl.appendChild(gridEl)

            for (let themeId in diepThemes.settings.savedThemes) {
                const theme = diepThemes.settings.savedThemes[themeId]
                
                const themeEl = document.createElement("div")
                themeEl.classList.add("theme")
                themeEl.dataset.active = diepThemes.settings.currentTheme == themeId
                gridEl.appendChild(themeEl)

                themeEl.addEventListener("click", () => {
                    if (diepThemes.settings.currentTheme == themeId) {
                        this.setMenu("edit")
                    } else {
                        this.settings.currentTheme = themeId
                        gridEl.querySelectorAll('.theme[data-active="true"]').forEach(el => el.dataset.active = false)
                        themeEl.dataset.active = true
                        this.applyTheme(this.settings.savedThemes[this.settings.currentTheme])
                    }
                })

                themeEl.appendChild(diepThemes.renderThemePreview(theme.values))

                const infoEl = document.createElement("div")
                infoEl.classList.add("info")
                themeEl.appendChild(infoEl)

                const nameEl = document.createElement("div")
                nameEl.classList.add("info")
                nameEl.innerText = theme.name
                infoEl.appendChild(nameEl)
            }
        } else if (diepThemes.currentMenu == "edit") {
            const editMenuEl = diepThemes.window.document.createElement("div")
            editMenuEl.addEventListener("click", (event) => event.stopPropagation())
            editMenuEl.classList.add("diep-themes-menu")
            editMenuEl.id = "diep-themes-edit-menu"
            editMenuEl. innerHTML = `
                <div class="topbar">
                    <div class="backbutton" onclick="diepThemes.setMenu('home')">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </div>
                    <div class="header">Editing Theme</div>
                </div>
                <div class="content">
                    <div class="action-buttons">
                        <div class="button" onclick="diepThemes.downloadCurrentTheme()">
                            <div class="icon">
                                <ion-icon name="download-outline"></ion-icon>
                            </div>
                            <div class="text">
                                Export File
                            </div>
                        </div>
                        <div class="button" onclick="diepThemes.copyCurrentTheme()">
                            <div class="icon">
                                <ion-icon name="copy-outline"></ion-icon>
                            </div>
                            <div class="text">
                                Copy as Text
                            </div>
                        </div>
                        <div class="icon-button red" onclick="diepThemes.deleteCurrentTheme()">
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>
                        ${
                            (diepThemes.sbAdminKey != null) ? `
                                <div class="icon-button admin-upload">
                                    <ion-icon name="cloud-upload-outline"></ion-icon>
                                </div>
                            ` : ""
                        }
                    </div>
                </div>
            `
            if (diepThemes.sbAdminKey) {
                editMenuEl.querySelector(".admin-upload").addEventListener("click", async () => {
                    const table = "themes"
                    const url = `${sbUrl}/rest/v1/${table}`;
                    const headers = {
                        apikey: diepThemes.sbAdminKey,
                        Authorization: `Bearer ${diepThemes.sbAdminKey}`,
                        "Content-Type": "application/json",
                    };
                    const requestData = {
                        uuid: crypto.randomUUID(),
                        views: 0,
                        theme: diepThemes.settings.savedThemes[diepThemes.settings.currentTheme]
                    }
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(requestData),
                        });
                        if (!response.ok) {
                            alert("failed to publish as admin")
                            return
                        }
                    } catch (error) {
                        alert("failed to publish as admin")
                        return
                    }
                    this.deleteCurrentTheme()
                })
            }

            document.body.appendChild(editMenuEl)
            diepThemes.currentMenuEl = editMenuEl

            const wrapperEl = editMenuEl.querySelector(".content")
            
            const currentTheme = this.settings.savedThemes[this.settings.currentTheme]
            
            // name and author
            for (let row of ["name", "author"]) {
                const rowName = {"name": "Name", "author": "Made by"}[row]
                const rowEl = document.createElement("div")
                rowEl.classList.add("setting-row")
                rowEl.classList.add(row)
                wrapperEl.appendChild(rowEl)

                const nameEl = document.createElement("div")
                nameEl.classList.add("setting-name")
                nameEl.innerText = rowName
                rowEl.appendChild(nameEl)

                rowEl.appendChild(diepThemes.renderInput.text(currentTheme[row], (val) => {
                    currentTheme[row] = val
                    diepThemes.saveSettings()
                }))
            }
            
            const categories = []
            for (let variableKey in diepThemes.themeVariables) {
                const variableInfo = diepThemes.themeVariables[variableKey]
                if (!categories.includes(variableInfo.category)) categories.push(variableInfo.category)
            }
            
            for (let category of categories) {

                const categoryTitleEl = document.createElement("div")
                categoryTitleEl.classList.add("category-title")
                categoryTitleEl.innerText = category
                wrapperEl.appendChild(categoryTitleEl)
                
                for (let variableKey in diepThemes.themeVariables) {
                    const variableInfo = diepThemes.themeVariables[variableKey]
                    if (category != variableInfo.category) continue
                    
                    const rowEl = document.createElement("div")
                    rowEl.classList.add("setting-row")
                    wrapperEl.appendChild(rowEl)
                    
                    if (variableInfo.type != "uiColors") {
                        const nameEl = document.createElement("div")
                        nameEl.classList.add("setting-name")
                        nameEl.innerText = variableInfo.name
                        rowEl.appendChild(nameEl)
                    }
                    
                    if (variableInfo.type == "color") {
                        rowEl.appendChild(diepThemes.renderInput.color(currentTheme.values[variableKey], (val) => {
                            currentTheme.values[variableKey] = val
                            diepThemes.applySetting(variableKey, currentTheme.values[variableKey])
                        }))
                    } else if (variableInfo.type == "boolean") {
                        rowEl.appendChild(diepThemes.renderInput.toggle(currentTheme.values[variableKey], (val) => {
                            currentTheme.values[variableKey] = val
                            diepThemes.applySetting(variableKey, currentTheme.values[variableKey])
                        }))
                    } else if (variableInfo.type == "opacity") {
                        rowEl.appendChild(diepThemes.renderInput.opacity(currentTheme.values[variableKey], (val) => {
                            currentTheme.values[variableKey] = val
                            diepThemes.applySetting(variableKey, currentTheme.values[variableKey])
                        }))
                    } else if (variableInfo.type == "uiColors") {
                        rowEl.classList.add("ui-colors")
                        console.log(variableInfo)
                        for (let i = 7; i >= 0; i--) {
                            rowEl.appendChild(diepThemes.renderInput.color(currentTheme.values[variableKey][i], (val) => {
                                currentTheme.values[variableKey][i] = val
                                diepThemes.applySetting(variableKey, currentTheme.values[variableKey])
                            }))
                        }
                    }
                }
            }
        } else if (diepThemes.currentMenu == "import") {
            const homeMenuEl = diepThemes.window.document.createElement("div")
            homeMenuEl.addEventListener("click", (event) => event.stopPropagation())
            this.window.document.body.appendChild(homeMenuEl)
            this.currentMenuEl = homeMenuEl
            homeMenuEl.classList.add("diep-themes-menu")
            homeMenuEl.id = "diep-themes-import-menu"
            homeMenuEl.innerHTML = `
                <div class="topbar">
                    <div class="backbutton" onclick="diepThemes.setMenu('home')">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </div>
                    <div class="header">Import a Theme</div>
                </div>
                <div class="content">
                    <div class="action-buttons">
                        <div class="button importFromFile">
                            <div class="icon">
                                <ion-icon name="folder-open-outline"></ion-icon>
                            </div>
                            <div class="text">
                                Select File
                            </div>
                        </div>
                        <div class="button importFromText">
                            <div class="icon">
                                <ion-icon name="document-text-outline"></ion-icon>
                            </div>
                            <div class="text">
                                Load from Input Below
                            </div>
                        </div>
                    </div>
                    <textarea placeholder="Select file or paste text here"></textarea>
                </div>
            `
            const contentEl = homeMenuEl.querySelector(".content")
            const textareaEl = contentEl.querySelector("textarea")
            
            async function importTheme(text) {
                let json = {}
                try {
                    json = JSON.parse(text)
                } catch (error) {
                    alert("failed to load theme: invalid file format")
                    return
                }
                const themeId = crypto.randomUUID();
                let theme = {
                    "name": "Imported Theme",
                    "author": "",
                    "values": JSON.parse(JSON.stringify(diepThemes.settings.savedThemes["DEFAULT"].values))
                }

                if (Array.isArray(json)) {
                    // old format
                    for (let entry of json) {
                        // theme info
                        if (entry.theme) {
                            if (entry.theme.name) theme.name = entry.theme.name
                            if (entry.theme.author) theme.author = entry.theme.author
                        }

                        // network colors
                        if (entry.id) {
                            let variableKey = ""
                            for (let testVarKey in diepThemes.themeVariables) {
                                if (diepThemes.themeVariables[testVarKey].type !== "color") continue
                                if (diepThemes.themeVariables[testVarKey].command !== `net_replace_color ${entry.id}`) continue
                                variableKey = testVarKey
                            }
                            if (!variableKey) {
                                console.warn("failed to load a certain entry")
                                continue
                            }
                            theme.values[variableKey] = entry.value
                            continue
                        }

                        // ui colors
                        if (entry.cmd == "ui_replace_colors") {
                            if (Array.isArray(entry.value))
                            theme.values.uiColors = entry.value.reverse()
                            continue
                        }

                        // other colors
                        if ((entry.cmd + "").slice(0,4) == "ren_") {
                            let variableKey = ""
                            for (let testVarKey in diepThemes.themeVariables) {
                                if (diepThemes.themeVariables[testVarKey].command === `${entry.cmd}`)variableKey = testVarKey
                            }
                            if (!variableKey) continue
                            theme.values[variableKey] = entry.value
                        }

                        // opacity
                        if (["border_color_alpha", "stroke_soft_color_intensity", "grid_base_alpha"].includes(entry.cmd + "")) {
                            let variableKey = ""
                            for (let testVarKey in diepThemes.themeVariables) {
                                if (diepThemes.themeVariables[testVarKey].command === `ren_${entry.cmd}`) variableKey = testVarKey
                            }
                            if (!variableKey) continue
                            theme.values[variableKey] = entry.value
                        }
                        
                        // outlines
                        if ("stroke_soft_color" === entry.cmd) {
                            theme.values["newOutlines"] = entry.value
                        }
                    }
                } else {
                    theme = {...theme, ...json}
                }

                const validatedTheme = diepThemes.validateTheme(theme)
                if (!validatedTheme) {
                    return alert("failed to validate theme")
                }
                
                
                diepThemes.settings.savedThemes[themeId] = validatedTheme
                diepThemes.settings.currentTheme = themeId
                diepThemes.applyTheme(validatedTheme)
                diepThemes.setMenu("edit")
            }

            contentEl.querySelector(".importFromFile").addEventListener("click", () => {
                let input = document.createElement('input');
                input.type = 'file';
                input.accept = ".dieptheme,.json"
                input.onchange = () => {
                    let file = Array.from(input.files)[0];
                    let fr = new FileReader();
                    fr.onload = function(e) {
                        importTheme(e.target.result)
                    }
                    fr.readAsText(file)
                };
                input.click();
            })
            contentEl.querySelector(".importFromText").addEventListener("click", () => {
                importTheme(textareaEl.value)
            })
        } else if (diepThemes.currentMenu == "browse") {
            // base menu
            const browseMenuEl = diepThemes.window.document.createElement("div")
            browseMenuEl.addEventListener("click", (event) => event.stopPropagation())
            this.window.document.body.appendChild(browseMenuEl)
            this.currentMenuEl = browseMenuEl
            browseMenuEl.classList.add("diep-themes-menu")
            browseMenuEl.id = "diep-themes-browse-menu"
            browseMenuEl.innerHTML = `
                <div class="topbar">
                    <div class="backbutton" onclick="diepThemes.setMenu('home')">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </div>
                    <div class="header">Browsing Themes</div>
                </div>
                <div class="content">
                    
                </div>
            `
            const contentEl = browseMenuEl.querySelector(".content")

            const gridEl = document.createElement("div")
            gridEl.classList.add("theme-grid")
            contentEl.appendChild(gridEl)

            // fetch data
            if (diepThemes.downloadedThemes.length == 0) {
                let data
                const table = "themes"
                const url = `${sbUrl}/rest/v1/${table}`;
                const headers = {'apikey': sbAnonKey};
                const requestOptions = {
                    method: 'GET',
                    headers: headers
                }
                try {
                    const response = await fetch(url, requestOptions);
                    if (!response.ok) {
                        this.setMenu("home")
                        return
                    }
                    data = await response.json();
                    console.log(data)
                } catch (error) {
                    this.setMenu("home")
                    return
                }
                
                data.sort((a,b) => b.views - a.views)
                for (let row of data) {
                    const validated = this.validateTheme(row.theme)
                    if (!validated) {
                        this.setMenu("home")
                        return
                    }
                    validated.views = row.views
                    validated.uuid = row.uuid
                    this.downloadedThemes.push(validated)
                }
            }

            // display data
            for (let theme of diepThemes.downloadedThemes) {
                
                const themeEl = document.createElement("div")
                themeEl.classList.add("theme")
                themeEl.dataset.active = false
                gridEl.appendChild(themeEl)

                themeEl.addEventListener("click", () => {
                    gridEl.querySelectorAll('.theme[data-active="true"]').forEach(el => el.dataset.active = false)
                    themeEl.dataset.active = true
                    this.applyTheme(theme)
                })

                themeEl.appendChild(diepThemes.renderThemePreview(theme.values))

                const bottomEl = document.createElement("div")
                bottomEl.classList.add("bottom-bar")
                themeEl.appendChild(bottomEl)

                const infoEl = document.createElement("div")
                infoEl.classList.add("info")
                bottomEl.appendChild(infoEl)

                const nameEl = document.createElement("div")
                nameEl.classList.add("name")
                nameEl.innerText = theme.name
                infoEl.appendChild(nameEl)
                
                const authorEl = document.createElement("div")
                authorEl.classList.add("author")
                authorEl.innerHTML = '<div class="icon"><ion-icon name="person"></ion-icon></icon>'
                authorEl.appendChild(document.createTextNode("By " + theme.author))
                infoEl.appendChild(authorEl)
                
                const downloadEl = document.createElement("div")
                downloadEl.classList.add("download")
                downloadEl.innerHTML = `
                    <div class="button">
                        <ion-icon name="download-outline"></ion-icon>
                    </div>
                `
                bottomEl.appendChild(downloadEl)

                downloadEl.querySelector(".button").addEventListener("click", () => {
                    const response = fetch(`${sbUrl}/rest/v1/rpc/increment_view`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': sbAnonKey,
                        },
                        body: JSON.stringify({ theme_id: theme.uuid }),
                    });

                    const themeId = crypto.randomUUID()
                    diepThemes.settings.savedThemes[themeId] = this.validateTheme(theme)
                    diepThemes.settings.currentTheme = themeId
                    diepThemes.setMenu("home")
                })
            }
        } else if (diepThemes.currentMenu == "settings") {
            const settingsMenuEl = diepThemes.window.document.createElement("div")
            settingsMenuEl.addEventListener("click", (event) => event.stopPropagation())
            settingsMenuEl.classList.add("diep-themes-menu")
            settingsMenuEl.id = "diep-themes-edit-menu"
            settingsMenuEl.innerHTML = `
                <div class="topbar">
                    <div class="backbutton" onclick="diepThemes.setMenu('home')">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </div>
                    <div class="header">Other Settings</div>
                </div>
                <div class="content">

                </div>
            `
            document.body.appendChild(settingsMenuEl)
            diepThemes.currentMenuEl = settingsMenuEl

            const wrapperEl = settingsMenuEl.querySelector(".content")
            
            const categories = []
            for (let variableKey in diepThemes.otherVariables) {
                const variableInfo = diepThemes.otherVariables[variableKey]
                if (!categories.includes(variableInfo.category)) categories.push(variableInfo.category)
            }
            
            for (let category of categories) {

                const categoryTitleEl = document.createElement("div")
                categoryTitleEl.classList.add("category-title")
                categoryTitleEl.innerText = category
                wrapperEl.appendChild(categoryTitleEl)
                
                for (let variableKey in diepThemes.otherVariables) {
                    const variableInfo = diepThemes.otherVariables[variableKey]
                    if (category != variableInfo.category) continue
                    
                    const rowEl = document.createElement("div")
                    rowEl.classList.add("setting-row")
                    wrapperEl.appendChild(rowEl)
                    
                    if (variableInfo.type != "uiColors") {
                        const nameEl = document.createElement("div")
                        nameEl.classList.add("setting-name")
                        nameEl.innerText = variableInfo.name
                        rowEl.appendChild(nameEl)
                    }
                    
                    if (variableInfo.type == "color") {
                        rowEl.appendChild(diepThemes.renderInput.color(diepThemes.settings.otherSettings[variableKey], (val) => {
                            diepThemes.settings.otherSettings[variableKey] = val
                            diepThemes.applyOtherSettings()
                        }))
                    } else if (variableInfo.type == "boolean") {
                        rowEl.appendChild(diepThemes.renderInput.toggle(diepThemes.settings.otherSettings[variableKey], (val) => {
                            diepThemes.settings.otherSettings[variableKey] = val
                            diepThemes.applyOtherSettings()
                        }))
                    } else if (variableInfo.type == "opacity") {
                        rowEl.appendChild(diepThemes.renderInput.opacity(diepThemes.settings.otherSettings[variableKey], (val) => {
                            diepThemes.settings.otherSettings[variableKey] = val
                            diepThemes.applyOtherSettings()
                        }))
                    } else if (variableInfo.type == "uiColors") {
                        rowEl.classList.add("ui-colors")
                        console.log(variableInfo)
                        for (let i = 7; i >= 0; i--) {
                            rowEl.appendChild(diepThemes.renderInput.color(diepThemes.settings.otherSettings[variableKey][i], (val) => {
                                diepThemes.settings.otherSettings[variableKey][i] = val
                                diepThemes.applyOtherSettings()
                            }))
                        }
                    }
                }
            }
        } else if (diepThemes.currentMenu == "shadow") {
            const settingsMenuEl = diepThemes.window.document.createElement("div")
            settingsMenuEl.addEventListener("click", (event) => event.stopPropagation())
            settingsMenuEl.classList.add("diep-themes-menu")
            settingsMenuEl.id = "diep-themes-edit-menu"
            settingsMenuEl.innerHTML = `
                <div class="topbar">
                    <div class="backbutton" onclick="diepThemes.setMenu('home')">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </div>
                    <div class="header">Shadow Settings</div>
                </div>
                <div class="content">

                </div>
            `
            document.body.appendChild(settingsMenuEl)
            diepThemes.currentMenuEl = settingsMenuEl

            const wrapperEl = settingsMenuEl.querySelector(".content")
            
            const categories = []
            for (let variableKey in diepThemes.shadowVariables) {
                const variableInfo = diepThemes.shadowVariables[variableKey]
                if (!categories.includes(variableInfo.category)) categories.push(variableInfo.category)
            }
            
            for (let category of categories) {
                const categoryTitleEl = document.createElement("div")
                categoryTitleEl.classList.add("category-title")
                categoryTitleEl.innerText = category
                wrapperEl.appendChild(categoryTitleEl)
                
                for (let variableKey in diepThemes.shadowVariables) {
                    const variableInfo = diepThemes.shadowVariables[variableKey]
                    if (category != variableInfo.category) continue
                    
                    const rowEl = document.createElement("div")
                    rowEl.classList.add("setting-row")
                    wrapperEl.appendChild(rowEl)
                    
                    if (variableInfo.type != "uiColors") {
                        const nameEl = document.createElement("div")
                        nameEl.classList.add("setting-name")
                        nameEl.innerText = variableInfo.name
                        rowEl.appendChild(nameEl)
                    }
                    
                    if (variableInfo.type == "color") {
                        rowEl.appendChild(diepThemes.renderInput.color(diepThemes.settings.shadowSettings[variableKey], (val) => {
                            diepThemes.settings.shadowSettings[variableKey] = val
                            diepThemes.applyShadowSettings()
                            diepThemes.saveSettings()
                        }))
                    } else if (variableInfo.type == "boolean") {
                        rowEl.appendChild(diepThemes.renderInput.toggle(diepThemes.settings.shadowSettings[variableKey], (val) => {
                            diepThemes.settings.shadowSettings[variableKey] = val
                            diepThemes.applyShadowSettings()
                            diepThemes.saveSettings()
                        }))
                    } else if (variableInfo.type == "opacity") {
                        rowEl.appendChild(diepThemes.renderInput.opacity(diepThemes.settings.shadowSettings[variableKey], (val) => {
                            diepThemes.settings.shadowSettings[variableKey] = val
                            diepThemes.applyShadowSettings()
                            diepThemes.saveSettings()
                        }))
                    } else if (variableInfo.type == "uiColors") {
                        rowEl.classList.add("ui-colors")
                        console.log(variableInfo)
                        for (let i = 7; i >= 0; i--) {
                            rowEl.appendChild(diepThemes.renderInput.color(diepThemes.settings.shadowSettings[variableKey][i], (val) => {
                                diepThemes.settings.shadowSettings[variableKey][i] = val
                                diepThemes.applyShadowSettings()
                                diepThemes.saveSettings()
                            }))
                        }
                    }
                }
            }
        }

    },

    toggleMenu: function() {
        if (diepThemes.currentMenu) {
            diepThemes.setMenu(null)
        } else {
            diepThemes.setMenu("home")
        }
    },

    applyTheme: function(theme) {
        for (let variableKey in this.themeVariables) {
            this.applySetting(variableKey, theme.values[variableKey], false)
        }
        this.saveSettings()
    },

    saveSettings: function() {
        window.localStorage.setItem("diep_themes_settings", JSON.stringify(this.settings));
    },

    applySetting: function(variableKey, value, save = true) {
        if (save) this.saveSettings()
        const variableInfo = diepThemes.themeVariables[variableKey]
        if (variableInfo.type == "color") diepThemes.window.input.execute(`${variableInfo.command} 0x${value}`);
        if (variableInfo.type == "boolean") diepThemes.window.input.execute(`${variableInfo.command} ${value}`);
        if (variableInfo.type == "uiColors") diepThemes.window.input.execute(`${variableInfo.command} ${value.map(v => "0x" + v).join(" ")}`);
        if (variableInfo.type == "opacity") diepThemes.window.input.execute(`${variableInfo.command} ${value}`);
        if (variableInfo.command == "ren_grid_base_alpha") diepThemes.window.input.execute(`ren_solid_background  ${value == 0}`)
    },

    applyOtherSettings: function() {
        for (let variableKey in this.otherVariables) {
            const value = diepThemes.settings.otherSettings[variableKey]
            const variableInfo = diepThemes.otherVariables[variableKey]
            if (variableInfo.type == "color") diepThemes.window.input.execute(`${variableInfo.command} 0x${value}`);
            if (variableInfo.type == "boolean") diepThemes.window.input.execute(`${variableInfo.command} ${value}`);
            if (variableInfo.type == "uiColors") diepThemes.window.input.execute(`${variableInfo.command} ${value.map(v => "0x" + v).join(" ")}`);
            if (variableInfo.type == "opacity") diepThemes.window.input.execute(`${variableInfo.command} ${value}`);
        }
        this.saveSettings()
    },

    applyShadowSettings: function() {
        let ctx = document.getElementById('canvas').getContext('2d');
        if (!diepThemes.settings.shadowSettings["enableShadow"]) {
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'rgba(0,0,0,0)';
        } else {
            ctx.shadowBlur = diepThemes.settings.shadowSettings["shadowRadius"];
            ctx.shadowColor = `#${diepThemes.settings.shadowSettings["shadowColor"]}${Math.round(diepThemes.settings.shadowSettings["shadowOpacity"] * 255).toString(16).padStart(2, '0')}`
            ctx.shadowOffsetX = diepThemes.settings.shadowSettings["shadowX"];
            ctx.shadowOffsetY = diepThemes.settings.shadowSettings["shadowY"];
        }
    },

    createNewTheme: function() {
        const themeId = crypto.randomUUID();
        diepThemes.settings.savedThemes[themeId] = {
            "name": "New Theme",
            "author": "",
            "values": JSON.parse(JSON.stringify(diepThemes.settings.savedThemes["DEFAULT"].values))
        }
        diepThemes.settings.currentTheme = themeId
        diepThemes.applyTheme(diepThemes.settings.savedThemes[themeId])
        diepThemes.setMenu("edit")
    },

    downloadCurrentTheme: function() {
        const currentTheme = diepThemes.settings.savedThemes[diepThemes.settings.currentTheme]
        let downloaddata = encodeURI('data:text/json;charset=utf-8,' + JSON.stringify(currentTheme));
        let filename = currentTheme.name + ".dieptheme";
        let link = document.createElement('a');
        link.setAttribute('href', downloaddata);
        link.setAttribute('download', filename);
        link.click();
        link.remove();
    },

    copyCurrentTheme: function() {
        navigator.clipboard.writeText(JSON.stringify(diepThemes.settings.savedThemes[diepThemes.settings.currentTheme], null, 4));
    },

    deleteCurrentTheme: function() {
        if (diepThemes.settings.currentTheme == "DEFAULT") return
        delete diepThemes.settings.savedThemes[diepThemes.settings.currentTheme]
        this.settings.currentTheme = "DEFAULT"
        this.applyTheme(diepThemes.settings.savedThemes["DEFAULT"])
        diepThemes.setMenu("home")
    },

    renderInput: {
        color: function(value = "000000", callback = () => {}) {
            function handleChange(newValue) {
                if (newValue[0] == "#") newValue = newValue.slice(1)
                if (newValue.length != 6) return
                newValue = newValue.toUpperCase()
                const allowedCharacters = "1234567890ABCDEF"
                for (let ch of newValue.split("")) {
                    if (!(allowedCharacters.includes(ch))) return
                }
                value = newValue
                callback(value)
                refresh()
            }
            
            function refresh() {
                wrapperEl.style.setProperty('--value', "#" + value);
                textInputEl.value = value
                colorInputEl.value = "#" + value
            }
            
            const wrapperEl = document.createElement("div")
            wrapperEl.classList.add("setting-color-input")
            
            const previewEl = document.createElement("div")
            previewEl.classList.add("preview")
            wrapperEl.appendChild(previewEl)
            
            const textInputEl = document.createElement("input")
            textInputEl.type = "text"
            textInputEl.addEventListener("input", (event) => {handleChange(event.target.value)})
            wrapperEl.appendChild(textInputEl)
            
            const colorInputEl = document.createElement("input")
            colorInputEl.type = "color"
            colorInputEl.addEventListener("input", (event) => {handleChange(event.target.value)})
            previewEl.appendChild(colorInputEl)
            
            refresh()
            
            return wrapperEl
        },
        toggle: function(value = false, callback = () => {}) {
            function refresh() {
                if (value) {
                    wrapperEl.classList.add("on")
                } else {
                    wrapperEl.classList.remove("on")
                }
            }
            
            const wrapperEl = document.createElement("div")
            wrapperEl.classList.add("setting-toggle-input")
            wrapperEl.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>'
            wrapperEl.addEventListener("click", () => {
                value = !value
                refresh()
                callback(value)
            })
            
            refresh()
            
            return wrapperEl
        },
        opacity: function(value = 0.5, callback = () => {}) {
  
            function handleInput(newValue) {
                if (newValue == "") return
                if (newValue[newValue.length-1] == ".") return
                newValue = parseFloat(newValue)
                if (isNaN(newValue)) return
                value = newValue
                callback(value)
            }
            
            function handleChange(newValue) {
                newValue = parseFloat(newValue)
                if (isNaN(newValue)) newValue = 0
                value = newValue
                callback(value)
                refresh()
            }
            
            function refresh() {
                numberInputEl.value = value
            }
            
            const wrapperEl = document.createElement("div")
            wrapperEl.classList.add("setting-number-input")
            
            const numberInputEl = document.createElement("input")
            numberInputEl.type = "number"
            numberInputEl.addEventListener("input", (event) => {handleInput(event.target.value)})
            numberInputEl.addEventListener("change", (event) => {handleChange(event.target.value)})
            wrapperEl.appendChild(numberInputEl)
            
            refresh()
            
            return wrapperEl
        },
        text: function(value = "", callback = () => {}) {
  
            function handleInput(newValue) {
                value = newValue
                callback(value)
            }
            
            function refresh() {
                textInputEl.value = value
            }
            
            const wrapperEl = document.createElement("div")
            wrapperEl.classList.add("setting-text-input")
            
            const textInputEl = document.createElement("input")
            textInputEl.type = "text"
            textInputEl.addEventListener("input", (event) => {handleInput(event.target.value)})
            wrapperEl.appendChild(textInputEl)
            
            refresh()
            
            return wrapperEl
        }
    },

    validateColor: function(color) {
        color = color + ""
        color = color.toUpperCase()
        if (color.length != 6) return null
        const allowedCharacters = "1234567890ABCDEF"
        for (let ch of color.split("")) {
            if (!(allowedCharacters.includes(ch))) return null
        }
        return color
    },

    validateValues: function(variablesInfo, values) {
        try {
            const output = this.getSettingsDefaultValues(variablesInfo);
            for (let variableKey in variablesInfo) {
                const variableInfo = variablesInfo[variableKey]
                const value = values[variableKey]
                if (value != undefined) {
                    if (variableInfo.type == "color") {
                        const validated = this.validateColor(value)
                        if (!validated) return null
                        output[variableKey] = validated
                    }
                    if (variableInfo.type == "uiColors") {
                        if (!Array.isArray(value)) return null
                        if (!value.length == 8) return null
                        for (let i = 0; i < 8; i++) {
                            const validated = this.validateColor(value[i])
                            if (!validated) return null
                            output[variableKey][i] = validated
                        }
                    }
                    if (variableInfo.type == "boolean") {
                        if (typeof value !== "boolean") return null
                        output[variableKey] = value
                    }
                    if (variableInfo.type == "opacity") {
                        if (typeof value !== "number") return null
                        output[variableKey] = value
                    }
                }
            }
            return output
        } catch (error) {
            console.warn(error)
            return null
        }
        
    },

    validateTheme: function(theme) {
        try {
            const output = {
                "name": "Theme",
                "author": "",
                "values": this.getSettingsDefaultValues(this.themeVariables)
            }
            console.log(theme)
            if (theme.name && typeof theme.name === "string") output.name = (theme.name + "").replace(/[^\w\s]/gi, '')
            if (theme.author && typeof theme.author === "string") output.author = (theme.author + "").replace(/[^\w\s]/gi, '')
            if (!theme.values) return null
            const validated = this.validateValues(this.themeVariables, theme.values)
            output.values = validated
            if (validated == null) return nulls
            return output
        } catch (error) {
            console.warn(error)
            return null
        }
    },

    validateOtherSettings: function(values) {
        return this.validateValues(this.otherVariables, values)
    },
    validateShadowSettings: function(values) {
        return this.validateValues(this.shadowVariables, values)
    },

    renderThemePreview: function(theme) {
        const wrapperEl = document.createElement("div")
        wrapperEl.classList.add("theme-preview")
        function border(color) {
            if (theme.newOutlines) {
                return [
                    color.slice(0,2),
                    color.slice(2,4),
                    color.slice(4,6)
                ].map(v => 
                    Math.round(parseInt(v, 16) * (1 - theme.outlineOpacity))
                    .toString(16)
                    .padStart(2, '0')
                ).join("")
            } else {
                return theme.oldOutlineColor
            }
        }
        wrapperEl.innerHTML = `
            <svg width="700" height="500" viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_995_153)">
            <rect width="701" height="500" fill="#${theme.backgroundColor}"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M-76 -27V-26H-77V574H-75V525H-27V574H-25V525H23V574H25V525H73V574H75V525H123V574H125V525H173V574H175V525H223V574H225V525H273V574H275V525H323V574H325V525H373V574H375V525H423V574H425V525H473V574H475V525H523V574H525V525H573V574H575V525H623V574H625V525H673V574H675V525H723V574H725V525H773V574H775V525H823V574H825V525H873V574H875V525H923V574H925V525H973V574H975V525H1023V574H1025V525H1073V574H1075V525H1124V523H1075V475H1124V473H1075V425H1124V423H1075V375H1124V373H1075V325H1124V323H1075V275H1124V273H1075V225H1124V223H1075V175H1124V173H1075V125H1124V123H1075V75H1124V73H1075V25H1124V23H1075V-25H1124V-27H-76ZM523 -25H475V23H523V-25ZM523 25H475V73H523V25ZM523 75H475V123H523V75ZM523 125H475V173H523V125ZM523 175H475V223H523V175ZM523 225H475V273H523V225ZM523 275H475V323H523V275ZM523 325H475V373H523V325ZM523 375H475V423H523V375ZM523 425H475V473H523V425ZM523 475H475V523H523V475ZM-27 -25H-75V23H-27V-25ZM473 475H425V523H473V475ZM473 425H425V473H473V425ZM473 375H425V423H473V375ZM473 325H425V373H473V325ZM473 275H425V323H473V275ZM473 225H425V273H473V225ZM473 175H425V223H473V175ZM473 125H425V173H473V125ZM473 75H425V123H473V75ZM473 25H425V73H473V25ZM473 -25H425V23H473V-25ZM423 475H375V523H423V475ZM423 425H375V473H423V425ZM423 375H375V423H423V375ZM423 325H375V373H423V325ZM423 275H375V323H423V275ZM423 225H375V273H423V225ZM423 175H375V223H423V175ZM423 125H375V173H423V125ZM423 75H375V123H423V75ZM423 25H375V73H423V25ZM423 -25H375V23H423V-25ZM373 475H325V523H373V475ZM373 425H325V473H373V425ZM373 375H325V423H373V375ZM373 325H325V373H373V325ZM373 275H325V323H373V275ZM373 225H325V273H373V225ZM373 175H325V223H373V175ZM373 125H325V173H373V125ZM373 75H325V123H373V75ZM373 25H325V73H373V25ZM373 -25H325V23H373V-25ZM323 475H275V523H323V475ZM323 425H275V473H323V425ZM323 375H275V423H323V375ZM323 325H275V373H323V325ZM323 275H275V323H323V275ZM323 225H275V273H323V225ZM323 175H275V223H323V175ZM323 125H275V173H323V125ZM323 75H275V123H323V75ZM323 25H275V73H323V25ZM323 -25H275V23H323V-25ZM273 475H225V523H273V475ZM273 425H225V473H273V425ZM273 375H225V423H273V375ZM273 325H225V373H273V325ZM273 275H225V323H273V275ZM273 225H225V273H273V225ZM273 175H225V223H273V175ZM273 125H225V173H273V125ZM273 75H225V123H273V75ZM273 25H225V73H273V25ZM273 -25H225V23H273V-25ZM223 475H175V523H223V475ZM223 425H175V473H223V425ZM223 375H175V423H223V375ZM223 325H175V373H223V325ZM223 275H175V323H223V275ZM223 225H175V273H223V225ZM223 175H175V223H223V175ZM223 125H175V173H223V125ZM223 75H175V123H223V75ZM223 25H175V73H223V25ZM223 -25H175V23H223V-25ZM173 475H125V523H173V475ZM173 425H125V473H173V425ZM173 375H125V423H173V375ZM173 325H125V373H173V325ZM173 275H125V323H173V275ZM173 225H125V273H173V225ZM173 175H125V223H173V175ZM173 125H125V173H173V125ZM173 75H125V123H173V75ZM173 25H125V73H173V25ZM173 -25H125V23H173V-25ZM123 475H75V523H123V475ZM123 425H75V473H123V425ZM123 375H75V423H123V375ZM123 325H75V373H123V325ZM123 275H75V323H123V275ZM123 225H75V273H123V225ZM123 175H75V223H123V175ZM123 125H75V173H123V125ZM123 75H75V123H123V75ZM123 25H75V73H123V25ZM123 -25H75V23H123V-25ZM73 475H25V523H73V475ZM73 425H25V473H73V425ZM73 375H25V423H73V375ZM73 325H25V373H73V325ZM73 275H25V323H73V275ZM73 225H25V273H73V225ZM73 175H25V223H73V175ZM73 125H25V173H73V125ZM73 75H25V123H73V75ZM73 25H25V73H73V25ZM73 -25H25V23H73V-25ZM23 475H-25V523H23V475ZM23 425H-25V473H23V425ZM23 375H-25V423H23V375ZM23 325H-25V373H23V325ZM23 275H-25V323H23V275ZM23 225H-25V273H23V225ZM23 175H-25V223H23V175ZM23 125H-25V173H23V125ZM23 75H-25V123H23V75ZM23 25H-25V73H23V25ZM23 -25H-25V23H23V-25ZM-27 475H-75V523H-27V475ZM-27 425H-75V473H-27V425ZM-27 375H-75V423H-27V375ZM-27 325H-75V373H-27V325ZM-27 275H-75V323H-27V275ZM-27 225H-75V273H-27V225ZM-27 175H-75V223H-27V175ZM-27 125H-75V173H-27V125ZM-27 75H-75V123H-27V75ZM-27 25H-75V73H-27V25ZM573 -25H525V23H573V-25ZM1073 475H1025V523H1073V475ZM1073 425H1025V473H1073V425ZM1073 375H1025V423H1073V375ZM1073 325H1025V373H1073V325ZM1073 275H1025V323H1073V275ZM1073 225H1025V273H1073V225ZM1073 175H1025V223H1073V175ZM1073 125H1025V173H1073V125ZM1073 75H1025V123H1073V75ZM1073 25H1025V73H1073V25ZM1073 -25H1025V23H1073V-25ZM1023 475H975V523H1023V475ZM1023 425H975V473H1023V425ZM1023 375H975V423H1023V375ZM1023 325H975V373H1023V325ZM1023 275H975V323H1023V275ZM1023 225H975V273H1023V225ZM1023 175H975V223H1023V175ZM1023 125H975V173H1023V125ZM1023 75H975V123H1023V75ZM1023 25H975V73H1023V25ZM1023 -25H975V23H1023V-25ZM973 475H925V523H973V475ZM973 425H925V473H973V425ZM973 375H925V423H973V375ZM973 325H925V373H973V325ZM973 275H925V323H973V275ZM973 225H925V273H973V225ZM973 175H925V223H973V175ZM973 125H925V173H973V125ZM973 75H925V123H973V75ZM973 25H925V73H973V25ZM973 -25H925V23H973V-25ZM923 475H875V523H923V475ZM923 425H875V473H923V425ZM923 375H875V423H923V375ZM923 325H875V373H923V325ZM923 275H875V323H923V275ZM923 225H875V273H923V225ZM923 175H875V223H923V175ZM923 125H875V173H923V125ZM923 75H875V123H923V75ZM923 25H875V73H923V25ZM923 -25H875V23H923V-25ZM873 475H825V523H873V475ZM873 425H825V473H873V425ZM873 375H825V423H873V375ZM873 325H825V373H873V325ZM873 275H825V323H873V275ZM873 225H825V273H873V225ZM873 175H825V223H873V175ZM873 125H825V173H873V125ZM873 75H825V123H873V75ZM873 25H825V73H873V25ZM873 -25H825V23H873V-25ZM823 475H775V523H823V475ZM823 425H775V473H823V425ZM823 375H775V423H823V375ZM823 325H775V373H823V325ZM823 275H775V323H823V275ZM823 225H775V273H823V225ZM823 175H775V223H823V175ZM823 125H775V173H823V125ZM823 75H775V123H823V75ZM823 25H775V73H823V25ZM823 -25H775V23H823V-25ZM773 475H725V523H773V475ZM773 425H725V473H773V425ZM773 375H725V423H773V375ZM773 325H725V373H773V325ZM773 275H725V323H773V275ZM773 225H725V273H773V225ZM773 175H725V223H773V175ZM773 125H725V173H773V125ZM773 75H725V123H773V75ZM773 25H725V73H773V25ZM773 -25H725V23H773V-25ZM723 475H675V523H723V475ZM723 425H675V473H723V425ZM723 375H675V423H723V375ZM723 325H675V373H723V325ZM723 275H675V323H723V275ZM723 225H675V273H723V225ZM723 175H675V223H723V175ZM723 125H675V173H723V125ZM723 75H675V123H723V75ZM723 25H675V73H723V25ZM723 -25H675V23H723V-25ZM673 475H625V523H673V475ZM673 425H625V473H673V425ZM673 375H625V423H673V375ZM673 325H625V373H673V325ZM673 275H625V323H673V275ZM673 225H625V273H673V225ZM673 175H625V223H673V175ZM673 125H625V173H673V125ZM673 75H625V123H673V75ZM673 25H625V73H673V25ZM673 -25H625V23H673V-25ZM623 475H575V523H623V475ZM623 425H575V473H623V425ZM623 375H575V423H623V375ZM623 325H575V373H623V325ZM623 275H575V323H623V275ZM623 225H575V273H623V225ZM623 175H575V223H623V175ZM623 125H575V173H623V125ZM623 75H575V123H623V75ZM623 25H575V73H623V25ZM623 -25H575V23H623V-25ZM573 475H525V523H573V475ZM573 425H525V473H573V425ZM573 375H525V423H573V375ZM573 325H525V373H573V325ZM573 275H525V323H573V275ZM573 225H525V273H573V225ZM573 175H525V223H573V175ZM573 125H525V173H573V125ZM573 75H525V123H573V75ZM573 25H525V73H573V25Z" fill="#${theme.gridColor}" fill-opacity="${theme.gridOpacity}"/>
            <rect y="364" width="701" height="136" fill="#${theme.worldBorderColor}" fill-opacity="${theme.worldBorderOpacity}"/>

            <path d="M66 465C66 450.641 77.6406 439 92 439H130V491H92C77.6406 491 66 479.359 66 465V465Z" fill="#${theme.uiColors[7]}"/>
            <path d="M92 443.5H125.5V486.5H92C80.1259 486.5 70.5 476.874 70.5 465C70.5 453.126 80.1259 443.5 92 443.5Z" stroke="black" stroke-opacity="0.25" stroke-width="9"/>
            <rect x="138" y="439" width="64" height="52" fill="#${theme.uiColors[6]}"/>
            <rect x="142.5" y="443.5" width="55" height="43" stroke="black" stroke-opacity="0.2" stroke-width="9"/>
            <rect x="210" y="439" width="64" height="52" fill="#${theme.uiColors[5]}"/>
            <rect x="214.5" y="443.5" width="55" height="43" stroke="black" stroke-opacity="0.2" stroke-width="9"/>
            <rect x="282" y="439" width="64" height="52" fill="#${theme.uiColors[4]}"/>
            <rect x="286.5" y="443.5" width="55" height="43" stroke="black" stroke-opacity="0.2" stroke-width="9"/>
            <rect x="354" y="439" width="64" height="52" fill="#${theme.uiColors[3]}"/>
            <rect x="358.5" y="443.5" width="55" height="43" stroke="black" stroke-opacity="0.2" stroke-width="9"/>
            <rect x="426" y="439" width="64" height="52" fill="#${theme.uiColors[2]}"/>
            <rect x="430.5" y="443.5" width="55" height="43" stroke="black" stroke-opacity="0.2" stroke-width="9"/>
            <rect x="498" y="439" width="64" height="52" fill="#${theme.uiColors[1]}"/>
            <rect x="502.5" y="443.5" width="55" height="43" stroke="black" stroke-opacity="0.2" stroke-width="9"/>
            <path d="M570 439H608C622.359 439 634 450.641 634 465V465C634 479.359 622.359 491 608 491H570V439Z" fill="#${theme.uiColors[0]}"/>
            <path d="M574.5 443.5H608C619.874 443.5 629.5 453.126 629.5 465C629.5 476.874 619.874 486.5 608 486.5H574.5V443.5Z" stroke="black" stroke-opacity="0.2" stroke-width="9"/>

            <path d="M182.256 311.062L193.126 270.493L101.363 245.905L90.4929 286.474L182.256 311.062Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M82.9867 314.486C109.66 321.633 137.077 305.804 144.224 279.13C151.371 252.457 135.542 225.04 108.869 217.893C82.1953 210.746 54.7784 226.575 47.6313 253.248C40.4842 279.922 56.3133 307.339 82.9867 314.486Z" fill="#${theme.ffaFriendlyColor}" stroke="#${border(theme.ffaFriendlyColor)}" stroke-width="7.5" stroke-linejoin="round"/>

            <path d="M504.875 270.493L515.746 311.062L607.509 286.474L596.638 245.905L504.875 270.493Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M589.132 217.893C562.459 225.04 546.63 252.457 553.777 279.131C560.924 305.804 588.341 321.633 615.014 314.486C641.688 307.339 657.517 279.922 650.37 253.249C643.223 226.575 615.806 210.746 589.132 217.893Z" fill="#${theme.greenTeamColor}" stroke="#${border(theme.greenTeamColor)}" stroke-width="7.5" stroke-linejoin="round"/>

            <path d="M452.238 201.064L481.936 230.762L549.111 163.587L519.413 133.889L452.238 201.064Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M498.907 113.383C479.38 132.909 479.38 164.567 498.907 184.093C518.433 203.62 550.091 203.62 569.617 184.093C589.144 164.567 589.144 132.909 569.617 113.383C550.091 93.8565 518.433 93.8565 498.907 113.383Z" fill="#${theme.purpleTeamColor}" stroke="#${border(theme.purpleTeamColor)}" stroke-width="7.5" stroke-linejoin="round"/>

            <path d="M371.938 167.255L412.507 178.126L437.095 86.3625L396.526 75.4921L371.938 167.255Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M368.514 67.9864C361.367 94.6597 377.196 122.077 403.87 129.224C430.543 136.371 457.96 120.542 465.107 93.8683C472.254 67.195 456.425 39.7782 429.752 32.6311C403.078 25.484 375.661 41.3131 368.514 67.9864Z" fill="#${theme.redTeamColor}" stroke="#${border(theme.redTeamColor)}" stroke-width="7.5" stroke-linejoin="round"/>

            <path d="M285.493 178.126L326.061 167.255L301.474 75.4922L260.905 86.3626L285.493 178.126Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M232.893 93.8684C240.04 120.542 267.457 136.371 294.131 129.224C320.804 122.077 336.633 94.6598 329.486 67.9865C322.339 41.3132 294.922 25.484 268.249 32.6311C241.575 39.7782 225.746 67.1951 232.893 93.8684Z" fill="#${theme.blueTeamColor}" stroke="#${border(theme.blueTeamColor)}" stroke-width="7.5" stroke-linejoin="round"/>

            <path d="M216.064 230.762L245.762 201.064L178.587 133.889L148.888 163.587L216.064 230.762Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M128.382 184.093C147.908 203.62 179.566 203.62 199.093 184.093C218.619 164.567 218.619 132.909 199.093 113.383C179.566 93.8565 147.908 93.8565 128.382 113.383C108.856 132.909 108.856 164.567 128.382 184.093Z" fill="#${theme.ffaEnemyColor}" stroke="#${border(theme.ffaEnemyColor)}" stroke-width="7.5" stroke-linejoin="round"/>

            <path d="M76.2105 125.02L119.02 82.2101L43.333 6.52295L0.523359 49.3326L76.2105 125.02Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M-29.0361 78.8916C-0.889563 107.038 44.745 107.038 72.8916 78.8916C101.038 50.745 101.038 5.11043 72.8916 -23.0361C44.745 -51.1827 -0.889566 -51.1827 -29.0361 -23.0361C-57.1827 5.11043 -57.1827 50.745 -29.0361 78.8916Z" fill="#${theme.arenaCloserColor}" stroke="#${border(theme.arenaCloserColor)}" stroke-width="7.5" stroke-linejoin="round"/>

            <path d="M571.05 95.0385L613.558 136.819L708.06 40.6694L665.552 -1.11078L571.05 95.0385Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M786.398 48.7214L785.884 -10.8794L686.549 -10.0214L687.064 49.5794L786.398 48.7214Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M715.749 -79.8134L656.148 -79.2987L657.006 20.036L716.606 19.5212L715.749 -79.8134Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M804.171 18.1683L788.248 -39.2685L678.845 -8.93886L694.768 48.4979L804.171 18.1683Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M744.094 -82.668L686.391 -97.5966L657.955 12.3142L715.658 27.2428L744.094 -82.668Z" fill="#${theme.cannonColor}" stroke="#${border(theme.cannonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M686.193 -51.1742C647.007 -50.8358 615.514 -18.7945 615.853 20.3919C616.191 59.5784 648.232 91.0709 687.419 90.7324C726.605 90.394 758.098 58.3527 757.759 19.1663C757.421 -20.0201 725.38 -51.5127 686.193 -51.1742Z" fill="#${theme.fallenBossColor}" stroke="#${border(theme.fallenBossColor)}" stroke-width="7.5" stroke-linejoin="round"/>


            <path d="M252.263 347.131L232.132 422.263L157 402.131L177.132 327L252.263 347.131Z" fill="#${theme.squareColor}" stroke="#${border(theme.squareColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M535.698 352.008L468.337 419.369L443.681 327.353L535.698 352.008Z" fill="#${theme.triangleColor}" stroke="#${border(theme.triangleColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M399.11 252.792L412.902 339.875L334.344 379.902L272 317.558L312.027 239L399.11 252.792Z" fill="#${theme.pentagonColor}" stroke="#${border(theme.pentagonColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M564.236 363.932L624.437 356.809L600.505 412.507L564.236 363.932Z" fill="#${theme.crasherColor}" stroke="#${border(theme.crasherColor)}" stroke-width="7.5" stroke-linejoin="round"/>
            <path d="M141.252 360.891L102.361 428.252L34.9998 389.361L73.8906 322L141.252 360.891Z" fill="#${theme.shinyShapeColor}" stroke="#${border(theme.shinyShapeColor)}" stroke-width="7.5" stroke-linejoin="round"/>

            </g>
            <defs>
            <clipPath id="clip0_995_153">
            <rect width="700" height="500" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        `
        return wrapperEl
    }
}   








diepThemes.init()
