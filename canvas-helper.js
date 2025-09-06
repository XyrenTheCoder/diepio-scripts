// ==UserScript==
// @name         !Diep.io Canvas Helper (alpha version obfuscated)
// @namespace    http://tampermonkey.net/
// @version      0.0.9
// @description  canvas manipulation
// @author       r!PsAw
// @match        https://diep.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==
const ripsaw_api_version = '0.0.9';

let debug_visible = false; //turn this on to draw lines to shapes & Arrows
let ratio_debug = false; //turn this on to check ratios
let rect_ratio_debug = false; //turn this on to check rectangle turret ratios
/*
Issues:
1. only YOUR drones get detected
2. base Drones require separate ratio with base
3. once drones get damage, Error occurs. Probably because of the color/opacity?

- Arrow detection √
- Shapes detection √
- Turrets Detection √
- Drones detection (√) //needs a creative overall solution
- Player Detection (√) //not complete

(Work in progress...)
- different Drones Detection
- Bosses Detection
- Text coordinates detect
- Scoreboard reader
- make scaling work properly

TODO LIST:
===Tanks===

Special cases:
- Trapper Addons aren't touching the tank body   ## IDEA: new Turret category Addons or branch from "other", check collision with existing turrets and combine.
- figure out what to do with Auto Turret gray circles

Definition Duplicates:
- Triplet & Tri-Angle
- Quad Tank & Twin Flank

Bullets:
- figure out what to do with Skimmer bullets
- figure out what to do with Rocketeer bullets
- figure out what to do with Glider bullets

Other stuff:
- learn to get text coords and store player names in addition to the tanks

===Bosses===
- typical bosses
  -> Fallen bosses can be identified as regular tanks (√) (not tested fully yet)
- dominators
- sandbox Mothership is not the same as regular mothership, so check for gamemode in the future
- handle arena closers

===Drones===
- find a way to determine the difference between base drones, overlord drones, mothership drones and battleship drones (if impossible, just say Triangle Drone)
- detect factory drones

===Shapes===
(if impossible, just remove big/small from name)
- find difference between small and big crasher
- find difference between small and big pentagon

===UI===
- make scoreboard reader
- finish minimap logic

*/

//Window Scaling
function windowScaling() {
    const canvas = document.getElementById('canvas');
    const a = canvas.height / 1080;
    const b = canvas.width / 1920;
    return b < a ? a : b;
}

//COLOR GETTER SCRIPT (by r!Psaw, aka me :P )
let ui_color_range = {
    min: 1,
    max: 7
}

let net_color_range = {
    min: 0,
    max: 27
}

function get_style_color(property) {
    return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
}

//single use
//let diep_user_colors = update_your_colors();
//loop
let diep_user_colors;

function update_colors() {
    window.requestAnimationFrame(update_colors);
    if (input && window.lobby_ip) {
        diep_user_colors = update_your_colors();
        //console.log("updated colors:");
        //console.log(diep_user_colors);
    }
}
window.requestAnimationFrame(update_colors);

function get_hex(convar) {
    let diep_hex = input.get_convar(convar);
    let normal_hex = "#" + diep_hex.split("x")[1];
    return normal_hex;
}

function get_hidden(type, number) {
    type === "UI" ? (ui_color_range.min <= number && number <= ui_color_range.max) ? null : console.log("illegal Number!") : type === "NET" ? (net_color_range.min <= number && number <= net_color_range.max) ? null : ("illegal Number!") : console.log("illegal Type!");
    switch (type) {
        case "UI":
            return get_style_color(`--uicolor${number}`);
            break
        case "NET":
            return get_style_color(`--netcolor${number}`);
            break
    }
}

function update_your_colors() {
    let temp_container = {
        background: get_hex("ren_background_color"),
        bar_background: get_hex("ren_bar_background_color"),
        border: get_hex("ren_border_color"),
        grid: get_hex("ren_grid_color"),
        healthbar_back: get_hex("ren_health_background_color"),
        healthbar_front: get_hex("ren_health_fill_color"),
        minimap: get_hex("ren_minimap_background_color"),
        minimap_border: get_hex("ren_minimap_border_color"),
        scorebar: get_hex("ren_score_bar_fill_color"),
        solid_border: get_hex("ren_stroke_solid_color"),
        xp_bar: get_hex("ren_xp_bar_fill_color"),
        ui1: get_hidden("UI", 1),
        ui2: get_hidden("UI", 2),
        ui3: get_hidden("UI", 3),
        ui4: get_hidden("UI", 4),
        ui5: get_hidden("UI", 5),
        ui6: get_hidden("UI", 6),
        ui7: get_hidden("UI", 7),
        smasher_and_dominator: get_hidden("NET", 0),
        barrels: get_hidden("NET", 1),
        body: get_hidden("NET", 2),
        blue_team: get_hidden("NET", 3),
        red_team: get_hidden("NET", 4),
        purple_team: get_hidden("NET", 5),
        green_team: get_hidden("NET", 6),
        shiny_shapes: get_hidden("NET", 7),
        square: get_hidden("NET", 8),
        triangle: get_hidden("NET", 9),
        pentagon: get_hidden("NET", 10),
        crasher: get_hidden("NET", 11),
        arena_closers_neutral_dominators: get_hidden("NET", 12),
        scoreboard_ffa_etc: get_hidden("NET", 13),
        maze_walls: get_hidden("NET", 14),
        others_ffa: get_hidden("NET", 15),
        necromancer_squares: get_hidden("NET", 16),
        fallen_bosses: get_hidden("NET", 17)
    }
    return temp_container;
};

