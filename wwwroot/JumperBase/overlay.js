"use strict";
import {ctx, coins, canva} from "./base.js"
window.Misha = window.Misha || Object.create(null);
Misha.overlays = true;
Misha.overlay = {};
Misha.overlay.imgs = {};
Misha.overlay.img = {};
Misha.overlay.sounds = {};

Misha.overlay.stars = {x: 20, y: 20, count: 3, stared: 0};

OVL_loadFiles();
function OVL_loadFiles()
{
    Misha.overlay.imgs.star = new Image();
    Misha.overlay.imgs.star.src = "pictures/star.png";
    Misha.overlay.imgs.star.onload = function ()
    {
        Misha.overlay.img.star = true;
    }

    Misha.overlay.imgs.starframe = new Image();
    Misha.overlay.imgs.starframe.src = "pictures/starframe.png";
    Misha.overlay.imgs.starframe.onload = function ()
    {
        Misha.overlay.img.starframe = true;
    }

    Misha.overlay.sounds.starColected = document.createElement("AUDIO");
    Misha.overlay.sounds.starColected.src = "sounds/starcolected.mp3";

}

export function draw1()
{
    ctx.save();
    ctx.translate(0, canva.height);
    ctx.scale(1, -1);
    ctx.fillStyle = "rgba(256, 256, 256, 0.15)";
    // ctx.fillRect(0, 0, 262, 100);

    ctx.save();
    ctx.translate(coins.x, coins.y);
    ctx.fillStyle = coins.color;
    ctx.font = "30px Arial";
    ctx.fillText("Coins: " + coins.value, 0, 0);
    ctx.restore();

    if (Misha.overlay.img.starframe == true)
    {
        for (let i = 0; i < Misha.overlay.stars.count; i++)
        {
            ctx.drawImage(Misha.overlay.imgs.starframe, 20 + 74 * i, 20, 64, 64);
        }
    }

    if (Misha.overlay.img.star == true)
    {
        for (let i = 0; i < Misha.overlay.stars.stared; i++)
        {
            ctx.drawImage(Misha.overlay.imgs.star, 20 + 74 * i, 20, 64, 64);
        }
    }

    ctx.restore();
}
