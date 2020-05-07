"use strict";
import {ctx, coins, ding, platforms, drawPlatform, jumper} from "./base.js"
import {rectIntersect, findWhithId} from "./Functions.js"
window.Misha = window.Misha || Object.create(null);
Misha.sounds = {}
function PLM_lifting(plm)
{
    if (plm.height < plm.heightMax && plm.direction == "up")
    {
        plm.height += plm.speed
    }
    else
    {
        plm.direction = "down"
    }

    if (plm.height > plm.heightMin && plm.direction == "down")
    {
        plm.height -= plm.speed
    }
    else
    {
        plm.direction = "up"
    }
}

function PLM_breakable(plm)
{
    if (plm.visible == true || plm.visible == "true")
    {
        const newPlm = { x: plm.x + 1, y: plm.y - 1, width: plm.width - 2, height: 1, };
        if (rectIntersect(newPlm, jumper))
        {
            coins.value += 1;
            jumper.jumpSpeed = -jumper.mass * 4.5
            ding.currentTime = 0;
            ding.play();
            plm.visible = false;
        }
    }
}
Misha.sounds.doorOpen = {};
Misha.sounds.doorOpen.s = document.createElement("AUDIO");
Misha.sounds.doorOpen.s.src = "sounds/doorOpen.mp3";
Misha.sounds.doorOpen.played = false;

Misha.sounds.doorClose = {};
Misha.sounds.doorClose.s = document.createElement("AUDIO");
Misha.sounds.doorClose.s.src = "sounds/doorClose.mp3";
Misha.sounds.doorClose.played = false;

Misha.sounds.doorCloseEnd = {};
Misha.sounds.doorCloseEnd.s = document.createElement("AUDIO");
Misha.sounds.doorCloseEnd.s.src = "sounds/doorCloseEnd.mp3";
Misha.sounds.doorCloseEnd.played = true;

function PLM_door(plm)
{
    const speed = 0.7;
    let blockN = findWhithId(platforms, plm.id + 0.5);
    switch (plm.doorState) {
        case "close":
            if (Misha.sounds.doorCloseEnd.played == false)
            {
                Misha.sounds.doorCloseEnd.s.play();
                Misha.sounds.doorCloseEnd.played = true;
            }

            plm.height = plm.doorHeight;
            plm.y = plm.doorY;
            plm.x = plm.doorX;
            break;

        case "open":
            plm.height = 20;
            plm.y = plm.doorHeight - 20;
            plm.x = plm.doorX;
            platforms[blockN].y = plm.doorHeight - 20;
            platforms[blockN].height = 20;
            break;

        case "opening":
            Misha.sounds.doorCloseEnd.played = false;
            Misha.sounds.doorClose.played = false;
            if (plm.y < plm.doorHeight - 20)
            {
                plm.y += speed;
                plm.height -= speed;
                PLM_door_shake(plm);
                platforms[blockN].y += speed;
                platforms[blockN].height -= speed;
                if (Misha.sounds.doorOpen.played == false)
                {
                    Misha.sounds.doorClose.s.pause();
                    Misha.sounds.doorClose.s.currentTime = 0;

                    Misha.sounds.doorOpen.s.play();
                    Misha.sounds.doorOpen.played = true;
                }
            }
            else
            {
                plm.height = 20;
                plm.y = plm.doorHeight - 20;
                plm.doorState = "open";
                plm.x = plm.doorX;
                platforms[blockN].y = plm.doorHeight - 20;
                platforms[blockN].height = 20;
            }
            break;

        case "closing":
            Misha.sounds.doorOpen.played = false;
            platforms[blockN].y = platforms[blockN].blockY;
            platforms[blockN].height = platforms[blockN].blockHeight;
            if (plm.y > plm.doorY)
            {
                plm.y -= speed;
                plm.height += speed;
                PLM_door_shake(plm);
                if (Misha.sounds.doorClose.played == false)
                {
                    Misha.sounds.doorOpen.s.pause();
                    Misha.sounds.doorOpen.s.currentTime = 0;

                    Misha.sounds.doorClose.s.play();
                    Misha.sounds.doorClose.played = true;
                }
            }
            else
            {
                plm.height = plm.doorHeight;
                plm.y = plm.doorY;
                plm.doorState = "close";
                plm.x = plm.doorX;
            }

            break;

        default:
            break;
    }
}

function PLM_door_shake(plm)
{
    if (plm.doorXd == "right")
    {
        plm.x += 0.1;
        if (plm.x > plm.doorX + 1)
        {
            plm.doorXd = "left";
        }
    }
    else
    {
        plm.x -= 0.1;
        if (plm.x < plm.doorX - 1)
        {
            plm.doorXd = "right";
        }
    }
}

Misha.sounds.lever = document.createElement("AUDIO");
Misha.sounds.lever.src = "sounds/leverClick.mp3";

function PLM_lever(plm)
{
    if (rectIntersect(plm, jumper))
    {
        if (plm.leverChange == false)
        {
            switch (plm.leverState)
            {
                case "off":
                    plm.leverState = "on";
                    Misha.sounds.lever.play();
                    break;

                case "on":
                    plm.leverState = "off";
                    Misha.sounds.lever.play();
                    break;

                default:
                    break;
            }
            plm.leverChange = true;
        }
    }
    else
    {
        plm.leverChange = false;
    }
}

function PLM_star(plm)
{
    if (plm.colected == false && Misha.overlays == true)
    {
        if (rectIntersect(plm, jumper))
        {
            Misha.overlay.stars.stared += 1;
            ding.currentTime = 0;
            Misha.overlay.sounds.starColected.play();
            plm.colected = true;
        }
        drawPlatform(plm);
    }
}

function PLM_fake(plm)
{
    ctx.save();
    if (Misha.grafics)
    {
        plm.visible = false;
    }
    drawPlatform(plm);
    ctx.restore();
}

export function logics(platforms)
{
    for (let plt of platforms)
    {
        switch (plt.type)
        {
            case "simple":
                break;

            case "lifting":
                PLM_lifting(plt);
                break;

            case "breakable":
                PLM_breakable(plt);
                break;

            case "door":
                PLM_door(plt);
                break;

            case "ghost":
                drawPlatform(plt);
                break;

            case "lever":
                PLM_lever(plt);
                drawPlatform(plt);
                break;

            case "star":
                PLM_star(plt);
                break;

            case "fake":
                PLM_fake(plt);
                break;

            default:
                break;
        }
        if (plt.visible == true || plt.visible == "true")
        {
            drawPlatform(plt);
        }
    }
}