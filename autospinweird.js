// ==UserScript==
// @name         auto spin weird
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  press b to turn on weird auto spin, use up and down arrows to change the spin speed
// @author       y__
// @match        https://diep.io/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let _window = typeof unsafeWindow === "undefined" ? window : unsafeWindow;
let mouseX2 = 0;
let mouseY2 = 0;
let mouseX = 0;
let mouseY = 0;
let m_angle = 0;
let spinSpeed = .05;
let right_mouse = false;
let rotated_x;
let rotated_y;

function rotate_mouse(a/* (a being in radians) */){
    const cosine = Math.cos(a);
    const sine = Math.sin(a);
    const tank_x = _window.innerWidth / 2;
    const tank_y = _window.innerHeight / 2;

    let ox = mouseX - tank_x;
    let oy = mouseY - tank_y;
    let _rx = cosine * ox - sine * oy;
    let _ry = sine * ox + cosine * oy;
    rotated_x = _rx + tank_x;
    rotated_y = _ry + tank_y;

    return [rotated_x, rotated_y];
}
function start_mouse(x, y){
    return extern.onTouchMove(-1, x, y, 1);
}
function angle(a){
    rotate_mouse(a);
    m_angle = a;
    start_mouse(rotated_x, rotated_y);
}
document.addEventListener('keydown', function(event){
    if(event.code === "KeyB"){
        right_mouse = !right_mouse;
        extern.inGameNotification("weird auto spin: " + right_mouse);
    }
    if(event.code === "ArrowUp"){
        spinSpeed += .01;
        extern.inGameNotification("spin speed: " + Math.round(spinSpeed*100)/100);
    }
    if(event.code === "ArrowDown"){
        spinSpeed -= .01;
        extern.inGameNotification("spin speed: " + Math.round(spinSpeed*100)/100);
    }
});
document.addEventListener('mousemove', function(event) {if(right_mouse==true){event.preventDefault(); event.stopPropagation(); angle(m_angle);} else {mouseX = event.clientX; mouseY = event.clientY; m_angle = 0;} angle(m_angle);});
setInterval(function(){if(right_mouse){m_angle += 0.2*spinSpeed; angle(m_angle);}}, 10);
