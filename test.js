// ==UserScript==
// @name         Rotating and Moving Image Overlay with Bounce
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Overlay an image that rotates and moves smoothly, bouncing back to center on key release, with max offset
// @author       Your Name
// @match        *://diep.io/*
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
    img.style.pointerEvents = 'none'; // Allow clicks to pass through
    img.style.width = '100px'; // Set desired width
    img.style.height = '100px'; // Set desired height
    img.style.zIndex = 999; // Ensure the image appears above other elements
    document.body.appendChild(img);

    let isRotating = false;
    let rotationAngle = 0;
    const movementSpeed = 7; // Set movement speed
    const maxOffset = 20; // Maximum offset in pixels
    let offsetX = 0;
    let offsetY = 0;

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

    // Move the image based on key presses
    document.addEventListener('keydown', (event) => {
        if (event.key === 'w' || event.key === 'W') {
            if (offsetY > -maxOffset) offsetY -= movementSpeed; // Move up
        }
        if (event.key === 's' || event.key === 'S') {
            if (offsetY < maxOffset) offsetY += movementSpeed; // Move down
        }
        if (event.key === 'a' || event.key === 'A') {
            if (offsetX > -maxOffset) offsetX -= movementSpeed; // Move left
        }
        if (event.key === 'd' || event.key === 'D') {
            if (offsetX < maxOffset) offsetX += movementSpeed; // Move right
        }

        // Diagonal movement logic
        if ((event.key === 'w' || event.key === 'W') && (event.key === 'a' || event.key === 'A')) {
            offsetX -= movementSpeed; // Top left
        }
        if ((event.key === 'w' || event.key === 'W') && (event.key === 'd' || event.key === 'D')) {
            offsetX += movementSpeed; // Top right
        }
        if ((event.key === 's' || event.key === 'S') && (event.key === 'a' || event.key === 'A')) {
            offsetX -= movementSpeed; // Bottom left
        }
        if ((event.key === 's' || event.key === 'S') && (event.key === 'd' || event.key === 'D')) {
            offsetX += movementSpeed; // Bottom right
        }

        updatePosition();
    });

    // Smoothly bounce back to center
    document.addEventListener('keyup', () => {
        smoothBounceBack();
    });

    function updatePosition() {
        img.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rotationAngle}deg)`;
    }

    function smoothBounceBack() {
        const bounceBack = () => {
            if (Math.abs(offsetX) > 0.1 || Math.abs(offsetY) > 0.1) {
                offsetX *= 0.9; // Dampen the offset
                offsetY *= 0.9; // Dampen the offset
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
