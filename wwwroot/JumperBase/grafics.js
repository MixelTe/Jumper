"use strict";
import {ctx, platforms, World_edge_right, jumper, WorldAnchor, lvlend, gameWindow, enemys} from "./base.js"
import {rectIntersect, random_num, random_upNdown} from "./Functions.js"
import {logics} from "./platforms.js"
import { star } from "./overlay.js";
import { fileLoaded } from "./loading.js";
import { jumper_stoped, jumper_jumping, jumper_falling, jumper_going } from "../jumperAnimations/jumper.js";
import { enemy_stoped, enemy_going } from "../jumperAnimations/enemy.js";

window.Misha = window.Misha || Object.create(null);

// let x = 1; // не портит window
// const y = 2; // не портит window
// var z = 3; // портит window, то же самое, что window.z = 3

Misha.grafics = true;
Misha.grafic = {};
Misha.lift = 0;
Misha.liftStyle = 0;

Misha.jumperImgLoad = 0;
Misha.jumperImgAll = 3;
Misha.jumperCounter = 0;

let ptrnDirt;
let ptrnDirt2;
let ptrnBox;
let ptrnBox2;
let ptrnsLift = [];
let ptrnGrass;
let ptrnBackGrass;
export let imgsJumper;
export let imgsEnemy;
let ptrnWoodX;
let ptrnWoodY;
let ptrnWall;
let ptrnLian;
let imgsLever;

// window.onload = function () { cratePatterns(); crateImges(); };

export function crateImges()
{
    imgsJumper = new Image();
    imgsJumper.src = "pictures/jumper.png";
    imgsJumper.onload = function ()
    {
        Misha.jumperImgLoad += 1;
        fileLoaded();
    }

    imgsEnemy = new Image();
    imgsEnemy.src = "pictures/enemy.png";
    imgsEnemy.onload = function ()
    {
        Misha.jumperImgLoad += 1;
        fileLoaded();
    }

    imgsLever = new Image();
    imgsLever.src = "pictures/lever.png";
    imgsLever.onload = function ()
    {
        Misha.jumperImgLoad += 1;
        fileLoaded();
    }
}

export function cratePatterns()
{
    const imgDirt = new Image();
    imgDirt.src = "pictures/dirt.png";
    imgDirt.onload = function ()
    {
        ptrnDirt = ctx.createPattern(imgDirt, 'repeat');
        fileLoaded()
    }

    const imgDirt2 = new Image();
    imgDirt2.src = "pictures/dirt2.png";
    imgDirt2.onload = function ()
    {
        ptrnDirt2 = ctx.createPattern(imgDirt2, 'repeat');
        fileLoaded()
    }

    const imgGrass = new Image();
    imgGrass.src = "pictures/grass.png";
    imgGrass.onload = function ()
    {
        ptrnGrass = ctx.createPattern(imgGrass, 'repeat');
        fileLoaded()
    }

    const imgBox = new Image();
    imgBox.src = "pictures/box.png";
    imgBox.onload = function ()
    {
        ptrnBox = ctx.createPattern(imgBox, 'repeat');
        fileLoaded()
    }

    const imgBox2 = new Image();
    imgBox2.src = "pictures/box2.png";
    imgBox2.onload = function ()
    {
        ptrnBox2 = ctx.createPattern(imgBox2, 'repeat');
        fileLoaded()
    }

    const imgBackGrass = new Image();
    imgBackGrass.src = "pictures/backgrass.png";
    imgBackGrass.onload = function ()
    {
        ptrnBackGrass = ctx.createPattern(imgBackGrass, 'repeat');
        fileLoaded()
    }

    const imgWoodX = new Image();
    imgWoodX.src = "pictures/woodX.png";
    imgWoodX.onload = function ()
    {
        ptrnWoodX = ctx.createPattern(imgWoodX, 'repeat');
        fileLoaded()
    }

    const imgWoodY = new Image();
    imgWoodY.src = "pictures/woodY.png";
    imgWoodY.onload = function ()
    {
        ptrnWoodY = ctx.createPattern(imgWoodY, 'repeat');
        fileLoaded()
    }

    const imgWall = new Image();
    imgWall.src = "pictures/wall.png";
    imgWall.onload = function ()
    {
        ptrnWall = ctx.createPattern(imgWall, 'repeat');
        fileLoaded()
    }

    const imgLian = new Image();
    imgLian.src = "pictures/lian.png";
    imgLian.onload = function ()
    {
        ptrnLian = ctx.createPattern(imgLian, 'repeat');
        fileLoaded()
    }

    cratePatterns_lift();
}

