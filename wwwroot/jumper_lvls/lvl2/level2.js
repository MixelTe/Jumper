"use strict";
const platforms = [
 { id: 1, x: 100, y: 0, width: 100, height: 60, type: "simple", color: "green", texture: "grass", visible: true },
 { id: 2, x: 500, y: 0, width: 100, height: 60, type: "simple", color: "green", texture: "grass", visible: true },

];
const backscreen2 = [

]
const frontscreen = [

]

const lvlend = { x: 990, y: 0, width: 10, height: 90, type: "ghost", color: "rgb(0, 0, 0, 0.05)", changecolor: false, visible: false };

const World_edge_left = 0;
const World_edge_right = 1000;
let WScreen_edge_left = 0;
let WScreen_edge_right = World_edge_right;

const enemy1 = new Enemy(400, 0, 1.7, 6, 1.5, 14, true, "1e");
platforms.push(enemy1);
//===============
if (Misha.overlays)
{
    Misha.overlay.stars.count = 3;
}
SPL_cord_read(level);
redrawAll();
//===============



function redrawAll()
{
    if (DEVgravity)
    {
        Jgravity(jumper);
        Jmovement(jumper);

        Egravity(enemy1);
        Emovement(enemy1);
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
    PLM_logics(platforms)
    drawEnemy(enemy1);
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
    if (Misha.overlays == true)
    {
        OVL_draw1();
    }
    requestAnimationFrame(redrawAll);
}

function SPL_lvl_write()
{

}

function SPL_lvl_read()
{

}

function LVL_triggers()
{

}