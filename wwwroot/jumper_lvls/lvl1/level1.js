"use strict";
const plm1 = { x: 400, y: 90, width: 100, height: 30, type: "simple", color: "green", texture: "grass", visible: true };
const plm2 = { x: 580, y: 180, width: 350, height: 30, type: "simple", color: "green", texture: "grass", visible: true };

const plm3 = { x: 620, y: 300, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };
const plm4 = { x: 660, y: 300, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };
const plm5 = { x: 700, y: 300, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };
const plm6 = { x: 740, y: 300, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };
const plm7 = { x: 780, y: 300, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };
const plm8 = { x: 820, y: 300, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };
const plm9 = { x: 860, y: 300, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };
const plm10 = { x: 900, y: 300, width: 40, height: 40, type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };

const plm11 = { x: 700, y: 0, width: 100, height: 32, type: "simple", color: "green", texture: "grass", visible: true };

const platforms = [plm1, plm2, plm3, plm4, plm5, plm6, plm7, plm8, plm9, plm10, plm11];

const lvlend = { x: 1590, y: 0, width: 10, height: 90, type: "ghost", color: "orange", visible: false };

const World_edge_left = 0;
const World_edge_right = 1600;
let WScreen_edge_left = 0;
let WScreen_edge_right = World_edge_right;

//===============
SPL_cord_read(1)
redrawAll();
//===============



function redrawAll()
{
    if (DEVgravity)
    {
        Jgravity(jumper);
        Jmovement(jumper);
    }

    // SPL_UnD();
    SPL_cord_write(1);

    ctx.save();

    ctx.fillStyle = "red"
    ctx.fillRect(0, -10, canva.width, canva.height);
    ctx.fillStyle = "rgb(10, 209, 44)"
    ctx.fillRect(0, -10, canva.width, 10);
    ctx.fillStyle = "rgb(4, 140, 219 )"
    ctx.fillRect(0, 0, canva.width, canva.height - 10);

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
    requestAnimationFrame(redrawAll);
}

function SPL_lvl_cord_write()
{

}

function SPL_lvl_cord_read()
{

}
