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
        container.style.backgroundColor = '#121212';
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
                button.style.borderWidth = '2px';
                button.style.borderStyle = 'solid';
                button.style.cursor = 'pointer';
                button.style.transition = 'box-shadow 0.3s ease';
                button.style.backgroundColor = '#1f1f1f';
                button.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.5)'; // General shadow

                // Apply gradient borders based on gamemode
                if (lobby.gamemode == 'teams') {
                    button.style.borderImage = 'linear-gradient(to top right, hsl(165.625 39.669% 52.549%), hsl(118.681 40.444% 55.882%), hsl(86.667 48.293% 59.804%)) 1';
                    button.style.boxShadow = '0 0 8px #82ff43';
                }
                else if (lobby.gamemode == '4teams') {
                    button.style.borderImage = 'linear-gradient(to top right, hsl(0 88.732% 53.235%), hsl(20 81.522% 63.922%)) 1'; // --red
                    button.style.boxShadow = '0 0 8px #ff4343';
                }
                else if (lobby.gamemode == 'ffa') {
                    button.style.borderImage = 'linear-gradient(to top right, hsl(210.683 88.732% 58.235%), hsl(190 81.522% 63.922%)) 1'; // --lightblue
                    button.style.boxShadow = '0 0 8px #43fff9';
                }
                else if (lobby.gamemode == 'maze') {
                    button.style.borderImage = 'linear-gradient(to top right, hsl(18 calc(1 * 81.522%) 63.922% / 1), hsl(39.683 calc(1 * 88.732%) 58.235% / 1)) 1'; // --orange
                    button.style.boxShadow = '0 0 8px #ffde43';
                }
                else if (lobby.gamemode == 'sandbox') {
                    button.style.borderImage = 'linear-gradient(to top right, hsl(270.683 88.732% 53.235%), hsl(300 81.522% 63.922%)) 1';
                    button.style.boxShadow = '0 0 8px #8543ff';
                } else {
                    button.style.borderImage = 'linear-gradient(to top right, hsl(228.683 88.732% 53.235%), hsl(252 81.522% 63.922%)) 1';
                    button.style.boxShadow = '0 0 8px #437fff';
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
