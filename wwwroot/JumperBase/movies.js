import { switchMovie } from "./base.js";

const moveObj = { fx: 0, fy: 0, sx: 0, sy: 0, speedX: 0, speedY: 0, obj: {}}

export function movies()
{
    if (moveObj.obj.x != moveObj.sx || moveObj.obj.y != moveObj.sy)
    {
        Misha.noControlDown = true;
        movementTo();
    }
    else
    {
        Misha.noControlDown = false;
        switchMovie();
    }
}


function movementTo()
{
    if (moveObj.sx > moveObj.fx)
    {
        moveObj.obj.x = Math.min(moveObj.obj.x + moveObj.speedX, moveObj.sx);
    }
    else
    {
        moveObj.obj.x = Math.max(moveObj.obj.x + moveObj.speedX, moveObj.sx);
    }

    if (moveObj.sy > moveObj.fy)
    {
        moveObj.obj.y = Math.min(moveObj.obj.y + moveObj.speedY, moveObj.sy);
    }
    else
    {
        moveObj.obj.y = Math.max(moveObj.obj.y + moveObj.speedY, moveObj.sy);
    }
}




export function moveTo(x, y, chr, time)
{
    moveObj.fx = chr.x;
    moveObj.fy = chr.y;
    moveObj.sx = x;
    moveObj.sy = y;
    moveObj.obj = chr;
    moveObj.speedX = (moveObj.sx - moveObj.fx) / time;
    moveObj.speedY = (moveObj.sy - moveObj.fy) / time;

}
