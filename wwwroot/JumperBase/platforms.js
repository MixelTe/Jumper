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

function PLM_door(plm)
{
    const speed = 0.7;
    let blockN = findWhithId(platforms, plm.id + 0.5);
    switch (plm.doorState) {
        case "close":

            break;

        case "open":

            break;

        case "opening":
            if (plm.y < plm.doorHeight - 20)
            {
                plm.y += speed;
                plm.height -= speed;
                PLM_door_shake(plm);
                platforms[blockN].y += speed;
                platforms[blockN].height -= speed;
            }
            else
            {
                plm.height = 20;
                plm.y = plm.doorHeight - 20;
                plm.doorState = "open";
                plm.x = plm.doorX;
            }
            break;

        case "closing":
            platforms[blockN].y = platforms[blockN].blockY;
            platforms[blockN].height = platforms[blockN].blockHeight;
            if (plm.y > plm.doorY)
            {
                plm.y -= speed;
                plm.height += speed;
                PLM_door_shake(plm);
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
                    break;

                case "on":
                    plm.leverState = "off";
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

function PLM_logics(platforms)
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

            default:
                break;
        }
        if (plt.visible == true || plt.visible == "true")
        {
            drawPlatform(plt);
        }
    }
}