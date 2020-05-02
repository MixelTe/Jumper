"use strict";
import {Cgravity, Cmovement, moveScreen} from "./movement.js"
import {rectIntersect} from "./Functions.js"
import {level, levelLoaded, ChangeLevel, VlevelChange, game} from "../start.js"
import * as EMY from "./enemy.js"
import * as SPL from "./special.js"
import * as GRC from "./grafics.js"
import * as SCR from "./screens.js"
import * as PLM from "./platforms.js"
import * as MUS from "./music.js"
import * as OVL from "./overlay.js"
window.Misha = window.Misha || Object.create(null);

export const canva = document.getElementById("canva");
export const ctx = canva.getContext('2d');

export const DEVparametrs = { gravity: true, id: false, screens: false };

export class Character
{
    constructor(x, y, mass, maxspeed, speedAcc, jumpForce, visible, id, type)
    {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.mass = mass;
        this.speed = maxspeed;
        this.speedAcc = speedAcc;
        this.jumpForce = jumpForce;
        this.visible = visible;
        this.id = id;
        this.type = "character";
        this.jumpAcc = 0;
        this.jumpSpeed = 0;
        this.jnowIntersect = false;
        this.ground = 0;
        this.floor = 0;
        this.state = "null";
        this.statePast = "null";
        this.nowJump = false;
        this.jmSpeed = 0;
        this.moveSpeed = 0;
        this.moveAcc = 0;
        this.direction = "right";
        this.mnowIntersect = false;
        this.flattening = "null";
        this.mnowStrike = false;
        this.color = "transparent";
        this.massUnchange = mass;
        this.pastX = 0;
        this.pastY = 0;
        this.pastCounter = 0;
        this.sound_up = false;
        this.sound_side = false;
        this.snowding = false;
        this.snowbum = false;
        this.alive = true;
    }
    writePast()
    {
        this.pastX = this.x;
        this.pastY = this.y;
    }
    plinks()
    {
        if (this.sound_up)
        {
            if (!this.snowding)
            {
                ding2.currentTime = 0;
                ding2.play();
                this.snowding = true;
            }
            this.sound_up = false;
        }
        else if (this.sound_side)
        {
            if (!this.snowbum)
            {
                bum.currentTime = 0;
                bum.play()
                    .catch(e =>
                    {
                        if (e.name != 'NotAllowedError')
                        {
                            console.error(e);
                        }
                    });
                this.snowbum = true;
            }
            this.sound_side = false;
        }
        else
        {
            this.snowding = false;
            this.snowbum  = false;
        }
    }
}

let controlCharacter = 0;
let selectedCharacter = 0;

export const ding = document.getElementById("ding");
const ding2 = document.getElementById("ding2");
const bum = document.getElementById("bum");
bum.onerror = function (e)
{
    console.log('audio error', e);
};

export const Fg = 0.05;
export const mainFloor = canva.height + 100;
export const jumper = new Character(150, 0, 1.7, 6, 1.5, 14, true, "jumper", "jumper");
export const WorldAnchor = { x: 0, y: 0};
export const Screen_edge_left = 150;
export const Screen_edge_right = canva.width - 400;


export const coins = { x: (canva.width / 2) - 60, y: 50, color: "red", value: 0 };

export let platforms = [

];
export let backscreen2 = [

]
export let frontscreen = [

]

export let enemys = [

]

export let lvlend = { };

export let World_edge_left = 0;
export let World_edge_right = 0;
export let WScreen_edge_left = 0;
export let WScreen_edge_right = 0;

export function SPL_lvl_write()
{

}

export function SPL_lvl_read()
{

}

function LVL_triggers()
{

}
// let level = 1;
//===============
GRC.cratePatterns();
GRC.crateImges();
canva.addEventListener('click', function (event) { MUS.MUS_click(event) })
ctx.translate(0, canva.height - 10);
ctx.scale(1, -1);
redrawAll()
//===============

