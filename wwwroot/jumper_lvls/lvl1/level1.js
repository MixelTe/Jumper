"use strict";
const platforms = [
    { id: 1, x: 400, y: 160, width: 40, height: 40, type: "breakable",   color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true },
    { id: 2, x: 700, y: 80, width: 160, height: 40, type: "simple",      color: "rgb(0, 0, 0, 0.1)", texture: "planks", visible: true },
    { id: 3, x: 760, y: 260, width: 40, height: 40, type: "breakable",   color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true },
    { id: 4, x: 1100, y: 0, width: 128, height: 60, type: "simple",      color: "green", texture: "grass", visible: true },
    { id: 5, x: 1228, y: 0, width: 128, height: 120, type: "simple",     color: "green", texture: "grass", visible: true },
    { id: 6, x: 1356, y: 0, width: 128, height: 180, type: "simple",     color: "green", texture: "grass", visible: true },
    { id: 7, x: 1484, y: 0, width: 128, height: 240, type: "simple",     color: "green", texture: "grass", visible: true },
    { id: 8, x: 1220, y: 300, width: 120, height: 40, type: "simple",    color: "rgb(0, 0, 0, 0.1)", texture: "planks", visible: true },
    { id: 9, x: 980, y: 370, width: 120, height: 40, type: "simple",     color: "rgb(0, 0, 0, 0.1)", texture: "planks", visible: true },
    { id: 10, x: 1020, y: 560, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true },

    { id: 11, x: 2100, y: 0, width: 80, height: 70, type: "simple",      color: "green", texture: "grass", visible: true },
    { id: 12, x: 2590, y: 0, width: 80, height: 70, type: "simple",      color: "green", texture: "grass", visible: true },
    { id: 13, x: 2800, y: 0, width: 96, height: 180, type: "simple",     color: "green", texture: "grass", visible: true },
    { id: 14, x: 2896, y: 0, width: 40, height: 60, type: "simple",      color: "green", texture: "grass", visible: true },
    { id: 15, x: 3000, y: 250, width: 160, height: 40, type: "simple",   color: "rgb(0, 0, 0, 0.1)", texture: "planks", visible: true },
    { id: 16, x: 3060, y: 410, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true },

    { id: 17, x: 3500, y: 0, width: 140, height: 50, type: "simple",   color: "green", texture: "grass", visible: true },
    { id: 18, x: 3770, y: 120, width: 160, height: 40, type: "simple", color: "rgb(0, 0, 0, 0.1)", texture: "planks", visible: true },
    { id: 19, x: 3510, y: 220, width: 160, height: 40, type: "simple", color: "rgb(0, 0, 0, 0.1)", texture: "planks", visible: true },
    { id: 20, x: 3790, y: 320, width: 160, height: 40, type: "simple", color: "rgb(0, 0, 0, 0.1)", texture: "planks", visible: true },
    { id: 21, x: 4060, y: 400, width: 380, height: 30, type: "simple", color: "green", texture: "WoodX", visible: true },
    { id: 22, x: 4424, y: 430, width: 16, height: 170, type: "simple", color: "green", texture: "WoodY", visible: true },
    { id: 23, x: 4304, y: 190, width: 16, height: 210, type: "simple", color: "green", texture: "WoodY", visible: true },
    { id: 24, x: 4296, y: 0, width: 32, height: 190, type: "door",     color: "brown", texture: "wall", visible: true,
        doorState: "close", doorHeight: 190, doorY: 0, doorX: 4296, doorXd: "left" },
    { id: 25, x: 4360, y: 430, width: 20, height: 20, type: "ghost",   color: "yellow", texture: "clear", visible: false },

];

const backscreen2 = [
    { id: 1, x: 4040, y: -57, width: 170, height: 140, type: "ghost", color: "transparent", texture: "grass", visible: false, scaleX: 0.6, scaleY: 0.6 },
    { id: 2, x: 4130, y: -27, width: 170, height: 70, type: "ghost",  color: "transparent", texture: "grass", visible: false, scaleX: 0.6, scaleY: 0.6 },
    { id: 3, x: 4000, y: -17, width: 140, height: 50, type: "ghost",  color: "transparent", texture: "grass", visible: false, scaleX: 0.7, scaleY: 0.7 },
    { id: 4, x: 4100, y: -53, width: 16, height: 452, type: "ghost",  color: "transparent", texture: "WoodY", visible: false, scaleX: 0.7, scaleY: 0.7 },

]
const lvlend = { id: "END", x: 4700, y: 30, width: 50, height: 50, type: "ghost", color: "orange", changecolor: false, visible: false };

const World_edge_left = 0;
const World_edge_right = 5000;
let WScreen_edge_left = 0;
let WScreen_edge_right = World_edge_right;

jumper.x = 200;
jumper.y = 0;

//===============
SPL_cord_read(1);
redrawAll();
//===============



function redrawAll()
{
    if (DEVgravity)
    {
        Jgravity(jumper);
        Jmovement(jumper);
    }
    moveScreen();

    SPL_UnD();
    SPL_cord_write(1);

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

    PLM_logics(platforms)
    drawJumper();

    if (Misha.grafics)
    {
        GRC_textures();
    }

    SPL_lvl_end();

    ctx.restore();


    ctx.save();

    drawCoins();

    ctx.restore();
    if (Misha.musics)
    {
        // MUS_drawAll();
    }
    plinks();
    requestAnimationFrame(redrawAll);
}

function SPL_lvl_write()
{
    for (let i = 0; i < platforms.length; i++)
    {
        if (platforms[i].type == "breakable")
        {
            sessionStorage.setItem("breakable" + platforms[i].id, platforms[i].visible);
        }
    }

}

function SPL_lvl_read()
{
    for (let i = 0; i < platforms.length; i++)
    {
        if (
            platforms[i].type == "breakable" &&
            sessionStorage.getItem("breakable" + platforms[i].id) != null)
        {
            platforms[i].visible = sessionStorage.getItem("breakable" + platforms[i].id);
        }
    }
}
