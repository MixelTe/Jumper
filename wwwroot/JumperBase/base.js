"use strict";

window.Misha = window.Misha || Object.create(null);

Misha.grafics = false;
Misha.musics = false;

const canva = document.getElementById("canva");
const ctx = canva.getContext('2d');

const ding = document.getElementById("ding");
const ding2 = document.getElementById("ding2");
const bum = document.getElementById("bum");
let snowding = false;
let snowbum = false;
let sound_up = false;
let sound_down = false;
let sound_side = false;

// j - for jumping, m - for moving
let jnowJump = false;
let jnowSpeed = 0;
let jnowAcc = 0;
let mnowSpeed = 0;
let mnowAcc = 0;
let jmSpeed = 0;
const Fg = 0.05;
const mainFloor = canva.height + 100;
const jumper = { x: 150, y: 0, width: 40, height: 40, ground: 0, floor: mainFloor, mass: 1.7, jumpSpeed: 14, moveSpeed: 6, moveAcc: 1.5, color: "blue" };
const jumperMass = jumper.mass;
const WorldAnchor = { x: 0, y: 0};
const Screen_edge_left = 150;
const Screen_edge_right = canva.width - 400;
// const World_edge_left = -500;
// const World_edge_right = 1200;
// let WScreen_edge_left = 0;
// let WScreen_edge_right = World_edge_right;
// let Screen_moveTime = 0;
// let Screen_moveSpeed = 0;

let jnowIntersect = false;
let mnowIntersect = false;
let mnowStrike = false;

const coins = { x: (canva.width / 2) - 60, y: 550, color: "red", value: 0 };

let DEVgravity = true;
let DEVid = false;


//===============
ctx.translate(0, canva.height - 10);
ctx.scale(1, -1);
//===============




function drawJumper()
{
    ctx.save();
    ctx.translate(jumper.x, jumper.y);

    // ctx.strokeStyle = "white";
    // ctx.strokeRect(0, 0, jumper.width, jumper.height);
    if (!Misha.grafics)
    {
        ctx.lineWidth = 5;
        ctx.strokeStyle = jumper.color;
        ctx.beginPath();
        ctx.arc(jumper.width / 2, jumper.height / 2, 16, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    if (Misha.grafics)
    {
        GRC_jumper()
    }

    ctx.restore();
}

function drawPlatform(obj)
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
        drawTexture(obj);
    }
    if (DEVid)
    {
        ctx.save();
        ctx.scale(1, -1);
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText(obj.id, 0, 0);
        ctx.restore();
    }
    ctx.restore();
}

function drawCoins()
{
    ctx.save();
    ctx.translate(coins.x, coins.y);
    ctx.scale(1, -1);


    ctx.fillStyle = coins.color;
    ctx.font = "30px Arial";
    ctx.fillText("Coins: " + coins.value, 0, 0);

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


function plinks()
{
    if (sound_up)
    {
        if (!snowding)
        {
            ding2.play();
            snowding = true;
        }
    }
    else if (sound_side)
    {
        if (!snowbum)
        {
            bum.play();
            snowbum = true;
        }
    }
    else
    {
        snowding = false;
        snowbum  = false;
    }
}


addEventListener('keydown', function (event) { KeyDown(event) })
function KeyDown(event)
{
    switch (event.code)
    {
        case 'ArrowUp':
        case 'Numpad8':
        case 'KeyW':
        case 'Space':
            if (jnowJump == false && event.repeat == false)
            {
                jnowJump = true;
                jnowSpeed = jumper.jumpSpeed;
                jmSpeed = mnowSpeed;
                Misha.jumperState = "jumping";
            }
            break;

        case 'ArrowRight':
        case 'Numpad6':
        case 'KeyD':
            mnowAcc = jumper.moveAcc;
            break;

        case 'ArrowLeft':
        case 'Numpad4':
        case 'KeyA':
            mnowAcc = -jumper.moveAcc;
            break;

        case 'ArrowDown':
        case 'Numpad2':
        case 'KeyS':
            jumper.mass = jumperMass * 5;
            Misha.music.ost.play();
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
                const cv =  document.getElementById("canva");
                cv.parentNode.insertBefore(el, cv.nextSibling);
                loadScript("jumperBase/DEVpanel.js");
            }
        default:
            break;
    }
}

addEventListener('keyup', function (event) { KeyUp(event) })
function KeyUp(event)
{
    switch (event.code)
    {
        case 'ArrowUp':
        case 'Numpad8':
        case 'KeyW':
        case 'Space':

            break;

        case 'ArrowRight':
        case 'Numpad6':
        case 'KeyD':
            if (mnowAcc == jumper.moveAcc)
            {
                mnowAcc = 0;
            }
            break;

        case 'ArrowLeft':
        case 'Numpad4':
        case 'KeyA':
            if (mnowAcc == -jumper.moveAcc)
            {
                mnowAcc = 0;
            }
            break;

        case 'ArrowDown':
        case 'Numpad2':
        case 'KeyS':
            jumper.mass = jumperMass;
            break;
        default:
            break;
    }
}
