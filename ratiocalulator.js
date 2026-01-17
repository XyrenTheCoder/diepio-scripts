// ==UserScript==
// @name        Diep.io Ratio Calculator
// @version     1.0
// @description Shows PPM (Points Per Minute) ratio on death
// @author      A-76    Discord: anuryx. (Github: XyrenTheCoder)
// @match       *://diep.io/*
// @grant       none
// ==/UserScript==

class RatioCalculator {
    constructor() {
        this._elapsedTime = 0;
        this._elapsedTimerInterval = null;
        this._finalScore = 0;

        this._observeScreenChanges();
    }

    _observeScreenChanges() {
        const screenHolder = document.getElementById('screen-holder');
        if (!screenHolder) {
            setTimeout(() => this._observeScreenChanges(), 1000);
            return;
        }

        const checkScreens = () => {
            const homeScreen = document.getElementById('home-screen');
            const inGameScreen = document.getElementById('in-game-screen');
            const gameOverScreen = document.getElementById('game-over-screen');

            const homeActive = homeScreen && homeScreen.classList.contains('active');
            const inGameActive = inGameScreen && inGameScreen.classList.contains('active');
            const gameOverActive = gameOverScreen && gameOverScreen.classList.contains('active');

            if (homeActive) {
                this.resetElapsedTimer();
                this._finalScore = 0;
            } else if (inGameActive) {
                this.startElapsedTimer();
            } else if (gameOverActive) {
                this.stopElapsedTimer();

                setTimeout(() => {
                    this._finalScore = this._extractFinalScore();
                    if (this._finalScore >= 0) {
                        this._insertPPMDisplay();
                    }
                }, 500);
            } else {
                this.stopElapsedTimer();
            }
        };

        const observer = new MutationObserver((mutations) => {
            let screenChanged = false;

            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.id === 'home-screen' || target.id === 'in-game-screen' || target.id === 'game-over-screen') {
                        screenChanged = true;
                    }
                }
            });

            if (screenChanged) {
                checkScreens();
            }
        });

        const screens = ['home-screen', 'in-game-screen', 'game-over-screen'];
        screens.forEach(screenId => {
            const screen = document.getElementById(screenId);
            if (screen) {
                observer.observe(screen, { attributes: true });
            }
        });

        observer.observe(screenHolder, { childList: true, subtree: false });
        checkScreens();
    }

    startElapsedTimer() {
        if (this._elapsedTimerInterval) {
            return;
        }

        this._elapsedTime = 0;

        setTimeout(() => {
            this._elapsedTimerInterval = setInterval(() => {
                this._elapsedTime++;
            }, 1000);
        }, 1000);
    }

    stopElapsedTimer() {
        if (this._elapsedTimerInterval) {
            clearInterval(this._elapsedTimerInterval);
            this._elapsedTimerInterval = null;
        }
    }

    resetElapsedTimer() {
        this.stopElapsedTimer();
        this._elapsedTime = 0;
    }

    _extractFinalScore() {
        const gameOverScoreElement = document.getElementById('game-over-stats-player-score');
        if (gameOverScoreElement) {
            const scoreText = gameOverScoreElement.textContent.trim();
            const score = this._parseScore(scoreText);
            if (score >= 0) {
                return score;
            }
        }
        return 0;
    }

    _parseScore(scoreText) {
        if (!scoreText) return 0;

        let cleanStr = scoreText.toString().replace(/[,\s]/g, '');

        const match = cleanStr.match(/([\d.]+)([kKmM]?)/);
        if (!match) return 0;

        const numPart = parseFloat(match[1]);
        const multiplier = match[2].toLowerCase();

        if (isNaN(numPart)) return 0;

        switch (multiplier) {
            case 'k':
                return numPart * 1000;
            case 'm':
                return numPart * 1000000;
            default:
                return numPart;
        }
    }

    _calculatePPM(score, timeInSeconds) {
        if (timeInSeconds <= 0) return 0;
        const timeInMinutes = timeInSeconds / 60;
        const ppm = score / timeInMinutes;
        return Math.round(ppm);
    }

    _insertPPMDisplay() {
        const ppm = this._calculatePPM(this._finalScore, this._elapsedTime);

        const timeElement = document.getElementById('game-over-stats-time-alive');
        if (timeElement) {
            const timeContainer = timeElement.closest('.game-detail');
            if (timeContainer) {
                const existingRatio = document.querySelector('.ratio-display');
                if (existingRatio) {
                    existingRatio.remove();
                }

                let displayText = '';
              
                displayText = `${ppm.toLocaleString()} ppm`;

                const ratioDiv = document.createElement('div');
                ratioDiv.className = 'game-detail ratio-display';
                ratioDiv.innerHTML = `
                    <div class="label">Ratio: </div>
                    <div class="value">${displayText}</div>
                `;

                timeContainer.parentNode.insertBefore(ratioDiv, timeContainer.nextSibling);
            }
        }
    }
}

let ratioCalculator = new RatioCalculator();
