"use strict";
import {changeLevel, Character, levelOnStart} from "../../JumperBase/base.js"
import { level } from "../../start.js";
const platforms = [
 { id: 1, x: 100, y: 0, width: 100, height: 90, type: "simple", color: "green", texture: "grass", visible: true },
 { id: 2, x: 500, y: 0, width: 100, height: 60, type: "simple", color: "green", texture: "grass", visible: true },

];
const backscreen2 = [

]
const frontscreen = [

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

}
const forLevelChange = {
    platforms, backscreen2, frontscreen, enemys, lvlend, World_edge_left,
    World_edge_right, WScreen_edge_left, WScreen_edge_right, SPL_lvl_write, SPL_lvl_read, LVL_triggers
}

export function start()
{
    console.log('module №' + level + ' started');

    changeLevel(forLevelChange);
    levelOnStart(1, platforms, level, 20, 0);
}
