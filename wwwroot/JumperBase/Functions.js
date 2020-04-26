function rectIntersect(obj1, obj2)
{
    return (
        obj1.x + obj1.width > obj2.x &&
        obj2.x + obj2.width > obj1.x &&
        obj1.y + obj1.height > obj2.y &&
        obj2.y + obj2.height > obj1.y
    );
}


function rectXIntersectINF(obj1, obj2)
{
    const xsec1 = { start: obj1.x, end: obj1.x + obj1.width };
    const xsec2 = { start: obj2.x + obj2.width / 2, end: obj2.x + obj2.width / 2 };
    return intersect(xsec1, xsec2);
}
function intersect(sec1, sec2)
{
    if (isLess(sec1, sec2))
    {
        return "left";
    }
    else if (isLess(sec2, sec1))
    {
        return "right";
    }
    return false;
}
function isLess(sec1, sec2)
{
    return (
        sec1.start < sec2.start &&
        sec1.end < sec2.start &&
        sec1.start < sec2.end &&
        sec1.end < sec2.end
    );
}

function loadScript(scriptPath)
{
    const el = document.createElement("script");
    el.src = scriptPath;
    document.head.appendChild(el);
}

function findWhithId(list, id)
{
    for (let i = 0; i < list.length; i++)
    {
        const el = list[i];
        if (el.id == id)
        {
            return i
        }
    }
}