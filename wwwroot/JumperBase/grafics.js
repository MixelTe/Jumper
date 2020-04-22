"use strict";

window.Misha = window.Misha || Object.create(null);

// let x = 1; // не портит window
// const y = 2; // не портит window
// var z = 3; // портит window, то же самое, что window.z = 3

Misha.grafics = true;
Misha.lift = 0;
Misha.liftStyle = 0;

Misha.jumperImgLoad = 0;
Misha.jumperImgAll = 1;
Misha.jumperDirection = "right";
Misha.jumperState = "stoped";
Misha.jumperflattening = "normal";
Misha.jumperStatePast = "stoped";
Misha.jumperCounter = 0;
Misha.jumperImg = 0;

Misha.jumper = {};
Misha.jumper.width = 60;
Misha.jumper.height = 60;
Misha.jumper.scale = {};
Misha.jumper.scale.x = 1;
Misha.jumper.scale.y = 1;
Misha.jumper.translate = {};
Misha.jumper.translate.x = 0;
Misha.jumper.translate.y = 0;
Misha.jumper.scale.counter = 0;

let ptrnDirt;
let ptrnDirt2;
let ptrnBox;
let ptrnBox2;
let ptrnsLift = [];
let ptrnGrass;
let ptrnSky;
let ptrnBackGrass;
let imgsJumper;


window.onload = function () { cratePatterns(); crateImges(); };

function crateImges()
{
    imgsJumper = new Image();
    imgsJumper.src = "pictures/jumper.png";
    imgsJumper.onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }
}

function cratePatterns()
{
    const imgDirt = new Image();
    imgDirt.src = "pictures/dirt.png";
    imgDirt.onload = function ()
    {
        ptrnDirt = ctx.createPattern(imgDirt, 'repeat');
    }

    const imgDirt2 = new Image();
    imgDirt2.src = "pictures/dirt2.png";
    imgDirt2.onload = function ()
    {
        ptrnDirt2 = ctx.createPattern(imgDirt2, 'repeat');
    }

    const imgGrass = new Image();
    imgGrass.src = "pictures/grass.png";
    imgGrass.onload = function ()
    {
        ptrnGrass = ctx.createPattern(imgGrass, 'repeat');
    }

    const imgBox = new Image();
    imgBox.src = "pictures/box.png";
    imgBox.onload = function ()
    {
        ptrnBox = ctx.createPattern(imgBox, 'repeat');
    }

    const imgBox2 = new Image();
    imgBox2.src = "pictures/box2.png";
    imgBox2.onload = function ()
    {
        ptrnBox2 = ctx.createPattern(imgBox2, 'repeat');
    }

    const imgBackGrass = new Image();
    imgBackGrass.src = "pictures/backgrass.png";
    imgBackGrass.onload = function ()
    {
        ptrnBackGrass = ctx.createPattern(imgBackGrass, 'repeat');
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
    }

    const imgLift2 = new Image();
    imgLift2.src = "pictures/lift2.png";
    imgLift2.onload = function ()
    {
        ptrnsLift[2] = ctx.createPattern(imgLift2, 'repeat');
    }

    const imgLift3 = new Image();
    imgLift3.src = "pictures/lift3.png";
    imgLift3.onload = function ()
    {
        ptrnsLift[3] = ctx.createPattern(imgLift3, 'repeat');
    }

    const imgLift4 = new Image();
    imgLift4.src = "pictures/lift4.png";
    imgLift4.onload = function ()
    {
        ptrnsLift[4] = ctx.createPattern(imgLift4, 'repeat');
    }

    const imgLift5 = new Image();
    imgLift5.src = "pictures/lift5.png";
    imgLift5.onload = function ()
    {
        ptrnsLift[5] = ctx.createPattern(imgLift5, 'repeat');
    }

    const imgLift6 = new Image();
    imgLift6.src = "pictures/lift6.png";
    imgLift6.onload = function ()
    {
        ptrnsLift[6] = ctx.createPattern(imgLift6, 'repeat');
    }

    const imgLift7 = new Image();
    imgLift7.src = "pictures/lift7.png";
    imgLift7.onload = function ()
    {
        ptrnsLift[7] = ctx.createPattern(imgLift7, 'repeat');
    }

    const imgLift8 = new Image();
    imgLift8.src = "pictures/lift8.png";
    imgLift8.onload = function ()
    {
        ptrnsLift[8] = ctx.createPattern(imgLift8, 'repeat');
    }
}
function GRC_background()
{
    ctx.save();
    ctx.translate(0, 600);
    ctx.scale(1, -1);

    // ctx.fillStyle = ptrnSky;
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

function GRC_textures()
{
    for (let i = 0; i < platforms.length; i++)
    {
        ctx.save();
        ctx.translate(platforms[i].x, platforms[i].y + platforms[i].height - 1);
        ctx.scale(1, -1);
        switch (platforms[i].texture)
        {
            case "grass":
                GRC_grass(platforms[i])
                break;

            default:
                break;
        }
        ctx.restore();
    }

    ctx.save();
    ctx.translate(0, -1);
    ctx.scale(1, -1);
    const backGrass = { width: World_edge_right };
    GRC_grass(backGrass)
    ctx.restore();
}
function drawTexture(obj)
{
    ctx.save();
    ctx.translate(0, obj.height);
    ctx.scale(1, -1);
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

        default:
            break;
    }
    ctx.restore();
}

function GRC_dirt(obj)
{
    ctx.fillStyle = ptrnDirt;
    ctx.fillRect(0, 0, obj.width, 32);

    ctx.fillStyle = ptrnDirt2;
    ctx.fillRect(0, 32, obj.width, obj.height - 32);
}