function cratePatterns_lift()
{
    const imgLift = new Image();
    imgLift.src = "pictures/lift.png";
    imgLift.onload = function ()
    {
        ptrnsLift[1] = ctx.createPattern(imgLift, 'repeat');
        fileLoaded()
    }

    const imgLift2 = new Image();
    imgLift2.src = "pictures/lift2.png";
    imgLift2.onload = function ()
    {
        ptrnsLift[2] = ctx.createPattern(imgLift2, 'repeat');
        fileLoaded()
    }

    const imgLift3 = new Image();
    imgLift3.src = "pictures/lift3.png";
    imgLift3.onload = function ()
    {
        ptrnsLift[3] = ctx.createPattern(imgLift3, 'repeat');
        fileLoaded()
    }

    const imgLift4 = new Image();
    imgLift4.src = "pictures/lift4.png";
    imgLift4.onload = function ()
    {
        ptrnsLift[4] = ctx.createPattern(imgLift4, 'repeat');
        fileLoaded()
    }

    const imgLift5 = new Image();
    imgLift5.src = "pictures/lift5.png";
    imgLift5.onload = function ()
    {
        ptrnsLift[5] = ctx.createPattern(imgLift5, 'repeat');
        fileLoaded()
    }

    const imgLift6 = new Image();
    imgLift6.src = "pictures/lift6.png";
    imgLift6.onload = function ()
    {
        ptrnsLift[6] = ctx.createPattern(imgLift6, 'repeat');
        fileLoaded()
    }

    const imgLift7 = new Image();
    imgLift7.src = "pictures/lift7.png";
    imgLift7.onload = function ()
    {
        ptrnsLift[7] = ctx.createPattern(imgLift7, 'repeat');
        fileLoaded()
    }

    const imgLift8 = new Image();
    imgLift8.src = "pictures/lift8.png";
    imgLift8.onload = function ()
    {
        ptrnsLift[8] = ctx.createPattern(imgLift8, 'repeat');
        fileLoaded()
    }
}
export function background()
{
    ctx.save();
    ctx.translate(0, 600);
    ctx.scale(1, -1);

    const GRC_background = ctx.createLinearGradient(0, 0, 0, canva.height);
    // GRC_background.addColorStop(0, 'rgb(135, 0, 255)');
    GRC_background.addColorStop(0, 'rgb(0, 0, 0)');
    GRC_background.addColorStop(0.25, 'rgb(0, 0, 255)');
    GRC_background.addColorStop(0.95, 'rgb(0, 119, 255)');
    GRC_background.addColorStop(1, 'rgb(144, 255, 0)');
    ctx.fillStyle = GRC_background;
    ctx.fillRect(0, 0, 800, 600);

    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 800, 600);

    ctx.translate(WorldAnchor.x, WorldAnchor.y);
    ctx.fillStyle = ptrnBackGrass;
    ctx.fillRect(0, 600, World_edge_right, 10);
}

export function textures()
{
    for (let i = 0; i < platforms.length; i++)
    {
        const plt = platforms[i];
        if (rectIntersect(plt, gameWindow))
        {
            ctx.save();
            ctx.translate(plt.x, plt.y + plt.height - 1);
            ctx.scale(1, -1);
            switch (plt.texture)
            {
                case "grass":
                    if (plt.visible == true)
                    {
                        GRC_grass(plt);
                    }
                    break;

                case "wall":
                    if (plt.visible == true && plt.type == "door")
                    {
                        GRC_lian(plt);
                    }
                    break;

                case "star":
                    if (plt.colected == false && Misha.overlays == true)
                    {
                        ctx.drawImage(star, plt.width / 2 - 27, plt.height / 2 - 27, 52, 52);
                    }
                    break;

                default:
                    break;
            }
            if (plt.type == "fake")
            {
                if (rectIntersect(plt, jumper))
                {
                    ctx.globalAlpha = 0;
                }
                ctx.translate(0, plt.height - 1);
                ctx.scale(1, -1);
                drawTexture(plt);
            }
            ctx.restore();
        }
    }

    ctx.save();
    ctx.translate(0, -2);
    ctx.scale(1, -1);
    const backGrass = { width: World_edge_right };
    GRC_grass(backGrass)
    ctx.restore();
}
export function drawTexture(obj)
{
    ctx.save();
    ctx.translate(0, obj.height);
    ctx.scale(1, -1);
    if (obj.scaleX != null && obj.scaleY != null)
    {
        ctx.scale(obj.scaleX, obj.scaleY);
    }
    switch (obj.texture)
    {
        case "grass":
            GRC_dirt(obj);
            break;

        case "lift":
            GRC_lift(obj)
            break;

        case "box":
            GRC_box(obj)
            break;

        case "planks":
            GRC_planks(obj)
            break;

        case "ghost":
            break;

        case "WoodX":
            GRC_WoodX(obj);
            break;

        case "WoodY":
            GRC_WoodY(obj);
            break;

        case "wall":
            GRC_Wall(obj);
            break;

        case "lever":
            GRC_Lever(obj);
            break;

        case "dirt":
            GRC_dirt0(obj);
            break;

        default:
            break;
    }
    ctx.restore();
}

