"use strict";
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
            jnowSpeed = -jumper.mass * 4.5
            ding.currentTime = 0;
            ding.play();
            plm.visible = false;
        }
    }
}
function PLM_logics(platforms)
{
    for (let i = 0; i < platforms.length; i++)
    {
        switch (platforms[i].type)
        {
            case "simple":
                break;

            case "lifting":
                PLM_lifting(platforms[i]);
                break;

            case "breakable":
                PLM_breakable(platforms[i]);
                break;

            case "ghost":
                drawPlatform(platforms[i]);
                break;

            default:
                break;
        }
        if (platforms[i].visible == true || platforms[i].visible == "true")
        {
            drawPlatform(platforms[i]);
        }
    }
}