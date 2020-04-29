"use strict";

window.Misha = window.Misha || Object.create(null);

Misha.grafics = false;
Misha.musics = false;

const canva = document.getElementById("canva");
const ctx = canva.getContext('2d');

class Character
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
    }
}

let controlCharacter = 0;
let selectedCharacter = 0;

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
const jumper = new Character(150, 0, 1.7, 6, 1.5, 14, true, "jumper", "jumper");
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

const coins = { x: (canva.width / 2) - 60, y: 50, color: "red", value: 0 };

let DEVgravity = true;
let DEVid = false;
let DEVscreens = false;


//===============
ctx.translate(0, canva.height - 10);
ctx.scale(1, -1);
//===============

function redrawAll()
{
    clipCanva();
    if (DEVgravity)
    {
        Cgravity(jumper);
        Cmovement(jumper);
        if (Misha.enemy)
        {
            EMY_gravity();
        }
    }
    moveScreen();

    SPL_UnD();
    SPL_cord_write(level);

    ctx.save();

    ctx.fillStyle = "red"
    ctx.fillRect(0, -10, canva.width, canva.height);
    ctx.fillStyle = "lightblue"
    ctx.fillRect(0, 0, 1200, canva.height);
    ctx.fillStyle = "green"
    ctx.fillRect(0, -10, 1200, 10);

    if (Misha.grafics)
    {
        GRC_background();
    }

    ctx.restore();

    ctx.save();
    ctx.translate(WorldAnchor.x, WorldAnchor.y);

    if (Misha.screens)
    {
        SCR_backscreen2(backscreen2);
    }
    PLM_logics(platforms);
    if (Misha.enemy)
    {
        EMY_drawEnemys();
    }
    drawJumper();

    if (Misha.grafics)
    {
        GRC_textures();
    }

    SPL_lvl_end();

    if (Misha.grafics)
    {
        GRC_portal();
    }

    if (Misha.screens)
    {
        SCR_frontscreen(frontscreen);
    }

    ctx.restore();

    if (Misha.musics)
    {
        // MUS_drawAll();
    }
    plinks();
    LVL_triggers();
    if (Misha.overlays)
    {
        OVL_draw1();
    }
    requestAnimationFrame(redrawAll);
}

function levelOnStart(starCount)
{
    if (Misha.overlays)
    {
        Misha.overlay.stars.count = starCount;
    }
    platforms.push(jumper);
    if (Misha.enemy)
    {
        EMY_startset();
    }
    SPL_cord_read(level);
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
                    loadScript("jumperBase/DEVpanel.js");
                }

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

function CharacterControl(character, event, type)
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