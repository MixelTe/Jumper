"use strict";
const plm1 = { x: 100, y: 0, width: 100, height: 60, type: "simple", color: "green", texture: "grass", visible: true };
const plm2 = { x: 250, y: 0, width: 100, height: 30, type: "lifting", color: "rgb(0, 0, 0, 0.1)", texture: "lift", visible: true, changecolor: false, speed: 2, direction: "down", heightMax: 290, heightMin: 30 };
const plm3 = { x: 400, y: 190, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true, changecolor: false };
//maximum height where box can be replaced
const plm4 = { x: 500, y: 110, width: 100, height: 40, type: "simple", color: "green", texture: "grass", visible: true };
//maximum height where platform can be replaced
const plm5 = { x: 700, y: 0, width: 100, height: 120, type: "simple", color: "green", texture: "grass", visible: true };
//maximum height of platform

const lvlend = { x: 990, y: 0, width: 10, height: 90, type: "ghost", color: "orange", changecolor: false, visible: false };

const platforms = [plm1, plm2, plm3, plm4, plm5];
const World_edge_left = 0;
const World_edge_right = 1000;
let WScreen_edge_left = 0;
let WScreen_edge_right = World_edge_right;


//===============
SPL_cord_read("number of level");                    //nEn
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
    SPL_cord_write("number of level");                    //nEn

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
        MUS_drawAll();
    }
    requestAnimationFrame(redrawAll);
}

function SPL_lvl_cord_write()
{

}

function SPL_lvl_cord_read()
{

}
