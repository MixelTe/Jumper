"use strict";

function Cgravity(obj)
{
    obj.jumpAcc -= Fg * obj.mass;
    obj.jumpSpeed += obj.jumpAcc;

    obj.jnowIntersect = false;
    for (let i = 0; i < platforms.length; i++)
    {
        if (!obj.jnowIntersect && (platforms[i].visible == true || platforms[i].visible == "true") && platforms[i].id != obj.id)
        {
            let newObj = { x: obj.x, y: obj.y - 2, width: obj.width, height: obj.height, };
            CgravityPlatforms(newObj, obj, platforms[i]);

            newObj.y = obj.y + obj.jumpSpeed;
            if (rectIntersect(newObj, platforms[i]))
            {
                obj.ground = platforms[i].y + platforms[i].height;
                if (obj.jumpSpeed > 0)
                {
                    obj.floor = platforms[i].y;
                    sound_down = true;
                }
                obj.jnowIntersect = true;
            }
            else
            {
                obj.ground = 0;
                obj.floor = mainFloor;
                sound_down = false;
            }

        }
    }
    if (obj.jumpSpeed < 0)                   //GRC element
    {
        obj.state = "falling";                   //GRC element
    }
    obj.jnowIntersect = false;
    for (let i = 0; i < platforms.length; i++)
    {
        if (!obj.jnowIntersect && platforms[i].visible == true && platforms[i].id != obj.id)
        {
            let newObj = { x: obj.x, y: obj.y + obj.jumpSpeed, width: obj.width, height: obj.height, };
            if (rectIntersect(newObj, platforms[i]))
            {
                obj.ground = platforms[i].y + platforms[i].height;
                if (obj.jumpSpeed > 0)
                {
                    obj.floor = platforms[i].y;
                    sound_down = true;
                }
                obj.jnowIntersect = true;
            }
            else
            {
                obj.ground = 0;
                obj.floor = mainFloor;
                sound_down = false;
            }
        }
    }

    obj.y = Math.min(Math.max(obj.y + obj.jumpSpeed, obj.ground), obj.floor - obj.height);

    if (obj.y == obj.ground || obj.y + obj.height == obj.floor)
    {
        obj.nowJump = false;
        obj.jumpAcc = 0;
        obj.jumpSpeed = -obj.mass * 4.5;
    }
    else
    {
        obj.nowJump = true;
    }
    if (obj.y == obj.ground)
    {
        obj.jmSpeed = 0;
        obj.state = "stoped";                //GRC element
    }
}
function CgravityPlatforms(newObj, obj, platform)
{
    if (rectIntersect(newObj, platform))
    {
        sound_up = true;

        if (platform.fallOnEdge == null)            //fall on edge
        {
            let objX = obj.x;
            if (obj.x + obj.width / 2 < platform.x)
            {
                newObj.x = platform.x - obj.width - 1;
                obj.jmSpeed = obj.moveSpeed;
            }
            else if (obj.x + obj.width / 2 > platform.x + platform.width)
            {
                newObj.x = platform.x + platform.width + 1;
                obj.jmSpeed = obj.moveSpeed
            }
            obj.x = newObj.x;

            for (let i = 0; i < platforms.length; i++)
            {
                if (rectIntersect(newObj, platforms[i]))
                {
                    obj.x = objX;
                }
            }
        }

        obj.jnowIntersect = true;
    }
    else
    {
        obj.ground = 0;
        sound_up = false;
    }
}
function Cmovement(obj)
{
    if (obj.moveAcc > 0)
    {
        if (obj.moveSpeed < obj.speed)
        {
            obj.moveSpeed += obj.moveAcc;
        }
        if (obj.jmSpeed == 0)           //GRC element
        {
            obj.direction = "right";
            obj.state = "going";                //GRC element
        }
    }
    else if (obj.moveAcc < 0)
    {
        if (obj.moveSpeed > -obj.speed)
        {
            obj.moveSpeed += obj.moveAcc;
        }
        if (obj.jmSpeed == 0)           //GRC element
        {
            obj.direction = "left";
            obj.state = "going";                //GRC element
        }
    }
    else
    {
        if (obj.moveSpeed != 0)
        {
            if (obj.moveSpeed > 0)
            {
                obj.moveSpeed += -1
            }
            else
            {
                obj.moveSpeed += 1
            }
            if (obj.moveSpeed > -1 && obj.moveSpeed < 1)
            {
                obj.moveSpeed = 0;
            }
        }
    }
    let newX = 0;
    if (obj.y > obj.ground)
    {
        newX = Math.min(Math.max(obj.x + obj.jmSpeed, World_edge_left), World_edge_right - obj.width);
    }
    else
    {
        newX = Math.min(Math.max(obj.x + obj.moveSpeed, World_edge_left), World_edge_right - obj.width);
    }
    const newObj = { x: newX, y: obj.y, width: obj.width, height: obj.height, };
    obj.mnowIntersect = false;
    let intersectObj = null;

    for (let i = 0; i < platforms.length; i++)
    {
        if (!obj.mnowIntersect)
        {
            if ((platforms[i].visible == true || platforms[i].visible == "true") && platforms[i].id != obj.id) // && platforms[i].type != "enemy"
            {
                if (rectIntersect(newObj, platforms[i]))
                {
                    sound_side = true;
                    obj.mnowIntersect = true;
                    intersectObj = platforms[i];
                    obj.jmSpeed *= 0.8;
                    obj.flattening = "hit";                //GRC element
                }
            }
        }
    }
    if (!obj.mnowIntersect)
    {
        sound_side = false;
        obj.x = newX;
        obj.mnowStrike = false;
    }
    else
    {
        if (rectXIntersectINF(newObj, intersectObj) == "left")
        {
            obj.x = Math.min(newX, intersectObj.x - obj.width);

        }
        else if (rectXIntersectINF(newObj, intersectObj) == "right")
        {
            obj.x = Math.max(newX, intersectObj.x + intersectObj.width);
        }
        if (!obj.mnowStrike)
        {
            obj.nowJump *= 0.5;
            obj.mnowStrike = true;
        }
    }
}

function moveScreen()
{
    if (jumper.x < Screen_edge_left + -WorldAnchor.x)
    {
        WorldAnchor.x = Math.max(Math.min(-jumper.x + Screen_edge_left, -WScreen_edge_left), -(WScreen_edge_right - canva.width));
    }
    if (jumper.x > Screen_edge_right + -WorldAnchor.x)
    {
        WorldAnchor.x = Math.max(Math.min(-jumper.x + Screen_edge_right, -WScreen_edge_left), -(WScreen_edge_right - canva.width));
    }
}