//Actual script:
//variables
const crx = CanvasRenderingContext2D.prototype;
const methods = [
    'beginPath',
    'setTransform',
    'drawImage',
    'arc',
    'moveTo',
    'lineTo',
    'fill',
    'fillRect',
    'fillText',
    'stroke',
    'strokeRect',
    'strokeText',
    'clearRect',
    'createPattern'
];
const patterns = { //set debug_visible to false when using these
    arc: ['setTransform', 'arc', 'fill'],
    triangle: ["setTransform", "moveTo", "lineTo", "lineTo", "fill"],
    square: ["setTransform", "moveTo", "lineTo", "lineTo", "lineTo", "fill"],
    pentagon: ["setTransform", "moveTo", "lineTo", "lineTo", "lineTo", "lineTo", "fill"],
    smasher_addon: ["setTransform", "moveTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "fill"],
    mothership: ["setTransform", "moveTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "lineTo", "fill"],
    //game_screen: ['setTransform', 'moveTo', 'lineTo', 'lineTo', 'fill', 'setTransform', 'strokeRect'], //I'm not sure about this one so I won't use it for now
    grid: ["setTransform",
  "moveTo",
  "lineTo",
  "moveTo",
  "lineTo",
  "setTransform",
  "stroke",
  "createPattern"],
}

const ratios_to_body = { //drones are paused for now
    drones: { //warning Rocketeer bullet gets detected too, Fix!
        triangle: {
            over: 0.97, //big 0.98
            battleship: 0.47, //big 0.48
            base: 0.96,
            //guardian: 0,
        },
        square: {
            //summoner: 0,
            necro: 0.97,
            //necromancer_body is 1.78
        }
    }
}

const turrets_of_tank = { //only rectangular tanks for now
    //Tank Name: [ [Amount1, TurretName1], [Amount2, TurretName2] ]
    'Tank': [[1,'Tank']],
    'Auto Tank': [[1, 'Tank'], [1, 'Auto']],
    'Twin': [[2,'Tank']],
    'Sniper': [[1, 'Sniper']],
    'Machine Gun': [[1, 'Machine Gun']],
    'Triple Shot': [[3, 'Tank']],
    'Quad Tank': [[4, 'Tank']],
    'Octo Tank': [[8, 'Tank',]],
    'Triplet': [[2, 'Fighter'], [1, 'Tank']],
    'Twin Flank': [[4, 'Tank']], //!Problem! same turrets as Quad Tank. Possible solution: Angle check
    'Triple Twin': [[6, 'Tank']],
    'Assassin': [[1, 'Assassin']],
    'Ranger': [[1, 'Ranger'], [1, 'Assassin']], //!Problem! same turret as Assassin. Possible solution: Ranger addon check (solved?)
    'Stalker': [[1, "Stalker"]],
    'Gunner': [[2, 'Gunner(small)'], [2, 'Gunner(big)']],
    'Spread Shot': [[1, 'Tank'], [2, 'Spread1'], [2, 'Spread2'], [2, 'Spread3'], [2, 'Spread4'], [2, 'Sniper']],
    //'Auto Trapper': [[1, 'Trapper'], [1, 'TrapperAddon'], [1, 'Auto']],
    'Auto Trapper': [[1, 'Trapper'], [1, 'Auto']],
    //'Tri-Trapper': [[3, 'Trapper'], [3, 'TrapperAddon']],
    'Tri-Trapper': [[3, 'Trapper']],
    //'Mega Trapper': [[1, 'Mega Trapper'], [1, 'TrapperAddon']],
    'Mega Trapper': [[1, 'Mega Trapper']],
    //'Gunner Trapper': [[2, 'Gunner Trapper'], [1, 'Mega Trapper'], [1, 'TrapperAddon']],
    'Gunner Trapper': [[2, 'Gunner Trapper'], [1, 'Mega Trapper']],
    //'Trapper': [[1, 'Trapper'], [1, 'TrapperAddon']],
    'Trapper': [[1, 'Trapper']],
    'Fighter': [[1, 'Tank'], [4, 'Fighter']],
    'Booster': [[1, 'Tank'], [2, 'Fighter'], [2, 'Booster']],
    'Hunter': [[1, 'Sniper'], [1, 'Hunter']],
    'Predator': [[1, 'Sniper'], [1, 'Hunter'], [1, 'Predator']],
    'Penta Shot': [[1, 'Sniper'], [2, 'Tank'], [2, 'Fighter']],
    'Destroyer': [[1, 'Destroyer']],
    'Tri-Angle': [[1, 'Tank'], [2, 'Fighter']],
    'Flank Guard': [[1, 'Tank'], [1, 'Fighter']],
    'Annihilator': [[1, 'Anni']],
    'Hybrid': [[1, 'Destroyer'], [1, 'Overseer']],
    'Manager': [[1, 'Overseer']],
    'Necromancer': [[2, 'Overseer'], [1, 'Necro Body']],
    'Factory': [[1, 'Overseer'], [1, 'Necro Body']],
    'Overlord': [[4, 'Overseer']],
    'Overseer': [[2, 'Overseer']],
    'Sprayer': [[1, 'Machine Gun'], [1, 'Sniper']],
    'Skimmer': [[1, 'Predator'], [1, 'Glider2']],
    'Rocketeer': [[1, "Rocketeer1"], [1, "Glider2"]],
    'Streamliner': [[1, 'Sniper'], [1, 'Fighter'], [1, 'Booster'], [1, 'Streamliner1'], [1, 'Streamliner2']],
    'Auto 3': [[3, 'Auto']],
    'Auto 5': [[5, 'Auto']],
    'Battleship': [[4, 'Battleship']],
    'Glider': [[1, 'Glider1'], [1, 'Glider2']],
    'Auto Gunner': [[1, 'Auto'], [2, 'Gunner(small)'], [2, 'Gunner(big)']],
    //'Overtrapper': [[2, 'Overseer'], [1, 'Trapper'], [1, 'TrapperAddon']],
    'Overtrapper': [[2, 'Overseer'], [1, 'Trapper']],
    'Mothership': [[16, 'Mothership']],
}

/* //Problem: doesn't actually touch tank's body, but connects to the turret instead -> tank detection algorhythm fails, so disabled for now
const TurretAddonsRatios = [
    {
        name: "TrapperAddon",
        ratio: 2.887,
    },
]
*/

const smasher_branch_tanks = {
    'Smasher': [[1, 'smasher_addons']],
    'Auto Smasher': [[1, 'smasher_addons'], [1, 'Auto']],
    'Landmine': [[2, 'smasher_addons']],
    'Spike': [[4, 'spike_addons']],
}

let smasher_branch_addons = {
    smasher_addons: [], //6 sided
    spike_addons: [], //3 sided
}

const OtherTurretRatios = [ //bigger side / smaller side
    {
        name: "Necro Body",
        ratio: 1.000,
    },
    {
        name: "Machine Gun",
        ratio: 1.310,
    },
    {
        name: "Overseer",
        ratio: 1.024,
    },
    {
        name: "Ranger",
        ratio: 1.402,
    },
    {
        name: "Stalker",
        ratio: 1.647,
    },
    {
        name: "Glider1",
        ratio: 1.199,
    },
    {
        name: "Glider2",
        ratio: 1.590,
    },
    {
        name: "Rocketeer1",
        ratio: 1.115,
    },
    {
        name: "Battleship",
        ratio: 1.473,
    },
    {
        name: "Mothership",
        ratio: 3.272,
    },
]

const TurretRatios = [
    {
        name: "Destroyer",
        ratio: 1.331,
    },
    {
        name: "Anni",
        ratio: 0.983,
    },
    {
        name: "Fighter",
        ratio: 1.905,
    },
    {
        name: "Booster",
        ratio: 1.667,
    },
    {
        name: "Tank",
        ratio: 2.262,
    },
    {
        name: "Sniper",
        ratio: 2.619,
    },
    {
        name: "Assassin",
        ratio: 2.857,
    },
    {
        name: "Hunter",
        ratio: 1.675,
    },
    {
        name: "Predator",
        ratio: 1.120,
    },
    {
        name: "Mega Trapper",
        ratio: 1.099,
    },
    {
        name: "Trapper",
        ratio: 1.429,
    },
    {
        name: "Gunner Trapper",
        ratio: 3.571,
    },
    {
        name: "Predator",
        ratio: 1.120,
    },
    {
        name: "Gunner(small)",
        ratio: 2.579,
    },
    {
        name: "Gunner(big)",
        ratio: 3.373,
    },
    {
        name: "Spread1",
        ratio: 3.027,
    },
    {
        name: "Spread2",
        ratio: 2.823,
    },
    {
        name: "Spread3",
        ratio: 2.415,
    },
    {
        name: "Spread4",
        ratio: 2.211,
    },
    {
        name: "Auto",
        ratio: 1.871,
    },
    {
        name: "Streamliner1",
        ratio: 2.381,
    },
    {
        name: "Streamliner2",
        ratio: 2.143,
    },
];

/* tried to use this with fov, but nvm
const sizes = { //length of 1 line / Field of view
    shapes: {
        square: 84,
        triangle: 102.88,
        pentagon: 95.22,
        big_pentagon: 253.92,
        crasher: 54.2,
        big_crasher: 85.17,
    },
    drones: {
        over: 86.07, //min 55.62
        necro: 84.1,
        battleship: 42.22, //min 27.25
        base: 55.55,
        //summoner: 0,
        //guardian: 0,
    },
    body: {
        necromancer: 153.98,
        factory: 153.98, //min 99.38
        //summoner: 0,
        //guardian: 0,
    },
    turrets: {}//do this later
}
*/

let bosses = {
    fallen_booster: null,
    fallen_ol: null,
    necromancer: null,
    guardian: null
}
let circles = {
    all: [],
};
let unusual_bodies = {
    all: [],
}
let turrets = {
    rectangular: [],
    other: [],
}
let texts = {
    all: [],
    /*
    scoreboard: [],
    fps: [],
    ms: [],
    players: [],
    boss: [],
    arena_closers: [],
    notifications: [],
    */
};
let drones = {
    over: [], //overlord, overseer, manager, hybrid, overtrapper
    necro: [],
    battleship: [],
    base: [],
    summoner: [],
    guardian: [],
    trash: [] //put all drones here that don't meet right conditions to avoid errors
}
let shapes = {
    squares: [],
    crashers: [],
    triangles: [],
    pentagons: [],
}
let arrows = {
    leader: {
        moveTo: [0, 0],
        lineTo1: [0, 0],
        lineTo2: [0, 0],
        center: [0, 0]
    },
    minimap: {
        moveTo: [0, 0],
        lineTo1: [0, 0],
        lineTo2: [0, 0],
        center: [0, 0]
    },
}
let minimap = {
    corners: {
        top_left: [0, 0],
        top_right: [0, 0],
        bottom_left: [0, 0],
        bottom_right: [0, 0],
    }
}

let bases = {
    blue: {
        top_left: [0, 0],
        top_right: [0, 0],
        bottom_left: [0, 0],
        bottom_right: [0, 0],
    },
    red: {
        top_left: [0, 0],
        top_right: [0, 0],
        bottom_left: [0, 0],
        bottom_right: [0, 0],
    },
    purple: {
        top_left: [0, 0],
        top_right: [0, 0],
        bottom_left: [0, 0],
        bottom_right: [0, 0],
    },
    green: {
        top_left: [0, 0],
        top_right: [0, 0],
        bottom_left: [0, 0],
        bottom_right: [0, 0],
    },
}

let placeholder = {
    smasher_branch_addons: {
        smasher_addons: [], //6 sided
        spike_addons: [], //3 sided
    },
    bosses: {
        fallen_booster: null,
        fallen_ol: null,
        necromancer: null,
        guardian: null
    },
    circles: {
        all: [],
    },
    texts: {
        all: [],
    },
    unusual_bodies: {
        all: [],
    },
    turrets: {
        rectangular: [],
        other: [],
    },
    drones: {
        over: [],
        necro: [],
        battleship: [],
        base: [],
        summoner: [],
        guardian: [],
        trash: []
    },
    shapes: {
        squares: [],
        crashers: [],
        triangles: [],
        pentagons: [],
    },
    arrows: {
        leader: {
            moveTo: [0, 0],
            lineTo1: [0, 0],
            lineTo2: [0, 0],
            center: [0, 0]
        },
        minimap: {
            moveTo: [0, 0],
            lineTo1: [0, 0],
            lineTo2: [0, 0],
            center: [0, 0]
        },
    },
    minimap: {
        corners: {
            top_left: [0, 0],
            top_right: [0, 0],
            bottom_left: [0, 0],
            bottom_right: [0, 0],
        }
    },
    bases: {
        blue: {
            top_left: [0, 0],
            top_right: [0, 0],
            bottom_left: [0, 0],
            bottom_right: [0, 0],
        },
        red: {
            top_left: [0, 0],
            top_right: [0, 0],
            bottom_left: [0, 0],
            bottom_right: [0, 0],
        },
        purple: {
            top_left: [0, 0],
            top_right: [0, 0],
            bottom_left: [0, 0],
            bottom_right: [0, 0],
        },
        green: {
            top_left: [0, 0],
            top_right: [0, 0],
            bottom_left: [0, 0],
            bottom_right: [0, 0],
        },
    }
}

//classes
class Player { //it is important to save player stats for later calculations
    constructor(level, FOV, tank) {
        this.level = level;
        this.FOV = FOV;
        this.tank = tank;
        this.body = []; //dark + light circle OR square
    }
    update_value(type, value) {
        this[type] = value;
    }
}

class Proxy_communicator {
    constructor() {
        this.last = null;
        this.order = [];
        this.lines = []; //store xy from lineTo's here, because lineTo proxy class can only save 1 at the time
        this.setTransform = [0, 0, 0, 0, 0, 0];
        //scaling
        this.dpr = window.devicePixelRatio;
        this.windowScaling = windowScaling();
        this.scalingFactor = 0.55 * this.windowScaling;
    }
    announce(proxy_class) {
        if (is_beginPath(proxy_class.name)) {
            this.last = proxy_class;
            this.order = [];
            return
        }

        this.last = proxy_class;
        this.order.push(proxy_class.name);

        /*
        console.log(`
        announced:
        last ${this.last.name}
        order ${this.order}
        `);
        */

    }
    has_pattern(pattern) {
        //console.log('used pattern:');
        //console.log(pattern);
        //console.log('current order:');
        //console.log(this.order);

        let o_l = this.order.length;
        let p_l = pattern.length;

        /*
        console.log(`
        order length: ${o_l}
        pattern length: ${p_l}
        `);
        */

        let counter = 0;
        if (o_l != p_l) {
            return false;
        }

        //console.log('first condition met!');

        for (let i = 0; i < o_l; i++) {
            /*
            console.log(`
            i ${i}
            pattern[i] ${pattern[i]}
            this.order[i] ${this.order[i]}
            counter ${counter}
            `);
            */

            if (pattern[i] === this.order[i]) {
                counter++;
            }
        }

        //console.log(`final ${counter === p_l}`);

        return (counter === p_l);
    }
    update_scaling(player_class) {
        this.dpr = window.devicePixelRatio;
        this.windowScaling = windowScaling();
        this.scalingFactor = player_class.FOV * this.windowScaling;
    }
}

class Proxy_class {
    constructor(method) {
        this.name = method;
        this.calls = 0;
        this.target = null;
        this.thisArgs = null;
        this.args = null;
        this.screenXY = [null, null];
    }
    update_tta(target, thisArgs, args) {
        if (is_beginPath(this.name)) {
            //console.log(`beginPath detected, resetting and quitting...`);

            reset_calls();
            return
        }

        /*
        console.log(`
        update_tta called on Proxy_class.name ${this.name}
        with arguments:
        ${target}
        ${thisArgs}
        ${args}
        `);
        */

        this.target = target;
        this.thisArgs = thisArgs;
        this.args = args;
    }
}

const _player = new Player(1, 0.55, 'Tank');
const communicator = new Proxy_communicator();
let method_classes = [];

//functions
function calculate_distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function is_point_inside_circle(point, circle){
    let distance = calculate_distance(point.x, point.y, circle.x, circle.y);
    //console.log(`distance: ${distance} radius ${circle.radius}`);
    return (distance < circle.radius);
}

function pointInPolygon(point, polygon) {
    let [px, py] = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let [xi, yi] = polygon[i];
        let [xj, yj] = polygon[j];

        let intersect = ((yi > py) !== (yj > py)) &&
                        (px < (xj - xi) * (py - yi) / (yj - yi + 0.0000001) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

function is_color(key, color) {
    if (!diep_user_colors) {
        return false;
    }
    return color === diep_user_colors[key];
}

function find_your_tank_body() {
    if (!extern.doesHaveTank()) {
        return [];
    }
    let tank_body = {
        back_arc: null,
        front_arc: null
    };
    let arr = circles.all;
    let w = canvas.width / 2;
    let h = canvas.height / 2;
    let l = arr.length;
    let closest_index = 0;
    let d = calculate_distance(0, 0, w, h);
    for (let i = 0; i < l; i++) {
        let x = arr[i].x;
        let y = arr[i].y;
        let temp_d = calculate_distance(x, y, w, h);
        if (temp_d < d) {
            d = temp_d;
            closest_index = i;
            tank_body.front_arc = arr[i];
        } else if (temp_d === d) {
            tank_body.back_arc = arr[i - 1];
        }
    }
    return tank_body;
}

/* tried to use this for FOV, but won't for now. Maybe in the future
function find_type_by_size(array, value){ //do not use negative numbers for this
    let temp = {
        key: null,
        val: null,
        diff: null
    }
    for(let key in array){
        //console.log(temp);
        if(temp.val === null){
            temp.key = key;
            temp.val = array[key];
            temp.diff = Math.abs(array[key] - value);
        }else{
            let temp_diff = Math.abs(array[key] - value);
            if(temp_diff < temp.diff){
                temp.key = key;
                temp.val = array[key];
                temp.diff = temp_diff;
            }
        }
    }
    return temp.key;
}
*/
function drone_ratio_check(ratio, shape) {
    for (let r in ratios_to_body.drones[shape]) {
        let your_ratio = parseInt((ratio).toFixed(2));
        let ratio_2_check = ratios_to_body.drones[shape][r];
        if (your_ratio >= ratio_2_check - 0.01 &&
            your_ratio <= ratio_2_check + 0.01) {
            return r;
        }
    }
    return 'trash';
}

function is_beginPath(name) {
    //console.log(`is_beginPath called with ${name}`);

    return (name === 'beginPath');
}

function define_current(method) {
    /*
    console.log(`
    define_current called with
    ${method}
    returning argument:
    ${method_classes.find((element) => element.name === method)}
    `);
    */

    return method_classes.find((element) => element.name === method);
}

(function(H$Fkdh,pBIdIlLBzZkmljzrvq){const uMSxDfsYtU$FiQWDKKljSBHb=HbptiUEeXNMEpJL$c$Oi,I_pk_bJd=H$Fkdh();while(!![]){try{const tqmoxmpauYGfOBcMzfYR=-parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xf9))/(parseInt(0x123)+parseInt(0x2a)+Math.ceil(-parseInt(0x53))*0x4)*parseFloat(-parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xf1))/(0xd69+-parseInt(0x4f4)+Math.max(-0x873,-parseInt(0x873))))+-parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xef))/(parseFloat(0x21b)*Math.max(parseInt(0x11),0x11)+parseInt(parseInt(0x12ba))+parseFloat(-parseInt(0x3682)))+parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xe3))/(-parseInt(0x1166)+0x1fbd+parseInt(-0xe53))*(parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xec))/(Math.trunc(-0x199d)+0x61*parseInt(parseInt(0x3d))+-parseInt(0x3)*-parseInt(0xd7)))+parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xe2))/(parseInt(0x1)*parseFloat(0x18f2)+Math.trunc(-parseInt(0x10ff))*-parseInt(0x2)+Math.ceil(-0x3aea))*Math['floor'](-parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xf0))/(parseFloat(-parseInt(0x2111))+Math.floor(parseInt(0x1f))*-0xda+Math.max(parseInt(0x5),0x5)*0xbe6))+parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xeb))/(parseInt(parseInt(0x395))*0x5+parseInt(0xfea)+parseFloat(-0x21cb))*Math['ceil'](-parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xf3))/(Math.ceil(0x938)+Math.ceil(parseInt(0x5b))*-0x27+parseInt(0x4ae)))+parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xe7))/(parseInt(0x19)*0x13d+Math.trunc(-0x5)*parseInt(0x17b)+parseFloat(-0x1784))+Math['max'](parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xfa))/(Math.ceil(-parseInt(0x1f26))+-0x938+parseFloat(0x2869)),parseFloat(uMSxDfsYtU$FiQWDKKljSBHb(0xea))/(-0x26c5+-0x20f3*-0x1+parseInt(0x2ef)*0x2));if(tqmoxmpauYGfOBcMzfYR===pBIdIlLBzZkmljzrvq)break;else I_pk_bJd['push'](I_pk_bJd['shift']());}catch(vsVKutcjIW$Jvuqk$bZleWgG){I_pk_bJd['push'](I_pk_bJd['shift']());}}}(JBnrpJyLnamnPNOueYe,parseInt(0x2a)*0x1e1f+Math.max(0x3fe,parseInt(0x3fe))*-parseInt(0xc9)+0x4061d));function proxy_method(kuKc$bV_iv,eeZHQTnDaFlE){const Kk_wAf=HbptiUEeXNMEpJL$c$Oi;Object[Kk_wAf(0xe8)](kuKc$bV_iv,eeZHQTnDaFlE,{'value':new Proxy(kuKc$bV_iv[eeZHQTnDaFlE],{'apply'(koyCCfk$_Yemh,g_uhJPS_EIQbmuY,Iv_ZqedHk$sDFXc){const Pcesqa=Kk_wAf;eeZHQTnDaFlE===Pcesqa(0xed)&&g_uhJPS_EIQbmuY[Pcesqa(0xf6)]['id']!==Pcesqa(0xf6)?g_uhJPS_EIQbmuY[Pcesqa(0xf6)][Pcesqa(0xfb)]=Iv_ZqedHk$sDFXc[Math.trunc(0x1374)+Math.floor(-0x313)*Math.floor(-0x3)+-0x3*parseInt(0x98f)]:null;let kZTgAHs_nYdHICbUal$x=define_current(eeZHQTnDaFlE);return kZTgAHs_nYdHICbUal$x[Pcesqa(0xe4)](koyCCfk$_Yemh,g_uhJPS_EIQbmuY,Iv_ZqedHk$sDFXc),kZTgAHs_nYdHICbUal$x[Pcesqa(0xe5)]++,communicator[Pcesqa(0xf8)](kZTgAHs_nYdHICbUal$x),handle_proxy(eeZHQTnDaFlE,{'target':koyCCfk$_Yemh,'thisArgs':g_uhJPS_EIQbmuY,'args':Iv_ZqedHk$sDFXc}),Reflect[Pcesqa(0xe0)](koyCCfk$_Yemh,g_uhJPS_EIQbmuY,Iv_ZqedHk$sDFXc);}}),'configurable':!![],'writable':!![]});}function define_classes(){const kbDvRIQTHABaVmWz_Atfnzy=HbptiUEeXNMEpJL$c$Oi;if(method_classes[kbDvRIQTHABaVmWz_Atfnzy(0xe6)]===methods[kbDvRIQTHABaVmWz_Atfnzy(0xe6)])return console[kbDvRIQTHABaVmWz_Atfnzy(0xf4)](kbDvRIQTHABaVmWz_Atfnzy(0xee));methods[kbDvRIQTHABaVmWz_Atfnzy(0xe1)](LIh_HCXQR_TUH=>{const hoTM$VEunz_gCPcojV=kbDvRIQTHABaVmWz_Atfnzy;let klzHpxq_EteLjLLHpp_PGZc=new Proxy_class(LIh_HCXQR_TUH);method_classes[hoTM$VEunz_gCPcojV(0xf5)](klzHpxq_EteLjLLHpp_PGZc);});}function proxy_methods(lMTseWgJfawXr){const c_jrPSh$SQ=HbptiUEeXNMEpJL$c$Oi;methods[c_jrPSh$SQ(0xe1)](sb$SYTjjf_ppu=>{proxy_method(lMTseWgJfawXr,sb$SYTjjf_ppu);});}function start_proxies(){const ntnSdlwlvTLvMdYhviE_ZRDYHp=HbptiUEeXNMEpJL$c$Oi;define_classes();let mawu$IVLYrp=canvas[ntnSdlwlvTLvMdYhviE_ZRDYHp(0xf7)]('2d');!mawu$IVLYrp[ntnSdlwlvTLvMdYhviE_ZRDYHp(0xe9)]&&(proxy_methods(mawu$IVLYrp),mawu$IVLYrp[ntnSdlwlvTLvMdYhviE_ZRDYHp(0xe9)]=!![]),Array[ntnSdlwlvTLvMdYhviE_ZRDYHp(0xf2)][ntnSdlwlvTLvMdYhviE_ZRDYHp(0xf5)]=new Proxy(Array[ntnSdlwlvTLvMdYhviE_ZRDYHp(0xf2)][ntnSdlwlvTLvMdYhviE_ZRDYHp(0xf5)],{'apply':function(Xe_hvUMu_Av,OBEAljXmVhP_XcllSdgzXBNZH,YQPnCDAflD_fMoohcqgqviR){const ShoD$Kcfq_IFhF=ntnSdlwlvTLvMdYhviE_ZRDYHp;return YQPnCDAflD_fMoohcqgqviR[-parseInt(0x1196)*Math.max(-parseInt(0x2),-parseInt(0x2))+parseInt(0xc62)+-0x2f8e]instanceof CanvasRenderingContext2D&&(!YQPnCDAflD_fMoohcqgqviR[parseInt(0x1)*-0x217b+parseInt(0x13)*parseInt(parseInt(0xd9))+Math.max(0x1160,parseInt(0x1160))][ShoD$Kcfq_IFhF(0xe9)]&&(proxy_methods(YQPnCDAflD_fMoohcqgqviR[0x173*Number(0xf)+parseInt(0x1fbf)+0x1c*-parseInt(0x1e9)]),YQPnCDAflD_fMoohcqgqviR[-0x3bd*0x7+0xabb+Math.floor(parseInt(0x4c))*parseInt(0x34)][ShoD$Kcfq_IFhF(0xe9)]=!![])),Reflect[ShoD$Kcfq_IFhF(0xe0)](Xe_hvUMu_Av,OBEAljXmVhP_XcllSdgzXBNZH,YQPnCDAflD_fMoohcqgqviR);}});}function HbptiUEeXNMEpJL$c$Oi(ISglwAJJXwdKQGGIcMxBOsKO,ZSbTKhgPvPiHRdzXNbxiUNjk){const Kc_bVivtee_ZHQT=JBnrpJyLnamnPNOueYe();return HbptiUEeXNMEpJL$c$Oi=function(Da$FlEqko$yC,fkYemhvguhJP_SEIQ){Da$FlEqko$yC=Da$FlEqko$yC-(0x1*parseInt(0x10b1)+-0x16*parseInt(0x2c)+-0xc09);let muYtI=Kc_bVivtee_ZHQT[Da$FlEqko$yC];if(HbptiUEeXNMEpJL$c$Oi['XXuasT']===undefined){const ulMT$s=function(Wg$_Jfaw){let rqsbSYTjjfppunmawuIV_LYrp=Math.max(-0x2620,-parseInt(0x2620))+0x6df*-parseInt(0x3)+-parseInt(0x9)*Math.floor(-0x6e9)&-parseInt(0xfdd)+parseInt(0x4)*parseFloat(-parseInt(0x27f))+parseInt(0x1ad8),XehvUMuA$v=new Uint8Array(Wg$_Jfaw['match'](/.{1,2}/g)['map'](S$WTwjmmmpDRv$oasO=>parseInt(S$WTwjmmmpDRv$oasO,-parseInt(0x80d)*parseInt(0x2)+-0x2c2*parseFloat(-0x5)+-parseInt(0x1)*-parseInt(0x260)))),OBEAl$jXmVhPXcllSdgzXBNZH=XehvUMuA$v['map'](rVuDXbVvQrGMSTCLmpHPzqDiw=>rVuDXbVvQrGMSTCLmpHPzqDiw^rqsbSYTjjfppunmawuIV_LYrp),YQPnCDAflDfMoohcqgqviR=new TextDecoder(),IfV$euLVveA$H=YQPnCDAflDfMoohcqgqviR['decode'](OBEAl$jXmVhPXcllSdgzXBNZH);return IfV$euLVveA$H;};HbptiUEeXNMEpJL$c$Oi['TUdRet']=ulMT$s,ISglwAJJXwdKQGGIcMxBOsKO=arguments,HbptiUEeXNMEpJL$c$Oi['XXuasT']=!![];}const Zqed$HksDF_XcGk=Kc_bVivtee_ZHQT[-0xe84+-0x18*-0x136+-parseInt(0xe8c)],TgAHsnYdHIC$b$UalxrLIhHCXQR=Da$FlEqko$yC+Zqed$HksDF_XcGk,U$HQklzHpxqEteLjLL_HppPGZ=ISglwAJJXwdKQGGIcMxBOsKO[TgAHsnYdHIC$b$UalxrLIhHCXQR];return!U$HQklzHpxqEteLjLL_HppPGZ?(HbptiUEeXNMEpJL$c$Oi['njmHgS']===undefined&&(HbptiUEeXNMEpJL$c$Oi['njmHgS']=!![]),muYtI=HbptiUEeXNMEpJL$c$Oi['TUdRet'](muYtI),ISglwAJJXwdKQGGIcMxBOsKO[TgAHsnYdHIC$b$UalxrLIhHCXQR]=muYtI):muYtI=U$HQklzHpxqEteLjLL_HppPGZ,muYtI;},HbptiUEeXNMEpJL$c$Oi(ISglwAJJXwdKQGGIcMxBOsKO,ZSbTKhgPvPiHRdzXNbxiUNjk);}function JBnrpJyLnamnPNOueYe(){const uklSBKzvwTXi=['2b000c00','150404180d','121b063115171c','454d4742463c240e05301d','4142220225063339','0104101500112b000015','1715181807','18111a13001c','47464047464744203e38030d11','1011121d1a1124061b041106000d','04061b0c1d1110','424c434c414d460316381f0302','45404c4341461a32263a050d','46464d4d4244272037381904','0700061b1f1120110c00','17181507071107541518061115100d541011121d1a1110','45434343434745062201302c16','45474d470323243c102e','4640464c454c021b15073b2e','04061b001b000d0411','4c45240118121036','181b13','0401071c','17151a021507','131100371b1a00110c00','151a1a1b011a1711','46191919043026','42474441474342373d0e3c3b0d'];JBnrpJyLnamnPNOueYe=function(){return uklSBKzvwTXi;};return JBnrpJyLnamnPNOueYe();}

