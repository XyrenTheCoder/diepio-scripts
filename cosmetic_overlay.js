// ==UserScript==
// @name         Cosmetic Overlay
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Play as your own Diep.io OC!
// @author       Discord: anuryx. (Github: XyrenTheCoder)
// @match        *://diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the overlay image
    const img = document.createElement('img');
    img.src = 'https://ik.imagekit.io/as7ksk9qe/IMG_7151.png?updatedAt=1747127005772'; // Replace with your image URL
    img.style.position = 'fixed';
    img.style.top = '50%';
    img.style.left = '50%';
    img.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    img.style.pointerEvents = 'none';
    img.style.width = '90px'; // Set desired width
    img.style.height = '90px'; // Set desired height
    img.style.zIndex = 999;
    img.style.display = 'none';
    document.body.appendChild(img);

    let isRotating = false;
    let rotationAngle = 0;
    const maxSpeed = 25;
    const maxOffset = 150;
    let offsetX = 0;
    let offsetY = 0;

    // Track currently held keys
    const keysHeld = {};
    let clickSequence = [];
    const requiredClicks = [
        { x: 156, y: 75, width: 100, height: 100 }, // Define Sniper area
        { x: 156, y: 75, width: 100, height: 100 }, // Define Overseer area
        { x: 47, y: 75, width: 100, height: 100 } // Define Overlord area
    ];

    // Show the image based on click sequence
    document.addEventListener('click', (event) => {
        const clickPos = { x: event.clientX, y: event.clientY };
        for (let area of requiredClicks) {
            if (clickPos.x >= area.x && clickPos.x <= area.x + area.width &&
                clickPos.y >= area.y && clickPos.y <= area.y + area.height) {
                clickSequence.push(area);
                console.log(clickSequence);

                if (clickSequence.join() == requiredClicks.join()) {
                    img.style.display = 'block';
                    clickSequence = [];
                }
                return;
            }
        }

        // Hide the image if clicking the Exit button area
        const exitArea = { x: 26, y: 172, width: 190, height: 52 }; // Define Exit button area
        if (clickPos.x >= exitArea.x && clickPos.x <= exitArea.x + exitArea.width &&
            clickPos.y >= exitArea.y && clickPos.y <= exitArea.y + exitArea.height) {
            img.style.display = 'none';
            clickSequence = [];
        }
    });

    // Function to rotate the image
    function rotateImage() {
        if (isRotating) {
            rotationAngle += 1.43; // Speed of rotation
            updatePosition();
            requestAnimationFrame(rotateImage); // Continue rotating
        }
    }

    // Update the image rotation and position based on cursor position
    document.addEventListener('mousemove', (event) => {
        if (!isRotating) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deltaX = event.clientX - centerX;
            const deltaY = event.clientY - centerY;
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            rotationAngle = angle; // Set initial angle to cursor direction
            updatePosition();
        }
    });

    // Handle keydown event
    document.addEventListener('keydown', (event) => {
        keysHeld[event.key] = true;
        if (event.key === 'c' || event.key === 'C') {
            isRotating = !isRotating;
            if (isRotating) {
                rotateImage();
            } else {
                updatePosition();
            }
        }
        updateMovement();
    });

    // Handle keyup event
    document.addEventListener('keyup', (event) => {
        keysHeld[event.key] = false;
        smoothBounceBack();
    });

    // Update movement based on held keys
    function updateMovement() {
        // Calculate target offsets based on held keys
        let targetX = 0;
        let targetY = 0;

        if (keysHeld['w'] || keysHeld['W']) {
            targetY -= maxSpeed; // Move up
        }
        if (keysHeld['s'] || keysHeld['S']) {
            targetY += maxSpeed; // Move down
        }
        if (keysHeld['a'] || keysHeld['A']) {
            targetX -= maxSpeed; // Move left
        }
        if (keysHeld['d'] || keysHeld['D']) {
            targetX += maxSpeed; // Move right
        }

        // Apply easing for smooth movement
        offsetX += (targetX - offsetX) * 0.1;
        offsetY += (targetY - offsetY) * 0.1;

        // Limit the maximum offset
        offsetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
        offsetY = Math.max(-maxOffset, Math.min(maxOffset, offsetY));

        updatePosition();
    }

    function updatePosition() {
        img.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rotationAngle}deg)`;
    }

    function smoothBounceBack() {
        const bounceBack = () => {
            if (Math.abs(offsetX) > 0.1 || Math.abs(offsetY) > 0.1) {
                offsetX *= 0.96; // Dampen the offset
                offsetY *= 0.96; // Dampen the offset
                updatePosition();
                requestAnimationFrame(bounceBack); // Continue bouncing back
            } else {
                offsetX = 0; // Reset to prevent overshoot
                offsetY = 0; // Reset to prevent overshoot
                updatePosition();
            }
        };
        bounceBack();
    }
})();