function GRC_dirt(obj)
{
    ctx.fillStyle = ptrnDirt;
    ctx.fillRect(-1, 0, obj.width + 2, 32);

    ctx.fillStyle = ptrnDirt2;
    ctx.fillRect(-1, 31, obj.width + 2, obj.height - 32);
}

function GRC_dirt0(obj)
{
    ctx.fillStyle = ptrnDirt2;
    ctx.fillRect(-1, -1, obj.width + 2, obj.height);
}

export function GRC_grass(obj)
{
    ctx.fillStyle = ptrnGrass;
    ctx.fillRect(0, -8, obj.width, 8);
}

function GRC_box(obj)
{
    ctx.fillStyle = ptrnBox2;
    ctx.fillRect(0, 0, obj.width, obj.height);
}

function GRC_planks(obj)
{
    ctx.fillStyle = ptrnBox;
    ctx.fillRect(0, 0, obj.width, obj.height);
}

function GRC_WoodX(obj)
{
    ctx.fillStyle = ptrnWoodX;
    ctx.fillRect(0, 0, obj.width, obj.height);
}

function GRC_WoodY(obj)
{
    ctx.fillStyle = ptrnWoodY;
    ctx.fillRect(0, 0, obj.width, obj.height);
}

function GRC_Wall(obj)
{
    ctx.translate(0, obj.height);
    ctx.scale(1, -1);
    ctx.fillStyle = ptrnWall;
    ctx.fillRect(0, 0, obj.width, obj.height);
}

function GRC_Lever(obj)
{
    if (Misha.jumperImgLoad == Misha.jumperImgAll)
    {
        switch (obj.leverState) {
            case "off":
                ctx.drawImage(imgsLever, 0, 0, 81, 84, -obj.width / 2, -40 + obj.height, 40, 40);
                break;

            case "on":
                ctx.drawImage(imgsLever, 81, 0, 81, 84, -obj.width / 2, -40 + obj.height, 40, 40);
                break;

            default:
                break;
        }
    }
}

function GRC_lian()
{
    ctx.translate(-15, -20);
    ctx.fillStyle = ptrnLian;
    ctx.fillRect(0, 0, 62, 44);
}

function GRC_lift(obj)
{
    ctx.fillStyle = ptrnsLift[7];
    ctx.fillRect(0, 0, obj.width, obj.height);

    switch (Misha.lift % 100)
    {
        case 0:
            Misha.liftStyle = 0;
            break;

        case 20:
            Misha.liftStyle = 1;
            break;

        case 40:
            Misha.liftStyle = 2;
            break;

        case 60:
            Misha.liftStyle = 3;
            break;

        case 80:
            Misha.liftStyle = 4;
            break;

        default:
            break;
    }

    switch (Misha.liftStyle)
    {
        case 0:
            ctx.fillStyle = ptrnsLift[1];
            break;

        case 1:
            ctx.fillStyle = ptrnsLift[2];
            break;

        case 2:
            ctx.fillStyle = ptrnsLift[3];
            break;

        case 3:
            ctx.fillStyle = ptrnsLift[4];
            break;

        case 4:
            ctx.fillStyle = ptrnsLift[5];
            break;

        default:
            break;
    }

    ctx.save();
    ctx.translate(obj.width / 2 - 20, 0);
    ctx.fillRect(0, 0, 40, obj.height);
    ctx.restore();

    ctx.fillStyle = ptrnsLift[6];
    ctx.fillRect(0, 0, obj.width, obj.height);

    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 1, obj.width, obj.height - 1);

    ctx.fillStyle = ptrnsLift[8];
    ctx.fillRect(0, 0, obj.width, 16);

    Misha.lift += 1;
}