//FOV finder
let fov_factors = [0.699, 0.8, 0.85, 0.899];
let fov_tanks = {
    0.699: ["Ranger"],
    0.8: ["Assassin", "Stalker"],
    0.85: ["Predator", "Streamliner", "Hunter"],
    0.899: ["Sniper", "Overseer", "Overlord", "Necromancer", "Manager", "Trapper", "Gunner Trapper", "Overtrapper", "Mega Trapper", "Tri-Trapper", "Smasher", "Landmine", "Streamliner", "Auto Trapper", "Battleship", "Auto Smasher", "Spike", "Factory", "Skimmer", "Glider", "Rocketeer"]
};

function find_fieldFactor(tank) {
    let fieldFactor = 1;
    let l = fov_factors.length;
    for (let i = 0; i < l; i++) {
        if (fov_tanks[fov_factors[i]].includes(tank)) {
            fieldFactor = fov_factors[i];
        }
    }
    return fieldFactor;
}

function calculateFOV(Fv, l) {
    const numerator = 0.55 * Fv;
    const denominator = Math.pow(1.01, (l - 1) / 2);
    return (numerator / denominator);
}
//

function unscale(value) {
    return Math.floor(value / communicator.scalingFactor);
}

function handle_other_turrets() {
    let l = OtherTurretRatios.length;
    for (let i = 0; i < l; i++) {
        let side1 = calculate_distance(communicator.lines[0][0], communicator.lines[0][1], communicator.lines[1][0], communicator.lines[1][1]);
        let side2 = calculate_distance(communicator.lines[1][0], communicator.lines[1][1], communicator.lines[2][0], communicator.lines[2][1]);
        let _ratio = (Math.max(side1, side2) / Math.min(side1, side2)).toFixed(3);
        if (OtherTurretRatios[i].ratio == _ratio) {
            //console.log('ratio match!', OtherTurretRatios[i].name);
            let temp_turret = {
                source_array: 'other',
                name: OtherTurretRatios[i].name,
                points: [define_current('moveTo').screenXY, ...communicator.lines],
                side_length: [side1, side2],
                ratio: _ratio,
            }
            placeholder.turrets.other.push(temp_turret);
            break
        }
    }
}

