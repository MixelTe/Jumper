"use strict";
function Jgravity(obj)
{
    jnowAcc -= Fg * obj.mass;
    jnowSpeed += jnowAcc;

    jnowIntersect = false;
    for (let i = 0; i < platforms.length; i++)
    {
        if (!jnowIntersect && platforms[i].visible == true)
        {
            let newObj = { x: obj.x, y: obj.y - 2, width: obj.width, height: obj.height, };
            JgravityPlatforms(newObj, obj, platforms[i]);

            newObj.y = obj.y + jnowSpeed;
            if (rectIntersect(newObj, platforms[i]))
            {
                obj.ground = platforms[i].y + platforms[i].height;
                if (jnowSpeed > 0)
                {
                    obj.floor = platforms[i].y;
                    sound_down = true;
                }
                jnowIntersect = true;
            }
            else
            {
                obj.ground = 0;
                obj.floor = mainFloor;
                sound_down = false;
            }

        }
    }
    if (jnowSpeed < 0)                   //GRC element
    {
        Misha.jumperState = "falling";                   //GRC element
    }
    jnowIntersect = false;
    for (let i = 0; i < platforms.length; i++)
    {
        if (!jnowIntersect && platforms[i].visible == true)
        {
            let newObj = { x: obj.x, y: obj.y + jnowSpeed, width: obj.width, height: obj.height, };
            if (rectIntersect(newObj, platforms[i]))
            {
                obj.ground = platforms[i].y + platforms[i].height;
                if (jnowSpeed > 0)
                {
                    obj.floor = platforms[i].y;
                    sound_down = true;
                }
                jnowIntersect = true;
            }
            else
            {
                obj.ground = 0;
                obj.floor = mainFloor;
                sound_down = false;
            }
        }
    }

    obj.y = Math.min(Math.max(obj.y + jnowSpeed, obj.ground), obj.floor - obj.height);

    if (obj.y == obj.ground || obj.y + obj.height == obj.floor)
    {
        jnowJump = false;
        jnowAcc = 0;
        jnowSpeed = -obj.mass * 4.5;
    }
    else
    {
        jnowJump = true;
    }
    if (obj.y == obj.ground)
    {
        jmSpeed = 0;
        Misha.jumperState = "stoped";                //GRC element
    }
}
function JgravityPlatforms(newObj, obj, platform)
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
                jmSpeed = mnowSpeed
            }
            else if (obj.x + obj.width / 2 > platform.x + platform.width)
            {
                newObj.x = platform.x + platform.width + 1;
                jmSpeed = mnowSpeed
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

        jnowIntersect = true;
    }
    else
    {
        obj.ground = 0;
        sound_up = false;
    }
}

function Jmovement(obj)
{
    if (mnowAcc > 0)
    {
        if (mnowSpeed < obj.moveSpeed)
        {
            mnowSpeed += mnowAcc;
        }
        if (jmSpeed == 0)           //GRC element
        {
            Misha.jumperDirection = "right";
            Misha.jumperState = "going";                //GRC element
        }
    }
    else if (mnowAcc < 0)
    {
        if (mnowSpeed > -obj.moveSpeed)
        {
            mnowSpeed += mnowAcc;
        }
        if (jmSpeed == 0)           //GRC element
        {
            Misha.jumperDirection = "left";
            Misha.jumperState = "going";                //GRC element
        }
    }
    else
    {
        if (mnowSpeed != 0)
        {
            if (mnowSpeed > 0)
            {
                mnowSpeed += -1
            }
            else
            {
                mnowSpeed += 1
            }
            if (mnowSpeed > -1 && mnowSpeed < 1)
            {
                mnowSpeed = 0;
            }
        }
    }
    let newX = 0;
    if (obj.y > obj.ground)
    {
        newX = Math.min(Math.max(obj.x + jmSpeed, World_edge_left), World_edge_right - obj.width);
    }
    else
    {
        newX = Math.min(Math.max(obj.x + mnowSpeed, World_edge_left), World_edge_right - obj.width);
    }
    const newObj = { x: newX, y: obj.y, width: obj.width, height: obj.height, };
    mnowIntersect = false;
    let intersectObj = null;

    for (let i = 0; i < platforms.length; i++)
    {
        if (!mnowIntersect)
        {
            if (platforms[i].visible == true)
            {
                if (rectIntersect(newObj, platforms[i]))
                {
                    sound_side = true;
                    mnowIntersect = true;
                    intersectObj = platforms[i];
                    jmSpeed *= 0.8;
                    Misha.jumperflattening = "hit";                //GRC element
                }
            }
        }
    }
    if (!mnowIntersect)
    {
        sound_side = false;
        obj.x = newX;
        if (obj.y < obj.ground)
        {
            // jmSpeed = 0;                                                             //retutn if something goes wrong
        }
        mnowStrike = false;
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
        if (!mnowStrike)
        {
            jnowSpeed *= 0.5;
            mnowStrike = true;
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