export function jumperTextures(chr)
{
    if (Misha.jumperImgLoad == Misha.jumperImgAll)
    {
        ctx.save();
        switch (chr.direction)
        {
            case "right":
                ctx.translate(-10, 53);
                ctx.scale(1, -1);
                break;

            case "left":
                ctx.translate(50, 53);
                ctx.scale(-1, -1);
                break;

            default:
                break;
        }

        ctx.scale(chr.scale.x, chr.scale.y);
        ctx.translate(chr.translate.x, chr.translate.y);

        switch (chr.AnimType) {
            case "jumper":
                switchAnimations_jumper(chr);
                break;

            case "enemy":
                switchAnimations_enemy(chr);
                break;

            default:
                break;
        }
        ctx.restore();

        chr.scale.counter += 1;
        if (chr.scale.counter == 5)
        {
            chr.scale.x = 1;
            chr.scale.y = 1;
            chr.translate.x = 0;
            chr.translate.y = 0;
        }

        switch (chr.flattening)
        {
            case "hit":
                if (chr.statePast == "falling" || chr.statePast == "jumping")
                {
                    chr.scale.x = 0.6;
                    chr.scale.y = 1.2;
                    chr.translate.x = 35;
                    chr.translate.y = 0;

                    chr.scale.counter = 0;
                    chr.flattening = "normal";
                }
                break;
            default:
                break;
        }

        if (chr.statePast != chr.state)
        {
            if (chr.statePast == "falling")
            {
                chr.scale.x = 1.2;
                chr.scale.y = 0.6;
                chr.translate.x = 0;
                chr.translate.y = 35;

                chr.scale.counter = 0;
            }
            chr.statePast = chr.state;
            chr.textureCounter = 0;
        }
    }
}

function switchAnimations_jumper(chr)
{
    switch (chr.state)
    {
        case "stoped":
            jumper_stoped(chr);
            break;

        case "jumping":
            jumper_jumping(chr);
            break;

        case "falling":
            jumper_falling(chr);
            break;

        case "going":
            jumper_going(chr);
            break;

        default:
            break;
    }
}

function switchAnimations_enemy(chr)
{
    switch (chr.state)
    {
        case "stoped":
            enemy_stoped(chr);
            break;

        case "jumping":
            // enemy_jumping(chr);
            enemy_stoped(chr);
            break;

        case "falling":
            // enemy_falling(chr);
            enemy_stoped(chr);
            break;

        case "going":
            enemy_going(chr);
            break;

        default:
            break;
    }
}

export function SPL_direction_write()
{
    sessionStorage.setItem("GRC_jumperDirection", jumper.direction);
}
export function SPL_direction_read()
{
    if (sessionStorage.getItem("GRC_jumperDirection") != null)
    {
        jumper.direction = sessionStorage.getItem("GRC_jumperDirection");
    }
}


class Portal
{
    constructor(x, y, width, height, type, color, visible, counter)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = visible;
        this.type = type;
        this.color = color;
        this.counter = counter;
    }
}
Misha.grafic.portal = [];
export function portal()
{
    if (rectIntersect(lvlend, gameWindow))
    {
        ctx.save();
        // ctx.beginPath();
        // ctx.arc(lvlend.x + lvlend.width/2, lvlend.y + lvlend.height/2, 25, 0, Math.PI * 2);
        // ctx.clip();
        if (Misha.grafic.portal.length < 50)
        {
            const red = random_num(255, 255);
            const green = random_num(0, 255);
            const blue = random_num(0, 0);
            const newColor = `rgb(${red}, ${green}, ${blue})`;
            Misha.grafic.portal.push(new Portal(lvlend.x + lvlend.width/2, lvlend.y + lvlend.height/2, 8, 8, "ghost", newColor, false, 0));
        }
        for (let i = 0; i < Misha.grafic.portal.length; i++)
        {
            const el = Misha.grafic.portal[i];
            el.x += random_upNdown(1);
            el.x = Math.max(Math.min(el.x, lvlend.x + lvlend.width), lvlend.x);
            el.y += random_upNdown(1);
            el.y = Math.max(Math.min(el.y, lvlend.y + lvlend.height), lvlend.y);

            if (el.counter == 10)
            {
                const red = random_num(255, 255);
                const green = random_num(0, 255);
                const blue = random_num(0, 0);
                el.color = `rgb(${red}, ${green}, ${blue})`;
                el.counter = 0;
            }
            el.counter += random_num(0, 2);
        }
        logics(Misha.grafic.portal);
        ctx.restore();
    }
}