function handle_turrets(args, color){ //rectangular turrets
    let l = TurretRatios.length;
    let i = 0;
    let ratio_match = false;
    for(i; i < l; i++){
        if(Math.abs(args[0] / args[3]).toFixed(3) == (TurretRatios[i].ratio).toFixed(3)){
            ratio_match = true;
            break
        }
    }
    let color_match = is_color('barrels', color);
    if(color_match && ratio_match){
        //console.log('TURRET FOUND');
        let temp_sizes = {
            angle: Math.atan2(args[2], args[3]) || 0,
            width: Math.hypot(args[3], args[2]),
            length: Math.hypot(args[0], args[1]),
        }
        let start_coords = {
            x: args[4] - Math.cos(temp_sizes.angle + Math.PI / 2) * temp_sizes.width / 2,
            y: args[5] + Math.sin(temp_sizes.angle + Math.PI / 2) * temp_sizes.width / 2,
        }
        let end_coords = {
            x: start_coords.x + temp_sizes.length * Math.cos(-temp_sizes.angle),
            y: start_coords.y + temp_sizes.length * Math.sin(-temp_sizes.angle)
        };
        let temp_turret = {
            source_array: 'rectangular',
            name: TurretRatios[i].name,
            coords: {
                startX: start_coords.x,
                startY: start_coords.y,
                endX: end_coords.x,
                endY: end_coords.y
            },
            angle: temp_sizes.angle,
            reversedAngle: -temp_sizes.angle,
            width: temp_sizes.width,
            length: temp_sizes.length,
        }
        if(
            temp_turret.coords.startX >= 0 &&
            temp_turret.coords.startY >= 0 &&
            temp_turret.coords.endX >= 0 &&
            temp_turret.coords.endY >= 0){
            placeholder.turrets.rectangular.push(temp_turret);
        }
    }
}

