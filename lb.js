// ==UserScript==
// @name        New script
// @namespace   Violentmonkey Scripts
// @match       *://diep.io/*
// @grant       none
// @version     1.0
// @author      -
// @description 1/11/2026, 2:15:29 PM
// ==/UserScript==

(function() {
    function createUI() {
        const uiContainer = document.createElement('div');
        uiContainer.style.position = 'fixed';
        uiContainer.style.top = '10px';
        uiContainer.style.right = '500px';
        uiContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        uiContainer.style.color = 'white';
        uiContainer.style.padding = '10px';
        uiContainer.style.borderRadius = '5px';
        uiContainer.style.zIndex = '10000';
        uiContainer.style.maxHeight = '200px';
        uiContainer.style.overflowY = 'scroll';
        uiContainer.style.fontSize = '14px';
        uiContainer.id = 'scoreContainer';

        document.body.appendChild(uiContainer);
    }

    function updateUI(lb) {
        const uiContainer = document.getElementById('scoreContainer');
        uiContainer.innerHTML = ''; // Clear the current content
        // Display only the first 10 items, multiplied by 10
        const toDisplay = lb.slice(0, 10).map(score => {
            // Convert score to number and multiply by 10
            const scoreNum = parseFloat(score.replace('k', '')) * 10;
            return `${scoreNum}k`; // Format back to string with 'k'
        });

        toDisplay.forEach(score => {
            const scoreItem = document.createElement('div');
            scoreItem.textContent = score;
            uiContainer.appendChild(scoreItem);
        });
    }

    function intercept() {
        const originalFillText = CanvasRenderingContext2D.prototype.fillText;
        var lb = []; // Array to hold the scores

        createUI();

        CanvasRenderingContext2D.prototype.fillText = function(text, x, y, maxWidth) {
            const scores = /\d+(\.\d+)?k/;

            if (scores.test(text)) {
                const matchedScore = text.match(scores);
                if (matchedScore) {
                    const score = matchedScore[0];
                    lb.push(score); // Collect the score without filtering
                    updateUI(lb); // Update UI with current scores
                    console.log("Intercepted score:", text);
                }
            }

            originalFillText.apply(this, arguments);
        };
    }

    // Wait for the entire page to fully load
    window.addEventListener('load', function() {
        intercept(); // Call intercept once the page is fully loaded
    });
})();