export function changeLevel(level)
{
    platforms = level.platforms;
    backscreen2 = level.backscreen2;
    frontscreen = level.frontscreen;
    enemys = level.enemys;
    lvlend = level.lvlend;
    World_edge_left = level.World_edge_left;
    World_edge_right = level.World_edge_right;
    WScreen_edge_left = level.WScreen_edge_left;
    WScreen_edge_right = level.WScreen_edge_right;
    SPL_lvl_write = level.SPL_lvl_write;
    SPL_lvl_read = level.SPL_lvl_read;
    LVL_triggers = level.LVL_triggers;
}

function redrawAll()
{
    if (game.started)
    {
        clipCanva();
        if (DEVparametrs.gravity)
        {
            Cgravity(jumper);
            Cmovement(jumper);
            jumper.plinks();
            if (Misha.enemy)
            {
                EMY.gravity();
            }
        }
        moveScreen();

        ctx.save();

        ctx.fillStyle = "red"
        ctx.fillRect(0, -10, canva.width, canva.height);
        ctx.fillStyle = "lightblue"
        ctx.fillRect(0, 0, 1200, canva.height);
        ctx.fillStyle = "green"
        ctx.fillRect(0, -10, 1200, 10);

        if (Misha.grafics)
        {
            GRC.background();
        }

        ctx.restore();

        ctx.save();
        ctx.translate(WorldAnchor.x, WorldAnchor.y);

        if (Misha.screens)
        {
            SCR.backscreen2(backscreen2);
        }

        PLM.logics(platforms);

        if (Misha.enemy)
        {
            EMY.drawEnemys();
        }
        drawJumper();

        if (Misha.grafics)
        {
            GRC.textures();
        }

        drawPlatform(lvlend);

        if (Misha.grafics)
        {
            GRC.portal();
        }

        if (Misha.screens)
        {
            SCR.frontscreen(frontscreen);
        }
        ctx.restore();

        if (Misha.musics)
        {
            MUS.drawAll();
        }
        LVL_triggers();
        if (Misha.overlays)
        {
            OVL.draw1();
        }
    }
    if (parseInt(sessionStorage.getItem("level")) != level)
    {
        sessionStorage.setItem("level", level);
        ChangeLevel();
    }

    if (game.started)
    {
        if (levelLoaded)
        {
            SPL.writeInMemory(level);
        }
        SPL.lvl_end();
    }   
    requestAnimationFrame(redrawAll);
}

export function levelOnStart(starCount)
{
    if (Misha.overlays)
    {
        Misha.overlay.stars.count = starCount;
    }
    platforms.push(jumper);
    if (Misha.enemy)
    {
        EMY.startset();
    }
    SPL.readMemory(level);
}

function clipCanva()
{
    ctx.beginPath();
    ctx.moveTo(0, -10)
    ctx.lineTo(0, canva.height);
    ctx.lineTo(canva.width, canva.height);
    ctx.lineTo(canva.width, -10);
    ctx.lineTo(0, -10);
    ctx.clip();
}