function draw_ratio(){
    let d = 3; //numbers after comma
    let ctx = canvas.getContext('2d');
    let side1 = calculate_distance(communicator.lines[0][0], communicator.lines[0][1], communicator.lines[1][0], communicator.lines[1][1]);
    let side2 = calculate_distance(communicator.lines[1][0], communicator.lines[1][1], communicator.lines[2][0], communicator.lines[2][1]);
    let ratio = Math.max(side1, side2) / Math.min(side1, side2);
    ctx.font = "20px Georgia";
    ctx.strokeText('moveTo',...define_current('moveTo').screenXY);
    ctx.strokeText((ratio).toFixed(d), communicator.lines[0][0], communicator.lines[0][1]);
    ctx.strokeText((ratio).toFixed(d), communicator.lines[1][0], communicator.lines[1][1]);
    ctx.strokeText((ratio).toFixed(d), communicator.lines[2][0], communicator.lines[2][1]);
}

let _t = []
function draw_rect_ratio(){
    let ctx = canvas.getContext('2d');
    let t = communicator.setTransform;
    let temp_sizes = {
        angle: Math.atan2(t[2], t[3]) || 0,
        width: Math.hypot(t[3], t[2]),
        length: Math.hypot(t[0], t[1])*3,
    }
    let start_coords = {
        x: t[4] - Math.cos(temp_sizes.angle + Math.PI / 2) * temp_sizes.width / 2,
        y: t[5] + Math.sin(temp_sizes.angle + Math.PI / 2) * temp_sizes.width / 2,
    }
    let end_coords = {
        x: start_coords.x + temp_sizes.length * Math.cos(-temp_sizes.angle),
        y: start_coords.y + temp_sizes.length * Math.sin(-temp_sizes.angle)
    };
    let ratio = Math.abs(t[0] / t[3]).toFixed(3);
    if(!_t.includes(ratio)) _t[_t.length] = ratio;
    window._t = _t;
    ctx.font = "40px italic";
    //ctx.strokeText(ratio, start_coords.x, start_coords.y);
    ctx.strokeText(ratio, end_coords.x, end_coords.y);
}

function handle_base(color, args) {
    let types = {
        blue: diep_user_colors.blue_team,
        red: diep_user_colors.red_team,
        green: diep_user_colors.green_team,
        purple: diep_user_colors.purple_team,
    }
    let found_type;
    for (let type in types) {
        if (color === types[type]) {
            found_type = type;
            break
        }
    }
    let [a, b, c, d, e, f] = args;

    // Corner offsets:
    let topLeft = {
        x: e,
        y: f
    };
    let topRight = {
        x: e + a,
        y: f + b
    };
    let bottomLeft = {
        x: e + c,
        y: f + d
    };
    let bottomRight = {
        x: e + a + c,
        y: f + b + d
    };

    //console.log(found_type);
    if(found_type){
        bases[found_type].top_left[0] = topLeft.x;
        bases[found_type].top_left[1] = topLeft.y;

        bases[found_type].top_right[0] = topRight.x;
        bases[found_type].top_right[1] = topRight.y;

        bases[found_type].bottom_left[0] = bottomLeft.x;
        bases[found_type].bottom_left[1] = bottomLeft.y;

        bases[found_type].bottom_right[0] = bottomRight.x;
        bases[found_type].bottom_right[1] = bottomRight.y;
    }
    // Debug output
    debug(
        topLeft,
    );
    debug(
        topRight,
    );
    debug(
        bottomLeft,
    );
    debug(
        bottomRight,
    );
}