function GRC_grass(obj)
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

function GRC_jumper()
{
    if (Misha.jumperImgLoad == Misha.jumperImgAll)
    {
        ctx.save();
        switch (Misha.jumperDirection)
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

        ctx.scale(Misha.jumper.scale.x, Misha.jumper.scale.y);
        ctx.translate(Misha.jumper.translate.x, Misha.jumper.translate.y);

        switch (Misha.jumperState)
        {
            case "stoped":
                GRC_jumper_stoped();
                break;

            case "jumping":
                GRC_jumper_jumping();
                break;

            case "falling":
                GRC_jumper_falling();
                break;

            case "going":
                GRC_jumper_going();
                break;

            default:
                break;
        }
        ctx.restore();

        Misha.jumper.scale.counter += 1;
        if (Misha.jumper.scale.counter == 8)
        {
            Misha.jumper.scale.x = 1;
            Misha.jumper.scale.y = 1;
            Misha.jumper.translate.x = 0;
            Misha.jumper.translate.y = 0;
        }

        switch (Misha.jumperflattening)
        {
            case "hit":
                if (Misha.jumperStatePast == "falling" || Misha.jumperStatePast == "jumping")
                {
                    Misha.jumper.scale.x = 0.6;
                    Misha.jumper.scale.y = 1.2;
                    Misha.jumper.translate.x = 35;
                    Misha.jumper.translate.y = 0;

                    Misha.jumper.scale.counter = 0;
                    Misha.jumperflattening = "normal";
                }
                break;
            default:
                break;
        }

        if (Misha.jumperStatePast != Misha.jumperState)
        {
            if (Misha.jumperStatePast == "falling")
            {
                Misha.jumper.scale.x = 1.2;
                Misha.jumper.scale.y = 0.6;
                Misha.jumper.translate.x = 0;
                Misha.jumper.translate.y = 35;

                Misha.jumper.scale.counter = 0;
            }
            Misha.jumperStatePast = Misha.jumperState;
            Misha.jumperCounter = 0;
            // Misha.jumperImg = 0;
        }
    }
}
function GRC_jumper_jumping()
{
    ctx.drawImage(imgsJumper, 200 * Misha.jumperImg, 0, 200, 200, 0, 0, Misha.jumper.width, Misha.jumper.height);

    Misha.jumperCounter += 1;
    switch (Misha.jumperCounter)
    {
        case 1:
            Misha.jumperImg = 1;
            break;

        case 3:
            Misha.jumperImg = 2;
            break;

        case 5:
            Misha.jumperImg = 3;
            break;

        case 7:
            Misha.jumperImg = 4;
            break;

        case 9:
            Misha.jumperImg = 5;
            break;

        default:
            break;
    }

}

function GRC_jumper_falling()
{
    ctx.drawImage(imgsJumper, 200 * Misha.jumperImg, 0, 200, 200, 0, 0, Misha.jumper.width, Misha.jumper.height);
    Misha.jumperCounter += 1;
    switch (Misha.jumperCounter)
    {
        case 1:
            Misha.jumperImg = 9;
            break;

        case 2:
            Misha.jumperImg = 10;
            break;

        case 4:
            Misha.jumperImg = 11;
            break;

        case 6:
            Misha.jumperImg = 12;
            break;

        case 8:
            Misha.jumperImg = 13;
            break;

        case 10:
            Misha.jumperImg = 14;
            break;

        case 12:
            Misha.jumperImg = 15;
            break;

        case 14:
            Misha.jumperImg = 16;
            break;

        case 16:
            Misha.jumperImg = 17;
            Misha.jumperCounter = 0;
            break;

        default:
            break;
    }

}

function GRC_jumper_going()
{
    ctx.drawImage(imgsJumper, 200 * Misha.jumperImg, 0, 200, 200, 0, 0, Misha.jumper.width, Misha.jumper.height);
    Misha.jumperCounter += 1;
    switch (Misha.jumperCounter)
    {
        case 1:
            Misha.jumperImg = 18;
            break;

        case 12:
            Misha.jumperImg = 19;
            break;

        case 18:
            Misha.jumperImg = 20;
            break;

        case 24:
            Misha.jumperImg = 21;
            break;

        case 32:
            Misha.jumperImg = 22;
            break;

        case 36:
            Misha.jumperImg = 23;
            break;

        case 42:
            Misha.jumperImg = 0;
            Misha.jumperCounter = 0;
            break;

        default:
            break;
    }
}

function GRC_jumper_stoped()
{
    // ctx.drawImage(imgsJumper[1], 0, 0, Misha.jumper.width, Misha.jumper.height);
    ctx.drawImage(imgsJumper, 200 * Misha.jumperImg, 0, 200, 200, 0, 0, Misha.jumper.width, Misha.jumper.height);
    Misha.jumperCounter += 1;
    switch (Misha.jumperCounter)
    {
        case 1:
            Misha.jumperImg = 0;
            break;

        case 90:
            Misha.jumperImg = 23;
            break;

        case 95:
            Misha.jumperImg = 0;
            break;

        case 400:
            Misha.jumperCounter = 0;
            break;

        default:
            break;
    }
}



function GRC_SPL_direction_write()
{
    sessionStorage.setItem("GRC_jumperDirection", Misha.jumperDirection);
}
function GRC_SPL_direction_read()
{
    if (sessionStorage.getItem("GRC_jumperDirection") != null)
    {
        Misha.jumperDirection = sessionStorage.getItem("GRC_jumperDirection");
    }
}
