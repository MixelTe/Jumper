"use strict";
const p1_plm1 = { x: 400, y: 160, width: 40, height: 40,  type: "breakable", color: "rgb(0, 0, 0, 0.1)",   texture: "box", visible: true };
const p1_plm2 = { x: 700, y: 80, width: 160, height: 40,  type: "simple", color: "rgb(0, 0, 0, 0.1)",      texture: "planks", visible: true };
const p1_plm3 = { x: 760, y: 260, width: 40, height: 40,  type: "breakable", color: "rgb(0, 0, 0, 0.1)",   texture: "box", visible: true };
const p1_plm4 = { x: 1100, y: 0, width: 128, height: 60,  type: "simple", color: "green",                  texture: "grass", visible: true };
const p1_plm5 = { x: 1228, y: 0, width: 128, height: 120, type: "simple", color: "green",                  texture: "grass", visible: true };
const p1_plm6 = { x: 1356, y: 0, width: 128, height: 180, type: "simple", color: "green",                  texture: "grass", visible: true };
const p1_plm7 = { x: 1484, y: 0, width: 128, height: 240, type: "simple", color: "green",                  texture: "grass", visible: true };
const p1_plm8 = { x: 1220, y: 300, width: 120, height: 40,  type: "simple", color: "rgb(0, 0, 0, 0.1)",    texture: "planks", visible: true };
const p1_plm9 = { x: 980, y: 370, width: 120, height: 40,  type: "simple", color: "rgb(0, 0, 0, 0.1)",     texture: "planks", visible: true };
const p1_plm10 = { x: 1020, y: 560, width: 40, height: 40,  type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };

const p2_plm1 = { x: 2100, y: 0, width: 80, height: 70,  type: "simple", color: "green",                  texture: "grass", visible: true };
const p2_plm2 = { x: 2590, y: 0, width: 80, height: 70,  type: "simple", color: "green",                  texture: "grass", visible: true };
const p2_plm3 = { x: 2800, y: 0, width: 96, height: 180,  type: "simple", color: "green",                 texture: "grass", visible: true };
const p2_plm4 = { x: 2896, y: 0, width: 40, height: 60,  type: "simple", color: "green",                  texture: "grass", visible: true };
const p2_plm5 = { x: 3000, y: 250, width: 160, height: 40,  type: "simple", color: "rgb(0, 0, 0, 0.1)",   texture: "planks", visible: true };
const p2_plm6 = { x: 3060, y: 410, width: 40, height: 40,  type: "breakable", color: "rgb(0, 0, 0, 0.1)", texture: "box", visible: true };

const p3_plm1 = { x: 3500, y: 0, width: 140, height: 50,  type: "simple", color: "green",                    texture: "grass", visible: true };
const p3_plm2 = { x: 3770, y: 120, width: 160, height: 40,  type: "simple", color: "rgb(0, 0, 0, 0.1)",      texture: "planks", visible: true };
const p3_plm3 = { x: 3510, y: 220, width: 160, height: 40,  type: "simple", color: "rgb(0, 0, 0, 0.1)",      texture: "planks", visible: true };
const p3_plm4 = { x: 3790, y: 320, width: 160, height: 40,  type: "simple", color: "rgb(0, 0, 0, 0.1)",      texture: "planks", visible: true };
const p3_plm5 = { x: 4080, y: 400, width: 360, height: 30,  type: "simple", color: "green",                  texture: "grass", visible: true };
const p3_plm6 = { x: 4420, y: 430, width: 20, height: 170,  type: "simple", color: "green",                  texture: "grass", visible: true };
const p3_plm7 = { x: 4300, y: 190, width: 20, height: 202,  type: "simple", color: "green",                  texture: "grass", visible: true };
const p3_plm8 = { x: 4306, y: 0, width: 8, height: 190,  type: "ghost", color: "brown",                      texture: "clear", visible: false };
const p3_plm9 = { x: 4360, y: 430, width: 20, height: 20,  type: "ghost", color: "yellow",                      texture: "clear", visible: false };

const lvlend = { x: 4700, y: 30, width: 50, height: 50, type: "ghost", color: "orange", changecolor: false, visible: false };

const platforms = [
    p1_plm1, p1_plm2, p1_plm3, p1_plm4, p1_plm5, p1_plm6, p1_plm7, p1_plm8, p1_plm9, p1_plm10,
    p2_plm1, p2_plm2, p2_plm3, p2_plm4, p2_plm5, p2_plm6,
    p3_plm1, p3_plm2, p3_plm3, p3_plm4, p3_plm5, p3_plm6, p3_plm7, p3_plm8, p3_plm9];
const World_edge_left = 0;
const World_edge_right = 5000;
let WScreen_edge_left = 0;
let WScreen_edge_right = World_edge_right;

jumper.x = 200;
jumper.y = 0;

//===============
for (let i = 0; i < platforms.length; i++)
{
    platforms[i].id = i;
}
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