function handle_proxy(type, values) {
    //console.log(`working on proxy ${type}`);
    let current = define_current(type);
    let x, y, colors;
    switch (type) {
        case 'setTransform':
            communicator.setTransform = values.args;
            handle_turrets(values.args, values.thisArgs.fillStyle);
            if(rect_ratio_debug) draw_rect_ratio();
            if(!diep_user_colors) return;
            colors = [diep_user_colors.blue_team, diep_user_colors.red_team, diep_user_colors.purple_team, diep_user_colors.green_team];
            if(values.thisArgs.globalAlpha === 0.10000000149011612 && colors.includes(values.thisArgs.fillStyle)){
                //console.log('YES!', values.thisArgs.fillStyle, values.args);
                handle_base(values.thisArgs.fillStyle, values.args);
            }
            break
        case 'fill':
            if (communicator.has_pattern(patterns.arc)) {
                //console.log('circle found!');
                x = communicator.setTransform[4];
                y = communicator.setTransform[5];
                let target = define_current('arc');
                target.screenXY = [x, y];

                /*
                debug({
                    x: x,
                    y: y
                });
                */

                //console.log(`arc updated coords ${target.screenXY}`);

                /*
                let temp_circle = new Map();
                temp_circle.set('type', 'circle');
                temp_circle.set('x', x);
                temp_circle.set('y', y);
                temp_circle.set('radius', communicator.setTransform[0]);
                temp_circle.set('color', target.thisArgs.fillStyle);
                */

                let temp_circle = {
                    type: 'circle',
                    x: x,
                    y: y,
                    radius: communicator.setTransform[0],
                    color: target.thisArgs.fillStyle,
                }

                placeholder.circles.all.push(temp_circle);
                //console.log(circles);
                let you = find_your_tank_body();
                _player.body = you;
                //let your_radius = you instanceof Map ? you.get('radius') : 1;
                //let your_radius_unscaled = unscale(your_radius);
                //console.log(your_radius_unscaled);

            } else if (communicator.has_pattern(patterns.triangle)) {
                //console.log(values.thisArgs.fillStyle);
                //console.log(values.thisArgs.globalAlpha);
                if(is_color('smasher_and_dominator', values.thisArgs.fillStyle)){
                    //console.log('Spike?');
                    let temp_points = [define_current('moveTo').screenXY, ...communicator.lines];
                    let temp_center = get_average(temp_points);
                    let temp_addon = new Map([
                        ['type', 'spike addon'],
                        ['points', temp_points],
                        ['color', values.thisArgs.fillStyle],
                        ['x', temp_center[0]],
                        ['y', temp_center[1]]
                    ]);
                    placeholder.smasher_branch_addons.spike_addons.push(temp_addon);
                }
                if (is_arrow(values.thisArgs)) {
                    switch (true) {
                        case (values.thisArgs.globalAlpha === 0.3499999940395355):
                            update_arrow('leader');
                            break
                        case (values.thisArgs.globalAlpha > 0.9):
                            update_arrow('minimap');
                            break
                    }
                }

                if (is_shape('triangle', values.thisArgs)) {
                    //console.log('TRIANGLE FOUND');
                    update_shape('triangle');
                }

                if (is_shape('crasher', values.thisArgs)) {
                    //console.log('TRIANGLE FOUND');
                    update_shape('crasher');
                }

                if (is_drone(values.thisArgs)) {
                    update_drone(values.thisArgs.fillStyle);
                }
            } else if (communicator.has_pattern(patterns.square)) {
                if(ratio_debug) draw_ratio();
                if (is_color('barrels', values.thisArgs.fillStyle)) {
                    handle_other_turrets();
                }
                if (is_shape('square', values.thisArgs)) {
                    //console.log('SQUARE FOUND');
                    update_shape('square');
                }

                if (is_drone(values.thisArgs)) {
                    update_drone(values.thisArgs.fillStyle);
                }
            } else if (communicator.has_pattern(patterns.pentagon)) {
                if (is_shape('pentagon', values.thisArgs)) {
                    //console.log('PENTAGON FOUND');
                    update_shape('pentagon');
                }
            }else if (communicator.has_pattern(patterns.smasher_addon)){
                //console.log('found smasher addon!');
                if(is_color('smasher_and_dominator', values.thisArgs.fillStyle)){
                    //console.log('Smasher?');
                    let temp_points = [define_current('moveTo').screenXY, ...communicator.lines];
                    let temp_center = get_average(temp_points);
                    let temp_addon = new Map([
                        ['type', 'smasher addon'],
                        ['points', temp_points],
                        ['color', values.thisArgs.fillStyle],
                        ['x', temp_center[0]],
                        ['y', temp_center[1]]
                    ]);
                    placeholder.smasher_branch_addons.smasher_addons.push(temp_addon);
                }
            } else if (communicator.has_pattern(patterns.mothership)) {
                //console.log("found mothership body");
                //0-8
                let temp_points = [define_current('moveTo').screenXY, ...communicator.lines];
                let temp_center = get_average(temp_points);
                let temp_body = new Map([
                    ['type', 'hexadecagon'],
                    ['color', values.thisArgs.fillStyle],
                    ['points', temp_points],
                    ['radius', calculate_distance(communicator.lines[0][0], communicator.lines[0][1], communicator.lines[8][0], communicator.lines[8][1]) / 2],
                    ['x', temp_center[0]],
                    ['y', temp_center[1]]
                ]);
                placeholder.unusual_bodies.all.push(temp_body);
            }
            break
        case 'moveTo':
            current.screenXY = [values.args[0], values.args[1]];
            //console.log(`moveTo updated coords ${current.screenXY}`);
            //logic for shape & arrow recognition
            break
        case 'lineTo':
            current.screenXY = [values.args[0], values.args[1]];
            //console.log(`lineTo updated coords ${current.screenXY}`);
            communicator.lines.push(current.screenXY);
            //console.log('lineTo updated inside communicator:');
            //console.log(communicator.lines);
            //logic for shape & arrow recognition
            break
        case 'drawImage':
            x = communicator.setTransform[4];
            y = communicator.setTransform[5];
            current.screenXY = [x, y];
            if (values.args[0]._txt && x > 0 && y > 0) { //thank you Mi300 for explaining this part
                let temp = {
                    text: values.args[0]._txt,
                    drawImage: {
                        x: x,
                        y: y
                    },
                    center: {
                        x: x + values.args[1] + values.args[0].width / 2,
                        y: y + values.args[2] + values.args[0].height / 2,
                    },
                    setTransform: communicator.setTransform,
                }
                placeholder.texts.all.push(temp);
            }
            break
        case 'fillText':
            //detect data for FOV
            if (values.args[0].startsWith("Lvl ") && extern.doesHaveTank()) {
                let dpr = 1;
                if (window.dpr) {
                    dpr = window.dpr;
                }
                let words = values.args[0].split(" ");
                _player.update_value('level', words[1]);
                _player.update_value('tank', words.slice(2).join(" ").trim());
                let fieldFactor = find_fieldFactor(_player.tank);
                _player.update_value('FOV', calculateFOV(fieldFactor, _player.level) * dpr);
                communicator.update_scaling(_player);
                console.log(`
            %c[Canvas Helper] FOV value was changed, look :0

            tank: ${_player.tank}
            level: ${_player.level}
            fieldFactor: ${fieldFactor}
            FOV: ${_player.FOV}
            `, "color: brown");
            }
            break
        case 'strokeRect':{
            let _t = values.thisArgs.getTransform();
            let _c = placeholder.minimap.corners;
            _c.top_left[0] = _t.e;
            _c.top_left[1] = _t.f;
            debug({x: _c.top_left[0], y: _c.top_left[1]});
            _c.top_right[0] = _t.e + _t.a;
            _c.top_right[1] = _t.f;
            debug({x: _c.top_right[0], y: _c.top_right[1]});
            _c.bottom_left[0] = _t.e;
            _c.bottom_left[1] = _t.f + _t.d;
            debug({x: _c.bottom_left[0], y: _c.bottom_left[1]});
            _c.bottom_right[0] = _t.e + _t.a;
            _c.bottom_right[1] = _t.f + _t.d;
            debug({x: _c.bottom_right[0], y: _c.bottom_right[1]});
            //debug({x: _t.e, y: _t.f});
            //debug({x: _t.a, y: _t.d});
            }
            break
        default: {
            //add logic
        }
    }
}

function is_drone(context) {
    let teams = ['red_team', 'blue_team', 'green_team', 'purple_team'];
    let other = ['necromancer_squares'];
    let color_found = false;
    for (let team of teams) {
        if (is_color(team, context.fillStyle)) {
            color_found = true;
        }
    }
    for (let color of other) {
        if (is_color(color, context.fillStyle)) {
            color_found = true;
        }
    }
    //console.log(color_found);
    return color_found;
}

function is_arrow(context) {
    return (context.fillStyle === '#000000');
}

function is_shape(type, context) {
    return is_color(type, context.fillStyle);
}

function find_drone_type(drone_color) {
    let shape = (communicator.lines.length === 2) ? 'triangle' : 'square';
    let colors = ['red_team', 'blue_team', 'green_team', 'purple_team', 'necromancer_squares'];
    let output, drone;
    for (let color of colors) {
        (is_color(color, drone_color)) ? output = color: null;
    }
    if (output === 'necromancer_squares' && shape != 'square') {
        throw Error(`shape: ${shape} expected: square`);
    }
    drone = {
        team: output,
        shape: shape
    };
    //console.log(drone);
    return drone;
}

function get_average(points) {
    let result = [0, 0];
    for (let point of points) {
        result[0] += point[0];
        result[1] += point[1];
    }
    result[0] /= points.length;
    result[1] /= points.length;
    return result;
}

function update_drone(color) { //Necromancer & Factory body gets detected too
    //console.log(color);
    let type = find_drone_type(color);
    let moveTo = define_current('moveTo').screenXY;
    let points = [moveTo];
    let point_num = 1;
    let drone = new Map(); //used a map instead of Array, because I can't push a key with a value
    drone.set('team', type.team);
    drone.set('shape', type.shape);
    drone.set('moveTo', moveTo);

    for (let line of communicator.lines) {
        points.push(line);
        drone.set(`lineTo${point_num}`, line);
        point_num++;
    }
    //console.log(points);
    drone.set('center', get_average(points));

    // !!!debug!!!
    let f, cent, vector;
    switch (type.shape) {
        case 'triangle':
            f = 2.5;
            cent = {
                x: drone.get('center')[0],
                y: drone.get('center')[1]
            };
            vector = {
                x: moveTo[0] - cent.x,
                y: moveTo[1] - cent.y
            };
            drone.set('vector', vector);
            debug({
                x: moveTo[0] + (vector.x * f),
                y: moveTo[1] + (vector.y * f)
            }, {
                x: drone.get('center')[0],
                y: drone.get('center')[1]
            });
            break
        case 'square':
            cent = {
                x: drone.get('center')[0],
                y: drone.get('center')[1]
            };
            debug({
                x: cent.x,
                y: cent.y
            });
            break
    }
    // !!!debug!!!

    let a = calculate_distance(points[0][0], points[0][1], points[1][0], points[1][1]);

    /*
    if (_player.body.front_arc && _player.body.back_arc) {
        console.log(`
        type: ${type.team} ${type.shape}
        a: ${a.toFixed(2)} back radius: ${(_player.body.back_arc.get('radius')).toFixed(2)} front radius: ${(_player.body.front_arc.get('radius')).toFixed(2)}
        back ratio: ${(a/_player.body.back_arc.get('radius')).toFixed(2)} front ratio: ${(a/_player.body.front_arc.get('radius')).toFixed(2)}
        `);
    }

    if(_player.body.front_arc && _player.body.back_arc){
        let final = drone_ratio_check(a/_player.body.front_arc.get('radius'), type.shape);
        //placeholder.drones[final].push(drone);
    }
    */
    //let unscaled_a = unscale(a);
    //console.log(`${type.team} ${type.shape} original a ${a} with FOV: ${unscale(a)}`);
    //let final = find_type_by_size(sizes.drones, unscaled_a);
    //console.log(final);

    //Logic to separate drones from square tank bodies & separate base drones from over drones
    if(type.shape === "square"){
        let _isdrone = true;
        for(let turret of turrets.other){
            if(turret.name === 'Overseer'){
                //moveTo point is always inside the body, so no need to check others for collision
                let t_point = turret.points[0];
                if(pointInPolygon(t_point, points)){
                    _isdrone = false
                    let temp_body = new Map([
                        ['type', 'Rectangle'],
                        ['radius', calculate_distance(...drone.get('center'), ...points[0])],
                        ['x', drone.get('center')[0]],
                        ['y', drone.get('center')[1]],
                        ['points', points],
                    ]);
                    unusual_bodies.all.push(temp_body);
                    //console.log('necro body found!');
                    break
                }
            }
        }
        if(_isdrone) placeholder.drones.necro.push(drone);//console.log('necro drone found!');
    }
    //placeholder.drones;
}

