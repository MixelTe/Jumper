"use strict";
import {ctx, coins, canva} from "./base.js"
window.Misha = window.Misha || Object.create(null);
Misha.overlays = true;
const overlay = {};
overlay.imgs = {};
overlay.img = {};
overlay.sounds = {};

overlay.stars = { x: 20, y: 20, count: 3, stared: 0 };
export let star = null;
export let starColected = null;
export function starCountChange(newCount)
{
    overlay.stars.count = newCount;
}
export function starStaredChange(count)
{
    overlay.stars.stared += count;
}
export function starStaredSet(count)
{
    overlay.stars.stared = count;
}
export function staredStarsCount()
{
    return overlay.stars.stared;
}

OVL_loadFiles();
function OVL_loadFiles()
{
    overlay.imgs.star = new Image();
    overlay.imgs.star.src = "pictures/star.png";
    overlay.imgs.star.onload = function ()
    {
        star = overlay.imgs.star;
        overlay.img.star = true;
    }

    overlay.imgs.starframe = new Image();
    overlay.imgs.starframe.src = "pictures/starframe.png";
    overlay.imgs.starframe.onload = function ()
    {
        overlay.img.starframe = true;
    }

    overlay.sounds.starColected = document.createElement("AUDIO");
    overlay.sounds.starColected.src = "sounds/starcolected.mp3";
    starColected = overlay.sounds.starColected;

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

    if (overlay.img.starframe == true)
    {
        for (let i = 0; i < overlay.stars.count; i++)
        {
            ctx.drawImage(overlay.imgs.starframe, 20 + 74 * i, 20, 64, 64);
        }
    }

    if (overlay.img.star == true)
    {
        for (let i = 0; i < overlay.stars.stared; i++)
        {
            ctx.drawImage(overlay.imgs.star, 20 + 74 * i, 20, 64, 64);
        }
    }

    ctx.restore();
}
