"use strict";
import {changeLevel, jumper, Character, levelOnStart} from "../../JumperBase/base.js"
import {TRG_lever_door} from "../../JumperBase/triggers.js"
const platforms = [
 { id: 1, x: 100, y: 0, width: 100, height: 60, type: "simple", color: "green", texture: "grass", visible: true },
 { id: 2, x: 250, y: 0, width: 100, height: 30, type: "lifting", color: "rgb(0, 0, 0, 0.1)", texture: "lift", visible: true, speed: 2, direction: "down", heightMax: 290, heightMin: 30 },
 { id: 3, x: 400, y: 190, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true },
//maximum height where box can be replaced
 { id: 4, x: 500, y: 110, width: 100, height: 40, type: "simple", color: "green", texture: "grass", visible: true },
//maximum height where platform can be replaced
 { id: 5, x: 700, y: 0, width: 100, height: 120, type: "simple", color: "green", texture: "grass", visible: true },
//maximum height of platform
 { id: 6.5, x: 466, y: 0, width: 36, height: 150, type: "ghost",  color: "transparent", texture: "clear", visible: true, blockHeight: 150, blockY: 0 },
 { id: 6, x: 468, y: 0, width: 32, height: 150, type: "door",     color: "brown", texture: "wall", visible: true,
    doorState: "close", doorHeight: 150, doorY: 0, doorX: 468, doorXd: "left" },
 //second part must be first in array
 //x cords must be equal in "id: 6, x: 468" and "doorX: 468"
 //heights must be equal in "id: 6, height: 150", "doorHeight: 150" and "id: 6.5, height: 150"
 //second part of door must has x cord equal: [doorX] - 2, width equal: [doorWidth] + 4
 //second part of door must has id: [doorID] + 0.5
 //y cords must be equal in "id: 6.5, y: 0" and "blockY: 0"
 //heights must be equal in "id: 6.5, height: 150" and "blockHeight: 150"
 { id: 7, x: 540, y: 0, width: 20, height: 20, type: "lever",   color: "rgb(0, 0, 0, 0.1)", texture: "lever", visible: false, leverState: "off", leverChange: false },
//door and lever
];
const backscreen2 = [
    { id: 1, x: 630, y: 0, width: 100, height: 60, type: "simple", texture: "grass" },

]
const frontscreen = [
    { id: 1, x: 730, y: -11, width: 90, height: 40, type: "simple", texture: "grass" },
    { id: 2, x: 760, y: 34, width: 16, height: 261, type: "simple", texture: "WoodY", tranparent: true },

]
const enemys = [
    new Character(400, 0, 1.7, 6, 1.5, 14, true, "1e", "enemy"),

]


const lvlend = { x: 990, y: 0, width: 10, height: 90, type: "ghost", color: "rgb(0, 0, 0, 0.05)", visible: false };

const World_edge_left = 0;
const World_edge_right = 1000;
let WScreen_edge_left = 0;
let WScreen_edge_right = World_edge_right;



function SPL_lvl_write()
{

}

function SPL_lvl_read()
{

}

function LVL_triggers()
{
    TRG_lever_door(7, 6); // first number is lever id, second is door id
    //trigger for door with lever
}

const forLevelChange = {
    platforms, backscreen2, frontscreen, enemys, lvlend, World_edge_left,
    World_edge_right, WScreen_edge_left, WScreen_edge_right, SPL_lvl_write, SPL_lvl_read, LVL_triggers
}

export function start()
{
    console.log('module started');
    //===============
    levelOnStart(3); //count of stars on level
    changeLevel(forLevelChange)
    //===============
}
