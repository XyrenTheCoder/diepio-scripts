// ==UserScript==
// @name         Rotating and Moving Image Overlay with Bounce
// @namespace    http://tampermonkey.net/
// @version      0.4
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
    img.style.display = 'none'; // Initially hide the image
    document.body.appendChild(img);

    let isRotating = false;
    let rotationAngle = 0;
    const maxSpeed = 25; // Maximum speed for smoother movement
    const maxOffset = 150; // Maximum offset in pixels
    let offsetX = 0;
    let offsetY = 0;

    // Track currently held keys
    const keysHeld = {};

    // Show the image when a certain area is clicked
    document.addEventListener('click', (event) => {
        const clickArea = { x: 47, y: 75, width: 100, height: 100 }; // Define Overlord upgrade area
        if (event.clientX >= clickArea.x && event.clientX <= clickArea.x + clickArea.width &&
            event.clientY >= clickArea.y && event.clientY <= clickArea.y + clickArea.height) {
            img.style.display = 'block'; // Show the image
        }
    });

    document.addEventListener('click', (event) => {
        const clickArea = { x: 26, y: 172, width: 190, height: 52 }; // Define Exit button area
        if (event.clientX >= clickArea.x && event.clientX <= clickArea.x + clickArea.width &&
            event.clientY >= clickArea.y && event.clientY <= clickArea.y + clickArea.height) {
            img.style.display = 'none'; // Show the image
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
        keysHeld[event.key] = true; // Mark the key as held
        if (event.key === 'c' || event.key === 'C') {
            isRotating = !isRotating;
            if (isRotating) {
                rotateImage(); // Start rotating
            } else {
                updatePosition(); // Update position immediately when stopping
            }
        }
        updateMovement();
    });

    // Handle keyup event
    document.addEventListener('keyup', (event) => {
        keysHeld[event.key] = false; // Mark the key as released
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
                offsetX *= 0.99; // Dampen the offset
                offsetY *= 0.99; // Dampen the offset
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
