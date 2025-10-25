// ==UserScript==
// @name         Diep.io Lobby Selector
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Lobby selector
// @author       Discord: anuryx. (Github: XyrenTheCoder), A-76
// @match        https://dieplobbypicker.io/
// @match        *://diep.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    fetch('https://lb.diep.io/api/lb/pc')
        .then(response => response.json())
        .then(data => {
            createMenu(data.regions);
        })
        .catch(error => console.error('Error fetching lobby data:', error));

    function createMenu(regions) {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.padding = '10px';
        container.style.zIndex = 1000;
        container.style.backgroundColor = 'dark grey';
        container.style.border = '1px solid #696969';
        container.style.overflowY = 'auto';
        container.style.maxHeight = '80%';
        container.style.width = '250px';

        regions.forEach(region => {
            const regionTitle = document.createElement('h6');
            regionTitle.style.fontSize = '80%';
            regionTitle.style.color = '#ccc';
            regionTitle.style.margin = '10%';
            regionTitle.innerText = region.regionName;
            container.appendChild(regionTitle);
            container.appendChild(document.createElement('hr'));

            // Sort lobbies by gamemode name
            const sortedLobbies = region.lobbies.sort((a, b) => a.gamemodeName.localeCompare(b.gamemodeName));

            sortedLobbies.forEach(lobby => {
                const button = document.createElement('button');
                button.innerText = `${lobby.gamemodeName} (${lobby.numPlayers} Players)`;
                button.style.width = '100%';
                button.style.marginBottom = '5px';
                button.style.padding = '5px';
                button.style.color = 'white';
                button.style.borderRadius = '5px';
                button.style.border = '2px solid #437fff';
                button.style.boxShadow = '0 0 8px #437fff';
                button.style.backgroundColor = '#1f1f1f';
                button.style.cursor = 'pointer';
                button.style.transition = 'box-shadow 0.3s ease';

                // Apply glow effects based on gamemode
                if (lobby.gamemode == 'teams') {
                    button.style.border = '2px solid #82ff43';
                    button.style.boxShadow = '0 0 8px #82ff43';
                }
                if (lobby.gamemode == '4teams') {
                    button.style.border = '2px solid #ff4343';
                    button.style.boxShadow = '0 0 8px #ff4343';
                }
                if (lobby.gamemode == 'ffa') {
                    button.style.border = '2px solid #43fff9';
                    button.style.boxShadow = '0 0 8px #43fff9';
                }
                if (lobby.gamemode == 'maze') {
                    button.style.border = '2px solid #ffde43';
                    button.style.boxShadow = '0 0 8px #ffde43';
                }
                if (lobby.gamemode == 'sandbox') {
                    button.style.border = '2px solid #8543ff';
                    button.style.boxShadow = '0 0 8px #8543ff';
                }

                const baseUrl = `https://diep.io/?lobby=${region.region}_${lobby.gamemode}_${lobby.ip}`;

                button.onclick = function() {
                    window.open(baseUrl, '_blank');
                };

                container.appendChild(button);
            });
        });

        document.body.appendChild(container);
    }
})();