function drawJumper()
{
    ctx.save();
    ctx.translate(jumper.x, jumper.y);

    // ctx.strokeStyle = "white";
    // ctx.strokeRect(0, 0, jumper.width, jumper.height);
    if (!Misha.grafics)
    {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(jumper.width / 2, jumper.height / 2, 16, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    if (Misha.grafics)
    {
        GRC.jumperTextures()
    }

    ctx.restore();
}

export function drawPlatform(obj)
{
    ctx.save();
    ctx.translate(obj.x, obj.y);

    const newObj = { x: obj.x - 2, y: obj.y - 1, width: obj.width + 4, height: obj.height + 2, };
    if (rectIntersect(newObj, jumper) && obj.changecolor == true)
    {
        ctx.fillStyle = "lightgreen";
    }
    else
    {
        ctx.fillStyle = obj.color;
    }

    ctx.fillRect(0, 0, obj.width, obj.height);
    // ctx.strokeStyle = "black";
    // ctx.strokeRect(0, 0, obj.width, obj.height);

    if (Misha.grafics)
    {
        GRC.drawTexture(obj);
    }
    if (DEVparametrs.id)
    {
        ctx.save();
        ctx.scale(1, -1);
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText(obj.id, 0, -4);
        ctx.restore();
    }
    ctx.restore();
}

function DEVdrawCord()
{
    ctx.save();
    ctx.strokeStyle = 'hsl(255, 255, 255)';
    ctx.beginPath();
    ctx.moveTo(-1, 200);
    ctx.lineTo(-1, -1);
    ctx.lineTo(200, -1);
    ctx.stroke();
    ctx.restore();
}



addEventListener('keydown', function (event) { KeyDown(event) })
function KeyDown(event)
{
    if (Misha.noControl != true)
    {
        switch (event.code)
        {
            case 'ArrowUp':
            case 'Numpad8':
            case 'KeyW':
            case 'Space':
                if (event.repeat == false)
                {
                    KeyDownControl("up");
                }
                break;

            case 'ArrowRight':
            case 'Numpad6':
            case 'KeyD':
                KeyDownControl("right");
                break;

            case 'ArrowLeft':
            case 'Numpad4':
            case 'KeyA':
                KeyDownControl("left");
                break;

            case 'ArrowDown':
            case 'Numpad2':
            case 'KeyS':
                KeyDownControl("down");
                break;

            case 'Backslash':
                // document.getElementById("canva2").style.display = "inline";
                if (document.getElementById("canva2") == null)
                {
                    const el = document.createElement("canvas");
                    el.id = "canva2";
                    el.width = "300";
                    el.height = "600";
                    el.style = "border: 1px solid black; user-select: none; margin-left: 8px";
                    const cv = document.getElementById("canva");
                    cv.parentNode.insertBefore(el, cv.nextSibling);
                    // loadScript("jumperBase/DEVpanel.js");
                    import("./DEVpanel.js").then((m) =>
                    {
                        m.start();
                    });
                }
                break;

            case 'BracketRight':
            case 'BracketLeft':
                if (event.repeat == false)
                {
                    controlCharacter += 1;;
                }
                break;

            default:
                break;
        }
    }
}

function KeyDownControl(event)
{
    switch (controlCharacter % 2) {
        case 0:
            CharacterControl(jumper, event, "down");
            break;

        case 1:
            if (Misha.enemy)
            {
                CharacterControl(enemys[selectedCharacter], event, "down");
            }
            break;
        default:
            break;
    }
}


addEventListener('keyup', function (event) { KeyUp(event) })
function KeyUp(event)
{
    if (Misha.noControl != true)
    {
        switch (event.code)
        {
            case 'ArrowUp':
            case 'Numpad8':
            case 'KeyW':
            case 'Space':
                KeyUpControl("up");
                break;

            case 'ArrowRight':
            case 'Numpad6':
            case 'KeyD':
                KeyUpControl("right");
                break;

            case 'ArrowLeft':
            case 'Numpad4':
            case 'KeyA':
                KeyUpControl("left");
                break;

            case 'ArrowDown':
            case 'Numpad2':
            case 'KeyS':
                KeyUpControl("down");
                break;
            default:
                break;
        }
    }
}
function KeyUpControl(event)
{
    switch (controlCharacter % 2) {
        case 0:
            CharacterControl(jumper, event, "up");
            break;

        case 1:
            if (Misha.enemy)
            {
                CharacterControl(enemys[selectedCharacter], event, "up");
            }
            break;
        default:
            break;
    }
}

export function CharacterControl(character, event, type)
{
    if (type == "down")
    {
        switch (event) {
            case "up":
                if (character.nowJump == false)
                {
                    character.nowJump = true;
                    character.jumpSpeed = character.jumpForce;
                    character.jmSpeed = character.moveSpeed;
                    character.state = "jumping";
                }
                break;

            case "right":
                character.moveAcc = character.speedAcc;
                break;

            case "left":
                character.moveAcc = -character.speedAcc;
                break;

            case "down":
                character.mass = character.massUnchange * 5;
                break;

            default:
                break;
        }
    }
    else if (type == "up")
    {
        switch (event) {
            case "up":

                break;

            case "right":
                if (character.moveAcc == character.speedAcc)
                {
                    character.moveAcc = 0;
                }
                break;

            case "left":
                if (character.moveAcc == -character.speedAcc)
                {
                    character.moveAcc = 0;
                }
                break;

            case "down":
                character.mass = character.massUnchange;
                break;

            default:
                break;
        }
    }
    else
    {
        alert("ERROR: Wrong type of keyboard event");
    }
}
