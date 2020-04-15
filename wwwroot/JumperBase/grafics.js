"use strict";

window.Misha = window.Misha || Object.create(null);

// let x = 1; // не портит window
// const y = 2; // не портит window
// var z = 3; // портит window, то же самое, что window.z = 3

Misha.grafics = true;
Misha.lift = 0;
Misha.liftStyle = 0;

Misha.jumperImgLoad = 0;
Misha.jumperImgAll = 24;
Misha.jumperDirection = "right";
Misha.jumperState = "stoped";
Misha.jumperStatePast = "stoped";

Misha.jumperJump = 0;
Misha.jumperJumpImg = 0;

Misha.jumperFall = 0;
Misha.jumperFallImg = 0;

Misha.jumperGo = 0;
Misha.jumperGoImg = 0;

Misha.jumperStoped = 0;
Misha.jumperStopedImg = -22;

Misha.jumper = {};
Misha.jumper.width = 60;
Misha.jumper.height = 60;

let ptrnDirt;
let ptrnDirt2;
let ptrnBox;
let ptrnBox2;
let ptrnsLift = [];
let ptrnGrass;
let ptrnSky;
let ptrnBackGrass;
let imgsJumper = [];


window.onload = function () { cratePatterns(); crateImges(); };

function crateImges()
{
    imgsJumper[1] = new Image();
    imgsJumper[1].src = "pictures/jumper/000000.png";
    imgsJumper[1].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[2] = new Image();
    imgsJumper[2].src = "pictures/jumper/000002.png";
    imgsJumper[2].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[3] = new Image();
    imgsJumper[3].src = "pictures/jumper/000003.png";
    imgsJumper[3].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[4] = new Image();
    imgsJumper[4].src = "pictures/jumper/000004.png";
    imgsJumper[4].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[5] = new Image();
    imgsJumper[5].src = "pictures/jumper/000005.png";
    imgsJumper[5].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[6] = new Image();
    imgsJumper[6].src = "pictures/jumper/000006.png";
    imgsJumper[6].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[7] = new Image();
    imgsJumper[7].src = "pictures/jumper/000007.png";
    imgsJumper[7].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[8] = new Image();
    imgsJumper[8].src = "pictures/jumper/000008.png";
    imgsJumper[8].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[9] = new Image();
    imgsJumper[9].src = "pictures/jumper/000009.png";
    imgsJumper[9].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[10] = new Image();
    imgsJumper[10].src = "pictures/jumper/000010.png";
    imgsJumper[10].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[11] = new Image();
    imgsJumper[11].src = "pictures/jumper/000011.png";
    imgsJumper[11].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[12] = new Image();
    imgsJumper[12].src = "pictures/jumper/000012.png";
    imgsJumper[12].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[13] = new Image();
    imgsJumper[13].src = "pictures/jumper/000013.png";
    imgsJumper[13].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[14] = new Image();
    imgsJumper[14].src = "pictures/jumper/000014.png";
    imgsJumper[14].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[15] = new Image();
    imgsJumper[15].src = "pictures/jumper/000015.png";
    imgsJumper[15].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[16] = new Image();
    imgsJumper[16].src = "pictures/jumper/000016.png";
    imgsJumper[16].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[17] = new Image();
    imgsJumper[17].src = "pictures/jumper/000017.png";
    imgsJumper[17].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[18] = new Image();
    imgsJumper[18].src = "pictures/jumper/000018.png";
    imgsJumper[18].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[19] = new Image();
    imgsJumper[19].src = "pictures/jumper/000019.png";
    imgsJumper[19].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[20] = new Image();
    imgsJumper[20].src = "pictures/jumper/000020.png";
    imgsJumper[20].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[21] = new Image();
    imgsJumper[21].src = "pictures/jumper/000021.png";
    imgsJumper[21].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[22] = new Image();
    imgsJumper[22].src = "pictures/jumper/000022.png";
    imgsJumper[22].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[23] = new Image();
    imgsJumper[23].src = "pictures/jumper/000023.png";
    imgsJumper[23].onload = function ()
    {
        Misha.jumperImgLoad += 1;
    }

    imgsJumper[24] = new Image();
    imgsJumper[24].src = "pictures/jumper/000024.png";
    imgsJumper[24].onload = function ()
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
        switch (Misha.jumperDirection) {
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

        switch (Misha.jumperState) {
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
        if (Misha.jumperStatePast != Misha.jumperState)
        {
            Misha.jumperStatePast = Misha.jumperState;
            Misha.jumperJump = 0;
            Misha.jumperFall = 0;
            Misha.jumperGo = 0;
            Misha.jumperStoped = 0;
        }
    }
}
function GRC_jumper_jumping()
{
    switch (Misha.jumperJumpImg)
    {
        case 0:
            ctx.drawImage(imgsJumper[2], 0, 0, Misha.jumper.width, Misha.jumper.height);
            break;

        case 1:
            ctx.drawImage(imgsJumper[3], 0, 0, Misha.jumper.width, Misha.jumper.height);
            break;

        case 2:
            ctx.drawImage(imgsJumper[4], 0, 0, Misha.jumper.width, Misha.jumper.height);
            break;

        case 3:
            ctx.drawImage(imgsJumper[5], 0, 0, Misha.jumper.width, Misha.jumper.height);
            break;

        case 4:
            ctx.drawImage(imgsJumper[6], 0, 0, Misha.jumper.width, Misha.jumper.height);
            break;

        case 5:
            ctx.drawImage(imgsJumper[7], 0, 0, Misha.jumper.width, Misha.jumper.height);
            break;

        case 6:
            ctx.drawImage(imgsJumper[8], 0, 0, Misha.jumper.width, Misha.jumper.height);
            break;

        case 7:
            ctx.drawImage(imgsJumper[9], 0, 0, Misha.jumper.width, Misha.jumper.height);
            break;

        default:
            break;
    }

    Misha.jumperJump += 1;
    switch (Misha.jumperJump)
    {
        case 10:
            Misha.jumperJumpImg = 1;
            break;

        case 20:
            Misha.jumperJumpImg = 2;
            break;

        case 30:
            Misha.jumperJumpImg = 3;
            break;

        case 40:
            Misha.jumperJumpImg = 4;
            break;

        case 50:
            Misha.jumperJumpImg = 5;
            break;

        case 60:
            Misha.jumperJumpImg = 6;
            break;

        case 70:
            Misha.jumperJumpImg = 7;
            Misha.jumperJump = 0;
            break;

        default:
            break;
    }

}

function GRC_jumper_falling()
{
    ctx.drawImage(imgsJumper[Misha.jumperFallImg + 10], 0, 0, Misha.jumper.width, Misha.jumper.height);
    Misha.jumperFall += 1;
    switch (Misha.jumperFall)
    {
        case 5:
            Misha.jumperFallImg = 1;
            break;

        case 10:
            Misha.jumperFallImg = 2;
            break;

        case 15:
            Misha.jumperFallImg = 3;
            break;

        case 20:
            Misha.jumperFallImg = 4;
            break;

        case 25:
            Misha.jumperFallImg = 5;
            break;

        case 30:
            Misha.jumperFallImg = 6;
            break;

        case 35:
            Misha.jumperFallImg = 7;
            Misha.jumperFall = 0;
            break;

        default:
            break;
    }

}

function GRC_jumper_going()
{
    ctx.drawImage(imgsJumper[Misha.jumperGoImg + 17], 0, 0, Misha.jumper.width, Misha.jumper.height);
    Misha.jumperGo += 1;
    switch (Misha.jumperGo)
    {
        case 6:
            Misha.jumperGoImg = 1;
            break;

        case 12:
            Misha.jumperGoImg = 2;
            break;

        case 18:
            Misha.jumperGoImg = 3;
            break;

        case 24:
            Misha.jumperGoImg = 4;
            break;

        case 32:
            Misha.jumperGoImg = 5;
            break;

        case 36:
            Misha.jumperGoImg = 6;
            break;

        case 42:
            Misha.jumperGoImg = -16;
            Misha.jumperGo = 0;
            break;

        default:
            break;
    }
}

function GRC_jumper_stoped()
{
    // ctx.drawImage(imgsJumper[1], 0, 0, Misha.jumper.width, Misha.jumper.height);
    ctx.drawImage(imgsJumper[Misha.jumperStopedImg + 23], 0, 0, Misha.jumper.width, Misha.jumper.height);
    Misha.jumperStoped += 1;
    switch (Misha.jumperStoped)
    {
        case 90:
            Misha.jumperStopedImg = 1;
            break;

        case 95:
            Misha.jumperStopedImg = -22;
            break;

        case 400:
            Misha.jumperStoped = 0;
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