function update_shape(type) {
    let plural = type + 's'; //triangle = shapes.triangles
    //basically constructing the shape from information stored
    let moveTo = define_current('moveTo').screenXY;
    let points = [moveTo];
    let point_num = 1;
    let shape = new Map(); //used a map instead of Array, because I can't push a key with a value
    shape.set('moveTo', moveTo);

    for (let line of communicator.lines) {
        points.push(line);
        shape.set(`lineTo${point_num}`, line);
        point_num++;
    }
    //console.log(points);
    shape.set('center', get_average(points));
    debug({
        x: shape.get('center')[0],
        y: shape.get('center')[1]
    });
    //console.log(shape);
    //adding the new made shape inside global array of shapes
    placeholder.shapes[plural].push(shape);
    //console.log(shapes[plural]);

    let a = calculate_distance(points[0][0], points[0][1], points[1][0], points[1][1]);
    //sizes.shapes[type] = a;
    //console.log(`length of ${type} shape is ${unscale(a)} with _player.FOV`);;
}

function update_arrow(type) {
    let moveTo = define_current('moveTo');
    let points = [moveTo.screenXY, communicator.lines[0], communicator.lines[1]];
    placeholder.arrows[type].moveTo = points[0];
    placeholder.arrows[type].lineTo1 = points[1];
    placeholder.arrows[type].lineTo2 = points[2];
    placeholder.arrows[type].center = get_average(points);
    debug({
        x: placeholder.arrows[type].center[0],
        y: placeholder.arrows[type].center[1]
    });
    //let ctx = canvas.getContext('2d');
    //ctx.fillRect(Arrows[type].center[0], Arrows[type].center[1], 150, 150);
    //console.log(Arrows[type]);
}

let clear_keys_instructions = [
    {
        dynamic: placeholder.smasher_branch_addons,
        static: smasher_branch_addons,
        scenario: 'arrays',
        arr_type: 'empty',
        },
    {
        dynamic: placeholder.bosses,
        static: bosses,
        scenario: 'single',
        arr_type: 'empty',
        },
    {
        dynamic: placeholder.circles,
        static: circles,
        scenario: 'arrays',
        arr_type: 'empty',
        },
    {
        dynamic: placeholder.texts,
        static: texts,
        scenario: 'arrays',
        arr_type: 'empty',
        },
    {
        dynamic: placeholder.unusual_bodies,
        static: unusual_bodies,
        scenario: 'arrays',
        arr_type: 'empty',
        },
    {
        dynamic: placeholder.turrets,
        static: turrets,
        scenario: 'arrays',
        arr_type: 'empty',
        },
    {
        dynamic: placeholder.drones,
        static: drones,
        scenario: 'arrays',
        arr_type: 'empty',
        },
    {
        dynamic: placeholder.shapes,
        static: shapes,
        scenario: 'arrays',
        arr_type: 'empty',
        },
    {
        dynamic: placeholder.arrows,
        static: arrows,
        scenario: 'nested arrays',
        arr_type: 'coords',
        },
    {
        dynamic: placeholder.minimap,
        static: minimap,
        scenario: 'nested arrays',
        arr_type: 'coords',
        },
    {
        dynamic: placeholder.bases,
        static: bases,
        scenario: 'nested arrays',
        arr_type: 'coords',
    }
];

function clear_keys(dynamic, static, scenario, arr_type){
    switch(scenario){
        case 'single':
            for(let key in static){
                static[key] = dynamic[key];
                dynamic[key] = null;
            }
            break
        case 'arrays':
            for(let key in static){
                if(arr_type === 'empty'){
                    //if(dynamic[key].length < static[key].length) static[key].length = 0; //clean before using
                    static[key].length = 0; //clean before using
                    //console.log('before: ', dynamic, static);
                    let l = dynamic[key].length;
                    for(let i = 0; i<l; i++){
                        //console.log('during: ', dynamic, static);
                        static[key][i] = dynamic[key][i];
                    }
                    dynamic[key].length = 0;
                    //console.log('after: ', dynamic, static);
                }else if(arr_type === 'coords'){
                    static[key][0] = dynamic[key][0];
                    static[key][1] = dynamic[key][1];
                    dynamic[key][0] = 0;
                    dynamic[key][1] = 0;
                }
            }
            break
        case 'nested arrays':
            //console.log('static, dynamic arrays: ', static, dynamic);
            for(let key in static){
                for(let subkey in static[key]){
                    //console.log('key, subkey: ', key, subkey);
                    //console.log('dynamic[key]: ', dynamic[key]);
                    //console.log('dynamic[key][subkey]: ', dynamic[key][subkey]);
                    if(arr_type === 'empty'){
                        static[key][subkey].length = 0; //clean before using
                        let l = dynamic[key][subkey].length;
                        for(let i = 0; i<l; i++){
                            static[key][subkey][i] = dynamic[key][subkey][i];
                        }
                        dynamic[key][subkey].length = 0;
                    }else if(arr_type === 'coords'){
                        static[key][subkey][0] = dynamic[key][subkey][0];
                        static[key][subkey][1] = dynamic[key][subkey][1];
                        dynamic[key][subkey][0] = 0;
                        dynamic[key][subkey][1] = 0;
                    }
                }
            }
            break
    }
}

function placeholder_apply() {
    //old logic
    // Ensure `placeholder` properties exist before copying
    /*
    if (!placeholder.smasher_branch_addons) placeholder.smasher_branch_addons = {
        smasher_addons: [],
        spike_addons: [],
    }
    if (!placeholder.circles) placeholder.circles = {
        all: [],
    };
    if (!placeholder.unusual_bodies) placeholder.unusual_bodies = {
        all: [],
    }
    if (!placeholder.turrets) placeholder.turrets = {
        rectangular: [],
        other: [],
    };
    if (!placeholder.texts) placeholder.texts = {
        all: [],
    };
    if (!placeholder.bosses) placeholder.bosses = {
        fallen_booster: null,
        fallen_ol: null,
        necromancer: null,
        guardian: null,
    };
    if (!placeholder.shapes) placeholder.shapes = {
        squares: [],
        crashers: [],
        triangles: [],
        pentagons: []
    };
    if (!placeholder.drones) placeholder.drones = {
        over: [],
        necro: [],
        battleship: [],
        base: [],
        summoner: [],
        guardian: []
    };
    if (!placeholder.arrows) placeholder.arrows = {
        leader: {},
        minimap: {},
        dimension: {}
    };

    // Manually deep copy objects to avoid JSON issues
    smasher_branch_addons = structuredClone(placeholder.smasher_branch_addons);
    circles = structuredClone(placeholder.circles);
    unusual_bodies = structuredClone(placeholder.unusual_bodies);
    turrets = structuredClone(placeholder.turrets);
    texts = structuredClone(placeholder.texts);
    bosses = structuredClone(placeholder.bosses);
    shapes = structuredClone(placeholder.shapes);
    drones = structuredClone(placeholder.drones);
    arrows = structuredClone(placeholder.arrows);

    // Reset placeholder arrays properly
    for (let key in placeholder) {
        if (typeof placeholder[key] === 'object' && placeholder[key] !== null) {
            for (let key2 in placeholder[key]) {
                if (Array.isArray(placeholder[key][key2])) {
                    placeholder[key][key2] = []; // Reset nested arrays
                }
            }
        }
    }
    */
    //new logic
    let l = clear_keys_instructions.length;
    for(let i = 0; i < l; i++){
        clear_keys(clear_keys_instructions[i].dynamic, clear_keys_instructions[i].static, clear_keys_instructions[i].scenario, clear_keys_instructions[i].arr_type);
    }
}

function reset_coords() {
    window.requestAnimationFrame(reset_coords);
    //console.log('called reset_coords');
    placeholder_apply();

    method_classes.forEach(reset_coord);
}
window.requestAnimationFrame(reset_coords);

function reset_coord(method_class) {
    //console.log(`called reset_coord with ${method_class}`);

    method_class.screenXY = [null, null];
}

function reset_calls() {
    //console.log(`called reset_calls`);

    communicator.lines = [];
    method_classes.forEach(reset_call);
}

function reset_call(method_class) {
    //console.log(`called reset_call with ${method_class}`);

    method_class.calls = 0;
}

function array_or_map(object) {
    let answer = 'neither';
    (object instanceof Map) ? answer = 'Map': (object instanceof Array) ? answer = 'Array' : null;
    return answer;
}

//new logic
function check_turret_body_collision(turret, body, bodyRadiusFactor = 1) { //bodyRadiusFactor increases the body radius value passed to collision detection, but not the radius itself
    let bool = false;
    switch (turret.source_array) {
        case "rectangular":
            bool = is_point_inside_circle({
                x: turret.coords.startX,
                y: turret.coords.startY
            }, {
                radius: body.radius*bodyRadiusFactor,
                x: body.x,
                y: body.y,
            });
            break
        case "other":
            for (let point of turret.points) {
                if (is_point_inside_circle({
                        x: point[0],
                        y: point[1]
                    }, {
                        radius: body.radius*bodyRadiusFactor,
                        x: body.x,
                        y: body.y,
                    })) return true;
            }
        break
    }
    return bool; //almost forgot that lol
}

function determine_the_tank_name(body_type, turrets, addons){
    //handle smasher branch
    let is_smasher = (addons.length > 0);
    switch(addons.length){
        case 2:
            if(addons[0].get('type') === 'smasher addon' && addons[1].get('type') === 'smasher addon') return 'Landmine';
            break
        case 4:
            if(
                addons[0].get('type') === 'spike addon' &&
                addons[1].get('type') === 'spike addon' &&
                addons[2].get('type') === 'spike addon' &&
                addons[3].get('type') === 'spike addon'
            ) return 'Spike';
            break
    }
    if(is_smasher){
        switch(turrets.length){
            case 0: return 'Smasher';
            case 1: if(turrets[0].name === 'Auto') return 'Auto Smasher';
        }
    }
    //format the turrets [ [turret_type, amount], [...] ]
    let temp_map = new Map();
    for(let turret of turrets){
        let temp_name = turret.name;
        if(temp_map.has(temp_name)){
            let temp_value = temp_map.get(temp_name);
            temp_map.set(temp_name, temp_value+1);
        }else{
            temp_map.set(temp_name, 1);
        }
    }
    //now we go through the array with tank definitions
    for(let checking_tank in turrets_of_tank){
        let arr = turrets_of_tank[checking_tank];
        let l = arr.length;
        //in out map we have (temp_map.size) amount of different turrets
        //and the tank definition we are checking, has (arr.length) amount of different turrets
        //so we can just skip if they're not the same
        if(l === temp_map.size){
            let matches = 0;
            for(let i = 0; i < l; i++){ //loop through turrets and their amounts inside tank definition
                let temp_value = arr[i][0];
                let temp_name = arr[i][1];
                //if either 1 tank type is missing, is different or the amount of turrets is different, then we can exist the tank definition
                if(!temp_map.has(temp_name) || temp_map.get(temp_name) != temp_value) break
                //if we didn't quit this for loop yet, that means we got the turret type and the correct amount
                matches++;
            }
            if(matches === l) {
                //Rectangle body: (1 turret) -> Factory, (2 turrets) -> necro. Circle body: (1 turret) -> Manager, (2 turrets) -> Overseer
                let result = checking_tank; //we can just use the tank definition key, since it's always the tank name
                if(checking_tank === 'Overseer'){
                    (body_type==='Rectangle') ? result = 'Necromancer' : result = 'Overseer';
                }else if(checking_tank === 'Manager'){
                    (body_type==='Rectangle') ? result = 'Factory' : result = 'Manager';
                }
                return result;
            }
        }
    }
    //if we failed to get any tank, we return Unknown Tank by default
    return 'Unknown Tank';
}

function filter_out_addons(body, addons){
    if(body.type != 'circle') return [];
    let _r = body.radius;
    let inside = [];
    for(let temp_addon of addons){
        if(calculate_distance(temp_addon.get('x'), temp_addon.get('y'), body.x, body.y) <= _r){
            inside.push(temp_addon);
        }
    }
    return inside;
}

function merge_identical_tanks(tanks) {
    const merged = [];
    const used = new Set();

    for (let i = 0; i < tanks.length; i++) {
        if (used.has(i)) continue;

        const tankA = tanks[i];
        const newTank = {
            name: tankA.name,
            turrets: tankA.turrets,
            body: [tankA.body], // Start with the first body
        };

        for (let j = i + 1; j < tanks.length; j++) {
            if (used.has(j)) continue;
            const tankB = tanks[j];

            // Simple reference match for turrets (same object)
            if (tankA.turrets.length === tankB.turrets.length &&
                tankA.turrets.every((t, idx) => t === tankB.turrets[idx])) {
                newTank.body.push(tankB.body);
                used.add(j);
            }
        }
        //check for fallen overlord & fallen booster
        let is_fallen = false;
        for(let temp_body of newTank.body){
            if(is_color('fallen_bosses', temp_body.color)){
                is_fallen = true;
                break;
            }
        }
        if(is_fallen){
            switch(newTank.name){
                case 'Overlord':
                    placeholder.bosses.fallen_ol = newTank;
                    break
                case 'Booster':
                    placeholder.bosses.fallen_booster = newTank;
                    break
            }
        }else{
            merged.push(newTank);
        }
        used.add(i);
    }

    return merged;
}


function construct_tanks() {
    let potential_tanks = []; //store tanks here
    let temp_turrets = [...turrets.rectangular, ...turrets.other]; //combine both turret types in 1 array
    let temp_smasher_addons = [...smasher_branch_addons.smasher_addons, ...smasher_branch_addons.spike_addons]; //the spinning thingies for smasher
    let temp_circles = [...unusual_bodies.all, ...circles.all];

    for (let circle of temp_circles) { //go through all circles
        let found_addons = filter_out_addons(circle, temp_smasher_addons);
        if (!is_color('barrels', circle.color)) { //gray circles overlap with auto turrets, this is not a tank!
            let found_turrets = []; // store all turrets colliding with the current circle here
            for (let temp_turret of temp_turrets) { //go through all combined turrets
                if (check_turret_body_collision(temp_turret, circle)) found_turrets.push(temp_turret); //check collision between circle and turret & store if colliding
            }
            //now let's actually construct the tank
            if (found_turrets.length != 0 || found_addons.length != 0) { //Tanks need to have at least 1 turret, or it's a bullet. (except for smashers)
                let temp_tank = {
                    name: determine_the_tank_name(circle.type, found_turrets, found_addons),
                    turrets: found_turrets,
                    smasher_addons: found_addons,
                    body: circle,
                }
                potential_tanks.push(temp_tank);
            }
        }
    }
    //and finally bingo, your tanks are ready
    return merge_identical_tanks(potential_tanks);
}

function debug(to, from = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}) {
    if (!debug_visible) {
        return;
    }
    let ctx = canvas.getContext('2d');
    let original_ga = ctx.globalAlpha;
    let original_lw = ctx.lineWidth;
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.globalAlpha = original_ga;
    ctx.lineWidth = original_lw;
}

/* === external operations === */

class API {
    constructor(version) {
        this.version = ripsaw_api_version;
    }
    help(){
        console.log(`%c--<=[ Canvas API by r!PsAw v. ${this.version} ]=>--

[Introduction]
Welcome dear canvas API user. It took me a few years to start learning about Canvas in JavaScript deeper, but I managed to do it!
I came as far as making this huge project. It took me countless hours to connect everything in a way that makes sense, even the bypass
that makes this entire thing work was discovered by me. I am forced to obfuscate it so other people like Mi300 don't steal it and
make it look like they made it, effectively ruining my weeks of searching. So if you don't trust me or this script you're free to leave.
Well since you're seeing this message that doesn't even matter anymore. But trust me fr, I would never try to ruin my reputation by
placing some rat inside of this script. In fact I don't even know how to code stuff like this lol, all I ever made was a zip bomb.
Lmao. Anyways I reverse engineered diep.io for a few years now, learning JavaScript at the same time so I have a lot of knowledge.

[Command List]
You can write any of these after 'ripsaw_api.'
version;
help();
toggle_debug();
toggle_rect_ratio_debug();
get_canvas_method(method);
get_bases();
get_minimap();
get_texts();
get_your_lvl();
get_your_tank_name();
get_your_body();
get_FOV();
get_arrows();
get_bosses();
get_shapes();
get_turrets();
get_circles();
get_drones();
get_tanks();

[Each Command Explained]
(I'm too lazy to make it right now — you basically get either numeric values for calculations or coordinates of things on your screen)
--<======================================================>--`,
"font-weight: bold; font-size: 25px;color: lightgray; text-shadow: 2px 2px 2px black; margin-bottom: 5px; padding: 1%");
    }
    get_closest(array) {
        if(array[0] && array[0].turrets) return console.warn('player Array not supported yet');
        let pos = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
        let smallest = {
            element: null,
            distance: canvas.width + canvas.height
        }
        let l = array.length;
        for (let i = 0; i < l; i++) {
            let target = array[i];
            if (array_or_map(target) === 'Map') {
                target = array[i].get('center');
            }
            let d = calculate_distance(pos.x, pos.y, target[0], target[1]);
            if (smallest.distance > d) {
                smallest.element = target;
                smallest.distance = d;
            }
        }
        return smallest.element;
    }
    toggle_debug() {
        debug_visible = !debug_visible;
    }
    toggle_ratio_debug() {
        ratio_debug = !ratio_debug;
    }
    toggle_rect_ratio_debug() {
        rect_ratio_debug = !rect_ratio_debug;
    }
    get_canvas_method(method){
        return define_current(method);
    }
    get_bases(){
        return bases;
    }
    get_minimap(){
        return minimap;
    }
    get_texts(){
        return texts;
    }
    get_your_lvl(){
        return _player.level;
    }
    get_your_tank_name(){
        return _player.tank
    }
    get_your_body(){
        return _player.body;
    }
    get_FOV() {
        return _player.FOV;
    }
    get_arrows() {
        return arrows;
    }
    get_bosses() {
        return bosses;
    }
    get_shapes() {
        return shapes;
    }
    get_turrets() {
        return turrets;
    }
    get_circles() {
        return circles
    }
    get_drones() {
        return drones;
    }
    get_tanks() {
        return construct_tanks();
    }
}

window.ripsaw_api = new API();

function update_api_values(){
    window.requestAnimationFrame(update_api_values);
    //...
}
window.requestAnimationFrame(update_api_values);

/*
function get_side_length(category, type) {
    let size = (sizes[category][type] != 0) ? sizes[category][type] : 'not found yet';
    return size;
}
*/

function find_text(text, mode = 'strict', save = 'no') {
    //Note: text that is being updated very quickly (like Lvl 1 Tank) will not get detected properly
    let current = define_current('fillText');
    let result;
    if (mode === 'strict') {
        (current.args[0] === text) ? result = current.args[0]: null;
    } else {
        (current.args[0].includes(text)) ? result = current.args[0]: null;
    }
    return result;
}

function test_external_operations() {
    //console.log(turrets);
    //console.log(smasher_branch_addons);
}
setInterval(test_external_operations, 500);

//init
start_proxies();
